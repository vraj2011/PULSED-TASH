const API_KEY = import.meta.env.VITE_NASA_API_KEY;
const app = document.querySelector('#app');

function todayISO() {
  return new Date().toISOString().slice(0, 10);
}

function toEmbedURL(url) {
  const id = url.match(/(?:v=|youtu\.be\/)([^&?/]+)/)?.[1];
  return id ? `https://www.youtube.com/embed/${id}` : url;
}

function safeText(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

function formatDate(iso) {
  const d = new Date(`${iso}T12:00:00`);
  return d.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
  });
}

function buildMedia(data) {
  if (data.media_type === 'image')
    return `<img src="${data.url}" alt="${data.title.replace(/"/g, '&quot;')}">`;


  if (data.url.includes('youtube') || data.url.includes('youtu.be'))
    return `<iframe src="${toEmbedURL(data.url)}" frameborder="0" allowfullscreen></iframe>`;

  return `<video src="${data.url}" controls></video>`;
}

function buildNeoCard(count, failed) {
  if (failed) {
    return `
      <div class="neo-card neo-card--dead">
        <span class="neo-emoji">☄️</span>
        <div>
          <div class="neo-num">—</div>
          <div class="neo-label">asteroids today</div>
          <div class="neo-note">feed offline</div>
        </div>
      </div>`;
  }

  const hot = count > 10;
  return `
    <div class="neo-card${hot ? ' neo-card--hot' : ''}">
      <span class="neo-emoji">☄️</span>
      <div>
        <div class="neo-num">${count}</div>
        <div class="neo-label">asteroids passing Earth today</div>
        <div class="neo-note">status — <span class="neo-status">${hot ? 'heads up' : 'all clear'}</span></div>
      </div>
    </div>`;
}

function buildHeartbeat() {
  return `
    <div class="hb-wrap" aria-hidden="true">
      <svg class="hb-svg" viewBox="0 0 800 60" preserveAspectRatio="none">
        <polyline class="hb-line" points="
          0,30 60,30 90,30 100,30
          110,5 120,55 130,18 140,30
          160,30 240,30 260,30
          270,5 280,55 290,18 300,30
          380,30 440,30
          450,5 460,55 470,18 480,30
          580,30 640,30
          650,5 660,55 670,18 680,30
          740,30 800,30
        "/>
      </svg>
    </div>`;
}

async function boot() {
  app.innerHTML = `
    <div class="loading">
      <div class="loading-dot"></div>
      <p>pulling signal from orbit…</p>
    </div>`;

  const date = todayISO();

  const [apodRes, neoRes] = await Promise.allSettled([
    fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`)
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); }),
    fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${date}&end_date=${date}&api_key=${API_KEY}`)
      .then(r => { if (!r.ok) throw new Error(r.status); return r.json(); }),
  ]);

  if (apodRes.status === 'rejected') {
    app.innerHTML = `<p class="err">couldn't reach NASA — ${apodRes.reason.message}</p>`;
    return;
  }

  const apod      = apodRes.value;
  const neoFailed = neoRes.status === 'rejected';
  const neoCount  = neoFailed ? 0 : (neoRes.value.element_count ?? 0);

  app.innerHTML = `
    <header>
      <div class="logo">PULSED TASH</div>
      <p class="logo-sub">what NASA saw today</p>
    </header>

    <section class="apod">
      <p class="apod-date">${apod.date ? formatDate(apod.date) : date}</p>
      <h1>${safeText(apod.title)}</h1>
      <div class="apod-media">${buildMedia(apod)}</div>
      <p class="apod-text">${safeText(apod.explanation)}</p>
    </section>

    ${buildHeartbeat()}

    <section class="vitals">
      ${buildNeoCard(neoCount, neoFailed)}
    </section>

    <footer>
      <p>data from <a href="https://api.nasa.gov" target="_blank" rel="noopener">NASA Open APIs</a> · refreshes daily</p>
    </footer>`;
}

boot();