// export const corsHeaders = {
//   'Access-Control-Allow-Origin': '*', //'http://127.0.0.1:3000', //'https://joohan-lee.github.io',
//   'Access-Control-Allow-Headers': 'Content-Type, Authorization',
//   'Access-Control-Allow-Methods': 'POST, OPTIONS'
// };
const allowedOrigins = ['https://joohan-lee.github.io', 'http://127.0.0.1:3000'];

export function getCorsHeaders(origin: string | null) {
  const headers: Record<string, string> = {
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  if (origin && allowedOrigins.includes(origin)) {
    headers['Access-Control-Allow-Origin'] = origin;
  }

  return headers;
}
