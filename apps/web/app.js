/* ===== API-Basis-URL anpassen, falls nötig ===== */
const API_BASE = "https://finario-api.onrender.com"; 

/* ===== UI-Elemente ===== */
const elStatusBox   = document.getElementById("api-status");
const elHealthJson  = document.getElementById("health-json");
const elVersionBox  = document.getElementById("api-version");
const elVersionJson = document.getElementById("version-json");
const btn           = document.getElementById("btn-refresh");

/* ===== Kleine Helpers ===== */
function setLoading(el)  { if (el) el.textContent = "lade..."; }
function setOK(el, t)    { if (el) el.textContent = t; }
function setERR(el, e)   { if (el) el.textContent = "Fehler: " + e; }

/* ===== Netz-Helper: JSON (oder Text) holen, nie Exceptions nach außen werfen ===== */
async function fetchJson(path) {
  const url = API_BASE + path;
  try {
    const res = await fetch(url, {
      headers: { Accept: "application/json" },
      mode: "cors"
    });

    const ctype = res.headers.get("content-type") || "";
    let data;
    if (ctype.indexOf("application/json") !== -1) {
      data = await res.json();
    } else {
      data = await res.text();
      // kleine Vorschau kürzen, wenn kein JSON
      if (typeof data === "string" && data.length > 280) {
        data = data.slice(0, 280) + "…";
      }
    }

    return { ok: res.ok, data: data };
  } catch (e) {
    return { ok: false, error: String(e) };
  }
}

/* ===== Haupt-Logik ===== */
async function refresh() {
  setLoading(elStatusBox);
  setLoading(elVersionBox);

  // (1) /health
  const health = await fetchJson("/health");
  if (health.ok) {
    setOK(elStatusBox, "OK");
    if (elHealthJson) {
      try { elHealthJson.textContent = JSON.stringify(health.data, null, 2); }
      catch (_e) { elHealthJson.textContent = String(health.data); }
    }
  } else {
    setERR(elStatusBox, health.error || "Unbekannter Fehler");
    if (elHealthJson) elHealthJson.textContent = JSON.stringify({ error: health.error }, null, 2);
  }

  // (2) /api/version
  const ver = await fetchJson("/api/version");
  if (ver.ok) {
    var name = (ver.data && ver.data.name) ? ver.data.name : "finario-api";
    var version = (ver.data && ver.data.version) ? ver.data.version : "?";
    setOK(elVersionBox, name + " v" + version);
    if (elVersionJson) {
      try { elVersionJson.textContent = JSON.stringify(ver.data, null, 2); }
      catch (_e) { elVersionJson.textContent = String(ver.data); }
    }
  } else {
    setERR(elVersionBox, ver.error || "Unbekannter Fehler");
    if (elVersionJson) elVersionJson.textContent = JSON.stringify({ error: ver.error }, null, 2);
  }
}

/* ===== Auto-Start + Button ===== */
document.addEventListener("DOMContentLoaded", function () {
  if (btn) btn.addEventListener("click", refresh);
  refresh();
});
