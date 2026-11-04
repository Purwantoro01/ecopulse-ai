
'use client';

import { useState } from 'react';

interface Message {
  sender: 'DEVELOPER' | 'ECOPULSE MUSE AI';
  text: string;
}

export default function Home() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput('');
    setLoading(true);

    setMessages((prev) => [
      ...prev,
      { sender: 'DEVELOPER', text: userMessage },
    ]);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userMessage }),
      });

      const data = await res.json();

      if (res.ok && data.reply) {
        setMessages((prev) => [
          ...prev,
          { sender: 'ECOPULSE MUSE AI', text: data.reply },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            sender: 'ECOPULSE MUSE AI',
            text: data.error || 'Gagal mengambil respon dari AI.',
          },
        ]);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'ECOPULSE MUSE AI',
          text: 'Terjadi kesalahan koneksi ke server.',
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#050B14] text-white flex flex-col items-center justify-between p-6">
      <div className="text-center my-6 space-y-2">
        <h1 className="text-4xl font-extrabold tracking-wider text-emerald-400">
          ECO<span className="text-rose-500">PULSE</span> AI
        </h1>
        <p className="text-xs font-mono text-emerald-300 tracking-widest uppercase">
          LUXURY & CLASSIC AUTOMOTIVE SUSTAINABILITY INTELLIGENCE
        </p>
        <p className="text-xs text-slate-400 max-w-xl mx-auto mt-2">
          Next-generation Meta Muse AI platform bridging premium vehicle restoration with future eco-efficiency metrics and carbon lifecycle analytics.
        </p>
      </div>

      <div className="w-full max-w-3xl flex-1 flex flex-col bg-[#0A121E] rounded-xl border border-slate-800/80 p-4 shadow-2xl overflow-hidden min-h-[500px]">
        <div className="flex-1 overflow-y-auto space-y-4 p-4">
          {messages.length === 0 && (
            <div className="text-center text-slate-500 my-auto pt-24 text-sm font-mono">
              System Ready. Ask Meta Muse AI about vehicle carbon audits, eco-restoration tech, or future energy conversions.
            </div>
          )}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`p-3.5 rounded-lg max-w-[85%] text-sm ${
                msg.sender === 'DEVELOPER'
                  ? 'ml-auto bg-emerald-600/90 text-white font-medium'
                  : 'mr-auto bg-[#0E1A2B] text-slate-200 border border-slate-700/60'
              }`}
            >
              <div className="text-[10px] font-bold tracking-wider mb-1 opacity-70 uppercase">
                {msg.sender}
              </div>
              <div className="whitespace-pre-wrap leading-relaxed">{msg.text}</div>
            </div>
          ))}
          {loading && (
            <div className="mr-auto bg-[#0E1A2B] p-3.5 rounded-lg text-emerald-400 text-xs font-mono animate-pulse border border-emerald-900/40">
              [Node Server AI EcoPulse] Menganalisis data via Meta Hub...
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-3 border-t border-slate-800">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            placeholder="Enter luxury vehicle spec or eco-efficiency calculation request..."
            className="flex-1 px-4 py-3 bg-[#050A10] border border-slate-800 rounded-lg text-sm text-slate-100 placeholder-slate-600 focus:outline-none focus:border-emerald-500 transition"
            disabled={loading}
          />
          <button
            onClick={handleSendMessage}
            disabled={loading}
            className="px-6 py-3 bg-emerald-500 hover:bg-emerald-400 font-bold rounded-lg transition text-slate-950 text-xs tracking-widest uppercase disabled:opacity-50"
          >
            SEND
          </button>
        </div>
      </div>
    </main>
  );
}