'use client';

import React, { useState } from 'react';

export default function HomePage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      // Menggunakan relative path yang aman untuk struktur Next.js App Router
      const response = await fetch('./api/meta-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply || data.content || JSON.stringify(data) }]);
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', content: `Server Response Error: ${data.error || 'Failed to fetch AI data.'}` }]);
      }
    } catch (error) {
      setMessages((prev) => [...prev, { role: 'assistant', content: 'Gateway Error: Connection refused by internal endpoint.' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-900 text-slate-100 min-h-screen font-sans">
      {/* NAVIGATION BAR */}
      <nav className="border-slate-800 bg-slate-950/80 border-b backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center font-bold text-slate-950 text-xl shadow-lg shadow-emerald-500/20">
            E
          </div>
          <span className="text-xl font-bold tracking-wider text-emerald-400">EcoPulse AI</span>
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-medium text-slate-400">
          <a href="#dashboard" className="hover:text-emerald-400 transition">Satellite Monitor</a>
          <a href="#ai-assistant" className="hover:text-emerald-400 transition">AI Assistant</a>
        </div>
        <button className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 px-4 py-2 rounded-lg text-sm font-semibold shadow-md shadow-emerald-500/10 transition">
          Secure Connection
        </button>
      </nav>

      {/* HERO SECTION */}
      <header className="max-w-7xl mx-auto px-6 pt-16 pb-8 text-center">
        <span className="text-xs font-bold uppercase tracking-widest bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full border border-emerald-500/20">
          Global Developer Hackathon Project
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-6 max-w-4xl mx-auto leading-tight">
          Transforming Satellite Data & AI Analysis into <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">Real Action</span> for Global Environmental Rescue
        </h1>
      </header>

      {/* MONITORING DASHBOARD */}
      <main id="dashboard" className="max-w-7xl mx-auto px-6 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800 shadow-xl">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Active Wildfire Risks</span>
            <h3 className="text-2xl font-bold tracking-tight text-red-400 mt-2">Critical Alert</h3>
            <p className="text-xs text-slate-400 mt-2">Satellite anomaly detected. Atmospheric density index rising.</p>
          </div>

          <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800 shadow-xl">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">AI Predictive Canopy Loss</span>
            <h3 className="text-2xl font-bold tracking-tight text-amber-400 mt-2">-1,240 Ha</h3>
            <p className="text-xs text-slate-400 mt-2">Projected seasonal biomass risk zones.</p>
          </div>

          <div className="bg-slate-950/50 p-6 rounded-2xl border border-slate-800 shadow-xl">
            <span className="text-slate-400 text-xs font-semibold uppercase tracking-wider">Atmospheric PM2.5 Index</span>
            <h3 className="text-2xl font-bold tracking-tight text-emerald-400 mt-2">45 AQI <span className="text-sm font-normal text-slate-400">(Good)</span></h3>
            <p className="text-xs text-slate-400 mt-2">Carbon capture offset levels currently balanced.</p>
          </div>
        </div>

        {/* INTEGRATED CHAT INTERACTION */}
        <section id="ai-assistant" className="bg-slate-950 border border-slate-800 rounded-2xl p-6 shadow-2xl">
          <div className="text-center mb-6">
            <h2 className="text-xl font-bold text-emerald-400">EcoPulse AI Chat Console</h2>
            <p className="text-xs text-slate-400 mt-1">Smart Environmental Assistant (Secure Server Connection)</p>
          </div>

          {/* Chat Box Container */}
          <div className="border border-slate-800 bg-slate-900/50 rounded-xl p-4 min-h-[350px] flex flex-col justify-between">
            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
              {messages.length === 0 && (
                <p className="text-slate-500 text-sm text-center pt-20">No conversation yet. Ask anything about the environment!</p>
              )}
              
              {messages.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`rounded-xl px-4 py-2 max-w-[80%] text-sm ${msg.role === 'user' ? 'bg-emerald-500 text-slate-950 font-medium' : 'bg-slate-800 text-slate-100 border border-slate-700'}`}>
                    <strong>{msg.role === 'user' ? 'You: ' : 'EcoPulse AI: '}</strong>
                    <span className="whitespace-pre-wrap">{msg.content}</span>
                  </div>
                </div>
              ))}

              {loading && (
                <p className="text-emerald-400 text-xs italic animate-pulse">EcoPulse AI is formulating a response...</p>
              )}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="mt-4 border-t border-slate-800 pt-4 flex gap-2">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message here..." 
                className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm flex-1 outline-none focus:border-emerald-500 text-slate-100"
                disabled={loading}
              />
              <button 
                type="submit"
                disabled={loading}
                className="bg-emerald-500 hover:bg-emerald-600 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 px-4 py-2 rounded-lg text-sm font-semibold transition"
              >
                {loading ? '...' : 'Send'}
              </button>
            </form>
          </div>
        </section>
      </main>
    </div>
  );
}
