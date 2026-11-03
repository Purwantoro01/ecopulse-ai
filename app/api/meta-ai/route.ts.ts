import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userMessage = body.message;

    if (!userMessage) {
      return NextResponse.json({ error: 'Message payload is required.' }, { status: 400 });
    }

    const apikey = process.env.KUNCI_API_META_AI;
    if (!apikey) {
      return NextResponse.json({ error: 'API Key Configuration Missing.' }, { status: 500 });
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
      return NextResponse.json({ error: 'AI Provider Error' }, { status: aiResponse.status });
    }

    const data = await aiResponse.json();
    return NextResponse.json(data);

  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
