const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent'

export function buildItineraryPrompt(prefs) {
  const { destination, startDate, endDate, budget, currency = 'USD', travelStyle, constraints } = prefs
  const nights = Math.max(1, Math.round((new Date(endDate) - new Date(startDate)) / 86_400_000))
  // Cap days in prompt to avoid hitting token limits
  const cappedNights = Math.min(nights, 10)

  return `You are an expert travel planner. Create a concise day-by-day itinerary for ${cappedNights} day(s).

Trip:
- Destination: ${destination}
- Dates: ${startDate} to ${endDate} (${cappedNights} days)
- Budget: ${budget} ${currency} total (excludes international/intercity travel tickets — cover only local transport, accommodation, food, activities, and misc)
- Style: ${travelStyle}
- Notes: ${constraints || 'none'}

Rules:
- Max 3 activities per day
- Keep descriptions to 1 sentence each
- Output ONLY a raw JSON object, no markdown, no explanation

JSON shape:
{"destination":"","summary":"","days":[{"day":1,"date":"","theme":"","activities":[{"time":"","title":"","description":"","estimatedCost":0,"type":""}],"tips":""}],"budgetBreakdown":{"accommodation":0,"food":0,"transport":0,"activities":0,"misc":0},"packingEssentials":[],"emergencyContacts":{"police":"","ambulance":"","touristHelpline":""}}`
}

function repairJSON(text) {
  // Count open/close braces and brackets, close any that are missing
  let braces = 0, brackets = 0
  let inString = false, escape = false

  for (const ch of text) {
    if (escape) { escape = false; continue }
    if (ch === '\\' && inString) { escape = true; continue }
    if (ch === '"') { inString = !inString; continue }
    if (inString) continue
    if (ch === '{') braces++
    else if (ch === '}') braces--
    else if (ch === '[') brackets++
    else if (ch === ']') brackets--
  }

  let repaired = text
  // Close open strings with a safe value if JSON ends mid-string
  if (inString) repaired += '"'
  while (brackets > 0) { repaired += ']'; brackets-- }
  while (braces  > 0) { repaired += '}'; braces--  }
  return repaired
}

function extractJSON(text) {
  if (!text) return null

  const candidates = [
    text.trim(),
    text.replace(/^```(?:json)?\s*/im, '').replace(/\s*```\s*$/im, '').trim(),
  ]

  for (const candidate of candidates) {
    // Try direct parse
    try { return JSON.parse(candidate) } catch {}

    // Try finding outermost { }
    const start = candidate.indexOf('{')
    const end   = candidate.lastIndexOf('}')
    if (start !== -1 && end > start) {
      try { return JSON.parse(candidate.slice(start, end + 1)) } catch {}
    }

    // Try repairing truncated JSON
    if (start !== -1) {
      try { return JSON.parse(repairJSON(candidate.slice(start))) } catch {}
    }
  }
  return null
}

export async function generateItinerary(prefs) {
  const key = import.meta.env.VITE_GEMINI_API_KEY
  if (!key) throw new Error('Gemini API key not configured')

  const body = JSON.stringify({
    contents: [{ parts: [{ text: buildItineraryPrompt(prefs) }] }],
    generationConfig: {
      temperature: 0.3,
      maxOutputTokens: 65536,
      responseMimeType: 'application/json',
    },
  })

  let lastError
  for (let attempt = 0; attempt < 3; attempt++) {
    const res = await fetch(`${GEMINI_URL}?key=${key}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    })

    if (!res.ok) {
      const err = await res.json().catch(() => ({}))
      throw new Error(err?.error?.message ?? `Gemini API error (${res.status})`)
    }

    const data = await res.json()
    const parts = data?.candidates?.[0]?.content?.parts ?? []
    // Filter out thinking parts (gemini-2.5-flash with thinking enabled)
    const allText = parts.filter((p) => !p.thought).map((p) => p.text ?? '').join('\n').trim()

    const parsed = extractJSON(allText)
    if (parsed) return parsed

    lastError = allText
    console.warn('[TripCraft] Attempt', attempt + 1, 'raw response:', allText.slice(0, 500))
  }

  throw new Error(`Could not parse AI response. Raw: ${lastError?.slice(0, 300)}`)
}
