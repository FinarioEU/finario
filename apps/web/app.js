// === API-Basis-URL (deine Render-API) ===
const API_BASE = "https://finario-api.onrender.com";

// UI-Elemente
const elStatusBox   = document.getElementById("api-status");
const elVersionBox  = document.getElementById("api-version");
const elHealthJson  = document.getElementById("health-json");
const elVersionJson = document.getElementById("version-json");
const btn           = document.getElementById("btn-refresh");

// kleine Helpers
const setLoading = (el) => el && (el.textContent = "Lade …");
const setOK      = (el, t) => el && (el.textContent = t);
const setERR     = (el, m) => el && (el.textContent = Fehler: ${m});

async function fetchJson(path) {
  const url = ${API_BASE}${path};
  try {
    const res = await fetch(url, { headers: { Accept: "application/json" }, mode: "cors" });
    const ct  = res.headers.get("content-type") || "";
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(HTTP ${res.status} – ${text.slice(0,200)});
    }
    if (!ct.includes("application/json")) {
      const text = await res.text();
      try { return { ok: true, data: JSON.parse(text) }; }
      catch { throw new Error(Unerwarteter Inhaltstyp: ${ct}); }
    }
    return { ok: true, data: await res.json() };
  } catch (e) {
    return { ok: false, error: e.message || String(e) };
  }
}

async function refresh() {
  setLoading(elStatusBox);
  setLoading(elVersionBox);
  if (elHealthJson)  elHealthJson.textContent  = "";
  if (elVersionJson) elVersionJson.textContent = "";

  // 1) /health
  const health = await fetchJson("/health");
  if (!health.ok) setERR(elStatusBox, health.error);
  else {
    setOK(elStatusBox, health.data?.message ?? "OK");
    if (elHealthJson) elHealthJson.textContent = JSON.stringify(health.data, null, 2);
  }

  // 2) /api/version (NICHT /api)
  const ver = await fetchJson("/api/version");
  if (!ver.ok) setERR(elVersionBox, ver.error);
  else {
    setOK(elVersionBox, ${ver.data?.name ?? "Finario API"} v${ver.data?.version ?? "?"});
    if (elVersionJson) elVersionJson.textContent = JSON.stringify(ver.data, null, 2);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  btn && btn.addEventListener("click", refresh);
  refresh(); // auto
});
