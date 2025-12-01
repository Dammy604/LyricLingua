export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const clientId = process.env.SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.SPOTIFY_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return res.status(500).json({
      error: 'Spotify credentials are not configured on the server.',
    });
  }

  const basicAuth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');

  try {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${basicAuth}`,
      },
      body: 'grant_type=client_credentials',
    });

    const payload = await response.json();
    if (!response.ok) {
      return res.status(response.status).json({
        error: payload.error_description || payload.error || 'Unable to fetch Spotify token.',
      });
    }

    return res.status(200).json({
      token: payload.access_token,
      expiresIn: payload.expires_in,
      scope: payload.scope,
      tokenType: payload.token_type,
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Unexpected error while requesting Spotify token.',
      details: error.message,
    });
  }
}

