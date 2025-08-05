import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
// import { corsHeaders } from '../_shared/cors.ts';
import { getCorsHeaders } from '../_shared/cors.ts';

  serve(async (req) => {
    const origin = req.headers.get('origin');

    // Handle CORS
    if (req.method === 'OPTIONS') {
      return new Response('ok', {
        // headers: corsHeaders,
        headers: getCorsHeaders(origin),
      });
    }

    try {
      const requestData = await req.json()
      console.log('Request JSON:', requestData);
      const apiKey = Deno.env.get('GEMINI_API_KEY')

      if (!apiKey) {
        console.error('API key not configured');
        throw new Error('API key not configured')
      }

      console.log('call gemini');
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, 
      {
        method: 'POST',
        headers: { 
          ...getCorsHeaders(origin),
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify(requestData)
      })
      console.log('response', response);

      const data = await response.json()

      return new Response(JSON.stringify(data), {
        headers: {
          ...getCorsHeaders(origin),
          'Content-Type': 'application/json',
        }
      })
    } catch (error) {
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: {
          ...getCorsHeaders(origin),
          'Content-Type': 'application/json',
        }
      })
    }
  })
