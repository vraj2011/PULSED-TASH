# 🌌 PULSED TASH

A minimal, real-time dashboard that pulls NASA's Astronomy Picture of the Day alongside live Near-Earth Asteroid tracking data.

Built as part of the [Hack Club PULSED](https://pulsed.hackclub.com) challenge.

## What it does

- **Astronomy Picture of the Day**: Daily space photos, high-res deep sky captures, and video/YouTube embeds with official NASA descriptions.
- **Live Asteroid Tracker**: Connects to NASA's Near-Earth Object (NEO) feed to track space rocks passing Earth today.
- **Animated Pulse Divider**: Custom SVG heartbeat pulse syncing the live data vitals.

## Stack

- **Frontend**: Vanilla HTML5, CSS3, JavaScript (ES6+)
- **Build Tool**: Vite
- **APIs**: NASA APOD API + NASA NEO Feed API

## Running Locally

1. Clone the repository:
   ```bash
   git clone https://github.com/vraj2011/PULSED-TASH.git
   cd PULSED-TASH
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   VITE_NASA_API_KEY=your_key_here
   ```
   > Get a free API key at [api.nasa.gov](https://api.nasa.gov).

4. Start the dev server:
   ```bash
   npm run dev
   ```

---

Made by [vraj](https://github.com/vraj2011) ✌️
