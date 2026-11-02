import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const userMessage = body.message;

    if (!userMessage) {
      return NextResponse.json({ error: 'Message payload is required.' }, { status: 400 });
    }

    const apiKey = process.env.KUNCI_API_META_AI;
    if (!apiKey) {
      return NextResponse.json({ error: 'API Key Configuration Missing.' }, { status: 500 });
    }

    // Connect directly to the official Meta Model API responses gateway (/v1/responses)
    const aiResponse = await fetch('https://api.meta.ai/v1/responses', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'Accept': 'text/event-stream'
      },
      body: JSON.stringify({
        model: 'muse-wonder-1.0',
        input: [
          { role: 'user', content: [{ type: 'text', text: userMessage }] }
        ],
        stream: false, 
        temperature: 1,
        max_output_tokens: 32000,
        top_p: 1,
        reasoning: {
          effort: 'medium'
        }
      }),
    });

    if (!aiResponse.ok) {
      const errorData = await aiResponse.json().catch(() => ({}));
      return NextResponse.json({ 
        error: errorData.error?.message || `Meta AI gateway returned status ${aiResponse.status}` 
      }, { status: aiResponse.status });
    }

    const data = await aiResponse.json();

    // Extract the generated text response safely from the official Meta API response payload structure
    const aiReply = data.output?.choices?.[0]?.message?.content?.[0]?.text || data.reply || 'No response generated.';
    return NextResponse.json({ reply: aiReply });

  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
