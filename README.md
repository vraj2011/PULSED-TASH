# 🌌 PULSED TASH

a custom new tab page that pulls today's astronomy picture from NASA and puts it right in your face every time you open a tab. no fluff, no dashboard widgets, just space.

## what even is this

so i was going through the [hack club PULSED guide](https://pulsed.hackclub.com) and thought — why not actually build this thing properly instead of just following along like a robot? the idea is simple: NASA has this API called **APOD** (Astronomy Picture of the Day) that serves a new space photo every single day with a title and explanation. i fetch that and display it.

that's it. that's the whole app.

but i spent way more time on the styling than i'd like to admit. the zigzag strips on the sides? those are pure CSS `clip-path: polygon()` with like 40+ coordinate points each. no library, no SVG, just math and pain.

## what i actually learned

honestly before this project i didn't really understand how `fetch` works. i knew the word "API" but couldn't explain it to save my life. here's what clicked for me:

- **template literals** — the difference between backticks and quotes isn't just vibes, `${}` only works inside backticks. i spent 10 minutes confused about this
- **`.then()` chaining** — fetch gives you a promise, not actual data. you have to unwrap it like a package. `response.json()` is opening the envelope, the next `.then()` is reading the letter
- **`innerHTML` replaces everything** — i almost made the mistake of setting innerHTML three separate times (title, image, explanation) and wondering why only the last one showed up. turns out each call wipes the previous content. you gotta build the whole string first, then set it once
- **env files are picky** — i named my file `nasa.env` and spent way too long wondering why my API key was `undefined`. vite only reads files named exactly `.env`. lesson learned the hard way
- **clip-path is wild** — `polygon()` lets you cut any element into any shape with x/y coordinate pairs. i used it to make zigzag strips on both sides of the page. nobody writes 40 points by hand though, [Clippy](https://bennettfeely.com/clippy/) is your best friend
- **pseudo-elements** — `::before` and `::after` create fake elements from pure CSS. no HTML needed. i used them for the side decorations

## the stack

nothing fancy:
- **HTML** — one `div`, one `script` tag, that's the whole page
- **CSS** — vanilla, hand-written, no frameworks. clip-path for the zigzag, google fonts for the typography
- **JavaScript** — vanilla fetch to NASA's APOD API, template literals for rendering
- **Vite** — just for the dev server and `.env` file loading. no react, no framework

## fonts used

- [Orbitron](https://fonts.google.com/specimen/Orbitron) — for the title, because it looks like something you'd see on a spaceship HUD
- [Black Ops One](https://fonts.google.com/specimen/Black+Ops+One) — for the body text, gives it a bold military-space vibe

## how to run this yourself

```bash
# clone it
git clone https://github.com/vraj2011/PULSED-TASH.git
cd PULSED-TASH

# install dependencies (just vite)
npm install

# create a .env file with your NASA API key
# get one free at https://api.nasa.gov
echo VITE_NASA_API_KEY=your_key_here > .env

# run it
npm run dev
```

then open `http://localhost:5173` and you should see today's space picture.

## the bugs i hit (and fixed)

1. **`undefined` API key** — named my env file `nasa.env` instead of `.env`. vite ignored it completely. renamed it and everything worked
2. **dangling `&date` in URL** — had `?api_key=${API_KEY}&date` with no value for date. removed the broken param
3. **duplicate `#app` divs** — had two `<div id="app">` in my HTML with a stray datepicker floating between them. `querySelector` grabbed the first one and the second was just... there. cleaned it up

## features

- 🔭 fetches NASA's Astronomy Picture of the Day in real time
- 🖼️ handles images, direct videos, AND youtube embeds (the bonus challenge from the guide)
- ⚡ loading state so the page isn't blank while the API responds
- 🚨 error handling — if the API is down or your key is wrong, you see a message instead of a white screen
- 🎨 custom zigzag clip-path side strips (pure CSS, no libraries)
- 📱 responsive — strips hide on mobile so they don't overlap your content

## what i'd add next

- a date picker so you can browse past APOD images (the datepicker was already in my HTML, just not wired up yet)
- save favorites to localStorage
- keyboard shortcuts to go forward/backward through dates

---

built by [vraj](https://github.com/vraj2011) while following the [PULSED guide](https://pulsed.hackclub.com) and actually trying every task before reading the solution ✌️
