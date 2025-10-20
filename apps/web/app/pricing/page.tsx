export const metadata = { title: 'Preise – Finario' };

function PriceCard({ name, price, badge, features, cta }:{ name:string; price:string; badge?:string; features:string[]; cta:string }){
  return (
    <div className="rounded-2xl border p-6 flex flex-col relative">
      {badge && <span className="absolute -top-3 right-3 text-xs bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 px-2 py-1 rounded-full">{badge}</span>}
      <div className="text-lg font-semibold">{name}</div>
      <div className="text-4xl font-bold mt-2">{price}<span className="text-base font-normal text-neutral-500"> / Monat (brutto)</span></div>
      <ul className="mt-4 space-y-2 text-sm">
        {features.map((f,i)=>(<li key={i} className="flex gap-2 items-start"><span>✔</span><span>{f}</span></li>))}
      </ul>
      <a href="/kontakt" className="mt-6 inline-block text-center rounded-xl border px-4 py-2 hover:bg-neutral-50"> {cta} </a>
    </div>
  );
}

function FAQ(){
  const items = [
    {q:'Wie funktioniert die 28‑Tage‑Testphase?', a:'Die ersten 14 Tage sind kostenlos (alle Funktionen). Danach folgen 14 Tage zum Einführungspreis – 50 % auf den Start‑Tarif (5,95 € brutto). Erst ab Tag 29 gilt der gewählte Standardtarif.'},
    {q:'Brauche ich eine Kreditkarte für die kostenlose Phase?', a:'Nein. Für die kostenlose 14‑Tage‑Phase reicht eine Registrierung. Für die Einführungspreis‑Phase hinterlegst du Zahlungsdaten, damit 5,95 € abgerechnet werden können.'},
    {q:'Kann ich jederzeit kündigen?', a:'Ja, monatlich kündbar. Du kannst auch während der Testzeit jederzeit beenden.'},
    {q:'Kann ich zwischen Paketen wechseln?', a:'Ja. Du kannst jederzeit von Start auf Business oder Enterprise upgraden (Differenz anteilig).'},
    {q:'Sind die Preise brutto?', a:'Ja, alle Preise sind inklusive MwSt.'},
  ];
  return (
    <div className="mt-10">
      <h2 className="text-xl font-semibold">Häufige Fragen</h2>
      <div className="mt-4 space-y-2">
        {items.map((it, i)=>(
          <details key={i} className="rounded-xl border p-4">
            <summary className="cursor-pointer font-medium">{it.q}</summary>
            <p className="mt-2 text-sm text-neutral-700 dark:text-neutral-300">{it.a}</p>
          </details>
        ))}
      </div>
    </div>
  );
}

