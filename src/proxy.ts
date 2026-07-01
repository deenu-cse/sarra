import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
    // Generate a random nonce for each request
    const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
    const isDev = process.env.NODE_ENV === "development";

    const cspHeader = `
      default-src 'self';
      script-src 'self' 'nonce-${nonce}' 'strict-dynamic'${isDev ? " 'unsafe-eval'" : ""} https://unpkg.com;
      style-src 'self' ${isDev ? "'unsafe-inline'" : `'nonce-${nonce}'`} https://fonts.googleapis.com https://unpkg.com;
      img-src 'self' data: blob: https://res.cloudinary.com https://*.cloudinary.com https://*.basemaps.cartocdn.com https://*.googleapis.com https://*.gstatic.com https://*.google.com https://*.ggpht.com;
      font-src 'self' https://fonts.gstatic.com;
      connect-src 'self' https://sarrabackend.onrender.com http://localhost:5000;
      media-src 'self' https://res.cloudinary.com https://*.cloudinary.com https://www.youtube.com;
      frame-src 'self' https://www.youtube.com https://youtube.com https://www.google.com https://maps.google.com https://*.google.com;
      object-src 'none';
      base-uri 'self';
      form-action 'self';
      frame-ancestors 'self';
      upgrade-insecure-requests;
    `.replace(/\s{2,}/g, " ").trim();

    const requestHeaders = new Headers(request.headers);
    requestHeaders.set("x-nonce", nonce);

    // Set for request so server components can read it
    requestHeaders.set("Content-Security-Policy", cspHeader);

    const response = NextResponse.next({
        request: {
            headers: requestHeaders,
        },
    });

    // Set for response so browser enforces it
    response.headers.set("Content-Security-Policy", cspHeader);

    return response;
}

export const config = {
    matcher: [
        /*
         * Match all request paths except for the ones starting with:
         * - api (API routes)
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        {
            source: "/((?!api|_next/static|_next/image|favicon.ico).*)",
            missing: [
                { type: "header", key: "next-router-prefetch" },
                { type: "header", key: "purpose", value: "prefetch" },
            ],
        },
    ],
};