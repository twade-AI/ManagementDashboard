// Variation 1 — Classical Broadsheet
// Newspaper-inspired. Serif heavy. Column grid. Left sidebar nav.
// Dense but readable; every section visible at once.

(function () {
  const { useState, useMemo, useEffect, useRef } = React;
  const { RAGPill, RAGDot, Delta, Sparkline, HorizBar, Donut, Ring, Stat, SectionTitle } = window.HBY;
  const D = window.DASHBOARD_DATA;

  const NAV = [
    { id: 'front',      label: 'Front Page',         icon: '◎' },
    { id: 'admissions', label: 'Admissions',         icon: '◐' },
    { id: 'academic',   label: 'Academic',           icon: '◈' },
    { id: 'people',     label: 'People & Policies',  icon: '◇' },
    { id: 'pastoral',   label: 'Pastoral',           icon: '◉' },
    { id: 'cocurr',     label: 'Co-Curricular',      icon: '◊' },
    { id: 'finance',    label: 'Finance & Ops',      icon: '◈' },
  ];

  // ── Nameplate (newspaper header) ──
  const Nameplate = ({ filters }) => (
    <div style={{ borderBottom: '2.5px solid var(--hb-ink)', padding: '20px 32px 14px', background: 'var(--hb-paper)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '.14em', color: 'var(--hb-mute)', marginBottom: 8 }}>
        <span>Vol. CLXIV · № 127</span>
        <span>Tuesday, 21 April 2026 · Summer Term Week 2</span>
        <span>Circulation: Senior Leadership</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 20 }}>
        <img src="assets/logo-magenta.png" style={{ height: 54, width: 'auto' }} />
        <div style={{ textAlign: 'center', flex: 1 }}>
          <h1 className="hb-serif" style={{ margin: 0, fontSize: 56, fontWeight: 900, letterSpacing: '-.02em', lineHeight: 1, color: 'var(--hb-ink)' }}>
            The Haileybury Chronicle
          </h1>
          <div className="hb-serif" style={{ fontStyle: 'italic', color: 'var(--hb-mute)', fontSize: 14, marginTop: 4 }}>
            A Management Dashboard for the Senior Team · <span style={{ color: 'var(--hb-magenta)' }}>Sapere Aude</span>
          </div>
        </div>
        <div style={{ textAlign: 'right', fontSize: 11, color: 'var(--hb-ink-2)', lineHeight: 1.5 }}>
          <div style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', fontSize: 10 }}>Weather</div>
          <div>Partly cloudy · 14°C</div>
          <div style={{ marginTop: 6, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '.08em', fontSize: 10 }}>Chapel</div>
          <div>Evensong 18:00</div>
        </div>
      </div>
    </div>
  );

  // ── Sidebar Nav ──
  const Sidebar = ({ section, setSection, filters, setFilters }) => (
    <aside style={{ width: 232, borderRight: '1px solid var(--hb-rule)', padding: '22px 18px', background: 'var(--hb-paper)', flexShrink: 0, overflow: 'auto' }} className="hb-scroll">
      <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--hb-mute)', fontWeight: 700, marginBottom: 10 }}>Sections</div>
      <nav style={{ display: 'flex', flexDirection: 'column', gap: 1, marginBottom: 24 }}>
        {NAV.map(n => {
          const on = section === n.id;
          return (
            <button key={n.id} onClick={() => setSection(n.id)} style={{
              display: 'flex', alignItems: 'center', gap: 10, padding: '9px 10px',
              border: 'none', background: on ? 'var(--hb-ink)' : 'transparent',
              color: on ? 'var(--hb-paper)' : 'var(--hb-ink-2)',
              fontSize: 13.5, cursor: 'pointer', textAlign: 'left', fontFamily: 'var(--font-serif)',
              borderLeft: `3px solid ${on ? 'var(--hb-magenta)' : 'transparent'}`,
              transition: 'all .15s',
            }}>
              <span style={{ color: on ? 'var(--hb-magenta-60)' : 'var(--hb-magenta)', fontSize: 11 }}>{n.icon}</span>
              <span>{n.label}</span>
            </button>
          );
        })}
      </nav>

      <div style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--hb-mute)', fontWeight: 700, marginBottom: 10 }}>Filters</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          ['Year',     ['All', ...D.YEARS], 'year'],
          ['Boarding', ['All', 'Boarding', 'Day'], 'boarding'],
          ['Gender',   ['All', 'Boys', 'Girls'], 'gender'],
        ].map(([label, opts, key]) => (
          <div key={key}>
            <div style={{ fontSize: 10.5, color: 'var(--hb-mute)', marginBottom: 4, fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>{label}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 3 }}>
              {opts.map(o => (
                <button key={o} onClick={() => setFilters(f => ({ ...f, [key]: o }))} style={{
                  border: `1px solid ${filters[key]===o ? 'var(--hb-ink)' : 'var(--hb-rule)'}`,
                  background: filters[key]===o ? 'var(--hb-ink)' : 'transparent',
                  color: filters[key]===o ? 'var(--hb-paper)' : 'var(--hb-ink-2)',
                  padding: '2px 7px', borderRadius: 0, fontSize: 11, cursor: 'pointer',
                }}>{o}</button>
              ))}
            </div>
          </div>
        ))}

        <div>
          <div style={{ fontSize: 10.5, color: 'var(--hb-mute)', marginBottom: 4, fontFamily: 'var(--font-serif)', fontStyle: 'italic' }}>House</div>
          <select value={filters.house} onChange={e => setFilters(f => ({ ...f, house: e.target.value }))}
            style={{ width: '100%', padding: '4px 6px', border: '1px solid var(--hb-rule)', fontSize: 12, background: 'var(--hb-card)', fontFamily: 'var(--font-sans)' }}>
            <option>All</option>
            {D.HOUSES.map(h => <option key={h}>{h}</option>)}
          </select>
        </div>
      </div>

      <div style={{ marginTop: 26, padding: 12, border: '1px solid var(--hb-rule)', background: 'var(--hb-cream)' }}>
        <div className="hb-serif" style={{ fontStyle: 'italic', fontSize: 12, color: 'var(--hb-ink-2)', lineHeight: 1.45 }}>
          "Sapere aude — dare to be wise."
        </div>
        <div style={{ fontSize: 10, color: 'var(--hb-mute)', marginTop: 4 }}>The Haileybury motto</div>
      </div>
    </aside>
  );

  // ── The Lead (top-of-page summary) ──
  const TheLead = ({ onDrill }) => (
    <div style={{ borderBottom: '1px solid var(--hb-ink)', paddingBottom: 18, marginBottom: 18 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12, marginBottom: 10 }}>
        <span className="hb-serif" style={{ fontSize: 13, fontStyle: 'italic', color: 'var(--hb-magenta)' }}>The Lead</span>
        <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--hb-mute)' }}>This Morning's Briefing</span>
      </div>
      <h2 className="hb-serif" style={{ margin: '0 0 10px', fontSize: 32, fontWeight: 800, letterSpacing: '-.01em', lineHeight: 1.15, color: 'var(--hb-ink)' }}>
        Roll steady at 924; boarding holds at 53% <span style={{ color: 'var(--hb-magenta)' }}>— Oxbridge offers surpass target</span>
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 24, alignItems: 'start' }}>
        <div style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--hb-ink-2)', columnCount: 2, columnGap: 22 }}>
          <p style={{ margin: 0 }}>
            <span className="hb-serif" style={{ fontSize: 32, float: 'left', lineHeight: .9, marginRight: 4, marginTop: 2, fontWeight: 800, color: 'var(--hb-magenta)' }}>T</span>he School
            enters Summer Term week two with <b>924 pupils on roll</b>, four above budget and twelve ahead of the same point last year. Boarding share sits at
            53%, one point below plan but in line with the sector. Admissions conversion has strengthened to 41% against a revised pipeline of 412 live enquiries.
            Academic trajectory is positive across both diploma routes, and the Oxbridge offer count has reached 22 — four clear of target.
            Two areas warrant attention: safeguarding training completion, currently 99%, and policy renewals, where 47 of 62 planned are through YTD.
          </p>
        </div>
        <div style={{ background: 'var(--hb-cream)', padding: 16, borderTop: '2px solid var(--hb-magenta)' }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.12em', color: 'var(--hb-mute)', fontWeight: 700, marginBottom: 10 }}>At a Glance</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4, fontSize: 12 }}>
            {[
              ['On roll',         '924',   'green'],
              ['Attendance',      '96.4%', 'green'],
              ['Safeguarding',    '99%',   'amber'],
              ['Net surplus',     '£2.5m', 'green'],
              ['Oxbridge offers', '22/18', 'green'],
              ['CPOMS (wk)',      '34',    'amber'],
            ].map(([k,v,r]) => (
              <div key={k} onClick={() => onDrill(k)} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: '1px dotted var(--hb-rule)', cursor: 'pointer' }}>
                <span style={{ color: 'var(--hb-mute)' }}>{k}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span className="hb-serif" style={{ fontWeight: 700, color: 'var(--hb-ink)' }}>{v}</span>
                  <RAGDot status={r} size={7} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // ── Column: Admissions ──
  const AdmissionsColumn = () => {
    const a = D.admissions;
    return (
      <div>
        <SectionTitle number="I" title="Admissions & Pipeline" subtitle="Source: ISAMS" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
          <div style={{ border: '1px solid var(--hb-rule)', background: 'var(--hb-card)' }}>
            <Stat label="Pupils on roll" value={a.onRoll.value} rag={a.onRoll.rag} delta={{ value: a.onRoll.vsBudget, suffix: ' v budget' }} />
          </div>
          <div style={{ border: '1px solid var(--hb-rule)', background: 'var(--hb-card)' }}>
            <Stat label="Boarding share" value={a.boardingPct.value} unit="%" rag={a.boardingPct.rag} delta={{ value: a.boardingPct.vsLY, suffix: ' v LY' }} />
          </div>
        </div>

        {/* Pipeline funnel */}
        <div style={{ border: '1px solid var(--hb-rule)', background: 'var(--hb-card)', padding: 14, marginBottom: 14 }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--hb-mute)', fontWeight: 700, marginBottom: 10 }}>
            Admissions pipeline <span style={{ float: 'right', color: 'var(--hb-ink)' }}>Conversion <b>{a.conversionPct.value}%</b></span>
          </div>
          {a.pipeline.map((p, i) => {
            const max = a.pipeline[0].count;
            const pct = p.count / max;
            return (
              <div key={p.stage} style={{ display: 'grid', gridTemplateColumns: '90px 1fr 50px 36px', gap: 8, alignItems: 'center', padding: '3px 0', fontSize: 12 }}>
                <span style={{ color: 'var(--hb-ink-2)' }}>{p.stage}</span>
                <HorizBar value={p.count} max={max} color="var(--hb-magenta)" />
                <span className="hb-serif" style={{ fontWeight: 700, textAlign: 'right' }}>{p.count}</span>
                <span style={{ fontSize: 10, color: 'var(--hb-green)' }}>+{p.delta}</span>
              </div>
            );
          })}
        </div>

        {/* Year × gender */}
        <div style={{ border: '1px solid var(--hb-rule)', background: 'var(--hb-card)', padding: 14 }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--hb-mute)', fontWeight: 700, marginBottom: 10 }}>
            By year group — boys / girls
          </div>
          {a.yearGender.map(y => (
            <div key={y.year} style={{ display: 'grid', gridTemplateColumns: '32px 1fr 1fr 48px', gap: 6, alignItems: 'center', padding: '4px 0', fontSize: 12 }}>
              <span className="hb-serif" style={{ fontWeight: 700 }}>{y.year}</span>
              <div style={{ display: 'flex', gap: 0 }}>
                <div style={{ background: 'var(--hb-royal)', height: 14, width: `${y.boys/130*100}%` }} />
              </div>
              <div style={{ display: 'flex', gap: 0 }}>
                <div style={{ background: 'var(--hb-magenta)', height: 14, width: `${y.girls/130*100}%` }} />
              </div>
              <span style={{ textAlign: 'right', fontVariantNumeric: 'tabular-nums', color: 'var(--hb-ink-2)' }}>{y.boys + y.girls}</span>
            </div>
          ))}
          <div style={{ display: 'flex', gap: 14, marginTop: 8, fontSize: 11 }}>
            <span><span style={{display:'inline-block',width:10,height:10,background:'var(--hb-royal)'}} /> Boys</span>
            <span><span style={{display:'inline-block',width:10,height:10,background:'var(--hb-magenta)'}} /> Girls</span>
          </div>
        </div>
      </div>
    );
  };

  // ── Column: Academic ──
  const AcademicColumn = () => {
    const a = D.academic;
    const atlColors = ['var(--hb-green)', 'var(--hb-magenta)', 'var(--hb-amber)', 'var(--hb-red)'];
    const atlSegs = Object.entries(a.atl.distribution).map(([k,v], i) => ({ label: k, value: v, color: atlColors[i] }));
    return (
      <div>
        <SectionTitle number="II" title="Academic Performance" subtitle="Projections & ATL" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
          <div style={{ border: '1px solid var(--hb-rule)', background: 'var(--hb-card)', padding: 14 }}>
            <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '.09em', color: 'var(--hb-mute)', fontWeight: 600, marginBottom: 6 }}>Projected A-Level · avg</div>
            <div className="hb-serif" style={{ fontSize: 34, fontWeight: 700, lineHeight: 1, color: 'var(--hb-ink)' }}>{a.projectedALevel.value}</div>
            <div style={{ fontSize: 11, color: 'var(--hb-green)', marginTop: 4 }}>▲ {a.projectedALevel.vsLY}</div>
          </div>
          <div style={{ border: '1px solid var(--hb-rule)', background: 'var(--hb-card)', padding: 14 }}>
            <div style={{ fontSize: 10.5, textTransform: 'uppercase', letterSpacing: '.09em', color: 'var(--hb-mute)', fontWeight: 600, marginBottom: 6 }}>Projected IB · points</div>
            <div className="hb-serif" style={{ fontSize: 34, fontWeight: 700, lineHeight: 1, color: 'var(--hb-ink)' }}>{a.projectedIB.value}</div>
            <div style={{ fontSize: 11, color: 'var(--hb-green)', marginTop: 4 }}>▲ +{a.projectedIB.vsLY} v LY · max 45</div>
          </div>
        </div>

        {/* Attitude to Learning donut */}
        <div style={{ border: '1px solid var(--hb-rule)', background: 'var(--hb-card)', padding: 14, marginBottom: 14, display: 'grid', gridTemplateColumns: '120px 1fr', gap: 14, alignItems: 'center' }}>
          <Donut segments={atlSegs} size={120} strokeWidth={20} centerLabel={a.atl.overall} centerSub="OVERALL" />
          <div>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--hb-mute)', fontWeight: 700, marginBottom: 8 }}>Attitude to learning</div>
            {atlSegs.map(s => (
              <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, padding: '2px 0' }}>
                <span><span style={{display:'inline-block',width:8,height:8,background:s.color,marginRight:6,borderRadius:2}} />{s.label}</span>
                <span className="hb-serif" style={{ fontWeight: 700 }}>{s.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ border: '1px solid var(--hb-rule)', background: 'var(--hb-card)' }}>
            <Stat label="Yellow tickets (30d)" value={a.yellowTickets.value.toLocaleString()} rag="green" delta={{ value: '+138', suffix: ' wk' }} series={a.ticketTrend} color="var(--hb-magenta)" />
          </div>
          <div style={{ border: '1px solid var(--hb-rule)', background: 'var(--hb-card)' }}>
            <Stat label="Academic flags (30d)" value={a.academicFlags.value} rag="amber" delta={{ value: -8, invertColor: true, suffix: ' wk' }} series={a.flagsTrend} color="var(--hb-amber)" />
          </div>
          <div style={{ border: '1px solid var(--hb-rule)', background: 'var(--hb-card)' }}>
            <Stat label="Oxbridge offers" value={`${a.oxbridge.offers} / ${a.oxbridge.target}`} rag="green" delta={{ value: '+4 v target' }} />
          </div>
          <div style={{ border: '1px solid var(--hb-rule)', background: 'var(--hb-card)' }}>
            <Stat label="Assignment completion" value={a.assignmentCompletion.value} unit="%" rag="green" />
          </div>
        </div>
      </div>
    );
  };

  // ── Column: Pastoral ──
  const PastoralColumn = () => {
    const p = D.pastoral;
    return (
      <div>
        <SectionTitle number="IV" title="Pastoral Care" subtitle="CPOMS · Attendance · Wellbeing" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
          <div style={{ border: '1px solid var(--hb-rule)', background: 'var(--hb-card)' }}>
            <Stat label="Attendance" value={p.attendance.value} unit="%" rag="green" delta={{ value: +0.2, suffix: ' v LY' }} series={p.attendanceTrend} />
          </div>
          <div style={{ border: '1px solid var(--hb-rule)', background: 'var(--hb-card)' }}>
            <Stat label="CPOMS (week)" value={p.cpoms.value} rag="amber" delta={{ value: +3, invertColor: true, suffix: ' wk' }} />
          </div>
        </div>
        <div style={{ border: '1px solid var(--hb-rule)', background: 'var(--hb-card)', padding: 14, marginBottom: 12 }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--hb-mute)', fontWeight: 700, marginBottom: 8 }}>Steer — pupil wellbeing</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
            {Object.entries(p.steerMetric).filter(([k]) => k !== 'rag').map(([k, v]) => (
              <div key={k}>
                <div style={{ fontSize: 10, color: 'var(--hb-mute)', textTransform: 'capitalize' }}>{k}</div>
                <div className="hb-serif" style={{ fontSize: 22, fontWeight: 700, color: 'var(--hb-ink)' }}>{v}<span style={{ fontSize: 11, color: 'var(--hb-mute)' }}>/10</span></div>
                <HorizBar value={v} max={10} color="var(--hb-green)" height={4} />
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <div style={{ border: '1px solid var(--hb-rule)', background: 'var(--hb-card)' }}>
            <Stat label="Counselling" value={p.counselling.value} rag="amber" delta={{ value: +11, invertColor: true, suffix: ' v LY' }} compact />
          </div>
          <div style={{ border: '1px solid var(--hb-rule)', background: 'var(--hb-card)' }}>
            <Stat label="Green/blue tix" value={p.greenBlueTickets.value} rag="green" delta={{ value: +54, suffix: ' wk' }} compact />
          </div>
          <div style={{ border: '1px solid var(--hb-rule)', background: 'var(--hb-card)' }}>
            <Stat label="Missing registers" value={p.missingRegisters.value} rag="green" delta={{ value: -2, invertColor: true, suffix: ' wk' }} compact />
          </div>
          <div style={{ border: '1px solid var(--hb-rule)', background: 'var(--hb-card)' }}>
            <Stat label="Outstanding Every" value={p.outstandingEvery.value} rag="amber" delta={{ value: -6, invertColor: true }} compact />
          </div>
        </div>
      </div>
    );
  };

  // ── Column: People & Policies ──
  const PeopleColumn = () => {
    const p = D.people;
    return (
      <div>
        <SectionTitle number="III" title="People & Policies" subtitle="HR · Compliance" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
          <div style={{ border: '1px solid var(--hb-rule)', background: 'var(--hb-card)', padding: 14, display: 'flex', gap: 10, alignItems: 'center' }}>
            <Ring value={p.scrComplete.value} color="var(--hb-green)" size={68} strokeWidth={7} />
            <div>
              <div style={{ fontSize: 11, color: 'var(--hb-mute)', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 600 }}>SCR complete</div>
              <div style={{ fontSize: 11, color: 'var(--hb-green)', marginTop: 2 }}>All staff records in order</div>
            </div>
          </div>
          <div style={{ border: '1px solid var(--hb-rule)', background: 'var(--hb-card)', padding: 14, display: 'flex', gap: 10, alignItems: 'center' }}>
            <Ring value={p.safeguarding.value} color="var(--hb-amber)" size={68} strokeWidth={7} />
            <div>
              <div style={{ fontSize: 11, color: 'var(--hb-mute)', textTransform: 'uppercase', letterSpacing: '.08em', fontWeight: 600 }}>Safeguarding</div>
              <div style={{ fontSize: 11, color: 'var(--hb-amber)', marginTop: 2 }}>2 outstanding — follow-up</div>
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, marginBottom: 14 }}>
          <div style={{ border: '1px solid var(--hb-rule)', background: 'var(--hb-card)' }}>
            <Stat label="Turnover total" value={p.turnover.total} unit="%" rag="green" compact />
          </div>
          <div style={{ border: '1px solid var(--hb-rule)', background: 'var(--hb-card)' }}>
            <Stat label="Turnover teach" value={p.turnover.teaching} unit="%" rag="green" compact />
          </div>
          <div style={{ border: '1px solid var(--hb-rule)', background: 'var(--hb-card)' }}>
            <Stat label="Turnover ops" value={p.turnover.operations} unit="%" rag="amber" compact />
          </div>
          <div style={{ border: '1px solid var(--hb-rule)', background: 'var(--hb-card)' }}>
            <Stat label="Vacancies" value={p.vacancies.value} rag="amber" compact />
          </div>
          <div style={{ border: '1px solid var(--hb-rule)', background: 'var(--hb-card)' }}>
            <Stat label="Long-term sick" value={p.longTermSick.value} rag="amber" compact />
          </div>
          <div style={{ border: '1px solid var(--hb-rule)', background: 'var(--hb-card)' }}>
            <Stat label="Tribunals" value={p.tribunals.value} rag="green" compact />
          </div>
        </div>

        <div style={{ border: '1px solid var(--hb-rule)', background: 'var(--hb-card)', padding: 14 }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--hb-mute)', fontWeight: 700, marginBottom: 10 }}>
            Policy renewal · <b style={{ color: 'var(--hb-ink)' }}>{p.policyRenewal.reviewedYTD}</b> / {p.policyRenewal.planned} YTD
          </div>
          {p.policyRenewal.upcoming.slice(0, 5).map(pol => (
            <div key={pol.name} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 10, padding: '5px 0', borderTop: '1px dotted var(--hb-rule)', fontSize: 12 }}>
              <span className="hb-serif" style={{ color: 'var(--hb-ink)' }}>{pol.name}</span>
              <span style={{ color: 'var(--hb-mute)', fontSize: 11 }}>{new Date(pol.due).toLocaleDateString('en-GB', { day:'2-digit', month:'short' })}</span>
              <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '.06em', color: pol.status==='Draft'?'var(--hb-amber)':'var(--hb-mute)' }}>{pol.status}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── Column: Co-Curricular ──
  const CoCurrColumn = () => {
    const c = D.coCurricular;
    const sr = c.sportsResults;
    const segs = [
      { label: 'W', value: sr.win,  color: 'var(--hb-green)' },
      { label: 'D', value: sr.draw, color: 'var(--hb-amber)' },
      { label: 'L', value: sr.loss, color: 'var(--hb-grey)' },
    ];
    return (
      <div>
        <SectionTitle number="V" title="Co-Curricular" subtitle="Sport · Trips · Music" />
        <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', gap: 12, marginBottom: 14, border: '1px solid var(--hb-rule)', background: 'var(--hb-card)', padding: 14, alignItems: 'center' }}>
          <Donut segments={segs} size={120} strokeWidth={18} centerLabel={`${sr.win}%`} centerSub="WINS" />
          <div>
            <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--hb-mute)', fontWeight: 700, marginBottom: 6 }}>Sports results · {sr.fixtures} fixtures</div>
            {segs.map(s => (
              <div key={s.label} style={{ display: 'grid', gridTemplateColumns: '18px 1fr 40px', gap: 6, alignItems: 'center', padding: '3px 0', fontSize: 12 }}>
                <span className="hb-serif" style={{ fontWeight: 700, color: s.color }}>{s.label}</span>
                <HorizBar value={s.value} max={100} color={s.color} height={6} />
                <span className="hb-serif" style={{ fontWeight: 700, textAlign: 'right' }}>{s.value}%</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
          <div style={{ border: '1px solid var(--hb-rule)', background: 'var(--hb-card)' }}>
            <Stat label="Fixtures (wk)" value={c.fixtures.week} rag="green" delta={{ value: +5, suffix: ' v plan' }} compact />
          </div>
          <div style={{ border: '1px solid var(--hb-rule)', background: 'var(--hb-card)' }}>
            <Stat label="Activity att." value={c.activityAttendance.value} unit="%" rag="green" delta={{ value: +4, suffix: ' v LY' }} compact />
          </div>
          <div style={{ border: '1px solid var(--hb-rule)', background: 'var(--hb-card)' }}>
            <Stat label="LAMDA / Music" value={c.musicLamda.value} unit="%" rag="green" compact />
          </div>
          <div style={{ border: '1px solid var(--hb-rule)', background: 'var(--hb-card)' }}>
            <Stat label="Trips" value={`${c.trips.current}/${c.trips.forthcoming}`} rag="green" compact />
          </div>
        </div>

        <div style={{ border: '1px solid var(--hb-rule)', background: 'var(--hb-card)', padding: 14 }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--hb-mute)', fontWeight: 700, marginBottom: 8 }}>Upcoming fixtures</div>
          {c.upcomingFixtures.map((f, i) => (
            <div key={i} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 80px 20px', gap: 8, padding: '5px 0', borderTop: i===0?'none':'1px dotted var(--hb-rule)', fontSize: 12 }}>
              <span className="hb-serif" style={{ fontWeight: 700 }}>{f.sport}</span>
              <span style={{ color: 'var(--hb-ink-2)' }}>v {f.opponent}</span>
              <span style={{ color: 'var(--hb-mute)' }}>{f.when}</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: f.home?'var(--hb-magenta)':'var(--hb-mute)' }}>{f.home?'H':'A'}</span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // ── Column: Finance ──
  const FinanceColumn = () => {
    const f = D.finance;
    return (
      <div>
        <SectionTitle number="VI" title="Finance & Operations" subtitle="Budget · Capex · Risk" />
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 14 }}>
          <div style={{ border: '1px solid var(--hb-rule)', background: 'var(--hb-card)' }}>
            <Stat label="Core surplus (proj.)" value={`£${f.coreSurplus.value}k`} rag="green" delta={{ value: '+188 v bud' }} serifValue={false} />
          </div>
          <div style={{ border: '1px solid var(--hb-rule)', background: 'var(--hb-card)' }}>
            <Stat label="Net surplus (proj.)" value={`£${(f.netSurplus.value/1000).toFixed(1)}m`} rag="green" delta={{ value: '+188 v bud' }} serifValue={false} />
          </div>
        </div>

        {/* Cashflow actual vs forecast */}
        <div style={{ border: '1px solid var(--hb-rule)', background: 'var(--hb-card)', padding: 14, marginBottom: 14 }}>
          <div style={{ fontSize: 11, textTransform: 'uppercase', letterSpacing: '.08em', color: 'var(--hb-mute)', fontWeight: 700, marginBottom: 8, display: 'flex', justifyContent: 'space-between' }}>
            <span>Cashflow — actual v forecast</span>
            <span style={{ fontSize: 10 }}>12mo · £m</span>
          </div>
          <AreaChart actual={f.cashflowTrend} forecast={f.budgetTrend} height={120} />
          <div style={{ display: 'flex', gap: 14, marginTop: 6, fontSize: 11 }}>
            <span><span style={{display:'inline-block',width:10,height:2,background:'var(--hb-magenta)',verticalAlign:'middle'}} /> Actual</span>
            <span><span style={{display:'inline-block',width:10,height:2,background:'var(--hb-grey)',verticalAlign:'middle',borderTop:'1px dashed'}} /> Forecast</span>
            <span style={{ marginLeft: 'auto' }}>EBITDA <b>{f.ebitda.actual}</b> v bud {f.ebitda.budget} <span className="rag-pill rag-green" style={{ fontSize: 9, padding: '1px 6px' }}>GREEN</span></span>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
          <div style={{ border: '1px solid var(--hb-rule)', background: 'var(--hb-card)' }}>
            <Stat label="Capex" value={`£${f.capex.value}k`} rag="amber" serifValue={false} compact />
          </div>
          <div style={{ border: '1px solid var(--hb-rule)', background: 'var(--hb-card)' }}>
            <Stat label="Fee arrears" value={`£${f.feeArrears.value}k`} rag="amber" delta={{ value: +40, invertColor: true }} serifValue={false} compact />
          </div>
          <div style={{ border: '1px solid var(--hb-rule)', background: 'var(--hb-card)' }}>
            <Stat label="Fire tests" value={f.fireTests.value} unit="%" rag="green" compact />
          </div>
        </div>
      </div>
    );
  };

  // Simple area chart: actual vs forecast
  const AreaChart = ({ actual, forecast, height = 120 }) => {
    const all = [...actual, ...forecast];
    const min = Math.min(...all), max = Math.max(...all);
    const range = max - min || 1;
    const W = 320, H = height;
    const path = (arr) => arr.map((v, i) => {
      const x = (i / (arr.length - 1)) * W;
      const y = H - ((v - min) / range) * (H - 20) - 10;
      return `${i===0?'M':'L'}${x.toFixed(1)} ${y.toFixed(1)}`;
    }).join(' ');
    const area = (arr) => path(arr) + ` L${W} ${H} L0 ${H} Z`;
    return (
      <svg width="100%" viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ display: 'block' }}>
        {[0.25, 0.5, 0.75].map(p => <line key={p} x1="0" x2={W} y1={H*p} y2={H*p} stroke="var(--hb-rule)" strokeDasharray="2 4" />)}
        <path d={area(actual)} fill="var(--hb-magenta)" opacity=".12" />
        <path d={path(actual)} fill="none" stroke="var(--hb-magenta)" strokeWidth="2" />
        <path d={path(forecast)} fill="none" stroke="var(--hb-grey)" strokeWidth="1.5" strokeDasharray="4 4" />
      </svg>
    );
  };

  // Activity feed (right rail on front page)
  const ActivityFeed = () => (
    <div>
      <SectionTitle number="" title="The Wire" subtitle="Activity feed · today" accent="var(--hb-ink)" />
      <div style={{ border: '1px solid var(--hb-rule)', background: 'var(--hb-card)' }}>
        {D.feed.map((f, i) => (
          <div key={i} style={{ padding: '10px 12px', borderTop: i===0?'none':'1px solid var(--hb-rule)', fontSize: 12 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 3 }}>
              <span className="hb-mono" style={{ fontSize: 10, color: 'var(--hb-mute)' }}>{f.t}</span>
              <RAGDot status={f.sev} size={6} />
              <span style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '.1em', color: 'var(--hb-mute)' }}>{f.type}</span>
            </div>
            <div style={{ color: 'var(--hb-ink)', lineHeight: 1.45 }}>{f.text}</div>
            <div style={{ fontSize: 10.5, color: 'var(--hb-mute)', marginTop: 3, fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>— {f.by}</div>
          </div>
        ))}
      </div>
    </div>
  );

  // Drill-down modal
  const Modal = ({ title, onClose, children }) => (
    <div onClick={onClose} style={{ position: 'fixed', inset: 0, background: 'rgba(26, 22, 19, .5)', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{ background: 'var(--hb-paper)', maxWidth: 640, width: '100%', maxHeight: '80vh', overflow: 'auto', border: '1px solid var(--hb-ink)', boxShadow: '0 30px 80px rgba(0,0,0,.4)' }}>
        <div style={{ padding: '16px 20px', borderBottom: '2px solid var(--hb-ink)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 className="hb-serif" style={{ margin: 0, fontSize: 22, fontWeight: 800 }}>{title}</h3>
          <button onClick={onClose} style={{ border: 'none', background: 'transparent', fontSize: 22, cursor: 'pointer', color: 'var(--hb-mute)' }}>×</button>
        </div>
        <div style={{ padding: 20 }}>{children}</div>
      </div>
    </div>
  );

  // ── FRONT PAGE ──
  const FrontPage = ({ onDrill }) => (
    <div>
      <TheLead onDrill={onDrill} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
        <AdmissionsColumn />
        <AcademicColumn />
        <div>
          <PastoralColumn />
          <div style={{ height: 18 }} />
          <ActivityFeed />
        </div>
      </div>
      <div style={{ height: 28 }} />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
        <PeopleColumn />
        <CoCurrColumn />
        <FinanceColumn />
      </div>
    </div>
  );

  // Single-section deep pages
  const SectionPage = ({ id }) => {
    const map = {
      admissions: AdmissionsColumn,
      academic:   AcademicColumn,
      people:     PeopleColumn,
      pastoral:   PastoralColumn,
      cocurr:     CoCurrColumn,
      finance:    FinanceColumn,
    };
    const C = map[id];
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 360px', gap: 28 }}>
        <div style={{ gridColumn: 'span 2' }}>
          <div style={{ transform: 'scale(1)', transformOrigin: 'top left' }}>
            {/* Render larger */}
            <div style={{ fontSize: 14 }}>
              <C />
            </div>
          </div>
        </div>
        <ActivityFeed />
      </div>
    );
  };

  // Root Broadsheet component
  const Broadsheet = () => {
    const [section, setSection] = useState('front');
    const [filters, setFilters] = useState(window.HBY.defaultFilters);
    const [drill, setDrill] = useState(null);
    return (
      <div style={{ display: 'flex', width: '100%', height: '100%', background: 'var(--hb-paper)', fontFamily: 'var(--font-sans)' }}>
        <Sidebar section={section} setSection={setSection} filters={filters} setFilters={setFilters} />
        <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }} className="hb-scroll">
          <Nameplate filters={filters} />
          <div style={{ padding: '22px 32px 48px', flex: 1 }}>
            {section === 'front' ? <FrontPage onDrill={setDrill} /> : <SectionPage id={section} />}
          </div>
        </div>
        {drill && <Modal title={drill} onClose={() => setDrill(null)}>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: 'var(--hb-ink-2)' }}>
            Drill-down view for <b>{drill}</b> — this would open a full detail page with historical trend, breakdown by house / year group, and associated reports.
          </p>
          <p style={{ fontSize: 13, color: 'var(--hb-mute)', fontStyle: 'italic', marginTop: 12 }}>
            (Prototype — full drill-down not implemented.)
          </p>
        </Modal>}
      </div>
    );
  };

  window.Broadsheet = Broadsheet;
})();
