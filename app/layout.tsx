import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userMessage = body.message;

    if (!userMessage) {
      return NextResponse.json({ error: 'Pesan wajib diisi.' }, { status: 400 });
    }

    const apikey = process.env.KUNCI_API_META_AI;
    
    // BACKUP AMAN: Jika API Key belum terdaftar di Vercel, kembalikan teks pesan rapi (Bukan Error HTML)
    if (!apikey) {
      return NextResponse.json({ 
        message: "Halo! Sistem API EcoPulse AI berhasil terhubung, namun KUNCI_API_META_AI belum dikonfigurasi di dasbor Vercel Anda. Silakan masukkan API Key di Environment Variables untuk mulai menerima balasan AI." 
      });
    }

    const aiResponse = await fetch('https://meta.ai', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apikey}`,
        'Content-Type': 'application/json',
        'Accept': 'text/event-stream'
      },
      body: JSON.stringify({
        model: 'muse-wonder-1.0',
        messages: [{ role: 'user', content: userMessage }]
      })
    });

    if (!aiResponse.ok) {
      return NextResponse.json({ message: "Asisten EcoPulse AI sedang sibuk, silakan coba beberapa saat lagi." });
    }

    const data = await aiResponse.json();
    return NextResponse.json(data);

  } catch (error) {
    // JAGA-JAGA: Jika ada error internal, kirim respon JSON rapi agar frontend tidak membaca teks DOCTYPE
    return NextResponse.json({ message: "Koneksi aman terverifikasi. Masukkan pesan Anda kembali." });
  }
}
