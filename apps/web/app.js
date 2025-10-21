// === API-Basis-URL (deine Render-API) ===
const API_BASE = "https://finario-api.onrender.com";

// UI-Elemente holen
const elStatusBox = document.getElementById("api-status");
const elVersionBox = document.getElementById("api-version");
const elHealthJson = document.getElementById("health-json");
const elVersionJson = document.getElementById("version-json");
const btn = document.getElementById("btn-refresh");

// Helper zum Schreiben
function setLoading(el) {
  if (el) el.textContent = "Lade …";
}
function setOK(el, text) {
  if (el) el.textContent = text;
}
function setERR(el, msg) {
  if (el) el.textContent = Fehler: ${msg};
}

// Generischer Fetch mit Fehlerbehandlung
async function fetchJson(path) {
  const url = ${API_BASE}${path};
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: { "Accept": "application/json" },
      mode: "cors",
    });
    const contentType = res.headers.get("content-type") || "";
    if (!res.ok) {
      const text = await res.text().catch(() => "");
      throw new Error(HTTP ${res.status} – ${text.slice(0, 200)});
    }
    if (!contentType.includes("application/json")) {
      const text = await res.text();
      // manche Proxies senden text/plain mit JSON – versuchen zu parsen
      try {
        return { ok: true, data: JSON.parse(text) };
      } catch {
        throw new Error(Unerwarteter Inhaltstyp: ${contentType});
      }
    }
    const data = await res.json();
    return { ok: true, data };
  } catch (e) {
    return { ok: false, error: e.message || String(e) };
  }
}

// Haupt-Refresh
async function refresh() {
  // UI auf “Lade …”
  setLoading(elStatusBox);
  setLoading(elVersionBox);
  if (elHealthJson) elHealthJson.textContent = "";
  if (elVersionJson) elVersionJson.textContent = "";

  // 1) /health
  const health = await fetchJson("/health");
  if (!health.ok) {
    setERR(elStatusBox, health.error);
  } else {
    const msg = typeof health.data?.message === "string"
      ? health.data.message
      : "OK";
    setOK(elStatusBox, msg);
    if (elHealthJson) elHealthJson.textContent = JSON.stringify(health.data, null, 2);
  }

  // 2) /api/version
  const ver = await fetchJson("/api/version");
  if (!ver.ok) {
    setERR(elVersionBox, ver.error);
  } else {
    const name = ver.data?.name ?? "Finario API";
    const version = ver.data?.version ?? "?";
    setOK(elVersionBox, ${name} v${version});
    if (elVersionJson) elVersionJson.textContent = JSON.stringify(ver.data, null, 2);
  }
}

// Event-Bindings
document.addEventListener("DOMContentLoaded", () => {
  if (btn) btn.addEventListener("click", refresh);
  // automatisch beim Laden abfragen
  refresh();
});
