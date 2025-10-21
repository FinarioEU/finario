// === API-Basis-URL anpassen, falls nötig ===
const API_BASE = "https://finario-api.onrender.com"; // deine Render-API

const elStatus = document.getElementById("api-status");
const elHealth = document.getElementById("health-json");
const elVersion = document.getElementById("api-version");
const elVersionJson = document.getElementById("version-json");
const btn = document.getElementById("btn-refresh");

async function fetchJson(path) {
  const url = ${API_BASE}${path};
  const res = await fetch(url, { headers: { "Accept": "application/json" } });
  const data = await res.json().catch(() => ({}));
  return { ok: res.ok, status: res.status, data };
}

async function refresh() {
  // /health
  try {
    const { ok, status, data } = await fetchJson("/health");
    elStatus.textContent = ok ? OK (${status}) : Fehler (${status});
    elStatus.className = pill ${ok ? "ok" : "bad"};
    elHealth.textContent = JSON.stringify(data, null, 2);
  } catch (e) {
    elStatus.textContent = "Fehler";
    elStatus.className = "pill bad";
    elHealth.textContent = String(e);
  }

  // /api/version
  try {
    const { ok, status, data } = await fetchJson("/api/version");
    elVersion.textContent = ok ? ${data?.name ?? "API"} v${data?.version ?? "?"} : Fehler (${status});
    elVersion.className = pill ${ok ? "ok" : "bad"};
    elVersionJson.textContent = JSON.stringify(data, null, 2);
  } catch (e) {
    elVersion.textContent = "Fehler";
    elVersion.className = "pill bad";
    elVersionJson.textContent = String(e);
  }
}

btn.addEventListener("click", refresh);
document.getElementById("year").textContent = new Date().getFullYear();
refresh();
