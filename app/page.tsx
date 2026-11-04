'use client';

import { useState } from 'react';
import { Send, Bot, User, Sparkles, Activity } from 'lucide-react';

export default function Home() {
  const [messages, setMessages] = useState<Array<{ role: string; content: string }>>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await response.json();
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: data.reply || 'Respon diproses oleh EcoPulse AI Node.' },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Terjadi kesalahan koneksi ke server.' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen text-slate-100 flex flex-col items-center justify-center p-4 overflow-hidden bg-slate-950">
      {/* Visual Background Lab 3D / Hologram Grid */}
      <div 
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.15) 0%, transparent 60%),
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '100% 100%, 40px 40px, 40px 40px'
        }}
      />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Header Container */}
      <div className="relative z-10 text-center max-w-3xl mb-6 mt-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-emerald-500/40 bg-emerald-950/80 text-emerald-400 text-xs font-semibold tracking-wider uppercase mb-3 shadow-[0_0_20px_rgba(16,185,129,0.3)] backdrop-blur-md">
          <Sparkles className="w-3.5 h-3.5 animate-pulse text-emerald-400" /> Meta Muse AI Telemetry Track
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 via-teal-200 to-indigo-300 drop-shadow-[0_0_30px_rgba(16,185,129,0.5)]">
          ECOPULSE AI
        </h1>
        <p className="text-xs md:text-sm font-semibold tracking-widest text-emerald-400 mt-1 uppercase drop-shadow">
          Luxury & Classic Automotive Sustainability Intelligence
        </p>
        <p className="text-slate-300 text-xs md:text-sm mt-2 max-w-xl mx-auto leading-relaxed drop-shadow">
          Platform AI generasi terbaru yang menjembatani restorasi kendaraan mewah dengan analisis telemetri siklus karbon dan efisiensi daya masa depan.
        </p>
      </div>

      {/* Main Chat Box Container */}
      <div className="relative z-10 w-full max-w-3xl bg-slate-900/90 backdrop-blur-xl border border-emerald-500/40 rounded-2xl shadow-[0_0_60px_rgba(16,185,129,0.15)] overflow-hidden flex flex-col h-[500px]">
        {/* Status Bar Top */}
        <div className="px-6 py-3 border-b border-slate-800/90 bg-slate-950/80 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="font-mono text-emerald-400 font-semibold">SYSTEM ONLINE</span>
          </div>
          <div className="flex items-center gap-1.5 font-mono text-[11px] text-slate-300">
            <Activity className="w-3.5 h-3.5 text-emerald-400" /> Meta Muse API Connected
          </div>
        </div>

        {/* Chat Messages Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-slate-800">
          {messages.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-slate-400 text-center space-y-3">
              <Bot className="w-12 h-12 text-emerald-400/60 animate-bounce" />
              <p className="text-sm">Ketikkan spesifikasi kendaraan atau pertanyaan telemetri emisi karbon untuk memulai.</p>
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-3 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role !== 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                    <Bot className="w-4 h-4 text-emerald-400" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                    msg.role === 'user'
                      ? 'bg-emerald-600 text-white rounded-tr-none shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                      : 'bg-slate-800/95 border border-slate-700/80 text-slate-100 rounded-tl-none'
                  }`}
                >
                  <p className="text-[10px] font-bold tracking-wider uppercase mb-1 opacity-70">
                    {msg.role === 'user' ? 'DEVELOPER' : 'ECOPULSE MUSE AI'}
                  </p>
                  {msg.content}
                </div>
                {msg.role === 'user' && (
                  <div className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center shrink-0">
                    <User className="w-4 h-4 text-slate-300" />
                  </div>
                )}
              </div>
            ))
          )}
          {loading && (
            <div className="flex gap-3 justify-start">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-emerald-400 animate-spin" />
              </div>
              <div className="bg-slate-800/95 border border-slate-700/80 text-slate-300 text-xs rounded-2xl rounded-tl-none px-4 py-3 flex items-center gap-2">
                <span>EcoPulse Muse AI sedang menganalisis telemetri emisi...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Form Bar */}
        <form onSubmit={sendMessage} className="p-4 border-t border-slate-800/90 bg-slate-950/80 flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Masukkan spesifikasi mesin otomotif atau permintaan kalkulasi emisi..."
            className="flex-1 bg-slate-950/90 border border-slate-800 rounded-xl px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/60 transition"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-800 text-white px-5 py-3 rounded-xl font-medium text-sm transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] flex items-center gap-2 shrink-0"
          >
            <Send className="w-4 h-4" />
            <span className="hidden sm:inline">SEND</span>
          </button>
        </form>
      </div>
    </main>
  );
}