# ✈️ TripCraft AI

**AI-powered travel planning — itineraries, weather, budgets, and more. In seconds.**

🔗 **Live App → [tripcraft-ai-one.vercel.app](https://tripcraft-ai-one.vercel.app)**

---

## What is TripCraft AI?

TripCraft AI is a travel planning web app that uses Google's Gemini 2.5 Flash large language model to generate personalised day-by-day travel itineraries. Tell it where you're going, your budget, travel style and dates — and it builds a complete trip plan in seconds.

Each user's trips are stored privately under a SHA-256 hashed passcode. No email, no OAuth, no data sent to a server — just a secure local profile.

---

## Features

- 🤖 **AI Itinerary Generation** — Day-by-day plans with activities, timings, local tips and estimated costs, powered by Google Gemini 2.5 Flash
- ⛅ **Live Weather** — Real-time weather for your destination using OpenWeatherMap API
- 💰 **Budget Breakdown** — Visual breakdown across accommodation, food, transport, activities and misc in your chosen currency
- 🌍 **Multi-Currency** — 10 currencies: USD, EUR, GBP, INR, JPY, AUD, CAD, SGD, AED, CHF
- 🔒 **Private Profiles** — Passcode-based user profiles with SHA-256 hashing via Web Crypto API — plaintext is never stored
- 💾 **Save & Revisit** — Itineraries saved to localStorage per user, accessible anytime from My Trips
- 🎒 **Packing List & Emergency Contacts** — Auto-generated per destination
- 🌙 **Dark / Light Mode** — System preference detected, persisted across sessions

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 18 + Vite 5 |
| Styling | Tailwind CSS v3 (class-based dark mode, glassmorphism) |
| Routing | React Router v6 |
| AI | Google Gemini 2.5 Flash (REST API) |
| Weather | OpenWeatherMap Current Weather API |
| Auth | Passcode profiles — SHA-256 via Web Crypto API |
| Storage | localStorage (namespaced per user hash) |
| Deployment | Vercel (auto-deploy from GitHub) |
| Testing | Jest + jsdom (26 unit tests) |
| Linting | ESLint with react + react-hooks plugins |

---

## Project Structure

```
src/
├── components/
│   ├── Auth/         # ProfileGate — login/signup with SHA-256 passcode hashing
│   ├── Itinerary/    # ItineraryView, DayCard — full trip display
│   ├── Layout/       # Header, Footer
│   ├── TripForm/     # TripForm, BudgetSlider, StyleSelector
│   ├── Trips/        # TripList, TripCard — saved trips grid
│   ├── Weather/      # WeatherWidget
│   ├── ErrorBoundary # Class-based crash recovery
│   └── Logo.jsx      # Shared SVG gradient logo
├── hooks/
│   ├── useDarkMode   # Persistent dark mode with classList
│   ├── useItinerary  # Gemini API call + state
│   ├── useTrips      # localStorage CRUD
│   └── useWeather    # OpenWeatherMap fetch
├── pages/
│   └── Home, Plan, Result, Trips
└── utils/
    ├── auth.js       # Profile management, SHA-256 hashing, session storage
    ├── gemini.js     # Prompt builder, JSON extractor, retry logic
    ├── storage.js    # Per-user trip CRUD (namespaced by hash)
    ├── weather.js    # Weather fetch + normalisation
    └── formatters.js # Intl.NumberFormat cache, date utils
```

---

## Running Locally

```bash
git clone https://github.com/rakshitvarma969/tripcraft-ai
cd tripcraft-ai
npm install
```

Create a `.env` file in the root:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key
VITE_OPENWEATHER_API_KEY=your_openweather_api_key
```

```bash
npm run dev
# open http://localhost:5173
```

---

## Running Tests

```bash
npm test
```

26 unit tests covering storage, formatters, weather normalisation, and prompt builder.

---

## Built at

**PromptWars Noida — Hack2Skill × Google for Developers**

`#BuildWithAI` `#PromptWars` `#GeminiAI`

---

## License

MIT
