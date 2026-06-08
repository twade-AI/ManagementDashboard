// Variation 2 — Executive Brief
// Spacious, card-based, top nav. Fewer-bigger KPIs. RAG-forward, big type, serif hero stats.
// The "Head's morning view" — minimal, confident, luxurious.

(function () {
  const { useState, useMemo } = React;
  const { RAGPill, RAGDot, Delta, Sparkline, HorizBar, Donut, Ring, Stat, SectionTitle } = window.HBY;
  const D = window.DASHBOARD_DATA;

  const TABS = [
    { id: 'overview',   label: 'Overview' },
    { id: 'admissions', label: 'Admissions' },
    { id: 'academic',   label: 'Academic' },
    { id: 'pastoral',   label: 'Pastoral' },
    { id: 'people',     label: 'People' },
    { id: 'cocurr',     label: 'Co-Curricular' },
    { id: 'finance',    label: 'Finance' },
  ];

  const PERIOD_PILLS = [
    { id: 'today', label: 'Today' },
    { id: 'week',  label: 'Week'  },
    { id: 'term',  label: 'Term'  },
    { id: 'ytd',   label: 'YTD'   },
  ];

  const TopBar = ({ tab, setTab, filters, setFilters, period, setPeriod, showBenchmarks, setShowBenchmarks }) => (
    <div style={{ borderBottom: '1px solid var(--hb-rule)', background: 'var(--hb-card)', position: 'sticky', top: 0, zIndex: 10 }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 36px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <img src="assets/logo-magenta.png" style={{ height: 38 }} />
          <div style={{ borderLeft: '1px solid var(--hb-rule)', paddingLeft: 14 }}>
            <div className="hb-serif" style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-.01em', lineHeight: 1 }}>Management Dashboard</div>
            <div style={{ fontSize: 11, color: 'var(--hb-mute)', marginTop: 2 }}>Tuesday, 21 April 2026 · Summer Term Week 2</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ display: 'flex', gap: 6, alignItems: 'center', fontSize: 11, color: 'var(--hb-mute)' }}>
            <span>Period:</span>
            {PERIOD_PILLS.map(p => {
              const on = period === p.id;
              return (
                <button key={p.id} onClick={() => setPeriod(p.id)} style={{
                  border: '1px solid ' + (on ? 'var(--hb-magenta)' : 'var(--hb-rule)'),
                  background: on ? 'var(--hb-magenta)' : 'transparent',
                  color: on ? '#fff' : 'var(--hb-ink-2)',
                  padding: '3px 10px', borderRadius: 999, fontSize: 11, cursor: 'pointer',
                  fontFamily: 'inherit', fontWeight: on ? 700 : 500,
                }}>{p.label}</button>
              );
            })}
          </div>
          <button onClick={() => setShowBenchmarks(!showBenchmarks)} title="Overlay sector benchmarks on KPIs and charts"
            style={{
              border: '1px solid ' + (showBenchmarks ? 'var(--hb-magenta)' : 'var(--hb-rule)'),
              background: showBenchmarks ? 'var(--hb-magenta-10)' : 'transparent',
              color: showBenchmarks ? 'var(--hb-magenta)' : 'var(--hb-ink-2)',
              padding: '4px 10px', borderRadius: 4, fontSize: 11, cursor: 'pointer',
              fontFamily: 'inherit', fontWeight: 600, display: 'flex', alignItems: 'center', gap: 6,
            }}>
            <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: 4, background: showBenchmarks ? 'var(--hb-magenta)' : 'var(--hb-mute)' }} />
            Benchmarks {showBenchmarks ? 'on' : 'off'}
          </button>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '6px 10px', background: 'var(--hb-cream)', borderRadius: 999, fontSize: 11 }}>
            <span style={{width: 22, height: 22, borderRadius: 11, background: 'var(--hb-magenta)', color: '#fff', display:'inline-flex', alignItems:'center', justifyContent:'center', fontSize: 10, fontWeight: 700}}>MP</span>
            <span style={{ fontWeight: 600 }}>M. Preston</span>
            <span style={{ color: 'var(--hb-mute)' }}>The Master</span>
          </div>
        </div>
      </div>
      <div style={{ display: 'flex', gap: 2, padding: '16px 36px 0' }}>
        {TABS.map(t => {
          const on = tab === t.id;
          return (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              border: 'none', background: 'transparent',
              padding: '10px 16px', fontSize: 13,
              color: on ? 'var(--hb-magenta)' : 'var(--hb-ink-2)',
              fontWeight: on ? 700 : 500,
              borderBottom: `2px solid ${on ? 'var(--hb-magenta)' : 'transparent'}`,
              cursor: 'pointer', marginBottom: -1, fontFamily: 'inherit',
            }}>{t.label}</button>
          );
        })}
      </div>
    </div>
  );

  // Big hero KPI — serif display
  const HeroKPI = ({ label, value, unit, rag, delta, note, accent = 'var(--hb-magenta)', benchmark }) => (
    <div style={{ background: 'var(--hb-card)', border: '1px solid var(--hb-rule)', borderRadius: 3, padding: '22px 24px', borderTop: `3px solid ${accent}` }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
        <span style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--hb-mute)', fontWeight: 700 }}>{label}</span>
        {rag && <RAGPill status={rag} />}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6, marginBottom: 6 }}>
        <span className="hb-serif" style={{ fontSize: 54, fontWeight: 800, lineHeight: .95, color: 'var(--hb-ink)', letterSpacing: '-.02em' }}>{value}</span>
        {unit && <span style={{ fontSize: 16, color: 'var(--hb-mute)' }}>{unit}</span>}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 12, color: 'var(--hb-mute)' }}>
        {delta ? <Delta {...delta} /> : <span>{note}</span>}
        {note && delta && <span>{note}</span>}
      </div>
      {benchmark && (
        <div style={{ marginTop: 10, paddingTop: 10, borderTop: '1px dotted var(--hb-rule)', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', fontSize: 11, color: 'var(--hb-mute)' }}>
          <span style={{ textTransform: 'uppercase', letterSpacing: '.08em', fontSize: 9.5, fontWeight: 700 }}>{benchmark.label}</span>
          <span className="hb-mono" style={{ color: 'var(--hb-ink-2)', fontWeight: 600 }}>
            {benchmark.value}{benchmark.unit || ''}
          </span>
        </div>
      )}
    </div>
  );

  // Overview layout — 2×3 hero grid + lower panels
  const Overview = ({ setTab, period, showBenchmarks }) => {
    const f = D.finance;
    const periodData = D.periods[period] || D.periods.week;
    const h = periodData.heroes;
    const bm = D.benchmarks;
    const b = (key) => showBenchmarks ? bm[key] : null;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {/* Hero strip: six critical metrics */}
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 14 }}>
            <h2 className="hb-serif" style={{ margin: 0, fontSize: 26, fontWeight: 800, letterSpacing: '-.01em' }}>The Morning Brief</h2>
            <span style={{ fontSize: 12, color: 'var(--hb-mute)', fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>{periodData.label} · auto-refresh every 15 min</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            <HeroKPI label="Pupils on roll"        value={h.onRoll.value}       rag="green" delta={h.onRoll.delta}       note={h.onRoll.note}       benchmark={b('onRoll')} />
            <HeroKPI label="Attendance"            value={h.attendance.value}   unit="%"  rag="green" delta={h.attendance.delta}   note={h.attendance.note}   accent="var(--hb-green)" benchmark={b('attendance')} />
            <HeroKPI label="Projected net surplus" value={h.netSurplus.value}   rag="green" delta={h.netSurplus.delta}   note={h.netSurplus.note}   accent="var(--hb-royal)" benchmark={b('netSurplus')} />
            <HeroKPI label="IB average points"     value={h.ibPoints.value}     rag="green" delta={h.ibPoints.delta}     note={h.ibPoints.note}     benchmark={b('ibPoints')} />
            <HeroKPI label="Oxbridge offers"       value={`${h.oxbridge.value}`} rag="green" delta={h.oxbridge.delta}    note={h.oxbridge.note}     accent="var(--hb-royal)" benchmark={b('oxbridge')} />
            <HeroKPI label="Safeguarding trained"  value={h.safeguarding.value} unit="%"  rag="amber" delta={h.safeguarding.delta} note={h.safeguarding.note} accent="var(--hb-amber)" benchmark={b('safeguarding')} />
          </div>
        </div>

        {/* RAG summary strip */}
        <div style={{ background: 'var(--hb-cream)', border: '1px solid var(--hb-rule)', borderRadius: 3, padding: '18px 22px' }}>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 12 }}>
            <h3 className="hb-serif" style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>RAG Summary — all areas</h3>
            <span style={{ fontSize: 11, color: 'var(--hb-mute)' }}>Click any row for detail</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 10 }}>
            {[
              { id: 'admissions', label: 'Admissions',  green: 4, amber: 1, red: 0, head: '924 roll · 41% conv' },
              { id: 'academic',   label: 'Academic',    green: 5, amber: 0, red: 0, head: 'A*A*A · IB 38.4' },
              { id: 'pastoral',   label: 'Pastoral',    green: 3, amber: 3, red: 0, head: '96.4% att · 34 cpoms' },
              { id: 'people',     label: 'People',      green: 3, amber: 3, red: 0, head: '100% SCR · 99% sg' },
              { id: 'cocurr',     label: 'Co-curric.',  green: 5, amber: 0, red: 0, head: '62% wins · 48 fxt' },
              { id: 'finance',    label: 'Finance',     green: 3, amber: 2, red: 0, head: '+£188k v budget' },
            ].map(s => (
              <div key={s.id} onClick={() => setTab(s.id)} style={{
                background: 'var(--hb-card)', padding: 14, cursor: 'pointer',
                border: '1px solid var(--hb-rule)', transition: 'all .15s',
              }} onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--hb-magenta)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                 onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--hb-rule)'; e.currentTarget.style.transform = 'none'; }}>
                <div className="hb-serif" style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{s.label}</div>
                <div style={{ fontSize: 11, color: 'var(--hb-mute)', marginBottom: 8 }}>{s.head}</div>
                <div style={{ display: 'flex', gap: 4, height: 6, borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ flex: s.green, background: 'var(--hb-green)' }} />
                  <div style={{ flex: s.amber, background: 'var(--hb-amber)' }} />
                  {s.red > 0 && <div style={{ flex: s.red, background: 'var(--hb-red)' }} />}
                </div>
                <div style={{ display: 'flex', gap: 10, marginTop: 6, fontSize: 10, color: 'var(--hb-mute)' }}>
                  <span>● {s.green}</span><span>● {s.amber}</span><span>● {s.red}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lower row: 2 panels */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: 20 }}>
          {/* Cashflow */}
          <div style={{ background: 'var(--hb-card)', border: '1px solid var(--hb-rule)', padding: 22 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
              <h3 className="hb-serif" style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Cashflow — actual v forecast</h3>
              <span style={{ fontSize: 11, color: 'var(--hb-mute)' }}>
                12mo rolling · £m{showBenchmarks && <span style={{ marginLeft: 8, color: 'var(--hb-magenta)' }}>· sector overlay</span>}
              </span>
            </div>
            <AreaChart actual={f.cashflowTrend} forecast={f.budgetTrend} benchmark={showBenchmarks ? bm.cashflow : null} height={160} />
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 12, marginTop: 14, paddingTop: 14, borderTop: '1px solid var(--hb-rule)' }}>
              <MiniStat label="EBITDA" value={`£${f.ebitda.actual}m`} sub={`v bud £${f.ebitda.budget}m`} rag="green" />
              <MiniStat label="Covenant cover" value={`${f.covenantCover.value}x`} sub={`covenant ${f.covenantCover.covenant}x`} rag="green" />
              <MiniStat label="Fee arrears" value={`£${f.feeArrears.value}k`} sub="3 accts >30d" rag="amber" />
              <MiniStat label="Capex spend" value={`£${f.capex.value}k`} sub="Masterplan on plan" rag="amber" />
            </div>
          </div>

          {/* Activity feed */}
          <div style={{ background: 'var(--hb-card)', border: '1px solid var(--hb-rule)' }}>
            <div style={{ padding: '18px 22px 14px', borderBottom: '1px solid var(--hb-rule)', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
              <h3 className="hb-serif" style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Activity · {periodData.label.toLowerCase()}</h3>
              <span style={{ fontSize: 11, color: 'var(--hb-mute)' }}>{periodData.feed.length} events</span>
            </div>
            <div style={{ maxHeight: 340, overflow: 'auto' }} className="hb-scroll">
              {periodData.feed.map((ev, i) => (
                <div key={i} style={{ padding: '12px 22px', borderTop: i===0?'none':'1px solid var(--hb-rule)', display: 'flex', gap: 10 }}>
                  <div style={{ flexShrink: 0, width: 36 }}>
                    <div className="hb-mono" style={{ fontSize: 11, color: 'var(--hb-mute)' }}>{ev.t}</div>
                  </div>
                  <div style={{ flex: 1, fontSize: 12.5 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 3 }}>
                      <RAGDot status={ev.sev} size={6} />
                      <span style={{ fontSize: 9.5, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--hb-mute)', fontWeight: 600 }}>{ev.type}</span>
                    </div>
                    <div style={{ color: 'var(--hb-ink)', lineHeight: 1.45 }}>{ev.text}</div>
                    <div style={{ fontSize: 11, color: 'var(--hb-mute)', marginTop: 2 }}>{ev.by}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom: year/gender + pipeline */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <YearGenderPanel />
          <PipelinePanel />
        </div>
      </div>
    );
  };

  const MiniStat = ({ label, value, sub, rag }) => (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
        <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--hb-mute)', fontWeight: 600 }}>{label}</span>
        {rag && <RAGDot status={rag} size={6} />}
      </div>
      <div className="hb-serif" style={{ fontSize: 22, fontWeight: 700, color: 'var(--hb-ink)', lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: 11, color: 'var(--hb-mute)', marginTop: 3 }}>{sub}</div>
    </div>
  );

  const YearGenderPanel = () => (
    <div style={{ background: 'var(--hb-card)', border: '1px solid var(--hb-rule)', padding: 22 }}>
      <h3 className="hb-serif" style={{ margin: '0 0 14px', fontSize: 18, fontWeight: 700 }}>Pupil composition</h3>
      <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          {D.admissions.yearGender.map(y => {
            const total = y.boys + y.girls;
            const bpct = y.boys / total * 100;
            return (
              <div key={y.year} style={{ marginBottom: 8 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, marginBottom: 3 }}>
                  <span className="hb-serif" style={{ fontWeight: 700 }}>{y.year}</span>
                  <span style={{ color: 'var(--hb-mute)' }}>{total} pupils</span>
                </div>
                <div style={{ display: 'flex', height: 18, borderRadius: 2, overflow: 'hidden' }}>
                  <div style={{ width: `${bpct}%`, background: 'var(--hb-royal)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10, fontWeight: 600 }}>{y.boys}</div>
                  <div style={{ width: `${100-bpct}%`, background: 'var(--hb-magenta)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: 10, fontWeight: 600 }}>{y.girls}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 18, marginTop: 8, paddingTop: 12, borderTop: '1px solid var(--hb-rule)', fontSize: 12 }}>
        <span><span style={{display:'inline-block',width:10,height:10,background:'var(--hb-royal)',borderRadius:2,verticalAlign:'middle',marginRight:5}} />Boys 530</span>
        <span><span style={{display:'inline-block',width:10,height:10,background:'var(--hb-magenta)',borderRadius:2,verticalAlign:'middle',marginRight:5}} />Girls 474</span>
        <span style={{ marginLeft: 'auto', color: 'var(--hb-mute)' }}>53% boarding · 47% day</span>
      </div>
    </div>
  );

  const PipelinePanel = ({ title = 'Admissions pipeline', showRejected = false }) => {
    const pipe = D.admissions.pipeline;
    const max = pipe[0].count;
    const totalRejected = pipe[pipe.length - 1].rejected;
    return (
      <div style={{ background: 'var(--hb-card)', border: '1px solid var(--hb-rule)', padding: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
          <h3 className="hb-serif" style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>{title}</h3>
          <span style={{ fontSize: 11, color: 'var(--hb-mute)' }}>Conversion <b style={{ color: 'var(--hb-green)' }}>41%</b> · LY 38%</span>
        </div>
        {pipe.map((p, i) => (
          <div key={p.stage} style={{ display: 'grid', gridTemplateColumns: '100px 1fr 60px 50px', gap: 10, alignItems: 'center', padding: '5px 0', fontSize: 12 }}>
            <span>{p.stage}</span>
            <HorizBar value={p.count} max={max} color="var(--hb-magenta)" height={10} />
            <span className="hb-serif" style={{ fontWeight: 700, textAlign: 'right' }}>{p.count}</span>
            <span style={{ fontSize: 10, color: 'var(--hb-green)', textAlign: 'right' }}>+{p.delta} wk</span>
          </div>
        ))}
        {showRejected && (
          <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr 60px 50px', gap: 10, alignItems: 'center', padding: '5px 0', fontSize: 12, marginTop: 6, paddingTop: 10, borderTop: '1px solid var(--hb-rule)' }}>
            <span style={{ color: 'var(--hb-red)' }}>Rejected</span>
            <HorizBar value={totalRejected} max={max} color="var(--hb-red)" height={10} />
            <span className="hb-serif" style={{ fontWeight: 700, textAlign: 'right', color: 'var(--hb-red)' }}>{totalRejected}</span>
            <span style={{ fontSize: 10, color: 'var(--hb-mute)', textAlign: 'right' }}>cum.</span>
          </div>
        )}
      </div>
    );
  };

  // Muted line colours for previous-year overlays on the pipeline graph.
  const PIPELINE_PREV_COLORS = ['#a99e94', '#c8aa6b'];

  // Small line-swatch toggle pill used by the pipeline graph header.
  const TogglePill = ({ on, onClick, color, label, dash }) => (
    <button onClick={onClick} title={label} style={{
      display: 'inline-flex', alignItems: 'center', gap: 7,
      border: '1px solid ' + (on ? 'var(--hb-magenta)' : 'var(--hb-rule)'),
      background: on ? 'var(--hb-magenta-10)' : 'transparent',
      color: on ? 'var(--hb-magenta)' : 'var(--hb-ink-2)',
      padding: '4px 11px', borderRadius: 999, fontSize: 11, cursor: 'pointer',
      fontFamily: 'inherit', fontWeight: 600,
    }}>
      <svg width="18" height="8"><line x1="0" y1="4" x2="18" y2="4" stroke={on ? color : 'var(--hb-mute)'} strokeWidth="2.5" strokeDasharray={dash ? '4 3' : 'none'} strokeLinecap="round" /></svg>
      {label}
    </button>
  );

  // Admissions pipeline as a compact, interactive multi-series line graph.
  // X-axis is fixed Enquiries → Enrolled; toggles overlay rejected, targets and
  // previous-year funnels; hovering reveals every visible series at a stage.
  const PipelineLineChart = ({ admissions }) => {
    const stages   = admissions.pipeline.map(p => p.stage);
    const current  = admissions.pipeline.map(p => p.count);
    const targets  = admissions.pipeline.map(p => p.target);
    const rejected = admissions.pipeline.map(p => p.rejected);
    const history  = admissions.pipelineHistory || {};
    const histYears = Object.keys(history);

    const [showRejected, setShowRejected] = useState(true);
    const [showTargets,  setShowTargets]  = useState(true);
    const [showPrev,     setShowPrev]     = useState(false);
    const [hover,        setHover]        = useState(null);

    // Build the visible series stack (draw order = array order).
    const series = [];
    series.push({ id: 'cur', label: '2025/26 intake', color: 'var(--hb-magenta)', width: 2.5, dash: null, values: current, markers: true, valueLabels: true, area: true });
    if (showRejected) series.push({ id: 'rej', label: 'Rejected', color: 'var(--hb-red)', width: 1.85, dash: '5 4', values: rejected, markers: true });
    if (showTargets)  series.push({ id: 'tgt', label: 'Target', color: 'var(--hb-royal)', width: 1.6, dash: '3 4', values: targets });
    if (showPrev) histYears.forEach((yr, i) => {
      series.push({ id: yr, label: yr, color: PIPELINE_PREV_COLORS[i % PIPELINE_PREV_COLORS.length], width: 1.4, dash: null, values: history[yr], faded: true });
    });

    // Y-scale anchored at 0 with a rounded ceiling.
    const maxV = Math.max(0, ...series.flatMap(s => s.values));
    const roundTo = maxV > 200 ? 100 : maxV > 50 ? 25 : 10;
    const niceMax = Math.max(roundTo, Math.ceil(maxV / roundTo) * roundTo);

    const W = 960, H = 224, padL = 44, padR = 40, padT = 18, padB = 34;
    const plotW = W - padL - padR, plotH = H - padT - padB, n = stages.length;
    const X = i => padL + (n === 1 ? 0 : (i / (n - 1)) * plotW);
    const Y = v => padT + plotH - (v / niceMax) * plotH;
    const ticks = [0, 1, 2, 3, 4, 5].map(t => Math.round(niceMax * t / 5));

    const linePath = vals => vals.map((v, i) => `${i === 0 ? 'M' : 'L'}${X(i).toFixed(1)} ${Y(v).toFixed(1)}`).join(' ');
    const areaPath = vals => linePath(vals) + ` L${X(n - 1).toFixed(1)} ${(padT + plotH).toFixed(1)} L${X(0).toFixed(1)} ${(padT + plotH).toFixed(1)} Z`;

    // Map a pointer position to the nearest stage index.
    const onMove = (e) => {
      const r = e.currentTarget.getBoundingClientRect();
      if (!r.width) return;
      const vbx = ((e.clientX - r.left) / r.width) * W;
      const idx = Math.round((vbx - padL) / plotW * (n - 1));
      setHover(Math.max(0, Math.min(n - 1, idx)));
    };

    // Tooltip geometry, computed only while hovering.
    const tip = (() => {
      if (hover == null) return null;
      const tw = 188, headerH = 22, rowH = 16;
      const th = headerH + series.length * rowH + 8;
      let tx = X(hover) + 14;
      if (tx + tw > W - 6) tx = X(hover) - 14 - tw;
      tx = Math.max(6, tx);
      return { tw, th, tx, ty: padT + 6, headerH, rowH };
    })();

    return (
      <div style={{ background: 'var(--hb-card)', border: '1px solid var(--hb-rule)', padding: 16 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12, marginBottom: 12, flexWrap: 'wrap' }}>
          <div>
            <h3 className="hb-serif" style={{ margin: 0, fontSize: 16, fontWeight: 700 }}>Admissions pipeline</h3>
            <div style={{ fontSize: 11, color: 'var(--hb-mute)', marginTop: 2 }}>
              Enquiries → Enrolled · {current[n - 1]} of {current[0]} · <span style={{ fontStyle: 'italic' }}>hover for detail</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <TogglePill on={showRejected} onClick={() => setShowRejected(v => !v)} color="var(--hb-red)" dash label="Rejected" />
            <TogglePill on={showTargets} onClick={() => setShowTargets(v => !v)} color="var(--hb-royal)" dash label="Targets" />
            <TogglePill on={showPrev} onClick={() => setShowPrev(v => !v)} color={PIPELINE_PREV_COLORS[0]} label="Previous years" />
          </div>
        </div>

        <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
          {/* horizontal gridlines + y-axis labels */}
          {ticks.map((t, i) => (
            <g key={'y' + i}>
              <line x1={padL} x2={W - padR} y1={Y(t)} y2={Y(t)} stroke="var(--hb-rule)" strokeWidth="1" strokeDasharray={i === 0 ? 'none' : '2 4'} />
              <text x={padL - 8} y={Y(t) + 3.5} textAnchor="end" fontSize="10" fill="var(--hb-mute)" fontFamily="var(--font-mono)">{t}</text>
            </g>
          ))}
          {/* stage guides + x-axis labels */}
          {stages.map((s, i) => (
            <g key={'x' + s}>
              <line x1={X(i)} x2={X(i)} y1={padT} y2={padT + plotH} stroke="var(--hb-rule)" strokeWidth="1" strokeDasharray="2 5" opacity={hover === i ? 0 : 0.5} />
              <text x={X(i)} y={padT + plotH + 20} textAnchor="middle" fontSize="11" fontWeight={hover === i ? 700 : 600} fill={hover === i ? 'var(--hb-magenta)' : 'var(--hb-ink-2)'} fontFamily="var(--font-sans)">{s}</text>
            </g>
          ))}
          {/* subtle area under the current funnel */}
          {series.filter(s => s.area).map(se => (
            <path key={'a' + se.id} d={areaPath(se.values)} fill={se.color} opacity="0.06" />
          ))}
          {/* series lines */}
          {series.map(se => (
            <path key={'p' + se.id} d={linePath(se.values)} fill="none" stroke={se.color} strokeWidth={se.width}
              strokeDasharray={se.dash || 'none'} strokeLinecap="round" strokeLinejoin="round" opacity={se.faded ? 0.55 : 1} />
          ))}
          {/* point markers */}
          {series.filter(s => s.markers).map(se => (
            <g key={'m' + se.id}>
              {se.values.map((v, i) => <circle key={i} cx={X(i)} cy={Y(v)} r="3" fill="var(--hb-card)" stroke={se.color} strokeWidth="2" />)}
            </g>
          ))}
          {/* value labels on the current funnel (dim the non-hovered ones) */}
          {series.filter(s => s.valueLabels).map(se => (
            <g key={'l' + se.id}>
              {se.values.map((v, i) => <text key={i} x={X(i)} y={Y(v) - 9} textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="var(--font-serif)" fill="var(--hb-ink)" opacity={hover == null || hover === i ? 1 : 0.35}>{v}</text>)}
            </g>
          ))}
          {/* hover layer: crosshair, highlighted points and tooltip */}
          {hover != null && tip && (
            <g style={{ pointerEvents: 'none' }}>
              <line x1={X(hover)} x2={X(hover)} y1={padT} y2={padT + plotH} stroke="var(--hb-ink-2)" strokeWidth="1" opacity="0.45" />
              {series.map(se => (
                <circle key={'hv' + se.id} cx={X(hover)} cy={Y(se.values[hover])} r="4.5" fill={se.color} stroke="var(--hb-card)" strokeWidth="2" opacity={se.faded ? 0.7 : 1} />
              ))}
              <rect x={tip.tx} y={tip.ty} width={tip.tw} height={tip.th} rx="5" fill="var(--hb-card)" stroke="var(--hb-rule)" strokeWidth="1" />
              <text x={tip.tx + 10} y={tip.ty + 15} fontSize="12" fontWeight="700" fontFamily="var(--font-serif)" fill="var(--hb-ink)">{stages[hover]}</text>
              {series.map((se, k) => {
                const ry = tip.ty + tip.headerH + k * tip.rowH + 8;
                return (
                  <g key={'tr' + se.id}>
                    <rect x={tip.tx + 10} y={ry - 7} width="9" height="9" rx="1.5" fill={se.color} opacity={se.faded ? 0.7 : 1} />
                    <text x={tip.tx + 24} y={ry} fontSize="11" fill="var(--hb-ink-2)" fontFamily="var(--font-sans)">{se.label}</text>
                    <text x={tip.tx + tip.tw - 10} y={ry} textAnchor="end" fontSize="11" fontWeight="700" fontFamily="var(--font-mono)" fill="var(--hb-ink)">{se.values[hover]}</text>
                  </g>
                );
              })}
            </g>
          )}
          {/* transparent hit area (kept last so it captures the pointer) */}
          <rect x="0" y="0" width={W} height={H} fill="transparent" style={{ cursor: 'crosshair' }} onMouseMove={onMove} onMouseLeave={() => setHover(null)} />
        </svg>

        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginTop: 8, paddingTop: 10, borderTop: '1px solid var(--hb-rule)', fontSize: 11.5 }}>
          {series.map(se => (
            <span key={'lg' + se.id} style={{ display: 'inline-flex', alignItems: 'center', gap: 7, color: 'var(--hb-ink-2)' }}>
              <svg width="20" height="10"><line x1="0" y1="5" x2="20" y2="5" stroke={se.color} strokeWidth={se.width} strokeDasharray={se.dash || 'none'} strokeLinecap="round" opacity={se.faded ? 0.55 : 1} /></svg>
              {se.label}
            </span>
          ))}
        </div>
      </div>
    );
  };

  // Area chart (reused)
  const AreaChart = ({ actual, forecast, benchmark, height = 160 }) => {
    const all = [...actual, ...forecast, ...(benchmark || [])];
    const min = Math.min(...all), max = Math.max(...all);
    const range = max - min || 1;
    const W = 600, H = height;
    const path = (arr) => arr.map((v, i) => {
      const x = (i / (arr.length - 1)) * W;
      const y = H - ((v - min) / range) * (H - 24) - 12;
      return `${i===0?'M':'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(' ');
    const area = (arr) => path(arr) + ` L${W} ${H} L0 ${H} Z`;
    return (
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ display: 'block' }}>
        {[0.2, 0.4, 0.6, 0.8].map(p => <line key={p} x1="0" x2={W} y1={H*p} y2={H*p} stroke="var(--hb-rule)" strokeDasharray="2 4" />)}
        <path d={area(forecast)} fill="var(--hb-grey)" opacity=".08" />
        <path d={path(forecast)} fill="none" stroke="var(--hb-grey)" strokeWidth="1.5" strokeDasharray="4 4" />
        <path d={area(actual)} fill="var(--hb-magenta)" opacity=".15" />
        <path d={path(actual)} fill="none" stroke="var(--hb-magenta)" strokeWidth="2.5" />
        {benchmark && (
          <path d={path(benchmark)} fill="none" stroke="var(--hb-royal)" strokeWidth="1.75" strokeDasharray="6 3" opacity=".75" />
        )}
      </svg>
    );
  };

  // Section-specific deep pages (reuse simpler views)
  const SectionDeep = ({ tab, period, showBenchmarks }) => {
    const titleMap = {
      admissions: 'Admissions & Pipeline',
      academic:   'Academic Performance',
      pastoral:   'Pastoral Care',
      people:     'People & Policies',
      cocurr:     'Co-Curricular',
      finance:    'Finance & Operations',
    };
    const rendererMap = {
      admissions: AdmissionsDeep,
      academic:   AcademicDeep,
      pastoral:   PastoralDeep,
      people:     PeopleDeep,
      cocurr:     CoCurrDeep,
      finance:    FinanceDeep,
    };
    const sectionBmKey = tab; // matches D.sectionBenchmarks[tab]
    const periodLabel = (D.periods[period] || D.periods.week).label;
    const R = rendererMap[tab];
    return (
      <div>
        <h2 className="hb-serif" style={{ margin: '0 0 4px', fontSize: 32, fontWeight: 800, letterSpacing: '-.01em' }}>{titleMap[tab]}</h2>
        <div style={{ fontSize: 13, color: 'var(--hb-mute)', marginBottom: 22 }}>
          {periodLabel} · 21 April 2026{showBenchmarks && <span style={{ marginLeft: 10, color: 'var(--hb-magenta)', fontWeight: 600 }}>· benchmarks on</span>}
        </div>
        <R period={period} showBenchmarks={showBenchmarks} sectionKey={sectionBmKey} />
      </div>
    );
  };

  // Helper: pull the i-th hero override for a section in the active period.
  const heroAt = (sectionKey, period, i) => {
    const arr = (D.sectionPeriods[sectionKey] && D.sectionPeriods[sectionKey][period]) || [];
    return arr[i] || {};
  };
  const benchmarkAt = (sectionKey, i, on) => {
    if (!on) return null;
    const arr = D.sectionBenchmarks[sectionKey] || [];
    return arr[i] || null;
  };

  const AdmissionsDeep = ({ period, showBenchmarks, sectionKey }) => {
    const a = D.admissions;
    const h = (i) => heroAt(sectionKey, period, i);
    const b = (i) => benchmarkAt(sectionKey, i, showBenchmarks);
    return (
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 22 }}>
          <HeroKPI label="On roll"     value={h(0).value} rag="green" delta={h(0).delta} note={h(0).note} benchmark={b(0)} />
          <HeroKPI label="Boarding %"  value={h(1).value} unit="%"   rag="amber" delta={h(1).delta} note={h(1).note} accent="var(--hb-amber)" benchmark={b(1)} />
          <HeroKPI label="Conversion" value={h(2).value} unit="%"   rag="green" delta={h(2).delta} note={h(2).note} accent="var(--hb-green)" benchmark={b(2)} />
          <HeroKPI label="Withdrawals" value={h(3).value} rag="green" delta={h(3).delta} note={h(3).note} benchmark={b(3)} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <PipelineLineChart admissions={a} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <PipelinePanel title="Pipeline by stage" showRejected />
          <YearGenderPanel />
        </div>
      </div>
    );
  };

  // Projected GCSE results — average grade across ~10 GCSEs per pupil, with the
  // 9 → ≤3 grade spread underneath.
  const GcsePanel = () => {
    const g = D.academic.projectedGCSE;
    const dist = Object.entries(g.distribution);
    const max = Math.max(...dist.map(([, v]) => v));
    const gradeColor = (k) =>
      (k === '9' || k === '8' || k === '7') ? 'var(--hb-green)' :
      (k === '6' || k === '5') ? 'var(--hb-magenta)' :
      (k === '4') ? 'var(--hb-amber)' : 'var(--hb-red)';
    return (
      <div style={{ background: 'var(--hb-card)', border: '1px solid var(--hb-rule)', padding: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 12 }}>
          <h3 className="hb-serif" style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Projected GCSE results</h3>
          <span style={{ fontSize: 11, color: 'var(--hb-mute)' }}>avg of {g.perPupil} GCSEs / pupil</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 6 }}>
          <span className="hb-serif" style={{ fontSize: 46, fontWeight: 800, lineHeight: .95, color: 'var(--hb-ink)' }}>{g.value}</span>
          <span style={{ fontSize: 13, color: 'var(--hb-mute)' }}>avg grade</span>
          <span style={{ marginLeft: 'auto', fontSize: 12 }}><Delta value={g.vsLY} suffix=" v LY" /></span>
        </div>
        <div style={{ display: 'flex', gap: 18, fontSize: 11.5, color: 'var(--hb-mute)', marginBottom: 14 }}>
          <span>Grades 9–7 <b style={{ color: 'var(--hb-green)' }}>{g.grade9to7Pct}%</b></span>
          <span>Grades 9–4 <b style={{ color: 'var(--hb-ink-2)' }}>{g.grade9to4Pct}%</b></span>
        </div>
        <div style={{ paddingTop: 12, borderTop: '1px solid var(--hb-rule)' }}>
          {dist.map(([k, v]) => (
            <div key={k} style={{ display: 'grid', gridTemplateColumns: '54px 1fr 38px', gap: 10, alignItems: 'center', padding: '3px 0', fontSize: 12 }}>
              <span>{k === '≤3' ? '≤ 3' : 'Grade ' + k}</span>
              <HorizBar value={v} max={max} color={gradeColor(k)} height={9} />
              <span className="hb-serif" style={{ fontWeight: 700, textAlign: 'right' }}>{v}%</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Attitude to Learning from interim reports — per year group, split into
  // in-the-classroom vs outside-the-classroom, across the four report bands.
  const ATL_BANDS_COLORS = ['var(--hb-red)', 'var(--hb-amber)', 'var(--hb-green)', 'var(--hb-royal)'];
  const AtlReportsPanel = () => {
    const r = D.academic.atlReports;
    const colors = ATL_BANDS_COLORS;
    const StackBar = ({ data }) => (
      <div style={{ display: 'flex', height: 18, borderRadius: 2, overflow: 'hidden' }}>
        {data.map((v, i) => (
          <div key={i} title={`${r.bands[i]}: ${v}%`} style={{
            width: `${v}%`, background: colors[i], display: 'flex', alignItems: 'center',
            justifyContent: 'center', color: '#fff', fontSize: 9.5, fontWeight: 600,
          }}>{v >= 12 ? v : ''}</div>
        ))}
      </div>
    );
    return (
      <div style={{ background: 'var(--hb-card)', border: '1px solid var(--hb-rule)', padding: 22 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 8 }}>
          <h3 className="hb-serif" style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Attitude to Learning — interim reports</h3>
          <span style={{ fontSize: 11, color: 'var(--hb-mute)' }}>% of pupils by year group · in vs outside the classroom</span>
        </div>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', margin: '12px 0 16px', fontSize: 11.5 }}>
          {r.bands.map((bnd, i) => (
            <span key={bnd} style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--hb-ink-2)' }}>
              <span style={{ width: 11, height: 11, borderRadius: 2, background: colors[i] }} />{bnd}
            </span>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '44px 1fr 1fr', gap: 16, marginBottom: 6 }}>
          <span />
          <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--hb-mute)', fontWeight: 700 }}>In the classroom</span>
          <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--hb-mute)', fontWeight: 700 }}>Outside the classroom</span>
        </div>
        {r.byYear.map(y => (
          <div key={y.year} style={{ display: 'grid', gridTemplateColumns: '44px 1fr 1fr', gap: 16, alignItems: 'center', padding: '7px 0', borderTop: '1px solid var(--hb-rule)' }}>
            <span className="hb-serif" style={{ fontWeight: 700, fontSize: 14 }}>{y.year}</span>
            <StackBar data={y.inClass} />
            <StackBar data={y.outClass} />
          </div>
        ))}
        <div style={{ marginTop: 12, paddingTop: 10, borderTop: '1px solid var(--hb-rule)', fontSize: 11, color: 'var(--hb-mute)' }}>
          Source: interim reports · bands: Needs improvement → Meeting → Exceeding → Exceptional
        </div>
      </div>
    );
  };

  const AcademicDeep = ({ period, showBenchmarks, sectionKey }) => {
    const a = D.academic;
    const h = (i) => heroAt(sectionKey, period, i);
    const b = (i) => benchmarkAt(sectionKey, i, showBenchmarks);
    return (
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 22 }}>
          <HeroKPI label="A-Level avg"      value={h(0).value} rag="green" delta={h(0).delta} note={h(0).note} benchmark={b(0)} />
          <HeroKPI label="IB points"        value={h(1).value} rag="green" delta={h(1).delta} note={h(1).note} accent="var(--hb-royal)" benchmark={b(1)} />
          <HeroKPI label="Oxbridge offers"  value={h(2).value} rag="green" delta={h(2).delta} note={h(2).note} benchmark={b(2)} />
          <HeroKPI label="Assignment comp." value={h(3).value} unit="%"   rag="green" delta={h(3).delta} note={h(3).note} accent="var(--hb-green)" benchmark={b(3)} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <AtlReportsPanel />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <GcsePanel />
          <div style={{ background: 'var(--hb-card)', border: '1px solid var(--hb-rule)', padding: 22 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
              <h3 className="hb-serif" style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Yellow tickets & flags</h3>
              <span style={{ fontSize: 11, color: 'var(--hb-mute)' }}>12 weeks</span>
            </div>
            <div style={{ marginBottom: 10 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                <span>Yellow tickets</span>
                <span className="hb-serif" style={{ fontWeight: 700 }}>{a.yellowTickets.value.toLocaleString()}</span>
              </div>
              <Sparkline data={a.ticketTrend} width={320} height={60} color="var(--hb-magenta)" />
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, marginBottom: 4 }}>
                <span>Academic flags</span>
                <span className="hb-serif" style={{ fontWeight: 700 }}>{a.academicFlags.value}</span>
              </div>
              <Sparkline data={a.flagsTrend} width={320} height={50} color="var(--hb-amber)" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PastoralDeep = ({ period, showBenchmarks, sectionKey }) => {
    const p = D.pastoral;
    const h = (i) => heroAt(sectionKey, period, i);
    const b = (i) => benchmarkAt(sectionKey, i, showBenchmarks);
    return (
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 22 }}>
          <HeroKPI label="Attendance" value={h(0).value} unit="%" rag="green" delta={h(0).delta} note={h(0).note} accent="var(--hb-green)" benchmark={b(0)} />
          <HeroKPI label="CPOMS"      value={h(1).value} rag="amber" delta={h(1).delta} note={h(1).note} accent="var(--hb-amber)" benchmark={b(1)} />
          <HeroKPI label="Counselling" value={h(2).value} rag="amber" delta={h(2).delta} note={h(2).note} accent="var(--hb-amber)" benchmark={b(2)} />
          <HeroKPI label="Detentions" value={h(3).value} rag="amber" delta={h(3).delta} note={h(3).note} benchmark={b(3)} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div style={{ background: 'var(--hb-card)', border: '1px solid var(--hb-rule)', padding: 22 }}>
            <h3 className="hb-serif" style={{ margin: '0 0 14px', fontSize: 18, fontWeight: 700 }}>Steer — pupil wellbeing index</h3>
            {Object.entries(p.steerMetric).filter(([k]) => k !== 'rag').map(([k, v]) => (
              <div key={k} style={{ marginBottom: 14 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginBottom: 4, textTransform: 'capitalize' }}>
                  <span>{k}</span>
                  <span className="hb-serif" style={{ fontWeight: 700 }}>{v}<span style={{ fontSize: 11, color: 'var(--hb-mute)' }}>/10</span></span>
                </div>
                <HorizBar value={v} max={10} color="var(--hb-green)" height={8} />
              </div>
            ))}
          </div>
          <div style={{ background: 'var(--hb-card)', border: '1px solid var(--hb-rule)', padding: 22 }}>
            <h3 className="hb-serif" style={{ margin: '0 0 14px', fontSize: 18, fontWeight: 700 }}>Attendance — last 7 days</h3>
            <Sparkline data={p.attendanceTrend} width={380} height={140} color="var(--hb-green)" strokeWidth={2.5} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--hb-mute)', marginTop: 8 }}>
              <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const PeopleDeep = ({ period, showBenchmarks, sectionKey }) => {
    const p = D.people;
    const h = (i) => heroAt(sectionKey, period, i);
    const b = (i) => benchmarkAt(sectionKey, i, showBenchmarks);
    return (
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 22 }}>
          <HeroKPI label="SCR complete" value={h(0).value} unit="%" rag="green" delta={h(0).delta} note={h(0).note} accent="var(--hb-green)" benchmark={b(0)} />
          <HeroKPI label="Safeguarding" value={h(1).value} unit="%" rag="amber" delta={h(1).delta} note={h(1).note} accent="var(--hb-amber)" benchmark={b(1)} />
          <HeroKPI label="Vacancies"    value={h(2).value} rag="amber" delta={h(2).delta} note={h(2).note} benchmark={b(2)} />
          <HeroKPI label="Turnover"     value={h(3).value} unit="%" rag="green" delta={h(3).delta} note={h(3).note} benchmark={b(3)} />
        </div>
        <div style={{ background: 'var(--hb-card)', border: '1px solid var(--hb-rule)', padding: 22 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
            <h3 className="hb-serif" style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Policy renewal schedule</h3>
            <span style={{ fontSize: 12 }}><b>{p.policyRenewal.reviewedYTD}</b>/{p.policyRenewal.planned} reviewed YTD · <RAGPill status="amber" label="AMBER" /></span>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--hb-ink)' }}>
                <th style={{ textAlign: 'left', padding: 8, fontSize: 10, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--hb-mute)' }}>Policy</th>
                <th style={{ textAlign: 'left', padding: 8, fontSize: 10, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--hb-mute)' }}>Due</th>
                <th style={{ textAlign: 'left', padding: 8, fontSize: 10, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--hb-mute)' }}>Status</th>
                <th style={{ textAlign: 'right', padding: 8, fontSize: 10, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--hb-mute)' }}>Days to</th>
              </tr>
            </thead>
            <tbody>
              {p.policyRenewal.upcoming.map((pol, i) => {
                const days = Math.round((new Date(pol.due) - D.today) / 86400000);
                return (
                  <tr key={i} style={{ borderBottom: '1px solid var(--hb-rule)' }}>
                    <td style={{ padding: 10, fontFamily: 'var(--font-serif)', fontWeight: 700 }}>{pol.name}</td>
                    <td style={{ padding: 10 }}>{new Date(pol.due).toLocaleDateString('en-GB', { weekday:'short', day:'2-digit', month:'short' })}</td>
                    <td style={{ padding: 10 }}><span style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '.06em', color: pol.status==='Draft'?'var(--hb-amber)':'var(--hb-ink-2)', fontWeight: 600 }}>{pol.status}</span></td>
                    <td style={{ padding: 10, textAlign: 'right', color: days<14?'var(--hb-amber)':'var(--hb-mute)', fontWeight: 600 }}>{days}d</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    );
  };

  const CoCurrDeep = ({ period, showBenchmarks, sectionKey }) => {
    const c = D.coCurricular;
    const sr = c.sportsResults;
    const segs = [
      { label: 'W', value: sr.win,  color: 'var(--hb-green)' },
      { label: 'D', value: sr.draw, color: 'var(--hb-amber)' },
      { label: 'L', value: sr.loss, color: 'var(--hb-grey)' },
    ];
    const h = (i) => heroAt(sectionKey, period, i);
    const b = (i) => benchmarkAt(sectionKey, i, showBenchmarks);
    return (
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 22 }}>
          <HeroKPI label="Fixtures"      value={h(0).value} rag="green" delta={h(0).delta} note={h(0).note} benchmark={b(0)} />
          <HeroKPI label="Win rate"      value={h(1).value} unit="%" rag="green" delta={h(1).delta} note={h(1).note} accent="var(--hb-green)" benchmark={b(1)} />
          <HeroKPI label="Activity att." value={h(2).value} unit="%" rag="green" delta={h(2).delta} note={h(2).note} benchmark={b(2)} />
          <HeroKPI label="Music / LAMDA" value={h(3).value} unit="%" rag="green" delta={h(3).delta} note={h(3).note} accent="var(--hb-royal)" benchmark={b(3)} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 20 }}>
          <div style={{ background: 'var(--hb-card)', border: '1px solid var(--hb-rule)', padding: 22, textAlign: 'center' }}>
            <h3 className="hb-serif" style={{ margin: '0 0 14px', fontSize: 18, fontWeight: 700, textAlign: 'left' }}>Sports results — season</h3>
            <Donut segments={segs} size={180} strokeWidth={32} centerLabel={`${sr.fixtures}`} centerSub="FIXTURES" />
            <div style={{ display: 'flex', justifyContent: 'center', gap: 14, marginTop: 10, fontSize: 13 }}>
              {segs.map(s => (
                <span key={s.label}><span style={{display:'inline-block',width:10,height:10,background:s.color,marginRight:5,borderRadius:2}} /><b>{s.label}</b> {s.value}%</span>
              ))}
            </div>
          </div>
          <div style={{ background: 'var(--hb-card)', border: '1px solid var(--hb-rule)', padding: 22 }}>
            <h3 className="hb-serif" style={{ margin: '0 0 14px', fontSize: 18, fontWeight: 700 }}>Upcoming fixtures & trips</h3>
            {c.upcomingFixtures.map((f, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 100px 30px', gap: 10, padding: '9px 0', borderTop: i===0?'none':'1px solid var(--hb-rule)', fontSize: 13 }}>
                <span className="hb-serif" style={{ fontWeight: 700 }}>{f.sport}</span>
                <span style={{ color: 'var(--hb-ink-2)' }}>v {f.opponent}</span>
                <span style={{ color: 'var(--hb-mute)' }}>{f.when}</span>
                <span style={{ fontSize: 10, fontWeight: 700, color: f.home?'var(--hb-magenta)':'var(--hb-mute)' }}>{f.home?'HOME':'AWAY'}</span>
              </div>
            ))}
            <div style={{ marginTop: 14, paddingTop: 14, borderTop: '2px solid var(--hb-ink)' }}>
              <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--hb-mute)', fontWeight: 700, marginBottom: 8 }}>Trips in progress</div>
              {c.currentTrips.map((t, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '5px 0' }}>
                  <span className="hb-serif" style={{ fontWeight: 700 }}>{t.name}</span>
                  <span style={{ color: 'var(--hb-mute)' }}>{t.pupils} pupils · {t.staff} staff · returns {new Date(t.returns).toLocaleDateString('en-GB', { day:'2-digit', month:'short' })}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  };

  const FinanceDeep = ({ period, showBenchmarks, sectionKey }) => {
    const f = D.finance;
    const h = (i) => heroAt(sectionKey, period, i);
    const b = (i) => benchmarkAt(sectionKey, i, showBenchmarks);
    return (
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 22 }}>
          <HeroKPI label="Core surplus" value={h(0).value} rag="green" delta={h(0).delta} note={h(0).note} benchmark={b(0)} />
          <HeroKPI label="Net surplus"  value={h(1).value} rag="green" delta={h(1).delta} note={h(1).note} accent="var(--hb-royal)" benchmark={b(1)} />
          <HeroKPI label="Capex"        value={h(2).value} rag="amber" delta={h(2).delta} note={h(2).note} accent="var(--hb-amber)" benchmark={b(2)} />
          <HeroKPI label="Fee arrears"  value={h(3).value} rag="amber" delta={h(3).delta} note={h(3).note} accent="var(--hb-amber)" benchmark={b(3)} />
        </div>
        <div style={{ background: 'var(--hb-card)', border: '1px solid var(--hb-rule)', padding: 18, marginBottom: 20 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 10 }}>
            <h3 className="hb-serif" style={{ margin: 0, fontSize: 15, fontWeight: 700 }}>Cashflow — 12 month</h3>
            {showBenchmarks && <span style={{ fontSize: 11, color: 'var(--hb-magenta)' }}>· sector overlay</span>}
          </div>
          <AreaChart actual={f.cashflowTrend} forecast={f.budgetTrend} benchmark={showBenchmarks ? D.benchmarks.cashflow : null} height={110} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16 }}>
          <MiniStat label="EBITDA" value={`£${f.ebitda.actual}m`} sub={`bud £${f.ebitda.budget}m · fcst £${f.ebitda.forecast}m`} rag="green" />
          <MiniStat label="Covenant cover" value={`${f.covenantCover.value}x`} sub={`covenant ${f.covenantCover.covenant}x`} rag="green" />
          <MiniStat label="Fundraising" value={`£${f.fundraising.raised}k`} sub={`v target £${f.fundraising.target}k`} rag="amber" />
          <MiniStat label="Fire tests" value={`${f.fireTests.value}%`} sub="all on track" rag="green" />
        </div>
      </div>
    );
  };

  const ExecutiveBrief = () => {
    const [tab, setTab] = useState('overview');
    const [filters, setFilters] = useState(window.HBY.defaultFilters);
    const [period, setPeriod] = useState('week');
    const [showBenchmarks, setShowBenchmarks] = useState(false);
    return (
      <div style={{ width: '100%', height: '100%', background: 'var(--hb-paper)', overflow: 'auto', fontFamily: 'var(--font-sans)' }} className="hb-scroll">
        <TopBar
          tab={tab} setTab={setTab}
          filters={filters} setFilters={setFilters}
          period={period} setPeriod={setPeriod}
          showBenchmarks={showBenchmarks} setShowBenchmarks={setShowBenchmarks}
        />
        <div style={{ padding: '28px 36px 60px' }}>
          {tab === 'overview'
            ? <Overview setTab={setTab} period={period} showBenchmarks={showBenchmarks} />
            : <SectionDeep tab={tab} period={period} showBenchmarks={showBenchmarks} />}
        </div>
      </div>
    );
  };

  window.ExecutiveBrief = ExecutiveBrief;
})();
