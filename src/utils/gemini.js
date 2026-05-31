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

export async function generateItinerary(prefs) {
  const key = import.meta.env.VITE_GEMINI_API_KEY
  if (!key) throw new Error('Gemini API key not configured')

  const body = {
    contents: [{ parts: [{ text: buildItineraryPrompt(prefs) }] }],
    generationConfig: {
      temperature: 0.7,
      maxOutputTokens: 8192,
      responseMimeType: 'application/json',  // force JSON-only response
    },
    // Disable thinking so the response is direct text, not thought+text parts
    thinkingConfig: { thinkingBudget: 0 },
  }

  const res = await fetch(`${GEMINI_URL}?key=${key}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => ({}))
    throw new Error(err?.error?.message ?? `Gemini API error (${res.status})`)
  }

  const data = await res.json()

  // Collect all non-thought text parts (handles thinking model multi-part responses)
  const parts = data?.candidates?.[0]?.content?.parts ?? []
  const raw = parts
    .filter((p) => !p.thought)
    .map((p) => p.text ?? '')
    .join('')
    .trim()

  if (!raw) throw new Error('Gemini returned an empty response — please try again')

  // Strip markdown fences if still present despite responseMimeType
  const jsonText = raw
    .replace(/^```(?:json)?\s*/i, '')
    .replace(/\s*```$/i, '')
    .trim()

  // Extract the first complete JSON object in case of leading/trailing prose
  const match = jsonText.match(/\{[\s\S]*\}/)
  if (!match) throw new Error('No valid JSON found in AI response — please try again')

  try {
    return JSON.parse(match[0])
  } catch {
    throw new Error('AI returned malformed JSON — please try again')
  }
}
