import type { Context, Config } from '@netlify/edge-functions'

export default async (req: Request, context: Context) => {
  const response = await context.next();
  
  // Only inject into HTML responses
  const contentType = response.headers.get("content-type");
  if (!contentType || !contentType.includes("text/html")) {
    return response;
  }

  const text = await response.text();
  const mapboxToken = Netlify.env.get("MAPBOX_ACCESS_TOKEN") || "";

  const envScript = `<script>window.__ENV__ = { MAPBOX_ACCESS_TOKEN: "${mapboxToken}" };</script>`;
  const modifiedText = text.replace("</head>", `${envScript}</head>`);

  const headers = new Headers(response.headers);
  headers.delete("content-length"); // Remove content-length since we modified the body

  return new Response(modifiedText, {
    status: response.status,
    headers: headers,
  });
}

export const config: Config = {
  path: ["/attractions.html", "/attractions"],
}