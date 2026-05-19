// login-screens.jsx — Desktop web login variants for 공소 (독서 아이트래킹)
// Three variants at 1440 × 900.

const T = {
  serif: '"Space Grotesk", "Pretendard", -apple-system, system-ui, sans-serif',
  body: '"Pretendard", -apple-system, "Apple SD Gothic Neo", system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, SFMono-Regular, monospace',
};

// ─────────────────────────────────────────────────────────────
// Iris hero — original SVG composition (geometric only)
// ─────────────────────────────────────────────────────────────
function IrisHero({ size = 320, accent = '#5EC8FF', glow = '#3D7BFF', animate = true }) {
  const id = React.useId();
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{ display: 'block' }}>
      <defs>
        <radialGradient id={`${id}-iris`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#0B1B3E" />
          <stop offset="55%" stopColor={glow} stopOpacity="0.55" />
          <stop offset="85%" stopColor={accent} stopOpacity="0.18" />
          <stop offset="100%" stopColor={accent} stopOpacity="0" />
        </radialGradient>
        <radialGradient id={`${id}-pupil`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#020713" />
          <stop offset="80%" stopColor="#02061a" />
          <stop offset="100%" stopColor="#0a1840" />
        </radialGradient>
        <linearGradient id={`${id}-arc`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor={accent} />
          <stop offset="100%" stopColor={glow} stopOpacity="0.0" />
        </linearGradient>
      </defs>

      <circle cx="100" cy="100" r="98" fill={`url(#${id}-iris)`} />

      {Array.from({ length: 60 }).map((_, i) => {
        const a = (i / 60) * Math.PI * 2;
        const r1 = 88, r2 = i % 5 === 0 ? 80 : 84;
        return (
          <line key={i}
            x1={100 + Math.cos(a) * r1} y1={100 + Math.sin(a) * r1}
            x2={100 + Math.cos(a) * r2} y2={100 + Math.sin(a) * r2}
            stroke={accent} strokeOpacity={i % 5 === 0 ? 0.55 : 0.18} strokeWidth="1" />
        );
      })}

      <circle cx="100" cy="100" r="58" fill="none" stroke={accent} strokeOpacity="0.35" strokeWidth="1" />
      <circle cx="100" cy="100" r="46" fill="none" stroke={accent} strokeOpacity="0.6" strokeWidth="1" />

      <path d="M 100 38 A 62 62 0 0 1 162 100"
        stroke={`url(#${id}-arc)`} strokeWidth="2.5" fill="none" strokeLinecap="round">
        {animate && <animateTransform attributeName="transform" type="rotate"
          from="0 100 100" to="360 100 100" dur="8s" repeatCount="indefinite" />}
      </path>

      {Array.from({ length: 24 }).map((_, i) => {
        const a = (i / 24) * Math.PI * 2;
        const r1 = 30, r2 = 46;
        return (
          <line key={i}
            x1={100 + Math.cos(a) * r1} y1={100 + Math.sin(a) * r1}
            x2={100 + Math.cos(a) * r2} y2={100 + Math.sin(a) * r2}
            stroke={accent} strokeOpacity="0.35" strokeWidth="1" />
        );
      })}

      <circle cx="100" cy="100" r="22" fill={`url(#${id}-pupil)`} />
      <circle cx="100" cy="100" r="22" fill="none" stroke={accent} strokeOpacity="0.55" strokeWidth="1" />
      <circle cx="93" cy="93" r="4" fill="#fff" fillOpacity="0.9" />
      <circle cx="108" cy="106" r="1.5" fill="#fff" fillOpacity="0.5" />

      <g>
        <circle cx="148" cy="62" r="3" fill={accent} />
        <circle cx="148" cy="62" r="8" fill="none" stroke={accent} strokeOpacity="0.4" />
        <circle cx="148" cy="62" r="14" fill="none" stroke={accent} strokeOpacity="0.2" />
      </g>
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────
// Shared field components
// ─────────────────────────────────────────────────────────────
function Field({ label, type = 'text', placeholder, value, onChange, trailing, autoFocus, accent = '#5EC8FF', theme = 'dark' }) {
  const [focused, setFocused] = React.useState(false);
  const dark = theme === 'dark';
  const bg = dark ? 'rgba(255,255,255,0.04)' : '#F6F8FE';
  const border = focused
    ? `1px solid ${accent}`
    : dark ? '1px solid rgba(255,255,255,0.10)' : '1px solid rgba(10,30,80,0.10)';
  return (
    <label style={{ display: 'block' }}>
      <div style={{
        fontFamily: T.body, fontSize: 12, fontWeight: 500,
        color: dark ? 'rgba(232,238,255,0.55)' : 'rgba(10,30,80,0.55)',
        letterSpacing: '0.04em', marginBottom: 8, textTransform: 'uppercase',
      }}>{label}</div>
      <div style={{
        display: 'flex', alignItems: 'center',
        background: bg, border, borderRadius: 12,
        padding: '0 16px', height: 52,
        transition: 'border 160ms ease',
        boxShadow: focused ? `0 0 0 4px ${accent}1A` : 'none',
      }}>
        <input
          type={type} placeholder={placeholder} value={value} autoFocus={autoFocus}
          onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
          onChange={(e) => onChange?.(e.target.value)}
          style={{
            flex: 1, height: '100%', background: 'transparent', border: 'none', outline: 'none',
            color: dark ? '#E8EEFF' : '#0A1838',
            fontFamily: T.body, fontSize: 15, fontWeight: 500,
          }}
        />
        {trailing}
      </div>
    </label>
  );
}

function EyeToggle({ on, onToggle, theme = 'dark' }) {
  const c = theme === 'dark' ? 'rgba(232,238,255,0.55)' : 'rgba(10,30,80,0.45)';
  return (
    <button type="button" onClick={onToggle}
      style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: 4, display: 'flex', alignItems: 'center', color: c }}
      aria-label="비밀번호 표시">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M2 12C4 7 7.5 4.5 12 4.5C16.5 4.5 20 7 22 12C20 17 16.5 19.5 12 19.5C7.5 19.5 4 17 2 12Z"
          stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
        <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5" />
        {!on && <line x1="4" y1="20" x2="20" y2="4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />}
      </svg>
    </button>
  );
}

function SocialBtn({ kind, theme = 'dark' }) {
  const dark = theme === 'dark';
  const bg = dark ? 'rgba(255,255,255,0.05)' : '#fff';
  const border = dark ? '1px solid rgba(255,255,255,0.10)' : '1px solid rgba(10,30,80,0.10)';
  const fg = dark ? '#E8EEFF' : '#0A1838';
  const labels = { google: 'Google', kakao: 'Kakao', apple: 'Apple' };
  const ic = {
    google: <svg width="18" height="18" viewBox="0 0 18 18"><path d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84c-.21 1.13-.84 2.08-1.79 2.72v2.26h2.9c1.7-1.56 2.69-3.87 2.69-6.62z" fill="#4285F4"/><path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.9-2.26c-.8.54-1.83.86-3.06.86-2.36 0-4.36-1.59-5.07-3.74H.91v2.34A8.997 8.997 0 0 0 9 18z" fill="#34A853"/><path d="M3.93 10.68A5.41 5.41 0 0 1 3.64 9c0-.58.1-1.15.29-1.68V4.98H.91A8.997 8.997 0 0 0 0 9c0 1.45.35 2.83.91 4.02l3.02-2.34z" fill="#FBBC05"/><path d="M9 3.58c1.32 0 2.51.45 3.45 1.35l2.58-2.58C13.47.89 11.43 0 9 0 5.48 0 2.44 2.02.91 4.98l3.02 2.34C4.64 5.17 6.64 3.58 9 3.58z" fill="#EA4335"/></svg>,
    kakao: <div style={{ width: 18, height: 18, borderRadius: 4, background: '#FEE500', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 800, color: '#3A1D1D' }}>K</div>,
    apple: <svg width="18" height="18" viewBox="0 0 18 18" fill={fg}><path d="M13.95 9.6c0-2.3 1.9-3.4 2-3.4-1.1-1.6-2.8-1.8-3.4-1.8-1.4-.2-2.8.9-3.5.9-.7 0-1.9-.8-3.1-.8-1.6 0-3.1.9-3.9 2.4-1.7 2.9-.4 7.2 1.2 9.6.8 1.1 1.7 2.4 2.9 2.4 1.2-.1 1.6-.8 3-.8s1.9.8 3.1.8c1.3 0 2.1-1.2 2.9-2.3.9-1.3 1.3-2.6 1.3-2.7-.1 0-2.5-1-2.5-3.3zM11.5 3c.6-.8 1.1-2 1-3.1-1 0-2.1.7-2.8 1.5-.6.7-1.1 1.9-1 3 1.1.1 2.2-.6 2.8-1.4z"/></svg>,
  };
  return (
    <button type="button" style={{
      flex: 1, height: 52, borderRadius: 12, background: bg, border, color: fg,
      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
      fontFamily: T.body, fontSize: 14, fontWeight: 600, cursor: 'pointer',
    }}>{ic[kind]}<span>{labels[kind]}</span></button>
  );
}

function BrandMark({ accent = '#5EC8FF', primary = '#3D7BFF', dark = true, size = 'md' }) {
  const dim = size === 'lg' ? 44 : 36;
  const fg = dark ? '#E8EEFF' : '#0A1838';
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div style={{
        width: dim, height: dim, borderRadius: 12,
        background: `linear-gradient(135deg, ${primary}, ${accent})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: `0 6px 22px ${primary}66`,
      }}>
        <svg width={dim * 0.55} height={dim * 0.55} viewBox="0 0 24 24" fill="none">
          <path d="M2 12C4 7 7.5 5 12 5C16.5 5 20 7 22 12C20 17 16.5 19 12 19C7.5 19 4 17 2 12Z" stroke="#04102E" strokeWidth="2" />
          <circle cx="12" cy="12" r="3" fill="#04102E" />
        </svg>
      </div>
      <div>
        <div style={{ fontFamily: T.serif, fontWeight: 700, fontSize: size === 'lg' ? 22 : 18, letterSpacing: '-0.02em', color: fg }}>
          공소
        </div>
        <div style={{ fontFamily: T.mono, fontSize: 10, letterSpacing: '0.2em', color: dark ? 'rgba(232,238,255,0.45)' : 'rgba(10,30,80,0.5)', marginTop: 2 }}>
          GONGSO · READING
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Variant A · ECLIPSE — split layout, dark hero left, glass form right
// ─────────────────────────────────────────────────────────────
function LoginEclipse({ accent = '#5EC8FF', primary = '#3D7BFF', headline = '다시 만나서 반가워요' }) {
  const [pw, setPw] = React.useState('••••••••••');
  const [email, setEmail] = React.useState('reader@gongso.kr');
  const [showPw, setShowPw] = React.useState(false);
  return (
    <div style={{
      width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '1.05fr 1fr',
      background: '#06091F', color: '#E8EEFF', fontFamily: T.body, overflow: 'hidden',
    }}>
      {/* LEFT — hero */}
      <div style={{
        position: 'relative', padding: '56px 64px',
        background: `radial-gradient(120% 80% at 30% 20%, ${primary}33 0%, #0A1838 45%, #06091F 100%)`,
        display: 'flex', flexDirection: 'column',
      }}>
        {/* faint grid */}
        <svg style={{ position: 'absolute', inset: 0, opacity: 0.15, pointerEvents: 'none' }} width="100%" height="100%">
          <defs>
            <pattern id="grid-a" width="32" height="32" patternUnits="userSpaceOnUse">
              <path d="M32 0H0V32" fill="none" stroke={accent} strokeWidth="0.5" strokeOpacity="0.3" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-a)" />
        </svg>

        <BrandMark accent={accent} primary={primary} size="lg" />

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', marginTop: -40 }}>
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'center', marginBottom: 36 }}>
            <IrisHero size={300} accent={accent} glow={primary} />
          </div>
          <div style={{
            fontFamily: T.serif, fontWeight: 700, fontSize: 44, lineHeight: 1.1,
            letterSpacing: '-0.025em', textAlign: 'center', maxWidth: 480, margin: '0 auto',
          }}>
            시선이 만든
            <br/>
            <span className="grad-text" style={{ backgroundImage: `linear-gradient(120deg, ${accent}, #B8DCFF)` }}>
              읽기의 지도.
            </span>
          </div>
          <div style={{ fontSize: 15, color: 'rgba(232,238,255,0.6)', marginTop: 18, textAlign: 'center', lineHeight: 1.6 }}>
            웹캠 한 대로 집중도와 역행을 측정해<br/>당신만의 독서 습관을 보여드려요.
          </div>
        </div>

        <div style={{
          display: 'flex', gap: 32, fontSize: 12, fontFamily: T.mono,
          color: 'rgba(232,238,255,0.45)', letterSpacing: '0.15em',
        }}>
          <span>MEDIAPIPE · WS 30FPS</span>
          <span>v 0.4.2</span>
          <span style={{ marginLeft: 'auto' }}>SEOUL · KR</span>
        </div>
      </div>

      {/* RIGHT — form */}
      <div style={{
        position: 'relative', padding: '56px 88px',
        background: '#04081C', display: 'flex', flexDirection: 'column', justifyContent: 'center',
      }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', top: 36, right: 56, fontSize: 13, color: 'rgba(232,238,255,0.55)' }}>
          처음이신가요?&nbsp;<a style={{ color: accent, textDecoration: 'none', fontWeight: 600 }}>회원가입 →</a>
        </div>

        <div style={{ maxWidth: 420, width: '100%', margin: '0 auto' }}>
          <div style={{
            fontFamily: T.serif, fontWeight: 700, fontSize: 36, letterSpacing: '-0.025em', lineHeight: 1.15,
          }}>
            {headline}
          </div>
          <div style={{ fontSize: 14, color: 'rgba(232,238,255,0.6)', marginTop: 10 }}>
            이어서 읽던 곳으로 데려다드릴게요.
          </div>

          <div style={{ display: 'grid', gap: 16, marginTop: 32 }}>
            <Field label="이메일" placeholder="example@gongso.kr" value={email} onChange={setEmail} accent={accent} />
            <Field
              label="비밀번호"
              type={showPw ? 'text' : 'password'}
              placeholder="비밀번호 입력"
              value={pw} onChange={setPw}
              accent={accent}
              trailing={<EyeToggle on={showPw} onToggle={() => setShowPw(!showPw)} />}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16, fontSize: 13 }}>
            <label style={{ display: 'flex', gap: 8, alignItems: 'center', color: 'rgba(232,238,255,0.65)', cursor: 'pointer' }}>
              <span style={{
                width: 18, height: 18, borderRadius: 4,
                border: `1px solid ${accent}80`,
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                background: `${accent}26`,
              }}>
                <svg width="10" height="10" viewBox="0 0 10 10"><path d="M1 5L4 8L9 2" stroke={accent} strokeWidth="1.6" fill="none" strokeLinecap="round" /></svg>
              </span>
              자동 로그인
            </label>
            <a style={{ color: accent, textDecoration: 'none', fontWeight: 500 }}>비밀번호 찾기</a>
          </div>

          <button style={{
            marginTop: 22, width: '100%', height: 56, borderRadius: 14, border: 'none',
            background: `linear-gradient(135deg, ${primary} 0%, ${accent} 100%)`,
            color: '#04102E', fontFamily: T.body, fontSize: 16, fontWeight: 700,
            letterSpacing: '0.02em', cursor: 'pointer',
            boxShadow: `0 14px 32px ${primary}80, inset 0 1px 0 rgba(255,255,255,0.4)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
          }}>
            로그인
            <svg width="18" height="18" viewBox="0 0 16 16"><path d="M3 8h10M9 4l4 4-4 4" stroke="#04102E" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
          </button>

          <div style={{
            display: 'flex', alignItems: 'center', gap: 12, margin: '24px 0 16px',
            color: 'rgba(232,238,255,0.4)', fontSize: 11, letterSpacing: '0.2em',
          }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
            소셜 계정으로 계속
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <SocialBtn kind="google" />
            <SocialBtn kind="kakao" />
            <SocialBtn kind="apple" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Variant B · AURORA — full-bleed aurora, centered glass card
// ─────────────────────────────────────────────────────────────
function LoginAurora({ accent = '#5EC8FF', primary = '#3D7BFF' }) {
  const [pw, setPw] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [showPw, setShowPw] = React.useState(false);
  return (
    <div style={{
      width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
      background: '#04081C', color: '#E8EEFF', fontFamily: T.body,
    }}>
      {/* aurora layer */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(50% 40% at 15% 15%, ${accent}88 0%, transparent 70%),
          radial-gradient(60% 50% at 85% 25%, ${primary}AA 0%, transparent 70%),
          radial-gradient(50% 40% at 75% 80%, #765AFF55 0%, transparent 70%),
          radial-gradient(40% 30% at 10% 85%, ${accent}66 0%, transparent 70%)
        `,
        filter: 'blur(20px)',
      }} />
      <svg style={{ position: 'absolute', inset: 0, opacity: 0.12, mixBlendMode: 'overlay' }} width="100%" height="100%">
        <filter id="noise"><feTurbulence baseFrequency="0.9" numOctaves="2" /></filter>
        <rect width="100%" height="100%" filter="url(#noise)" />
      </svg>

      {/* floating gaze dots */}
      {[
        { l: '8%', t: '12%', s: 10 }, { l: '22%', t: '6%', s: 4 },
        { l: '78%', t: '14%', s: 6 }, { l: '92%', t: '40%', s: 12 },
        { l: '12%', t: '70%', s: 7 }, { l: '85%', t: '78%', s: 5 },
        { l: '50%', t: '8%', s: 3 }, { l: '40%', t: '90%', s: 8 },
      ].map((d, i) => (
        <div key={i} style={{
          position: 'absolute', left: d.l, top: d.t,
          width: d.s, height: d.s, borderRadius: '50%',
          background: accent, boxShadow: `0 0 24px ${accent}, 0 0 6px #fff`,
        }} />
      ))}

      {/* top nav */}
      <div style={{
        position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: '32px 56px',
      }}>
        <BrandMark accent={accent} primary={primary} />
        <div style={{ display: 'flex', gap: 28, fontSize: 13.5, color: 'rgba(232,238,255,0.7)' }}>
          <a style={{ color: 'inherit', textDecoration: 'none' }}>제품 소개</a>
          <a style={{ color: 'inherit', textDecoration: 'none' }}>요금</a>
          <a style={{ color: 'inherit', textDecoration: 'none' }}>도움말</a>
          <a style={{ color: accent, textDecoration: 'none', fontWeight: 600 }}>회원가입 →</a>
        </div>
      </div>

      {/* main grid */}
      <div style={{
        position: 'relative', display: 'grid', gridTemplateColumns: '1.1fr 1fr',
        padding: '20px 80px 56px', gap: 80, alignItems: 'center',
        height: 'calc(100% - 96px)',
      }}>
        {/* headline column */}
        <div>
          <div style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: '0.3em', color: accent, marginBottom: 22 }}>
            EYE-TRACKING · READING ANALYTICS
          </div>
          <div style={{
            fontFamily: T.serif, fontWeight: 700, fontSize: 72, lineHeight: 1.02,
            letterSpacing: '-0.035em',
          }}>
            오늘도<br/>
            <span className="grad-text" style={{ backgroundImage: `linear-gradient(120deg, ${accent}, #B8DCFF 60%, #fff)` }}>
              깊게 읽어요.
            </span>
          </div>
          <div style={{ fontSize: 16, color: 'rgba(232,238,255,0.65)', marginTop: 22, lineHeight: 1.6, maxWidth: 460 }}>
            시선이 만든 독서 기록이<br/>당신을 기다리고 있어요. 다시 만나서 반가워요.
          </div>

          {/* stat strip */}
          <div style={{ display: 'flex', gap: 40, marginTop: 44 }}>
            {[
              { k: '집중도', v: '87', u: '%' },
              { k: '평균 역행', v: '12', u: '회' },
              { k: '읽은 글', v: '46', u: '편' },
            ].map((s) => (
              <div key={s.k}>
                <div style={{ fontFamily: T.serif, fontWeight: 600, fontSize: 38, letterSpacing: '-0.02em' }}>
                  {s.v}<span style={{ fontSize: 16, marginLeft: 4, color: 'rgba(232,238,255,0.55)' }}>{s.u}</span>
                </div>
                <div style={{ fontSize: 12, color: 'rgba(232,238,255,0.55)', marginTop: 2, letterSpacing: '0.05em' }}>{s.k}</div>
              </div>
            ))}
          </div>
        </div>

        {/* form card */}
        <div style={{
          padding: 36, borderRadius: 28,
          background: 'rgba(8,16,40,0.55)',
          border: '1px solid rgba(255,255,255,0.10)',
          backdropFilter: 'blur(28px)',
          WebkitBackdropFilter: 'blur(28px)',
          boxShadow: '0 30px 80px rgba(0,0,0,0.55), inset 0 1px 0 rgba(255,255,255,0.08)',
        }}>
          <div style={{ fontFamily: T.serif, fontSize: 24, fontWeight: 600, letterSpacing: '-0.02em' }}>
            계정으로 로그인
          </div>
          <div style={{ fontSize: 13.5, color: 'rgba(232,238,255,0.55)', marginTop: 6 }}>
            아직 계정이 없다면 <a style={{ color: accent, textDecoration: 'none', fontWeight: 600 }}>회원가입</a>
          </div>

          <div style={{ display: 'grid', gap: 14, marginTop: 24 }}>
            <Field label="이메일" placeholder="you@example.com" value={email} onChange={setEmail} accent={accent} />
            <Field
              label="비밀번호"
              type={showPw ? 'text' : 'password'}
              placeholder="••••••••"
              value={pw} onChange={setPw}
              accent={accent}
              trailing={<EyeToggle on={showPw} onToggle={() => setShowPw(!showPw)} />}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, fontSize: 13 }}>
            <label style={{ display: 'flex', gap: 8, alignItems: 'center', color: 'rgba(232,238,255,0.65)', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ accentColor: accent, width: 15, height: 15 }} />
              자동 로그인
            </label>
            <a style={{ color: accent, textDecoration: 'none', fontWeight: 500 }}>비밀번호 찾기</a>
          </div>

          <button style={{
            marginTop: 20, width: '100%', height: 56, borderRadius: 14, border: 'none',
            background: `linear-gradient(135deg, ${accent} 0%, ${primary} 100%)`,
            color: '#04102E', fontSize: 16, fontWeight: 700, fontFamily: T.body,
            cursor: 'pointer',
            boxShadow: `0 12px 32px ${accent}80, inset 0 1px 0 rgba(255,255,255,0.5)`,
          }}>로그인하고 이어 읽기</button>

          <div style={{
            display: 'flex', alignItems: 'center', gap: 12, margin: '22px 0 14px',
            color: 'rgba(232,238,255,0.4)', fontSize: 11, letterSpacing: '0.2em',
          }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
            또는
            <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.08)' }} />
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <SocialBtn kind="google" />
            <SocialBtn kind="kakao" />
            <SocialBtn kind="apple" />
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// Variant C · CIVIC — editorial split: black left + light form right
// ─────────────────────────────────────────────────────────────
function LoginCivic({ accent = '#5EC8FF', primary = '#3D7BFF' }) {
  const [pw, setPw] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [showPw, setShowPw] = React.useState(false);
  return (
    <div style={{
      width: '100%', height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr',
      background: '#fff', fontFamily: T.body, overflow: 'hidden',
    }}>
      {/* LEFT — editorial black panel */}
      <div style={{
        position: 'relative', background: '#06091A', color: '#E8EEFF',
        padding: '44px 56px', display: 'flex', flexDirection: 'column',
        overflow: 'hidden',
      }}>
        {/* subtle vertical lines */}
        <svg style={{ position: 'absolute', inset: 0, opacity: 0.5 }} width="100%" height="100%">
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={i} x1={`${(i + 1) * 11}%`} y1="0" x2={`${(i + 1) * 11}%`} y2="100%"
              stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
          ))}
        </svg>

        {/* top row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
          <BrandMark accent={accent} primary={primary} />
          <div style={{ fontFamily: T.mono, fontSize: 11, letterSpacing: '0.22em', color: 'rgba(232,238,255,0.45)' }}>
            GS · 001 / 002
          </div>
        </div>

        {/* big editorial number + headline */}
        <div style={{ position: 'relative', marginTop: 'auto', marginBottom: 'auto' }}>
          <div style={{
            fontFamily: T.serif, fontWeight: 500, fontSize: 220, lineHeight: 0.85,
            letterSpacing: '-0.06em', color: 'transparent',
            WebkitTextStroke: `1.5px ${accent}55`,
            display: 'flex', alignItems: 'flex-start',
          }}>
            01
          </div>
          <div style={{ marginTop: 10, display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{
              width: 22, height: 22, borderRadius: '50%',
              border: `2px solid ${accent}`,
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            }}><span style={{ width: 8, height: 8, borderRadius: '50%', background: accent }} /></span>
            <span style={{ fontSize: 12, fontFamily: T.mono, letterSpacing: '0.22em', color: accent }}>
              AUTHENTICATE
            </span>
          </div>

          <div style={{
            marginTop: 22, fontFamily: T.serif, fontWeight: 600, fontSize: 46,
            letterSpacing: '-0.025em', lineHeight: 1.08, maxWidth: 460,
          }}>
            시선을 등록한 계정으로<br/>
            <span style={{ color: accent }}>다시 로그인합니다.</span>
          </div>

          <div style={{ fontSize: 14.5, color: 'rgba(232,238,255,0.6)', marginTop: 18, maxWidth: 420, lineHeight: 1.6 }}>
            보정 데이터는 기기마다 저장되며,<br/>로그인하면 이전 세션의 분석이 동기화됩니다.
          </div>
        </div>

        {/* bottom strip */}
        <div style={{
          position: 'relative',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
          paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)',
          fontFamily: T.mono, fontSize: 11, letterSpacing: '0.2em',
          color: 'rgba(232,238,255,0.45)',
        }}>
          <span>READING EYE-TRACKING</span>
          <span>EST. 2026</span>
          <span>SEOUL · KR</span>
        </div>
      </div>

      {/* RIGHT — clean form */}
      <div style={{
        background: '#F6F8FE', color: '#0A1838',
        padding: '44px 80px', display: 'flex', flexDirection: 'column',
      }}>
        <div style={{ display: 'flex', justifyContent: 'flex-end', fontSize: 13.5, color: 'rgba(10,30,80,0.65)' }}>
          계정이 없으신가요?&nbsp;<a style={{ color: primary, textDecoration: 'none', fontWeight: 600 }}>회원가입 →</a>
        </div>

        <div style={{ margin: 'auto 0', maxWidth: 420, width: '100%' }}>
          <div style={{
            fontFamily: T.mono, fontSize: 11, letterSpacing: '0.22em', color: primary, marginBottom: 18,
          }}>
            STEP 01 — LOG IN
          </div>
          <div style={{
            fontFamily: T.serif, fontWeight: 700, fontSize: 42, letterSpacing: '-0.025em', lineHeight: 1.08,
          }}>
            계정 정보를<br/>입력해 주세요.
          </div>
          <div style={{ fontSize: 14, color: 'rgba(10,30,80,0.6)', marginTop: 10 }}>
            로그인 후 시선 보정 화면으로 이동합니다.
          </div>

          <div style={{ display: 'grid', gap: 16, marginTop: 30 }}>
            <Field theme="light" label="이메일" placeholder="email@gongso.kr" value={email} onChange={setEmail} accent={primary} />
            <Field theme="light"
              label="비밀번호"
              type={showPw ? 'text' : 'password'}
              placeholder="**********"
              value={pw} onChange={setPw} accent={primary}
              trailing={<EyeToggle on={showPw} onToggle={() => setShowPw(!showPw)} theme="light" />}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 14, fontSize: 13 }}>
            <label style={{ display: 'flex', gap: 8, alignItems: 'center', color: 'rgba(10,30,80,0.7)', cursor: 'pointer' }}>
              <input type="checkbox" defaultChecked style={{ accentColor: primary, width: 15, height: 15 }} />
              자동 로그인
            </label>
            <a style={{ color: primary, textDecoration: 'none', fontWeight: 500 }}>비밀번호 재설정</a>
          </div>

          <button style={{
            marginTop: 22, width: '100%', height: 58, borderRadius: 0,
            border: 'none', background: '#06091A', color: '#fff',
            fontFamily: T.body, fontSize: 15, fontWeight: 700, letterSpacing: '0.06em',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '0 26px',
            position: 'relative', overflow: 'hidden',
          }}>
            <span>LOG IN</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{ width: 36, height: 1, background: accent }} />
              <svg width="22" height="22" viewBox="0 0 22 22"><path d="M3 11h16M13 4l8 7-8 7" stroke={accent} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </span>
          </button>

          <div style={{
            display: 'flex', alignItems: 'center', gap: 12, margin: '22px 0 14px',
            color: 'rgba(10,30,80,0.45)', fontSize: 11, letterSpacing: '0.2em',
          }}>
            <div style={{ flex: 1, height: 1, background: 'rgba(10,30,80,0.08)' }} />
            소셜 계정으로 계속
            <div style={{ flex: 1, height: 1, background: 'rgba(10,30,80,0.08)' }} />
          </div>

          <div style={{ display: 'flex', gap: 10 }}>
            <SocialBtn kind="google" theme="light" />
            <SocialBtn kind="kakao" theme="light" />
            <SocialBtn kind="apple" theme="light" />
          </div>
        </div>

        <div style={{
          display: 'flex', justifyContent: 'space-between', fontFamily: T.mono, fontSize: 10,
          letterSpacing: '0.2em', color: 'rgba(10,30,80,0.4)', marginTop: 24,
        }}>
          <span>© GONGSO 2026</span>
          <span>이용약관 · 개인정보처리방침</span>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, { LoginEclipse, LoginAurora, LoginCivic, IrisHero });