export default function PricingPage(){
  return (
    <main className="max-w-6xl mx-auto p-6">
      <div className="rounded-2xl border p-4 bg-green-50 dark:bg-green-900/20">
        <div className="text-sm font-semibold">🚀 Jetzt launcht Finario:</div>
        <div className="text-sm">28 Tage testen – <b>14 Tage kostenlos</b> + <b>14 Tage zum halben Preis (5,95 €)</b>. Danach wählst du dein Paket.</div>
      </div>

      <h1 className="text-3xl font-bold mt-6">Preise</h1>
      <p className="text-neutral-600 mt-2">Bruttopreise inkl. MwSt. – fair, einfach, transparent.</p>

      {/* Pricing grid */}
      <div className="grid md:grid-cols-3 gap-6 mt-8">
        <PriceCard
          name="Start"
          price="11,90 €"
          cta="Jetzt 28 Tage testen"
          features={[
            'Rechnungen, Angebote, Gutschriften',
            'OCR-Belegerkennung & Upload',
            'DATEV-Export',
            'bis zu 5 Mitarbeiter',
            'E-Mail-Support (48h)'
          ]}
        />

        <PriceCard
          name="Business"
          price="29,90 €"
          badge="Beliebt"
          cta="Jetzt 28 Tage testen"
          features={[
            'Alles aus „Start“',
            'Lohnabrechnung',
            'PSD2-Banking & Zahlungsabgleich',
            'Mahnwesen & Automatisierungen',
            'API-Zugang',
            'bis zu 50 Mitarbeiter',
            'Support innerhalb 24h'
          ]}
        />

        <PriceCard
          name="Enterprise"
          price="99,00 €"
          cta="Jetzt 28 Tage testen"
          features={[
            'Alles aus „Business“',
            'Multi‑Mandanten & White‑Label',
            'Erweitertes RBAC & SSO',
            'SLA 99,9 %, Prioritäts‑Support',
            'Onboarding & Migration inklusive'
          ]}
        />
      </div>

      {/* Value explanation */}
      <section className="mt-12 p-6 rounded-2xl border bg-neutral-50 dark:bg-neutral-900">
        <h2 className="text-xl font-semibold">Warum dieser Preis – und warum er sich rechnet</h2>
        <p className="text-sm text-neutral-700 dark:text-neutral-300 mt-3">
          Finario ersetzt bis zu fünf Einzellösungen (Buchhaltung, Lohn, OCR, E‑Rechnung, Banking). Statt mehrere Abos zu zahlen und Daten doppelt zu pflegen,
          bekommst du alles in einem System – GoBD‑konform, DSGVO‑sicher und skalierbar. Die Zeitersparnis pro Monat übersteigt den Preis in der Regel deutlich.
        </p>
        <ul className="mt-4 grid md:grid-cols-3 gap-3 text-sm">
          <li className="rounded-xl border p-3">⏱ <b>Weniger Verwaltungsaufwand:</b> OCR & Auto‑Tagging sparen Stunden pro Woche.</li>
          <li className="rounded-xl border p-3">🧾 <b>Rechtssicherheit:</b> E‑Rechnung, GoBD‑Export, Audit‑Logs.</li>
          <li className="rounded-xl border p-3">📈 <b>Wachstumsfähig:</b> Multi‑User, API, Multi‑Mandant – bereit für dein Wachstum.</li>
        </ul>
      </section>

      {/* Competitor comparison */}
      <section className="mt-12">
        <h2 className="text-xl font-semibold">Preis‑/Leistungsvergleich</h2>
        <div className="overflow-auto mt-4">
          <table className="w-full text-sm border rounded-xl overflow-hidden">
            <thead className="bg-neutral-50 dark:bg-neutral-900">
              <tr>
                <th className="p-3 text-left">Feature</th>
                <th className="p-3 text-center">Finario</th>
                <th className="p-3 text-center">Lexoffice</th>
                <th className="p-3 text-center">sevDesk</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Rechnungen + Löhne + Banking + OCR', '✔️', '❌/Teilweise', '❌/Teilweise'],
                ['E‑Rechnung & DATEV‑Export', '✔️', '✔️/Add‑on', '✔️/Add‑on'],
                ['Mehrsprachig (DE/EN/RU)', '✔️', '❌', '❌'],
                ['Preis Einstieg (brutto)', '0 € → 5,95 € → 11,90 €', '≈ 19–22 €', '≈ 19–26 €'],
                ['Multi‑Mandant & API', '✔️', 'Teilweise', 'Teilweise']
              ].map((r, i)=>(
                <tr key={i} className="border-t">
                  <td className="p-3">{r[0]}</td>
                  <td className="p-3 text-center">{r[1]}</td>
                  <td className="p-3 text-center">{r[2]}</td>
                  <td className="p-3 text-center">{r[3]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="text-xs text-neutral-500 mt-2">
          *Vergleichswerte basieren auf öffentlichen Tarifangaben typischer Pakete (ohne Rabatte/Promos). Funktionsumfänge können je Anbieter variieren.
        </p>
      </section>

      <FAQ/>

      <section className="mt-12 text-center">
        <a href="/kontakt" className="inline-block rounded-xl border px-6 py-3">Kostenlos testen & Beratung anfordern</a>
      </section>
    </main>
  );
}
