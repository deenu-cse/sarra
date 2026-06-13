import { ImageResponse } from 'next/og';
 
export const runtime = 'edge';
export const alt = 'SARRA - Spring and River Rejuvenation Authority';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
 
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(to bottom right, #0a3d62, #1e3799)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '40px',
          fontFamily: 'sans-serif',
          color: 'white',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '40px',
          }}
        >
          {/* Logo placeholder - using text to avoid complex image loading in Edge */}
          <div style={{
            fontSize: '120px',
            fontWeight: 'bold',
            color: '#e67e22',
            letterSpacing: '-2px',
          }}>
            SARRA
          </div>
        </div>
        
        <div
          style={{
            fontSize: '48px',
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: '20px',
            lineHeight: 1.2,
          }}
        >
          Spring and River Rejuvenation Authority
        </div>
        
        <div
          style={{
            fontSize: '32px',
            color: '#dff9fb',
            textAlign: 'center',
            opacity: 0.9,
          }}
        >
          Government of Uttarakhand
        </div>

        <div style={{
            position: 'absolute',
            bottom: '40px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            fontSize: '24px',
            color: '#dff9fb',
            opacity: 0.8,
        }}>
            <span>sarra.uk.gov.in</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
