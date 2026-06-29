import { NextResponse } from 'next/server';

// Mapping of paths to verification code contents
// Add your verification files here as needed
const verificationFiles: Record<string, string> = {
    // Example:
    // 'google[hash].html': 'google-site-verification: google[hash].html'
};

export async function GET(
    request: Request,
    { params }: { params: Promise<{ path: string[] }> }
) {
    const { path } = await params;
    const filename = path.join('/');

    if (verificationFiles[filename]) {
        return new NextResponse(verificationFiles[filename], {
            status: 200,
            headers: {
                'Content-Type': 'text/html',
                'Cache-Control': 'public, max-age=86400, s-maxage=86400',
            },
        });
    }

    return new NextResponse('Not Found', { status: 404 });
}