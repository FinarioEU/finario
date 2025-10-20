'use client';
import { useEffect, useState } from 'react';

type TrialStatus = {
  tenantId?: string;
  dayOfTimeline: number; // 0..
  phase: 'free'|'intro'|'normal';
  daysLeftInPhase: number;
};

export default function Dashboard(){
  const [status, setStatus] = useState<TrialStatus|null>(null);
  const [error, setError] = useState<string|null>(null);

  useEffect(()=>{
    const api = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    const tenantId = 'demo'; // TODO: replace with real tenant from auth
    fetch(api + '/trial/status?tenantId=' + tenantId)
      .then(r=>r.json())
      .then((d)=> setStatus(d))
      .catch((e)=> setError(e?.message || 'Unbekannter Fehler'));
  },[]);

  function phaseLabel(p: TrialStatus['phase']){
    switch(p){
      case 'free': return 'Kostenlose Testphase';
      case 'intro': return 'Einführungspreis (50 %)';
      default: return 'Standardtarif aktiv';
    }
  }

  return (
    <main className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      {!status && !error && <div className="mt-4 text-sm">Lade Status…</div>}
      {error && <div className="mt-4 text-sm text-red-600">Fehler: {error}</div>}
      {status && (
        <div className="mt-6 grid gap-4">
          <div className="rounded-2xl border p-5">
            <div className="text-sm text-neutral-600">Aktuelle Phase</div>
            <div className="text-xl font-semibold">{phaseLabel(status.phase)}</div>
            {status.phase !== 'normal' ? (
              <div className="mt-2 text-sm">Verbleibende Tage in dieser Phase: <b>{status.daysLeftInPhase}</b></div>
            ) : (
              <div className="mt-2 text-sm">Dein Standardtarif ist aktiv. Vielen Dank!</div>
            )}
          </div>

          {status.phase === 'free' && (
            <div className="rounded-2xl border p-5 bg-neutral-50 dark:bg-neutral-900">
              <div className="font-medium">Sichere dir die Einführung: 14 Tage für 5,95 €</div>
              <p className="text-sm mt-1">Nach der kostenlosen Phase startet der Einführungspreis automatisch, wenn Zahlungsdaten hinterlegt sind.</p>
              <a href="/kontakt" className="inline-block mt-3 rounded-xl border px-4 py-2">Zahlungsdaten hinterlegen / Fragen klären</a>
            </div>
          )}

          {status.phase === 'intro' && (
            <div className="rounded-2xl border p-5 bg-neutral-50 dark:bg-neutral-900">
              <div className="font-medium">Noch {status.daysLeftInPhase} Tage zum halben Preis</div>
              <p className="text-sm mt-1">Wechsle jederzeit auf Business oder Enterprise – wir rechnen anteilig ab.</p>
              <a href="/pricing" className="inline-block mt-3 rounded-xl border px-4 py-2">Tarif wählen</a>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
