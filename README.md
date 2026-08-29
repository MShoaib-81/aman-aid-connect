# Aman Aid Now

Build a mobile-first web app called "Aman AI" — a multilingual emergency

assistance platform (Urdu, English, Sindhi — with full RTL support for

Urdu and Sindhi).

Design direction: calm, trustworthy, civic/government-grade clarity (not

playful/startup style). High contrast, large tap targets (min 44px),

legible in stress/low-light conditions.

Color system:

- Primary/trust: deep blue (#2563EB)

- Emergency/SOS: red (#DC2626), used ONLY for critical actions/alerts

- Caution: amber (#F59E0B)

- Safe/confirmed: green (#16A34A)

- Neutral backgrounds: slate-50 (light) / slate-900 (dark mode)

Typography: pair a Latin sans-serif (Inter) with an Arabic/Urdu-script

font (Noto Nastaliq Urdu or Noto Sans Arabic) for bilingual rendering.

Base font size 16–18px minimum.

Navigation: bottom tab bar with Home, Report, First Aid, Hospitals,

AQI/Weather, Voice Assistant.

Build these screens:

1. Splash/Language selector (Urdu, English, Sindhi)

2. Home dashboard — large SOS button, live AQI card, active weather/flood

   alert banner, quick-access tiles for First Aid / Hospitals / Voice

   Assistant

3. Report Emergency flow — category selection (flood, fire, medical,

   accident, other), auto-detected editable location, text/voice

   description field, photo attachment, submit button, confirmation

   screen with generated report ID

4. AI Triage screen — chat-style interface where AI asks 2–3 clarifying

   questions then shows a recommendation card routing to First Aid,

   Hospital, or Emergency Report

5. First Aid Guidance — searchable/filterable list of scenarios (bleeding,

   burns, CPR, choking, fractures, drowning), each opening a numbered

   step-by-step guide with icons and a "play voice guide" button

6. Hospital Locator — map view + list view toggle, each hospital card

   shows distance, specialty tags, call and directions buttons

7. AQI Monitor — large color-coded AQI gauge, health recommendation text,

   24-48hr trend line chart, location selector

8. Weather/Disaster Alerts — feed of active alerts with severity badges

   (watch/warning/critical), timestamp, and description

9. Voice Assistant — full-screen mic interface with animated waveform,

   live transcript area, AI text response below

10. Incident history — list of the user's past reports with status badges

    (submitted/in review/resolved)

11. Settings — language switcher, emergency contacts list, notification

    toggles, text size control

Use realistic placeholder/mock data for hospitals, AQI values, and

weather alerts. Make the SOS button persistent/accessible from every

screen. Support dark mode. Ensure the language switcher instantly

re-flows layout to RTL for Urdu and Sindhi.

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://aman-aid-connect.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/4ba6dc82-946c-4353-885a-f846daeb223a).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
