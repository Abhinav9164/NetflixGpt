import { GEMINI_KEY } from './constants';

// Calls the Gemini API directly from the browser (local dev use only:
// the key is visible in the page's JavaScript, so don't deploy it this way).
export const askGemini = async (prompt) => {
  const res = await fetch(
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent',
    {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-goog-api-key': GEMINI_KEY,
      },
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] }),
    }
  );
  const json = await res.json();
  if (!res.ok) throw new Error(json?.error?.message || 'Gemini request failed');
  return (json.candidates?.[0]?.content?.parts || []).map((p) => p.text || "").join("");
};
