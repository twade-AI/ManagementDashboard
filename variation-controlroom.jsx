// Variation 3 — Control Room
// Dense, data-heavy grid. Every metric visible. Top filter bar.
// For the SLT member who wants to see everything at once.

(function () {
  const { useState, useMemo } = React;
  const { RAGPill, RAGDot, Delta, Sparkline, HorizBar, Donut, Ring, SectionTitle } = window.HBY;
  const D = window.DASHBOARD_DATA;

  const Header = ({ filters, setFilters, sort, setSort }) => (
    <div style={{ background: 'var(--hb-magenta)', color: '#fff', padding: '12px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
        <img src="assets/logo-white.png" style={{ height: 30 }} />
        <div style={{ borderLeft: '1px solid rgba(255,255,255,.25)', paddingLeft: 14 }}>
          <div className="hb-serif" style={{ fontSize: 16, fontWeight: 700 }}>Management Dashboard · ELT</div>
          <div style={{ fontSize: 10.5, color: 'rgba(255,255,255,.7)', letterSpacing: '.06em' }}>TUE 21 APR 2026 · 08:30 · SUMMER WK2 · LIVE</div>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ fontSize: 11, display: 'flex', gap: 10, alignItems: 'center' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: 4, background: '#6ee7a8', display: 'inline-block', animation: 'pulse 2s infinite' }} />
            Systems nominal
          </span>
          <span style={{ color: 'rgba(255,255,255,.4)' }}>|</span>
          <span>ISAMS · HR · CPOMS · EVOLVE · STEER connected</span>
        </div>
      </div>

      {/* Filter bar */}
      <div style={{ display: 'flex', gap: 18, alignItems: 'center', marginTop: 12, flexWrap: 'wrap' }}>
        {[
          ['House',    ['All', ...D.HOUSES.slice(0, 6)], 'house'],
          ['Year',     ['All', ...D.YEARS], 'year'],
          ['Boarding', ['All', 'Boarding', 'Day'], 'boarding'],
          ['Gender',   ['All', 'Boys', 'Girls'], 'gender'],
        ].map(([lbl, opts, k]) => (
          <div key={k} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <span style={{ fontSize: 9.5, textTransform: 'uppercase', letterSpacing: '.1em', color: 'rgba(255,255,255,.7)', marginRight: 4 }}>{lbl}</span>
            {opts.map(o => {
              const on = filters[k] === o;
              return (
                <button key={o} onClick={() => setFilters(f => ({ ...f, [k]: o }))} style={{
                  border: `1px solid ${on ? '#fff' : 'rgba(255,255,255,.3)'}`,
                  background: on ? '#fff' : 'transparent',
                  color: on ? 'var(--hb-magenta)' : 'rgba(255,255,255,.9)',
                  padding: '2px 8px', borderRadius: 2, fontSize: 10.5, cursor: 'pointer',
                  fontFamily: 'var(--font-mono)', fontWeight: on ? 700 : 400,
                }}>{o}</button>
              );
            })}
          </div>
        ))}
      </div>
      <style>{`
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:.35} }
      `}</style>
    </div>
  );

  // A single metric tile — compact
  const Tile = ({ label, value, unit, rag, delta, spark, color = 'var(--hb-magenta)', size = 'md', note }) => {
    const big = size === 'lg';
    return (
      <div style={{
        background: 'var(--hb-card)', border: '1px solid var(--hb-rule)',
        padding: big ? 14 : 10, borderLeft: `3px solid ${color}`,
        display: 'flex', flexDirection: 'column', gap: 4,
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 9.5, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--hb-mute)', fontWeight: 700 }}>{label}</span>
          {rag && <RAGDot status={rag} size={6} />}
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 3 }}>
          <span className="hb-serif" style={{ fontSize: big ? 26 : 20, fontWeight: 700, color: 'var(--hb-ink)', lineHeight: 1 }}>{value}</span>
          {unit && <span style={{ fontSize: 10.5, color: 'var(--hb-mute)' }}>{unit}</span>}
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: 10 }}>
          {delta != null ? <Delta {...delta} /> : (note && <span style={{ color: 'var(--hb-mute)' }}>{note}</span>)}
          {spark && <Sparkline data={spark} width={56} height={18} color={color} />}
        </div>
      </div>
    );
  };

  // Section header — tight
  const SH = ({ n, title, count, rag, accent = 'var(--hb-magenta)' }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '6px 10px', background: 'var(--hb-ink)', color: 'var(--hb-paper)', borderBottom: `2px solid ${accent}` }}>
      <span className="hb-serif" style={{ fontSize: 11, fontStyle: 'italic', color: accent }}>§{n}</span>
      <span className="hb-serif" style={{ fontSize: 14, fontWeight: 700, letterSpacing: '-.01em' }}>{title}</span>
      <span style={{ flex: 1 }} />
      {count && <span style={{ fontSize: 9.5, letterSpacing: '.08em', color: 'rgba(255,255,255,.55)' }}>{count} METRICS</span>}
      {rag && <span style={{ display: 'flex', gap: 4 }}>
        <span style={{ fontSize: 9.5 }}>{rag.g}G · {rag.a}A{rag.r ? ` · ${rag.r}R` : ''}</span>
      </span>}
    </div>
  );

  // Sortable table — used in Pastoral & Finance panels
  const SortTable = ({ columns, rows, initialSort, formatRow }) => {
    const [sort, setSort] = useState(initialSort);
    const sorted = useMemo(() => {
      if (!sort) return rows;
      const [k, dir] = sort;
      return [...rows].sort((a, b) => {
        const av = a[k], bv = b[k];
        if (typeof av === 'number' && typeof bv === 'number') return dir === 'asc' ? av - bv : bv - av;
        return dir === 'asc' ? String(av).localeCompare(String(bv)) : String(bv).localeCompare(String(av));
      });
    }, [rows, sort]);
    return (
      <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 11.5 }}>
        <thead>
          <tr>
            {columns.map(c => (
              <th key={c.key} onClick={() => setSort([c.key, sort && sort[0]===c.key && sort[1]==='asc' ? 'desc' : 'asc'])} style={{
                textAlign: c.align || 'left', padding: '6px 8px',
                fontSize: 9.5, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--hb-mute)',
                cursor: 'pointer', borderBottom: '1.5px solid var(--hb-ink)', userSelect: 'none',
              }}>
                {c.label} {sort && sort[0]===c.key && (sort[1]==='asc'?'▲':'▼')}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sorted.map((r, i) => (
            <tr key={i} style={{ borderBottom: '1px solid var(--hb-rule)' }}>
              {formatRow(r, i).map((cell, j) => (
                <td key={j} style={{ padding: '6px 8px', textAlign: columns[j].align || 'left', verticalAlign: 'middle' }}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  // Heatmap — 28-day pastoral/flag intensity
  const Heatmap28 = ({ data }) => {
    const max = Math.max(...data);
    return (
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(14, 1fr)', gap: 2 }}>
        {data.map((v, i) => {
          const intensity = v / max;
          return (
            <div key={i} style={{
              aspectRatio: '1/1',
              background: `rgba(155, 24, 68, ${0.1 + intensity * 0.85})`,
              borderRadius: 2, position: 'relative',
            }} title={`Day ${i+1}: ${v} events`} />
          );
        })}
      </div>
    );
  };

  // Year × house grid (mini-heatmap showing pupil counts)
  const HouseYearGrid = () => {
    // synthesize: each house × year count
    const data = D.HOUSES.slice(0, 6).map(h =>
      D.YEARS.map(y => 14 + Math.round(Math.random() * 10))
    );
    const max = Math.max(...data.flat());
    return (
      <div style={{ fontSize: 10.5 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '80px repeat(5, 1fr) 36px', gap: 2, color: 'var(--hb-mute)', marginBottom: 4 }}>
          <span />
          {D.YEARS.map(y => <span key={y} style={{ textAlign: 'center', fontWeight: 600 }}>{y}</span>)}
          <span style={{ textAlign: 'right', fontWeight: 600 }}>Σ</span>
        </div>
        {D.HOUSES.slice(0, 6).map((h, i) => {
          const total = data[i].reduce((a,b)=>a+b, 0);
          return (
            <div key={h} style={{ display: 'grid', gridTemplateColumns: '80px repeat(5, 1fr) 36px', gap: 2, marginBottom: 2, alignItems: 'center' }}>
              <span className="hb-serif" style={{ fontSize: 11, fontWeight: 600 }}>{h}</span>
              {data[i].map((v, j) => (
                <div key={j} style={{
                  background: `rgba(155, 24, 68, ${0.12 + (v/max) * 0.7})`,
                  color: v/max > 0.6 ? '#fff' : 'var(--hb-ink)',
                  textAlign: 'center', padding: '4px 0', fontWeight: 600,
                  fontFamily: 'var(--font-mono)', fontSize: 10,
                }}>{v}</div>
              ))}
              <span className="hb-serif" style={{ fontSize: 11, fontWeight: 700, textAlign: 'right' }}>{total}</span>
            </div>
          );
        })}
      </div>
    );
  };

  // Ribbon — horizontal KPI strip summary
  const Ribbon = () => {
    const items = [
      { label: 'On roll',       val: '924', rag: 'green' },
      { label: 'Boarding',      val: '53%', rag: 'amber' },
      { label: 'Attendance',    val: '96.4%', rag: 'green' },
      { label: 'Conversion',    val: '41%', rag: 'green' },
      { label: 'IB avg',        val: '38.4', rag: 'green' },
      { label: 'A-Level avg',   val: 'A*A*A', rag: 'green' },
      { label: 'Oxbridge',      val: '22', rag: 'green' },
      { label: 'CPOMS wk',      val: '34', rag: 'amber' },
      { label: 'Safeguarding',  val: '99%', rag: 'amber' },
      { label: 'SCR',           val: '100%', rag: 'green' },
      { label: 'Net surplus',   val: '£2.5m', rag: 'green' },
      { label: 'Fee arrears',   val: '£400k', rag: 'amber' },
    ];
    return (
      <div style={{ display: 'grid', gridTemplateColumns: `repeat(${items.length}, 1fr)`, background: 'var(--hb-cream)', borderBottom: '1px solid var(--hb-rule)' }}>
        {items.map((it, i) => (
          <div key={it.label} style={{
            padding: '8px 10px', borderRight: i < items.length-1 ? '1px solid var(--hb-rule)' : 'none',
            display: 'flex', flexDirection: 'column', gap: 1,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
              <RAGDot status={it.rag} size={6} />
              <span style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--hb-mute)', fontWeight: 700 }}>{it.label}</span>
            </div>
            <span className="hb-serif" style={{ fontSize: 18, fontWeight: 800, lineHeight: 1, color: 'var(--hb-ink)' }}>{it.val}</span>
          </div>
        ))}
      </div>
    );
  };

  // Panel wrapper
  const Panel = ({ children, span = 1 }) => (
    <div style={{
      gridColumn: `span ${span}`,
      background: 'var(--hb-card)', border: '1px solid var(--hb-rule)', overflow: 'hidden',
      display: 'flex', flexDirection: 'column',
    }}>{children}</div>
  );

  const ControlRoom = () => {
    const [filters, setFilters] = useState(window.HBY.defaultFilters);
    const a = D.admissions, ac = D.academic, p = D.pastoral, pe = D.people, c = D.coCurricular, f = D.finance;

    return (
      <div style={{ width: '100%', height: '100%', background: 'var(--hb-paper)', overflow: 'auto', fontFamily: 'var(--font-sans)', display: 'flex', flexDirection: 'column' }} className="hb-scroll">
        <Header filters={filters} setFilters={setFilters} />
        <Ribbon />

        {/* Main grid: 12 columns */}
        <div style={{ padding: 14, display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', gap: 10, flex: 1 }}>

          {/* ROW 1: Admissions (4) | Academic (4) | Activity feed (4) */}
          <Panel span={4}>
            <SH n="I" title="Admissions & Pipeline" count={8} rag={{ g: 7, a: 1 }} />
            <div style={{ padding: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <Tile label="On roll" value={a.onRoll.value} rag="green" delta={{ value: +4, suffix: ' v bud' }} size="lg" />
              <Tile label="Boarding" value={a.boardingPct.value} unit="%" rag="amber" delta={{ value: -1, suffix: '%' }} size="lg" color="var(--hb-amber)" />
              <Tile label="Conversion" value={a.conversionPct.value} unit="%" rag="green" delta={{ value: +3 }} />
              <Tile label="Withdrawals" value={a.withdrawals.value} rag="green" delta={{ value: -2, invertColor: true }} />
            </div>
            <div style={{ padding: '0 10px 10px' }}>
              <div style={{ fontSize: 9.5, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--hb-mute)', fontWeight: 700, marginBottom: 6 }}>Pipeline funnel</div>
              {a.pipeline.map(p => {
                const max = a.pipeline[0].count;
                return (
                  <div key={p.stage} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 36px 28px', gap: 6, alignItems: 'center', padding: '2px 0', fontSize: 10.5 }}>
                    <span>{p.stage}</span>
                    <HorizBar value={p.count} max={max} color="var(--hb-magenta)" height={6} />
                    <span className="hb-serif" style={{ fontWeight: 700, textAlign: 'right' }}>{p.count}</span>
                    <span style={{ fontSize: 9, color: 'var(--hb-green)' }}>+{p.delta}</span>
                  </div>
                );
              })}
            </div>
          </Panel>

          <Panel span={4}>
            <SH n="II" title="Academic Performance" count={6} rag={{ g: 5, a: 1 }} />
            <div style={{ padding: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <Tile label="A-Level avg" value={ac.projectedALevel.value} rag="green" note="+1 grade v LY" size="lg" />
              <Tile label="IB points" value={ac.projectedIB.value} rag="green" delta={{ value: +0.6 }} size="lg" color="var(--hb-royal)" />
              <Tile label="Oxbridge" value={`${ac.oxbridge.offers}/${ac.oxbridge.target}`} rag="green" delta={{ value: '+4' }} color="var(--hb-royal)" />
              <Tile label="Yellow tix 30d" value={ac.yellowTickets.value.toLocaleString()} rag="green" spark={ac.ticketTrend} />
              <Tile label="Academic flags" value={ac.academicFlags.value} rag="amber" spark={ac.flagsTrend} color="var(--hb-amber)" delta={{ value: -8, invertColor: true }} />
              <Tile label="Assign. comp." value={ac.assignmentCompletion.value} unit="%" rag="green" color="var(--hb-green)" />
            </div>
          </Panel>

          <Panel span={4}>
            <SH n="" title="Activity wire · today" count={D.feed.length} accent="var(--hb-royal)" />
            <div style={{ overflow: 'auto', flex: 1, maxHeight: 280 }} className="hb-scroll">
              {D.feed.map((ev, i) => (
                <div key={i} style={{ padding: '7px 10px', borderBottom: '1px solid var(--hb-rule)', fontSize: 11, display: 'flex', gap: 8 }}>
                  <span className="hb-mono" style={{ fontSize: 10, color: 'var(--hb-mute)', width: 36, flexShrink: 0 }}>{ev.t}</span>
                  <RAGDot status={ev.sev} size={6} />
                  <div style={{ flex: 1, lineHeight: 1.4 }}>
                    <span style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--hb-mute)', marginRight: 6 }}>{ev.type}</span>
                    <span style={{ color: 'var(--hb-ink)' }}>{ev.text}</span>
                  </div>
                </div>
              ))}
            </div>
          </Panel>

          {/* ROW 2: Pastoral (4) | People (4) | Co-curric (4) */}
          <Panel span={4}>
            <SH n="III" title="Pastoral Care" count={8} rag={{ g: 4, a: 4 }} accent="var(--hb-royal)" />
            <div style={{ padding: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <Tile label="Attendance" value={p.attendance.value} unit="%" rag="green" spark={p.attendanceTrend} color="var(--hb-green)" size="lg" />
              <Tile label="CPOMS wk" value={p.cpoms.value} rag="amber" delta={{ value: +3, invertColor: true }} size="lg" color="var(--hb-amber)" />
              <Tile label="Counselling" value={p.counselling.value} rag="amber" note={`${p.counselling.pctOfRoll}% roll`} color="var(--hb-amber)" />
              <Tile label="Detentions wk" value={p.detentions.week} rag="amber" note={`${p.detentions.term} term`} color="var(--hb-amber)" />
              <Tile label="Missing regs" value={p.missingRegisters.value} rag="green" delta={{ value: -2, invertColor: true }} color="var(--hb-green)" />
              <Tile label="Outstand. Every" value={p.outstandingEvery.value} rag="amber" delta={{ value: -6, invertColor: true }} color="var(--hb-amber)" />
            </div>
            <div style={{ padding: '0 10px 10px' }}>
              <div style={{ fontSize: 9.5, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--hb-mute)', fontWeight: 700, marginBottom: 4 }}>28-day incident intensity</div>
              <Heatmap28 data={D.heat28} />
            </div>
          </Panel>

          <Panel span={4}>
            <SH n="IV" title="People & Policies" count={9} rag={{ g: 4, a: 5 }} accent="var(--hb-royal)" />
            <div style={{ padding: 10, display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8 }}>
              <Tile label="SCR" value="100" unit="%" rag="green" color="var(--hb-green)" />
              <Tile label="Safeguarding" value={pe.safeguarding.value} unit="%" rag="amber" color="var(--hb-amber)" />
              <Tile label="Vacancies" value={pe.vacancies.value} rag="amber" note={`${pe.vacancies.teaching}T/${pe.vacancies.operations}O`} color="var(--hb-amber)" />
              <Tile label="Long sick" value={pe.longTermSick.value} rag="amber" color="var(--hb-amber)" />
              <Tile label="Tribunals" value={pe.tribunals.value} rag="green" color="var(--hb-green)" />
              <Tile label="Turnover %" value={pe.turnover.total} unit="%" rag="green" note={`sec ${pe.turnover.sector}%`} />
            </div>
            <div style={{ padding: '0 10px 10px' }}>
              <div style={{ fontSize: 9.5, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--hb-mute)', fontWeight: 700, marginBottom: 6 }}>
                Policies — {pe.policyRenewal.reviewedYTD}/{pe.policyRenewal.planned} YTD
              </div>
              <SortTable
                initialSort={['due', 'asc']}
                columns={[
                  { key: 'name', label: 'Policy' },
                  { key: 'due',  label: 'Due' },
                  { key: 'status', label: 'Status' },
                ]}
                rows={pe.policyRenewal.upcoming}
                formatRow={(r) => [
                  <span className="hb-serif" style={{ fontWeight: 600 }}>{r.name}</span>,
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10 }}>{new Date(r.due).toLocaleDateString('en-GB', { day:'2-digit', month:'short' })}</span>,
                  <span style={{ fontSize: 9.5, textTransform: 'uppercase', letterSpacing: '.06em', color: r.status==='Draft'?'var(--hb-amber)':'var(--hb-ink-2)' }}>{r.status}</span>,
                ]}
              />
            </div>
          </Panel>

          <Panel span={4}>
            <SH n="V" title="Co-Curricular" count={6} rag={{ g: 6, a: 0 }} accent="var(--hb-green)" />
            <div style={{ padding: 10, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
              <Tile label="Fixtures wk" value={c.fixtures.week} rag="green" delta={{ value: '+5 v plan' }} color="var(--hb-green)" size="lg" />
              <Tile label="Win rate" value={c.sportsResults.win} unit="%" rag="green" note={`${c.sportsResults.fixtures} season`} color="var(--hb-green)" size="lg" />
              <Tile label="Activity att." value={c.activityAttendance.value} unit="%" rag="green" delta={{ value: +4 }} color="var(--hb-green)" />
              <Tile label="Music/LAMDA" value={c.musicLamda.value} unit="%" rag="green" note={`${c.musicLamda.enrolled} enr.`} color="var(--hb-royal)" />
              <Tile label="Trips live" value={c.trips.current} rag="green" note={`${c.trips.forthcoming} planned`} />
              <Tile label="W/D/L" value={`${c.sportsResults.win}/${c.sportsResults.draw}/${c.sportsResults.loss}`} unit="%" rag="green" />
            </div>
            <div style={{ padding: '0 10px 10px' }}>
              <div style={{ fontSize: 9.5, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--hb-mute)', fontWeight: 700, marginBottom: 6 }}>Upcoming fixtures</div>
              {c.upcomingFixtures.slice(0, 4).map((f, i) => (
                <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 60px 16px', gap: 6, padding: '3px 0', fontSize: 10.5, borderTop: i===0?'none':'1px dotted var(--hb-rule)' }}>
                  <span className="hb-serif" style={{ fontWeight: 600 }}>{f.sport}</span>
                  <span style={{ color: 'var(--hb-ink-2)' }}>v {f.opponent}</span>
                  <span style={{ color: 'var(--hb-mute)', fontSize: 10 }}>{f.when}</span>
                  <span style={{ fontSize: 9, fontWeight: 700, color: f.home?'var(--hb-magenta)':'var(--hb-mute)' }}>{f.home?'H':'A'}</span>
                </div>
              ))}
            </div>
          </Panel>

          {/* ROW 3: Finance (6) | House×Year grid (3) | Year/Gender bars (3) */}
          <Panel span={6}>
            <SH n="VI" title="Finance & Operations" count={7} rag={{ g: 4, a: 3 }} />
            <div style={{ padding: 10, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
              <Tile label="Core surplus" value={`£${f.coreSurplus.value}k`} rag="green" delta={{ value: '+188' }} size="lg" />
              <Tile label="Net surplus" value="£2.5m" rag="green" delta={{ value: '+188k' }} size="lg" color="var(--hb-royal)" />
              <Tile label="Capex" value={`£${f.capex.value}k`} rag="amber" note="on plan" size="lg" color="var(--hb-amber)" />
              <Tile label="Fee arrears" value={`£${f.feeArrears.value}k`} rag="amber" delta={{ value: +40, invertColor: true }} size="lg" color="var(--hb-amber)" />
              <Tile label="EBITDA" value={`£${f.ebitda.actual}m`} rag="green" note={`bud £${f.ebitda.budget}m`} />
              <Tile label="Covenant" value={`${f.covenantCover.value}x`} rag="green" note={`cov ${f.covenantCover.covenant}x`} />
              <Tile label="Fundraising" value={`£${f.fundraising.raised}k`} rag="amber" note={`tgt £${f.fundraising.target}k`} color="var(--hb-amber)" />
              <Tile label="Fire tests" value={f.fireTests.value} unit="%" rag="green" color="var(--hb-green)" />
            </div>
            <div style={{ padding: '0 10px 10px' }}>
              <div style={{ fontSize: 9.5, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--hb-mute)', fontWeight: 700, marginBottom: 4, display: 'flex', justifyContent: 'space-between' }}>
                <span>Cashflow — actual v forecast · 12mo</span>
                <span><span style={{color:'var(--hb-magenta)'}}>━</span> actual <span style={{color:'var(--hb-mute)', marginLeft: 8}}>- -</span> forecast</span>
              </div>
              <AreaChart actual={f.cashflowTrend} forecast={f.budgetTrend} height={90} />
            </div>
          </Panel>

          <Panel span={3}>
            <SH n="" title="House × Year — on roll" accent="var(--hb-royal)" />
            <div style={{ padding: 10, flex: 1 }}>
              <HouseYearGrid />
            </div>
          </Panel>

          <Panel span={3}>
            <SH n="" title="Gender split · Year" accent="var(--hb-royal)" />
            <div style={{ padding: 10 }}>
              {D.admissions.yearGender.map(y => {
                const total = y.boys + y.girls;
                const bpct = y.boys / total * 100;
                return (
                  <div key={y.year} style={{ marginBottom: 7 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, marginBottom: 2 }}>
                      <span className="hb-serif" style={{ fontWeight: 700 }}>{y.year}</span>
                      <span style={{ color: 'var(--hb-mute)', fontFamily: 'var(--font-mono)' }}>{total}</span>
                    </div>
                    <div style={{ display: 'flex', height: 10, overflow: 'hidden', borderRadius: 2 }}>
                      <div style={{ width: `${bpct}%`, background: 'var(--hb-royal)' }} />
                      <div style={{ width: `${100-bpct}%`, background: 'var(--hb-magenta)' }} />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 9, color: 'var(--hb-mute)', marginTop: 1 }}>
                      <span>{y.boys}b</span><span>{y.girls}g</span>
                    </div>
                  </div>
                );
              })}
              <div style={{ display: 'flex', gap: 10, marginTop: 4, fontSize: 10, color: 'var(--hb-mute)', paddingTop: 6, borderTop: '1px solid var(--hb-rule)' }}>
                <span><span style={{display:'inline-block',width:8,height:8,background:'var(--hb-royal)',borderRadius:1}} /> Boys</span>
                <span><span style={{display:'inline-block',width:8,height:8,background:'var(--hb-magenta)',borderRadius:1}} /> Girls</span>
              </div>
            </div>
          </Panel>

        </div>
      </div>
    );
  };

  const AreaChart = ({ actual, forecast, height = 90 }) => {
    const all = [...actual, ...forecast];
    const min = Math.min(...all), max = Math.max(...all);
    const range = max - min || 1;
    const W = 420, H = height;
    const path = (arr) => arr.map((v, i) => {
      const x = (i / (arr.length - 1)) * W;
      const y = H - ((v - min) / range) * (H - 12) - 6;
      return `${i===0?'M':'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(' ');
    const area = (arr) => path(arr) + ` L${W} ${H} L0 ${H} Z`;
    return (
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ display: 'block' }}>
        {[0.33, 0.66].map(p => <line key={p} x1="0" x2={W} y1={H*p} y2={H*p} stroke="var(--hb-rule)" strokeDasharray="2 4" />)}
        <path d={area(actual)} fill="var(--hb-magenta)" opacity=".14" />
        <path d={path(actual)} fill="none" stroke="var(--hb-magenta)" strokeWidth="1.8" />
        <path d={path(forecast)} fill="none" stroke="var(--hb-grey)" strokeWidth="1.2" strokeDasharray="3 3" />
      </svg>
    );
  };

  window.ControlRoom = ControlRoom;
})();
