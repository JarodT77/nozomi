export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body || {};
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing fields' });
    }

    const payload = {
      service_id: process.env.EMAILJS_SERVICE_ID,
      template_id: process.env.EMAILJS_TEMPLATE_ID,
      user_id: process.env.EMAILJS_PUBLIC_KEY,
      template_params: {
        from_name: name,
        from_email: email,
        message: message,
      },
    };

    // If a private key (server key) is provided in env, include it for strict mode.
    // EmailJS REST expects 'accessToken' for strict/server mode.
    if (process.env.EMAILJS_PRIVATE_KEY) {
      payload.accessToken = process.env.EMAILJS_PRIVATE_KEY;
    }

    const r = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!r.ok) {
      const text = await r.text();
      console.error('EmailJS API error', r.status, text);
      // try to parse JSON body for better error info
      let parsed = text;
      try { parsed = JSON.parse(text); } catch(e) { /* keep raw text */ }
      return res.status(r.status).json({ error: parsed });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Server send-email error', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
