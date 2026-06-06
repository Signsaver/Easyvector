export const maxDuration = 60;
export const runtime = 'nodejs';

export async function POST(request) {
  const apiId     = process.env.VECTORIZER_API_ID;
  const apiSecret = process.env.VECTORIZER_API_SECRET;
  if (!apiId || !apiSecret) {
    return Response.json({ error: 'API credentials not configured' }, { status: 500 });
  }
  try {
    const formData = await request.formData();
    const credentials = Buffer.from(`${apiId}:${apiSecret}`).toString('base64');
    const response = await fetch('https://vectorizer.ai/api/v1/vectorize', {
      method: 'POST',
      headers: { 'Authorization': `Basic ${credentials}` },
      body: formData,
    });
    if (!response.ok) {
      const errText = await response.text();
      console.error('Vectorizer.ai error:', errText);
      return Response.json({ error: errText }, { status: response.status });
    }
    const resultBuffer = await response.arrayBuffer();
    const contentType = response.headers.get('content-type') || 'image/svg+xml';
    const creditsCharged = response.headers.get('X-Credits-Charged') || '0';
    return new Response(resultBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'X-Credits-Charged': creditsCharged,
      },
    });
  } catch (err) {
    console.error('Vectorize error:', err);
    return Response.json({ error: err.message }, { status: 500 });
  }
}
