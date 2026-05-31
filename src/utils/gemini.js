const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'

export function buildItineraryPrompt(prefs) {
  const { destination, startDate, endDate, budget, currency = 'USD', travelStyle, constraints } = prefs
  const nights = Math.max(1, Math.round((new Date(endDate) - new Date(startDate)) / 86_400_000))

  return `You are an expert travel planner. Create a detailed day-by-day travel itinerary.

Trip details:
- Destination: ${destination}
- Duration: ${nights} night(s), arriving ${startDate}, departing ${endDate}
- Budget: ${budget} ${currency} total (use ${currency} for all cost estimates)
- Travel style: ${travelStyle}
- Constraints / notes: ${constraints || 'none'}

Respond with ONLY a valid JSON object — no markdown fences, no explanation, no text before or after the JSON.

Required shape:
{
  "destination": "string",
  "summary": "2-3 sentence trip overview",
  "days": [
    {
      "day": 1,
      "date": "YYYY-MM-DD",
      "theme": "short day theme",
      "activities": [
        {
          "time": "HH:MM",
          "title": "Activity name",
          "description": "2-3 sentences",
          "estimatedCost": 0,
          "type": "food|sightseeing|transport|accommodation|leisure"
        }
      ],
      "tips": "Local tip for the day"
    }
  ],
  "budgetBreakdown": {
    "accommodation": 0,
    "food": 0,
    "transport": 0,
    "activities": 0,
    "misc": 0
  },
  "packingEssentials": ["item1", "item2"],
  "emergencyContacts": { "police": "string", "ambulance": "string", "touristHelpline": "string" }
}`
}

function extractJSON(text) {
  if (!text) return null

  // Strategy 1: direct parse
  try { return JSON.parse(text.trim()) } catch {}

  // Strategy 2: strip markdown fences then parse
  const stripped = text
    .replace(/^```(?:json)?\s*/im, '')
    .replace(/\s*```\s*$/im, '')
    .trim()
  try { return JSON.parse(stripped) } catch {}

  // Strategy 3: find outermost { } block
  const start = text.indexOf('{')
  const end   = text.lastIndexOf('}')
  if (start !== -1 && end > start) {
    try { return JSON.parse(text.slice(start, end + 1)) } catch {}
  }

  return null
}

export async function generateItinerary(prefs) {
  const key = import.meta.env.VITE_GEMINI_API_KEY
  if (!key) throw new Error('Gemini API key not configured')

  const res = await fetch(`${GEMINI_URL}?key=${key}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: buildItineraryPrompt(prefs) }] }],
      generationConfig: { temperature: 0.7, maxOutputTokens: 65536 },
    }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error?.message ?? `Gemini API error (${res.status})`)
  }

  const data = await res.json()

  // Collect text from every part regardless of role/thought flag
  const parts = data?.candidates?.[0]?.content?.parts ?? []
  const allText = parts.map((p) => p.text ?? '').join('\n').trim()

  console.debug('[TripCraft] Raw Gemini response:', allText.slice(0, 500))

  const parsed = extractJSON(allText)
  if (parsed) return parsed

  // Surface the raw text in the error so we can see what came back
  throw new Error(`Could not parse AI response. Raw: ${allText.slice(0, 200)}`)
}
