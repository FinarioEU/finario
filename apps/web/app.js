// apps/web/app.js

// === API-Basis-URL (deine Render-API) ===
const API_BASE = 'https://finario-api.onrender.com';

// ---- DOM-Elemente ----
const elStatusBox   = document.getElementById('api-status');
const elHealthJson  = document.getElementById('health-json');
const elVersionBox  = document.getElementById('api-version');
const elVersionJson = document.getElementById('version-json');
const btn           = document.getElementById('btn-refresh');

// ---- Kleine Helpers ----
const setLoading = (el) => { if (el) el.textContent = 'lade…'; };
const setOK      = (el, t) => { if (el) el.textContent = t;   };
const setERR     = (el, t) => { if (el) el.textContent = Fehler: ${t}; };

// Alle JS-Fehler deutlich im Status zeigen (falls was schiefgeht)
window.addEventListener('error', (e) => {
  setERR(elStatusBox, e?.error?.message || e.message || 'Unbekannter JS-Fehler');
});

// ---- Netz-Helper: JSON (oder Text) holen, nie Exceptions nach außen werfen ----
async function fetchJson(path) {
  const url = ${API_BASE}${path};
  try {
    const res = await fetch(url, { mode: 'cors' }); // keine Sonder-Header -> kein Preflight
    const ct  = res.headers.get('content-type') || '';
    const data = ct.includes('application/json') ? await res.json() : await res.text();

    if (!res.ok) {
      const msg = typeof data === 'string' ? data : JSON.stringify(data);
      return { ok: false, error: msg };
    }
    return { ok: true, data };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

// ---- Hauptlogik ----
async function refresh() {
  setLoading(elStatusBox);
  setLoading(elVersionBox);
  if (elHealthJson)  elHealthJson.textContent  = '…';
  if (elVersionJson) elVersionJson.textContent = '…';

  // (1) /health
  const health = await fetchJson('/health');
  if (health.ok) {
    setOK(elStatusBox, 'OK');
    if (elHealthJson) elHealthJson.textContent = JSON.stringify(health.data, null, 2);
  } else {
    setERR(elStatusBox, health.error);
    if (elHealthJson) elHealthJson.textContent = JSON.stringify({ error: health.error }, null, 2);
  }

  // (2) /api/version
  const ver = await fetchJson('/api/version');
  if (ver.ok) {
    setOK(elVersionBox, ${ver.data?.name ?? 'finario-api'} v${ver.data?.version ?? '?'});
    if (elVersionJson) elVersionJson.textContent = JSON.stringify(ver.data, null, 2);
  } else {
    setERR(elVersionBox, ver.error);
    if (elVersionJson) elVersionJson.textContent = JSON.stringify({ error: ver.error }, null, 2);
  }
}

// Auto-Start + Button
document.addEventListener('DOMContentLoaded', () => {
  refresh();
  btn?.addEventListener('click', refresh);
});
