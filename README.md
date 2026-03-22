# Countdown App

Simple single-page React countdown for Monique og Pabbi.

## Target time

This app counts down to **23 April 2026 at 16:20** in the Central European time zone region.
Because 23 April 2026 falls during daylight saving time there, the exact UTC instant used is:

`2026-04-23T14:20:00Z`

## Run

Serve the folder with any static file server and open it in a browser.

Example:

```bash
cd countdown-app
python3 -m http.server 4173
```

Then open:

`http://localhost:4173`

## Notes

- React is loaded from `esm.sh`.
- The Ubuntu Mono font is loaded from Google Fonts.
- The fireworks clip is embedded from YouTube when the countdown reaches zero.
# countdown
