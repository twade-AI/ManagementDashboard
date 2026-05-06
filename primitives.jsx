// Shared primitives for all variations: RAG chip, sparklines, donut, bars, etc.
// All SVG-based — no chart libs.

window.HBY = (function () {
  const css = `
  :root {
    --hb-magenta: #9b1844;
    --hb-magenta-60: #b9607d;
    --hb-magenta-30: #ddbdca;
    --hb-magenta-10: #f6ecef;
    --hb-grey: #7c7c7c;
    --hb-ink: #1a1613;
    --hb-ink-2: #3d3630;
    --hb-mute: #6e665f;
    --hb-rule: #e4ddd3;
    --hb-paper: #faf7f0;
    --hb-card: #ffffff;
    --hb-cream: #f2ece0;
    --hb-green: #1f7a54;
    --hb-amber: #c47a1d;
    --hb-red: #b0233b;
    --hb-royal: #2a2b7c;
    --hb-blue: #1e5b8a;
    --font-serif: 'Playfair Display', 'Chronicle Display', Georgia, 'Times New Roman', serif;
    --font-sans: 'Calluna Sans', 'Lato', 'Source Sans 3', system-ui, sans-serif;
    --font-mono: 'JetBrains Mono', ui-monospace, monospace;
  }
  * { box-sizing: border-box; }
  body { margin: 0; font-family: var(--font-sans); color: var(--hb-ink); background: var(--hb-paper); -webkit-font-smoothing: antialiased; }
  .hb-serif { font-family: var(--font-serif); }
  .hb-sans  { font-family: var(--font-sans); }
  .hb-mono  { font-family: var(--font-mono); }
  .rag-dot { display: inline-block; width: 8px; height: 8px; border-radius: 50%; vertical-align: middle; }
  .rag-green  { background: var(--hb-green); }
  .rag-amber  { background: var(--hb-amber); }
  .rag-red    { background: var(--hb-red); }
  .rag-pill {
    display: inline-flex; align-items: center; gap: 6px;
    padding: 2px 8px; border-radius: 999px; font-size: 11px;
    font-weight: 700; letter-spacing: .08em; text-transform: uppercase;
    font-family: var(--font-sans);
  }
  .rag-pill.rag-green { background: #e6f2ec; color: var(--hb-green); }
  .rag-pill.rag-amber { background: #fbefd9; color: var(--hb-amber); }
  .rag-pill.rag-red   { background: #f5dde1; color: var(--hb-red); }
  .delta-up   { color: var(--hb-green); }
  .delta-down { color: var(--hb-red); }
  .delta-flat { color: var(--hb-mute); }

  /* Custom scrollbar for inner scroll panes */
  .hb-scroll::-webkit-scrollbar { width: 6px; height: 6px; }
  .hb-scroll::-webkit-scrollbar-thumb { background: var(--hb-rule); border-radius: 3px; }
  .hb-scroll { scrollbar-width: thin; scrollbar-color: var(--hb-rule) transparent; }

  button { font-family: inherit; }
  `;
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  // ── Components ──
  const RAGPill = ({ status, label }) => (
    <span className={`rag-pill rag-${status || 'green'}`}>
      <span className={`rag-dot rag-${status || 'green'}`} style={{background: 'currentColor', opacity: .8}} />
      {label || (status||'green').toUpperCase()}
    </span>
  );

  const RAGDot = ({ status, size = 10 }) => (
    <span className={`rag-dot rag-${status || 'green'}`} style={{ width: size, height: size }} />
  );

  const Delta = ({ value, suffix = '', invertColor = false }) => {
    if (value == null) return null;
    const n = typeof value === 'number' ? value : parseFloat(value);
    const up = !isNaN(n) ? n > 0 : String(value).startsWith('+');
    const down = !isNaN(n) ? n < 0 : String(value).startsWith('-');
    const good = invertColor ? down : up;
    const bad  = invertColor ? up   : down;
    const cls = good ? 'delta-up' : bad ? 'delta-down' : 'delta-flat';
    const arrow = up ? '▲' : down ? '▼' : '–';
    const display = typeof value === 'number'
      ? `${value > 0 ? '+' : ''}${value}${suffix}`
      : `${value}${suffix}`;
    return <span className={cls} style={{ fontFamily: 'var(--font-sans)', fontWeight: 600 }}>{arrow} {display}</span>;
  };

  // Sparkline
  const Sparkline = ({ data, width = 120, height = 32, color = 'var(--hb-magenta)', fill = true, strokeWidth = 1.5 }) => {
    if (!data || data.length === 0) return null;
    const min = Math.min(...data), max = Math.max(...data);
    const range = max - min || 1;
    const pts = data.map((v, i) => [
      (i / (data.length - 1)) * width,
      height - ((v - min) / range) * (height - 4) - 2,
    ]);
    const d = pts.map((p, i) => `${i===0?'M':'L'}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
    const area = d + ` L${width} ${height} L0 ${height} Z`;
    return (
      <svg width={width} height={height} style={{ display: 'block' }}>
        {fill && <path d={area} fill={color} opacity=".12" />}
        <path d={d} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
        <circle cx={pts[pts.length-1][0]} cy={pts[pts.length-1][1]} r="2.5" fill={color} />
      </svg>
    );
  };

  // Bar comparison (used for actual vs budget, day vs boarding, etc.)
  const HorizBar = ({ value, max, color = 'var(--hb-magenta)', height = 8, bg = 'var(--hb-rule)' }) => (
    <div style={{ position: 'relative', background: bg, height, borderRadius: height/2, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', inset: 0, width: `${Math.min(100, (value/max)*100)}%`, background: color, transition: 'width .6s cubic-bezier(.4,0,.2,1)' }} />
    </div>
  );

  // Donut (used for ATL distribution, sports W/D/L)
  const Donut = ({ segments, size = 120, strokeWidth = 18, centerLabel, centerSub }) => {
    const r = (size - strokeWidth) / 2;
    const C = 2 * Math.PI * r;
    const total = segments.reduce((a, s) => a + s.value, 0);
    let offset = 0;
    return (
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--hb-rule)" strokeWidth={strokeWidth} />
        {segments.map((s, i) => {
          const len = (s.value / total) * C;
          const el = (
            <circle key={i} cx={size/2} cy={size/2} r={r} fill="none"
              stroke={s.color} strokeWidth={strokeWidth}
              strokeDasharray={`${len} ${C - len}`}
              strokeDashoffset={-offset}
              transform={`rotate(-90 ${size/2} ${size/2})`} />
          );
          offset += len;
          return el;
        })}
        {centerLabel && (
          <g>
            <text x={size/2} y={size/2 - 2} textAnchor="middle" fontSize={size*0.22} fontWeight="700" fontFamily="var(--font-serif)" fill="var(--hb-ink)">{centerLabel}</text>
            {centerSub && <text x={size/2} y={size/2 + size*0.16} textAnchor="middle" fontSize={size*0.08} fill="var(--hb-mute)" letterSpacing="0.08em">{centerSub}</text>}
          </g>
        )}
      </svg>
    );
  };

  // Progress ring for a single metric
  const Ring = ({ value, max = 100, size = 72, strokeWidth = 6, color = 'var(--hb-magenta)', label }) => {
    const r = (size - strokeWidth) / 2;
    const C = 2 * Math.PI * r;
    const pct = Math.min(1, value / max);
    return (
      <svg width={size} height={size}>
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--hb-rule)" strokeWidth={strokeWidth} />
        <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth={strokeWidth}
          strokeDasharray={`${C * pct} ${C}`} strokeDashoffset={C*0.25} transform={`rotate(-90 ${size/2} ${size/2})`}
          strokeLinecap="round" />
        <text x={size/2} y={size/2 + size*0.06} textAnchor="middle" fontSize={size*0.3} fontWeight="700" fontFamily="var(--font-serif)" fill="var(--hb-ink)">{value}{label || '%'}</text>
      </svg>
    );
  };

  // Stat card
  const Stat = ({ label, value, unit, delta, rag, series, color = 'var(--hb-magenta)', serifValue = true, compact = false }) => (
    <div style={{ padding: compact ? 12 : 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
        <span style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '.09em', color: 'var(--hb-mute)', fontWeight: 600 }}>{label}</span>
        {rag && <RAGDot status={rag} size={7} />}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginBottom: 4 }}>
        <span className={serifValue ? 'hb-serif' : ''} style={{ fontSize: compact ? 26 : 34, fontWeight: 700, color: 'var(--hb-ink)', lineHeight: 1 }}>
          {value}
        </span>
        {unit && <span style={{ fontSize: 13, color: 'var(--hb-mute)', fontWeight: 500 }}>{unit}</span>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, fontSize: 11 }}>
        {delta != null ? <Delta {...delta} /> : <span>&nbsp;</span>}
        {series && <Sparkline data={series} width={64} height={22} color={color} />}
      </div>
    </div>
  );

  // Section wordmark (decorative)
  const SectionTitle = ({ number, title, subtitle, accent = 'var(--hb-magenta)' }) => (
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, borderBottom: `1.5px solid ${accent}`, paddingBottom: 8, marginBottom: 14 }}>
      {number && <span className="hb-serif" style={{ color: accent, fontSize: 13, fontStyle: 'italic', letterSpacing: '.05em' }}>№ {number}</span>}
      <h2 className="hb-serif" style={{ margin: 0, fontSize: 20, fontWeight: 700, color: 'var(--hb-ink)', letterSpacing: '-.01em' }}>{title}</h2>
      {subtitle && <span style={{ fontSize: 11, color: 'var(--hb-mute)', textTransform: 'uppercase', letterSpacing: '.08em', marginLeft: 'auto' }}>{subtitle}</span>}
    </div>
  );

  // Filter bar
  const FilterBar = ({ filters, setFilters, data, compact = false }) => {
    const btn = (val, cur, onSel) => {
      const on = cur === val;
      return (
        <button onClick={() => onSel(val)} style={{
          border: `1px solid ${on ? 'var(--hb-magenta)' : 'var(--hb-rule)'}`,
          background: on ? 'var(--hb-magenta)' : 'transparent',
          color: on ? '#fff' : 'var(--hb-ink-2)',
          padding: compact ? '3px 9px' : '5px 11px', borderRadius: 999,
          fontSize: compact ? 11 : 12, cursor: 'pointer', fontWeight: 500,
          transition: 'all .15s',
        }}>{val}</button>
      );
    };
    const Group = ({ label, options, key: k }) => (
      <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
        <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--hb-mute)', fontWeight: 600, marginRight: 2 }}>{label}</span>
        {['All', ...options].map(o => btn(o, filters[k], v => setFilters(f => ({...f, [k]: v}))))}
      </div>
    );
    return (
      <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
        <Group label="House" options={data.HOUSES.slice(0, 6)} key="house" />
        <Group label="Year" options={data.YEARS} key="year" />
        <Group label="Boarding" options={['Boarding', 'Day']} key="boarding" />
        <Group label="Gender" options={['Boys', 'Girls']} key="gender" />
      </div>
    );
  };

  // Empty filter state
  const defaultFilters = { house: 'All', year: 'All', boarding: 'All', gender: 'All' };

  return { RAGPill, RAGDot, Delta, Sparkline, HorizBar, Donut, Ring, Stat, SectionTitle, FilterBar, defaultFilters };
})();
