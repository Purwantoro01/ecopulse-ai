
'use client';

import React, { useState, FormEvent } from 'react';

interface Message {
  role: 'user' | 'ai';
  text: string;
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = async (e: FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input;
    setInput('');
    setError(null);
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });

      if (!response.ok) throw new Error('Network response was not ok');
      const data = await response.json();
      if (data.error) throw new Error(data.error);

      setMessages((prev) => [...prev, { role: 'ai', text: data.reply }]);
    } catch (err: any) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-950 text-white p-4 flex flex-col items-center justify-between font-sans">
      
      {/* HEADER: Gabungan Eco (Emerald) + Pulse (Neon Red) + Luxury Car */}
      <header className="w-full max-w-2xl py-6 text-center border-b border-emerald-900/30 flex flex-col items-center gap-3">
        
        {/* Ikon Logo SVG Hybrid: Mobil Sport Mewah + Daun Energi Ramah Lingkungan */}
        <div className="w-24 h-24 bg-gradient-to-br from-slate-900 via-emerald-950/30 to-red-950/30 rounded-2xl flex flex-col items-center justify-center border border-emerald-500/20 shadow-xl shadow-emerald-500/5">
          <svg className="w-14 h-14 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://w3.org">
            {/* Jalur Kerangka Mobil Mewah */}
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" stroke="currentColor" d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 001 13v3c0 .6.4 1 1 1h2m10 0a3 3 0 11-6 0m6 0a3 3 0 116 0M4 17a3 3 0 116 0m-6 0h6m10 0h2" />
            {/* Jalur Aksen Detak Energi Hijau (Eco Leaf Pulse) */}
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" stroke="#10b981" d="M12 14l2-2h-3l2-2" />
          </svg>
        </div>
        
        {/* Judul Gabungan Sempurna */}
        <h1 className="text-3xl font-black tracking-widest uppercase">
          <span className="text-emerald-400">Eco</span>
          <span className="text-red-500">Pulse</span> 
          <span className="text-slate-200"> AI</span>
        </h1>
        
        <p className="text-xs font-bold tracking-widest text-emerald-500 uppercase">Luxury & Classic Automotive Sustainability Intelligence</p>
        
        {/* Deskripsi Global Sesuai Konsep Baru Anda */}
        <p className="text-sm text-slate-400 max-w-md mt-1">
          Next-generation Meta Muse AI platform bridging premium vehicle restoration with future eco-efficiency metrics and carbon lifecycle analytics.
        </p>
      </header>

      {/* CHAT DISPLAY */}
      <section className="flex-1 w-full max-w-2xl my-4 bg-slate-900/80 border border-slate-800/80 rounded-2xl p-4 overflow-y-auto flex flex-col gap-3 min-h-[400px] max-h-[550px] shadow-2xl">
        {messages.length === 0 && (
          <div className="text-center my-auto flex flex-col items-center gap-2">
            <p className="text-slate-500 text-sm">System Ready. Ask Meta Muse AI about vehicle carbon audits, eco-restoration tech, or future energy conversions.</p>
          </div>
        )}
        {messages.map((msg, index) => (
          <div key={index} className={`p-3 rounded-xl max-w-[85%] shadow-md ${msg.role === 'user' ? 'bg-gradient-to-r from-emerald-600 to-emerald-700 text-white self-end rounded-tr-none' : 'bg-slate-800 text-slate-100 self-start rounded-tl-none border border-slate-700/50'}`}>
            <span className="block text-[10px] font-bold tracking-widest uppercase mb-1 text-emerald-300">{msg.role === 'user' ? 'Developer' : 'EcoPulse Muse AI'}</span>
            <p className="text-sm leading-relaxed">{msg.text}</p>
          </div>
        ))}
        {loading && <p className="text-emerald-400 animate-pulse text-xs tracking-wider font-semibold">ECOPULSE AI IS ANALYZING AUTOMOTIVE ENERGY INDEX...</p>}
        {error && <p className="text-red-400 text-sm bg-red-950/40 p-3 rounded-lg border border-red-500/50">System Error: {error}</p>}
      </section>

      {/* INPUT FORM */}
      <form onSubmit={sendMessage} className="w-full max-w-2xl flex gap-2 border-t border-slate-800/60 pt-4">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Enter luxury vehicle spec or eco-efficiency calculation request..." className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-emerald-500 text-white placeholder-slate-600 transition-colors" disabled={loading} />
        <button type="submit" className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-slate-950 font-extrabold px-8 py-3 rounded-xl text-sm transition-all shadow-md shadow-emerald-500/10 uppercase tracking-wider disabled:opacity-50" disabled={loading}>Send</button>
      </form>
    </main>
  );
}
