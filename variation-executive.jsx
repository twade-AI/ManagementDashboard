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

  const TopBar = ({ tab, setTab, filters, setFilters }) => (
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
            {['Today', 'Week', 'Term', 'YTD'].map(p => (
              <button key={p} style={{
                border: '1px solid var(--hb-rule)',
                background: p==='Week' ? 'var(--hb-magenta)' : 'transparent',
                color: p==='Week' ? '#fff' : 'var(--hb-ink-2)',
                padding: '3px 10px', borderRadius: 999, fontSize: 11, cursor: 'pointer',
              }}>{p}</button>
            ))}
          </div>
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
  const HeroKPI = ({ label, value, unit, rag, delta, note, accent = 'var(--hb-magenta)' }) => (
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
    </div>
  );

  // Overview layout — 2×3 hero grid + lower panels
  const Overview = ({ setTab }) => {
    const a = D.admissions, ac = D.academic, p = D.pastoral, pe = D.people, f = D.finance;
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
        {/* Hero strip: six critical metrics */}
        <div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 14, marginBottom: 14 }}>
            <h2 className="hb-serif" style={{ margin: 0, fontSize: 26, fontWeight: 800, letterSpacing: '-.01em' }}>The Morning Brief</h2>
            <span style={{ fontSize: 12, color: 'var(--hb-mute)', fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>As of 08:30 · auto-refresh every 15 min</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
            <HeroKPI label="Pupils on roll" value={a.onRoll.value} rag="green" delta={{ value: +4, suffix: ' v bud' }} note="+12 v last year" />
            <HeroKPI label="Attendance" value={p.attendance.value} unit="%" rag="green" delta={{ value: +0.2, suffix: ' v LY' }} note="Target 96.0%" accent="var(--hb-green)" />
            <HeroKPI label="Projected net surplus" value="£2.5m" rag="green" delta={{ value: '+188', suffix: 'k v bud' }} note="Core £1.9m" accent="var(--hb-royal)" />
            <HeroKPI label="IB average points" value={ac.projectedIB.value} rag="green" delta={{ value: +0.6, suffix: ' v LY' }} note="Max 45" />
            <HeroKPI label="Oxbridge offers" value={`${ac.oxbridge.offers}`} rag="green" delta={{ value: '+4', suffix: ' v target' }} note={`${ac.oxbridge.applications} applications`} accent="var(--hb-royal)" />
            <HeroKPI label="Safeguarding trained" value={pe.safeguarding.value} unit="%" rag="amber" delta={null} note="2 staff outstanding" accent="var(--hb-amber)" />
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
              <span style={{ fontSize: 11, color: 'var(--hb-mute)' }}>12mo rolling · £m</span>
            </div>
            <AreaChart actual={f.cashflowTrend} forecast={f.budgetTrend} height={160} />
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
              <h3 className="hb-serif" style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Activity today</h3>
              <span style={{ fontSize: 11, color: 'var(--hb-mute)' }}>{D.feed.length} events</span>
            </div>
            <div style={{ maxHeight: 340, overflow: 'auto' }} className="hb-scroll">
              {D.feed.map((ev, i) => (
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

  const PipelinePanel = () => (
    <div style={{ background: 'var(--hb-card)', border: '1px solid var(--hb-rule)', padding: 22 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 14 }}>
        <h3 className="hb-serif" style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Admissions pipeline</h3>
        <span style={{ fontSize: 11, color: 'var(--hb-mute)' }}>Conversion <b style={{ color: 'var(--hb-green)' }}>41%</b> · LY 38%</span>
      </div>
      {D.admissions.pipeline.map((p, i) => {
        const max = D.admissions.pipeline[0].count;
        return (
          <div key={p.stage} style={{ display: 'grid', gridTemplateColumns: '100px 1fr 60px 50px', gap: 10, alignItems: 'center', padding: '5px 0', fontSize: 12 }}>
            <span>{p.stage}</span>
            <HorizBar value={p.count} max={max} color="var(--hb-magenta)" height={10} />
            <span className="hb-serif" style={{ fontWeight: 700, textAlign: 'right' }}>{p.count}</span>
            <span style={{ fontSize: 10, color: 'var(--hb-green)', textAlign: 'right' }}>+{p.delta} wk</span>
          </div>
        );
      })}
    </div>
  );

  // Area chart (reused)
  const AreaChart = ({ actual, forecast, height = 160 }) => {
    const all = [...actual, ...forecast];
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
      </svg>
    );
  };

  // Section-specific deep pages (reuse simpler views)
  const SectionDeep = ({ tab }) => {
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
    const R = rendererMap[tab];
    return (
      <div>
        <h2 className="hb-serif" style={{ margin: '0 0 4px', fontSize: 32, fontWeight: 800, letterSpacing: '-.01em' }}>{titleMap[tab]}</h2>
        <div style={{ fontSize: 13, color: 'var(--hb-mute)', marginBottom: 22 }}>Week 2 · Summer Term · 21 April 2026</div>
        <R />
      </div>
    );
  };

  const AdmissionsDeep = () => {
    const a = D.admissions;
    return (
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 22 }}>
          <HeroKPI label="On roll" value={a.onRoll.value} rag="green" delta={{ value: +4, suffix: ' v bud' }} />
          <HeroKPI label="Boarding %" value={a.boardingPct.value} unit="%" rag="amber" delta={{ value: -1, suffix: '% v bud' }} accent="var(--hb-amber)" />
          <HeroKPI label="Conversion" value={a.conversionPct.value} unit="%" rag="green" delta={{ value: +3, suffix: ' v LY' }} accent="var(--hb-green)" />
          <HeroKPI label="Withdrawals" value={a.withdrawals.value} rag="green" delta={{ value: -2, suffix: ' v LY', invertColor: true }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <PipelinePanel />
          <YearGenderPanel />
        </div>
      </div>
    );
  };

  const AcademicDeep = () => {
    const a = D.academic;
    const atlColors = ['var(--hb-green)', 'var(--hb-magenta)', 'var(--hb-amber)', 'var(--hb-red)'];
    const atlSegs = Object.entries(a.atl.distribution).map(([k,v], i) => ({ label: k, value: v, color: atlColors[i] }));
    return (
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 22 }}>
          <HeroKPI label="A-Level avg" value={a.projectedALevel.value} rag="green" note="+1 grade avg v LY" />
          <HeroKPI label="IB points" value={a.projectedIB.value} rag="green" delta={{ value: +0.6, suffix: ' v LY' }} accent="var(--hb-royal)" />
          <HeroKPI label="Oxbridge offers" value={a.oxbridge.offers} rag="green" delta={{ value: '+4 v target' }} />
          <HeroKPI label="Assignment comp." value={a.assignmentCompletion.value} unit="%" rag="green" accent="var(--hb-green)" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          <div style={{ background: 'var(--hb-card)', border: '1px solid var(--hb-rule)', padding: 22 }}>
            <h3 className="hb-serif" style={{ margin: '0 0 14px', fontSize: 18, fontWeight: 700 }}>Attitude to learning</h3>
            <div style={{ display: 'flex', gap: 18, alignItems: 'center' }}>
              <Donut segments={atlSegs} size={160} strokeWidth={28} centerLabel={a.atl.overall} centerSub="OVERALL" />
              <div style={{ flex: 1 }}>
                {atlSegs.map(s => (
                  <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, padding: '4px 0' }}>
                    <span><span style={{display:'inline-block',width:10,height:10,background:s.color,marginRight:8,borderRadius:2}} />{s.label}</span>
                    <span className="hb-serif" style={{ fontWeight: 700 }}>{s.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
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

  const PastoralDeep = () => {
    const p = D.pastoral;
    return (
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 22 }}>
          <HeroKPI label="Attendance" value={p.attendance.value} unit="%" rag="green" delta={{ value: +0.2, suffix: ' v LY' }} accent="var(--hb-green)" />
          <HeroKPI label="CPOMS (wk)" value={p.cpoms.value} rag="amber" delta={{ value: +3, invertColor: true }} accent="var(--hb-amber)" />
          <HeroKPI label="Counselling" value={p.counselling.value} rag="amber" note={`${p.counselling.pctOfRoll}% of roll`} accent="var(--hb-amber)" />
          <HeroKPI label="Detentions (wk)" value={p.detentions.week} rag="amber" note={`${p.detentions.term} this term`} />
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

  const PeopleDeep = () => {
    const p = D.people;
    return (
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 22 }}>
          <HeroKPI label="SCR complete" value="100" unit="%" rag="green" accent="var(--hb-green)" />
          <HeroKPI label="Safeguarding" value={p.safeguarding.value} unit="%" rag="amber" note="2 outstanding" accent="var(--hb-amber)" />
          <HeroKPI label="Vacancies" value={p.vacancies.value} rag="amber" note={`${p.vacancies.teaching} teach · ${p.vacancies.operations} ops`} />
          <HeroKPI label="Turnover" value={p.turnover.total} unit="%" rag="green" note={`sector ${p.turnover.sector}%`} />
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

  const CoCurrDeep = () => {
    const c = D.coCurricular;
    const sr = c.sportsResults;
    const segs = [
      { label: 'W', value: sr.win,  color: 'var(--hb-green)' },
      { label: 'D', value: sr.draw, color: 'var(--hb-amber)' },
      { label: 'L', value: sr.loss, color: 'var(--hb-grey)' },
    ];
    return (
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 22 }}>
          <HeroKPI label="Fixtures (wk)" value={c.fixtures.week} rag="green" delta={{ value: '+5', suffix: ' v plan' }} />
          <HeroKPI label="Win rate" value={sr.win} unit="%" rag="green" note={`${sr.fixtures} fixtures season`} accent="var(--hb-green)" />
          <HeroKPI label="Activity att." value={c.activityAttendance.value} unit="%" rag="green" delta={{ value: +4, suffix: ' v LY' }} />
          <HeroKPI label="Music / LAMDA" value={c.musicLamda.value} unit="%" rag="green" note={`${c.musicLamda.enrolled} enrolled`} accent="var(--hb-royal)" />
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

  const FinanceDeep = () => {
    const f = D.finance;
    return (
      <div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 22 }}>
          <HeroKPI label="Core surplus" value={`£${f.coreSurplus.value}k`} rag="green" delta={{ value: '+188', suffix: ' v bud' }} />
          <HeroKPI label="Net surplus" value="£2.5m" rag="green" delta={{ value: '+188k v bud' }} accent="var(--hb-royal)" />
          <HeroKPI label="Capex" value={`£${f.capex.value}k`} rag="amber" note="on plan" accent="var(--hb-amber)" />
          <HeroKPI label="Fee arrears" value={`£${f.feeArrears.value}k`} rag="amber" delta={{ value: +40, invertColor: true }} accent="var(--hb-amber)" />
        </div>
        <div style={{ background: 'var(--hb-card)', border: '1px solid var(--hb-rule)', padding: 18, marginBottom: 20 }}>
          <h3 className="hb-serif" style={{ margin: '0 0 10px', fontSize: 15, fontWeight: 700 }}>Cashflow — 12 month</h3>
          <AreaChart actual={f.cashflowTrend} forecast={f.budgetTrend} height={110} />
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
    return (
      <div style={{ width: '100%', height: '100%', background: 'var(--hb-paper)', overflow: 'auto', fontFamily: 'var(--font-sans)' }} className="hb-scroll">
        <TopBar tab={tab} setTab={setTab} filters={filters} setFilters={setFilters} />
        <div style={{ padding: '28px 36px 60px' }}>
          {tab === 'overview' ? <Overview setTab={setTab} /> : <SectionDeep tab={tab} />}
        </div>
      </div>
    );
  };

  window.ExecutiveBrief = ExecutiveBrief;
})();
