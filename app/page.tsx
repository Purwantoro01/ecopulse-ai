'use client';
import { useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async (e) => {
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
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-slate-900 text-white p-4 flex flex-col items-center justify-between">
      <header className="w-full max-w-2xl py-4 text-center border-b border-slate-700">
        <h1 className="text-2xl font-bold text-red-500">EcoPulse AI Console</h1>
        <p className="text-sm text-red-400">Smart Environmental Assistant (Connected Server)</p>
      </header>
      <section className="flex-1 w-full max-w-2xl my-4 bg-slate-800 rounded-lg p-4 overflow-y-auto flex flex-col gap-3 min-h-[400px] max-h-[600px]">
        {messages.length === 0 && (
          <p className="text-slate-500 text-center my-auto">Send a message to start the environmental analysis chat.</p>
        )}
        {messages.map((msg, index) => (
          <div key={index} className={`p-3 rounded-lg max-w-[80%] ${msg.role === 'user' ? 'bg-red-600 self-end' : 'bg-slate-700 self-start'}`}>
            <span className="block text-xs font-semibold mb-1 text-red-300">{msg.role === 'user' ? 'You' : 'EcoPulse AI'}</span>
            <p className="text-sm">{msg.text}</p>
          </div>
        ))}
        {loading && <p className="text-red-400 animate-pulse text-sm">EcoPulse AI is analyzing...</p>}
        {error && <p className="text-red-400 text-sm bg-red-900/30 p-2 rounded border border-red-500">Error: {error}</p>}
      </section>
      <form onSubmit={sendMessage} className="w-full max-w-2xl flex gap-2 border-t border-slate-700 pt-4">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="Type your message here..." className="flex-1 bg-slate-800 border border-slate-700 rounded px-4 py-2 text-sm focus:outline-none focus:border-red-500 text-white" disabled={loading} />
        <button type="submit" className="bg-red-500 hover:bg-red-600 text-slate-900 font-semibold px-6 py-2 rounded text-sm transition-colors disabled:opacity-50" disabled={loading}>Send</button>
      </form>
    </main>
  );
}
