export const metadata = { title: 'Preise – Finario' };
function Card({title,price,features}:{title:string;price:string;features:string[]}){
  return (<div style={{border:'1px solid #ddd',borderRadius:12,padding:16}}>
    <div style={{fontWeight:700}}>{title}</div>
    <div style={{fontSize:26,fontWeight:800,marginTop:6}}>{price} <span style={{fontSize:12,fontWeight:400}}> / Monat (brutto)</span></div>
    <ul>{features.map((f,i)=>(<li key={i}>• {f}</li>))}</ul>
    <a href="/kontakt" style={{border:'1px solid #111',padding:'6px 10px',borderRadius:8,display:'inline-block',marginTop:8}}>Jetzt 28 Tage testen</a>
  </div>);
}
export default function Pricing(){
  return (<div>
    <div style={{padding:12,border:'1px solid #5cb85c',borderRadius:12, background:'#f6fff6'}}>🚀 28 Tage testen – <b>14 Tage kostenlos</b> + <b>14 Tage zum halben Preis (5,95 €)</b>. Danach Standardpreise.</div>
    <h1 style={{marginTop:18,fontSize:24,fontWeight:700}}>Preise</h1>
    <div style={{display:'grid',gap:12,gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',marginTop:12}}>
      <Card title="Start" price="11,90 €" features={['Rechnungen, Angebote, Gutschriften','OCR-Belegerkennung','DATEV-Export','bis 5 Mitarbeiter']} />
      <Card title="Business" price="29,90 €" features={['Alles aus Start','Lohnabrechnung','PSD2-Banking & Abgleich','API-Zugang','bis 50 Mitarbeiter']} />
      <Card title="Enterprise" price="99,00 €" features={['Alles aus Business','Multi‑Mandant & White‑Label','SSO/RBAC erweitert','SLA 99,9 %']} />
    </div>
  </div>);
}
