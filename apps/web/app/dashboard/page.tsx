'use client';
import { useEffect, useState } from 'react';
export default function Dashboard(){
  const [data,setData] = useState<any>();
  useEffect(()=>{
    const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
    fetch(base+'/health').then(r=>r.json()).then(setData).catch(()=>setData({ok:false}));
  },[]);
  return <div>
    <h1>Dashboard</h1>
    <p>Status API: {data?.ok ? '✅ erreichbar' : '❌ keine Verbindung'}</p>
  </div>
}
