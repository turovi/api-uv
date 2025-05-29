// app/api/soleil/route.ts
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const email = process.env.SOLEIL_EMAIL!;
  const password = process.env.SOLEIL_PASSWORD!;
  const authUrl = process.env.SOLEIL_AUTH_URL!;
  const dataUrl = process.env.SOLEIL_DATA_URL!;

  // Lire les paramètres de la query string
  const { searchParams } = new URL(req.url);
  const ville = searchParams.get('ville') ?? 'Rouen';
  const pageSize = searchParams.get('page_size') ?? '3';
  const tri = searchParams.get('tri') ?? '-date';

  try {
    // Étape 1 – Authentification (POST pour récupérer le token)
    const authRes = await fetch(authUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user: { email, password } }),
    });

    if (!authRes.ok) {
      return new Response('Erreur d’authentification', { status: 401 });
    }

    const authData = await authRes.json();
    const token = authData?.data?.token;

    if (!token) {
      return new Response('Token non reçu', { status: 401 });
    }

    // Étape 2 – Appel des données UV (GET avec token)
    const query = new URLSearchParams({
      page_size: pageSize,
      tri,
      ville,
    }).toString();

    const dataRes = await fetch(`${dataUrl}?${query}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!dataRes.ok) {
      return new Response('Erreur lors de la récupération des données UV', { status: 500 });
    }

    const data = await dataRes.json();

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Erreur serveur :', err);
    return new Response('Erreur serveur interne', { status: 500 });
  }
}
