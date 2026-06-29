import { ImageResponse } from 'next/og';
import { placeDetails, placeSlugs } from './content';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Asthawaani — sacred place of Braj Bhoomi';

export async function generateStaticParams() {
  return placeSlugs.map((slug) => ({ slug }));
}

export default async function OG({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p: any = (placeDetails as any)[slug];
  const name = p?.name ?? 'Braj Bhoomi';
  const tagline = p?.tagline ?? 'Sacred land of Bhagwan Shri Krishna';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '70px 80px',
          background:
            'linear-gradient(135deg, #3a1f0d 0%, #6b3a14 45%, #b8862a 100%)',
          color: '#fff8e7',
          fontFamily: 'serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: 32, opacity: 0.9 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              background: '#f7c948',
              color: '#3a1f0d',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 30,
            }}
          >
            ॐ
          </div>
          <div>Asthawaani · Braj Bhoomi</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 96, fontWeight: 800, lineHeight: 1.0, color: '#fde7a8' }}>
            {name}
          </div>
          <div style={{ fontSize: 36, lineHeight: 1.3, opacity: 0.95, maxWidth: 1000 }}>
            {tagline}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 26, opacity: 0.85 }}>
          <div>Mathura · Vrindavan · Gokul · Govardhan</div>
          <div>asthawaani.com</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
