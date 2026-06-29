import { ImageResponse } from 'next/og';
import { serviceDetails, serviceSlugs } from './content';

export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Asthawaani service';

export async function generateStaticParams() {
  return serviceSlugs.map((slug) => ({ slug }));
}

export default async function OG({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const s = serviceDetails[slug];
  const title = s?.title ?? 'Asthawaani';
  const subtitle = s?.subtitle ?? 'Spiritual platform from Mathura-Vrindavan';

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
            'linear-gradient(135deg, #1a1238 0%, #2a1a55 45%, #6b2c2c 100%)',
          color: '#fff8e7',
          fontFamily: 'serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 20, fontSize: 32, opacity: 0.85 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              background: '#f7c948',
              color: '#1a1238',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: 800,
              fontSize: 30,
            }}
          >
            ॐ
          </div>
          <div>Asthawaani</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 80, fontWeight: 800, lineHeight: 1.05, color: '#fde7a8' }}>
            {title}
          </div>
          <div style={{ fontSize: 36, lineHeight: 1.3, opacity: 0.92, maxWidth: 1000 }}>
            {subtitle}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 26, opacity: 0.8 }}>
          <div>Daily Satsang • Bhajan • Mantra Jaap</div>
          <div>asthawaani.com</div>
        </div>
      </div>
    ),
    { ...size },
  );
}
