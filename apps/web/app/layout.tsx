export const metadata = { title: 'Finario', description: 'Smart Accounting for Europe' };
export default function RootLayout({ children }:{children:React.ReactNode}){
  return (
    <html lang="de"><body style={{fontFamily:'system-ui,Segoe UI,Roboto,Arial'}}>
      <header style={{display:'flex',gap:16,alignItems:'center',padding:'12px 20px',borderBottom:'1px solid #eee'}}>
        <b>Finario</b>
        <nav style={{display:'flex',gap:12}}>
          <a href="/">Start</a>
          <a href="/pricing">Preise</a>
          <a href="/dashboard">Dashboard</a>
          <a href="/kontakt">Kontakt</a>
        </nav>
      </header>
      <main style={{maxWidth:960,margin:'0 auto',padding:20}}>{children}</main>
      <footer style={{padding:20, borderTop:'1px solid #eee', marginTop:40}}>© {new Date().getFullYear()} Finario EU</footer>
    </body></html>
  );
}
