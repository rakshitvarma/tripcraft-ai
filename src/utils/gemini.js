const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent'

/**
 * Build a structured prompt for the itinerary generator.
 * @param {object} prefs  Trip preference form values
 * @returns {string}
 */
export function buildItineraryPrompt(prefs) {
  const { destination, startDate, endDate, budget, travelStyle, constraints } = prefs
  const nights = Math.max(
    1,
    Math.round((new Date(endDate) - new Date(startDate)) / 86_400_000),
  )

  return `You are an expert travel planner. Create a detailed day-by-day travel itinerary in valid JSON.

Trip details:
- Destination: ${destination}
- Duration: ${nights} night(s), arriving ${startDate}, departing ${endDate}
- Budget: ${budget} USD total
- Travel style: ${travelStyle}
- Constraints / notes: ${constraints || 'none'}

Return ONLY a JSON object with this exact shape (no markdown, no explanation):
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
          "estimatedCostUSD": 0,
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

/**
 * Call Gemini API and return a parsed itinerary object.
 * API key is read from Vite env — never hard-coded.
 * @param {object} prefs
 * @returns {Promise<object>}
 */
export async function generateItinerary(prefs) {
  const key = import.meta.env.VITE_GEMINI_API_KEY
  if (!key) throw new Error('Gemini API key not configured')

  const body = {
    contents: [{ parts: [{ text: buildItineraryPrompt(prefs) }] }],
    generationConfig: { temperature: 0.7, maxOutputTokens: 4096 },
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
  const raw = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? ''

  // Strip any accidental markdown fences
  const jsonText = raw.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '').trim()

  try {
    return JSON.parse(jsonText)
  } catch {
    throw new Error('AI returned malformed JSON — please try again')
  }
}
