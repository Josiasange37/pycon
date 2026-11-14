import { ImageResponse } from 'next/og';

export const alt = 'PyCon Cameroon 2027 · Douala';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: '100%', height: '100%', display: 'flex', background: '#0f2a24', color: '#e6ebe5', padding: 72, fontFamily: 'sans-serif' }}>
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', flex: 1 }}>
          <div style={{ fontSize: 26, letterSpacing: 2, textTransform: 'uppercase', color: '#a6bbb1' }}>Python Cameroon presents</div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 64, fontWeight: 800 }}>PyCon Cameroon</div>
            <div style={{ fontSize: 180, fontWeight: 800, lineHeight: 0.9, letterSpacing: -6 }}>Douala 2027</div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 28 }}>
            <div style={{ background: '#f6c300', color: '#14130f', padding: '10px 18px', fontWeight: 700 }}>Dates to be announced</div>
            <div style={{ color: '#a6bbb1' }}>cm.pycon.org</div>
          </div>
        </div>
      </div>
    ),
    size,
  );
}
