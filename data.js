// Haileybury Management Dashboard — mock data derived from the Governor spec
// Six sections, RAG-tagged metrics, longitudinal series, and filter dimensions.

window.DASHBOARD_DATA = (function () {
  const today = new Date('2026-04-21');
  const termWeeks = 8;

  // Dimension filters
  const HOUSES = ['Allenby', 'Batten', 'Bartle Frere', 'Colvin', 'Edmonstone', 'Hailey', 'Kipling', 'Lawrence', 'Melvill', 'Thomason', 'Trevelyan'];
  const YEARS  = ['Y9', 'Y10', 'Y11', 'Y12', 'Y13'];

  // Admissions & Pipeline
  const admissions = {
    onRoll:        { value: 924, vsBudget: +4,  vsLY: +12, rag: 'green', target: 920, unit: '', label: 'Pupils on roll' },
    boardingPct:   { value: 53,  vsBudget: -1,  vsLY: -2,  rag: 'amber', target: 54,  unit: '%', label: 'Boarding %' },
    y1DayBoard:    { day: 58, boarding: 84, rag: 'green', label: 'Y1 — Day vs Boarding' },
    yearGender:    [ // Y9..Y13
      { year: 'Y9',  boys: 102, girls:  88 },
      { year: 'Y10', boys:  96, girls:  94 },
      { year: 'Y11', boys: 104, girls:  92 },
      { year: 'Y12', boys: 110, girls: 102 },
      { year: 'Y13', boys: 118, girls:  98 },
    ],
    pipeline: [
      { stage: 'Enquiries',   count: 412, delta: +23 },
      { stage: 'Registered',  count: 268, delta: +11 },
      { stage: 'Assessed',    count: 194, delta:  +6 },
      { stage: 'Offers',      count: 148, delta:  +4 },
      { stage: 'Accepted',    count: 112, delta:  +9 },
      { stage: 'Enrolled',    count:  96, delta:  +2 },
    ],
    conversionPct: { value: 41, vsLY: +3, rag: 'green', label: 'Admission conversion' },
    withdrawals:   { value:  7, vsLY: -2, rag: 'green', label: 'Admission withdrawals' },
  };

  // Academic Performance
  const academic = {
    projectedALevel: { value: 'A*A*A', distribution: { 'A*':42, 'A':31, 'B':18, 'C':7, 'D':2 }, vsLY: '+1 grade avg', rag: 'green' },
    projectedIB:     { value: 38.4,   avgPoints: 38.4, max: 45, vsLY: +0.6, rag: 'green' },
    atl: { // attitude to learning
      distribution: { 'Outstanding': 28, 'Good': 54, 'Requires improvement': 14, 'Unsatisfactory': 4 },
      overall: 'Good',
      vsLY: +2,
      rag: 'green',
    },
    oxbridge: { offers: 22, target: 18, applications: 48, rag: 'green' },
    yellowTickets:  { value: 1847, vsLastWeek: +138, rag: 'green', label: 'Yellow tickets awarded (30d)' },
    academicFlags:  { value:   62, vsLastWeek: -8,   rag: 'amber', label: 'Academic flags issued (30d)' },
    assignmentCompletion: { value: 94, rag: 'green', label: 'Assignment completion', unit: '%' },
    // 12-week trend for yellow tickets
    ticketTrend: [120, 145, 132, 158, 174, 163, 189, 204, 188, 212, 228, 245],
    flagsTrend:  [ 18,  22,  19,  24,  28,  31,  26,  21,  19,  17,  15,  12],
  };

  // People & Policies
  const people = {
    scrComplete:  { value: 100, target: 100, rag: 'green', label: 'SCR complete' },
    vacancies:    { value:  12, teaching: 5, operations: 7, rag: 'amber', label: 'Vacancies' },
    longTermSick: { value:   4, rag: 'amber', label: 'Long-term sick' },
    tribunals:    { value:   0, rag: 'green', label: 'Tribunals' },
    safeguarding: { value:  99, target: 100, rag: 'amber', label: 'Safeguarding training complete', unit: '%' },
    turnover:     { total: 8.2, teaching: 6.1, operations: 12.4, sector: 11.0, rag: 'green' },
    policyRenewal: {
      reviewedYTD: 47, planned: 62, rag: 'amber',
      upcoming: [
        { name: 'Safeguarding Policy',        due: '2026-05-03', status: 'In review' },
        { name: 'Behaviour Policy',           due: '2026-05-21', status: 'Draft' },
        { name: 'Anti-Bullying Policy',       due: '2026-06-08', status: 'Scheduled' },
        { name: 'Acceptable Use (Digital)',   due: '2026-06-15', status: 'Draft' },
        { name: 'Complaints Procedure',       due: '2026-07-02', status: 'Scheduled' },
      ],
    },
    lateness: { avgMinutes: 2.4, vsLY: -0.3, rag: 'green' },
  };

  // Pastoral
  const pastoral = {
    cpoms:       { value:  34, vsLastWeek: +3,  rag: 'amber', label: 'CPOMS referrals (week)' },
    counselling: { value:  58, pctOfRoll: 6.3, vsLY: +11, rag: 'amber', label: 'Pupils receiving counselling' },
    attendance:  { value: 96.4, target: 96.0, vsLY: +0.2, rag: 'green', unit: '%', label: 'Attendance' },
    missingRegisters: { value: 3, vsLastWeek: -2, rag: 'green', label: 'Missing registers' },
    greenBlueTickets: { value: 742, vsLastWeek: +54, rag: 'green', label: 'Green / blue tickets' },
    outstandingEvery: { value: 28, vsLastWeek: -6, rag: 'amber', label: 'Outstanding Every tickets' },
    detentions: { week: 41, term: 312, rag: 'amber' },
    steerMetric: { wellbeing: 7.4, resilience: 6.9, belonging: 7.8, rag: 'green' },
    // 7-day attendance
    attendanceTrend: [96.1, 96.3, 95.8, 96.7, 96.5, 97.1, 96.4],
  };

  // Co-curricular
  const coCurricular = {
    fixtures:      { week: 48, vsPlan: +5, rag: 'green', label: 'Fixtures this week' },
    sportsResults: { win: 62, draw: 14, loss: 24, fixtures: 186, rag: 'green' },
    trips:         { forthcoming: 9, current: 2, rag: 'green', label: 'Trips' },
    activityAttendance: { value: 88, target: 85, vsLY: +4, rag: 'green', unit: '%', label: 'Sport & activities attendance' },
    musicLamda:    { value: 92, enrolled: 312, rag: 'green', unit: '%', label: 'LAMDA / Music lesson attendance' },
    upcomingFixtures: [
      { sport: '1st XV Rugby',       opponent: 'Tonbridge',    when: 'Sat 25 Apr', home: true  },
      { sport: '1st XI Hockey (G)',  opponent: 'Cheltenham',   when: 'Sat 25 Apr', home: false },
      { sport: 'U15 Netball',        opponent: 'Oundle',       when: 'Wed 29 Apr', home: true  },
      { sport: '1st XI Cricket',     opponent: 'Eton',         when: 'Sat 02 May', home: false },
      { sport: 'Swimming Gala',      opponent: 'Inter-house',  when: 'Fri 08 May', home: true  },
    ],
    currentTrips: [
      { name: 'Geography Iceland',   pupils: 28, staff: 4, returns: '2026-04-26' },
      { name: 'Classics Rome',       pupils: 22, staff: 3, returns: '2026-04-24' },
    ],
  };

  // Finance & Operations
  const finance = {
    coreSurplus:    { value: 1900, vsBudget: +188, unit: '£k', rag: 'green', label: 'Projected core surplus' },
    netSurplus:     { value: 2500, vsBudget: +188, unit: '£k', rag: 'green', label: 'Projected net surplus' },
    capex:          { value: 2500, vsBudget:   0,  unit: '£k', rag: 'amber', label: 'Projected capex' },
    feeArrears:     { value:  400, vsBudget: +40,  unit: '£k', rag: 'amber', label: 'Fee arrears (bad debt)' },
    fundraising:    { value:  -40, target: 1500, raised: 1460, unit: '£k', rag: 'amber', label: 'Fundraising vs target' },
    fireTests:      { value: 100, rag: 'green', unit: '%', label: 'Fire tests on track' },
    cashflowTrend: [1.8, 2.1, 1.9, 2.4, 2.7, 2.9, 2.6, 3.1, 3.4, 3.2, 3.5, 3.8], // £m
    budgetTrend:   [1.9, 2.0, 2.1, 2.2, 2.4, 2.5, 2.6, 2.7, 2.9, 3.0, 3.2, 3.3],
    ebitda:        { actual: 4.8, budget: 4.4, forecast: 5.1, unit: '£m', rag: 'green' },
    covenantCover: { value: 3.6, covenant: 2.5, rag: 'green', unit: 'x' },
  };

  // Activity feed — mixed pan-school events (today)
  const feed = [
    { t: '09:42', type: 'safeguard', sev: 'amber', text: 'CPOMS referral logged — Y10 pastoral concern', by: 'J. Patel' },
    { t: '09:18', type: 'admin',     sev: 'green', text: 'Offer accepted — Y9 September intake (boarding)', by: 'Admissions' },
    { t: '08:55', type: 'academic',  sev: 'green', text: '1st XV squad list published for Saturday fixture', by: 'D. Reynolds' },
    { t: '08:31', type: 'finance',   sev: 'amber', text: 'Fee arrears report — 3 accounts > 30 days', by: 'Finance Office' },
    { t: '08:14', type: 'policy',    sev: 'green', text: 'Behaviour Policy draft submitted for review', by: 'Deputy Head' },
    { t: '07:58', type: 'safeguard', sev: 'green', text: 'Fire test completed — Lawrence House (pass)', by: 'Ops' },
    { t: '07:40', type: 'admin',     sev: 'green', text: 'Morning registration — 96.4% attendance recorded', by: 'System' },
    { t: 'Yday',  type: 'academic',  sev: 'green', text: 'Oxbridge offer #22 confirmed — History (Trinity)', by: 'UCAS Office' },
  ];

  // Period-specific overrides — drives the Today/Week/Term/YTD pills.
  // Each period defines hero-KPI deltas/notes plus its own activity feed digest.
  const periods = {
    today: {
      label: 'Today',
      heroes: {
        onRoll:       { value: 921, delta: { value: -3,    suffix: ' v roll' },  note: '3 absent today' },
        attendance:   { value: 96.4, delta: { value: +0.0, suffix: ' v 7d avg' }, note: 'Live · 09:30' },
        netSurplus:   { value: '£2.5m', delta: { value: '—', suffix: '' },        note: 'Monthly view' },
        ibPoints:     { value: 38.4, delta: { value: '—', suffix: '' },           note: 'Projected · static' },
        oxbridge:     { value: 22,   delta: { value: '+1', suffix: ' today' },    note: 'History (Trinity)' },
        safeguarding: { value: 99,   delta: null,                                  note: '2 staff outstanding' },
      },
      feed: feed,
    },
    week: {
      label: 'This week',
      heroes: {
        onRoll:       { value: 924, delta: { value: +4,   suffix: ' v bud' },  note: '+12 v last year' },
        attendance:   { value: 96.4, delta: { value: +0.2, suffix: ' v LY' },   note: 'Target 96.0%' },
        netSurplus:   { value: '£2.5m', delta: { value: '+188', suffix: 'k v bud' }, note: 'Core £1.9m' },
        ibPoints:     { value: 38.4, delta: { value: +0.6, suffix: ' v LY' },   note: 'Max 45' },
        oxbridge:     { value: 22,   delta: { value: '+4',  suffix: ' v target' }, note: '48 applications' },
        safeguarding: { value: 99,   delta: null,                                note: '2 staff outstanding' },
      },
      feed: [
        { t: 'Mon', type: 'admin',     sev: 'green', text: '6 offers accepted — Y9 September intake', by: 'Admissions' },
        { t: 'Mon', type: 'safeguard', sev: 'amber', text: '4 CPOMS referrals logged · 2 escalated', by: 'DSL' },
        { t: 'Tue', type: 'academic',  sev: 'green', text: 'Mocks marked — Y13 averages up 0.4 grades', by: 'Academic Office' },
        { t: 'Tue', type: 'finance',   sev: 'amber', text: '£40k of fees moved into arrears', by: 'Finance' },
        { t: 'Wed', type: 'policy',    sev: 'green', text: 'Behaviour Policy v3 circulated for SLT review', by: 'Deputy Head' },
        { t: 'Wed', type: 'admin',     sev: 'green', text: 'Sport & activities attendance hit 88% (target 85%)', by: 'Co-Curr' },
        { t: 'Thu', type: 'safeguard', sev: 'green', text: 'All Lawrence House fire tests passed', by: 'Ops' },
        { t: 'Thu', type: 'academic',  sev: 'green', text: '3 new Oxbridge offers — Maths, Classics, Engineering', by: 'UCAS Office' },
        { t: 'Fri', type: 'admin',     sev: 'green', text: 'Week registration avg 96.4%', by: 'System' },
      ],
    },
    term: {
      label: 'This term',
      heroes: {
        onRoll:       { value: 924, delta: { value: +12,  suffix: ' v term start' }, note: 'Net +9 movements' },
        attendance:   { value: 95.9, delta: { value: -0.5, suffix: ' v target' },     note: 'Term average' },
        netSurplus:   { value: '£2.5m', delta: { value: '+188', suffix: 'k v bud' },   note: 'YTD core £1.9m' },
        ibPoints:     { value: 38.1, delta: { value: +0.3, suffix: ' v term 1' },      note: 'Trending up' },
        oxbridge:     { value: 22,   delta: { value: '+4',  suffix: ' v target' },     note: '48 applications' },
        safeguarding: { value: 99,   delta: { value: -1,   suffix: 'pp v term 1' },    note: '2 staff outstanding' },
      },
      feed: [
        { t: 'Wk 1', type: 'academic',  sev: 'green', text: 'Term opened · 924 on roll · highest in 5 yrs', by: 'Master' },
        { t: 'Wk 2', type: 'safeguard', sev: 'amber', text: '34 CPOMS referrals logged this term', by: 'DSL' },
        { t: 'Wk 3', type: 'finance',   sev: 'green', text: 'Fundraising hit £1.46m of £1.5m target', by: 'Development' },
        { t: 'Wk 4', type: 'academic',  sev: 'green', text: 'Mock results — A*A*A average maintained', by: 'Academic Office' },
        { t: 'Wk 5', type: 'policy',    sev: 'green', text: '4 policies reviewed and re-issued', by: 'Compliance' },
        { t: 'Wk 6', type: 'admin',     sev: 'green', text: '186 sport fixtures · 62% wins', by: 'Sport' },
      ],
    },
    ytd: {
      label: 'Year to date',
      heroes: {
        onRoll:       { value: 924, delta: { value: +12,   suffix: ' v 24/25' },   note: '99% retention' },
        attendance:   { value: 96.1, delta: { value: +0.4, suffix: ' v LY' },       note: '11-month average' },
        netSurplus:   { value: '£2.5m', delta: { value: '+0.4m', suffix: ' v LY' }, note: 'YTD core £1.9m' },
        ibPoints:     { value: 38.0, delta: { value: +0.5, suffix: ' v LY' },       note: '3-yr trend up' },
        oxbridge:     { value: 22,   delta: { value: '+4',  suffix: ' v target' },  note: '48 applications' },
        safeguarding: { value: 99,   delta: { value: +1,   suffix: 'pp v LY' },     note: '2 staff outstanding' },
      },
      feed: [
        { t: 'Sep',  type: 'admin',     sev: 'green', text: 'Year opened with 924 on roll — record intake', by: 'Master' },
        { t: 'Nov',  type: 'academic',  sev: 'green', text: 'Inspection visit — outstanding in 3 of 4 categories', by: 'ISI' },
        { t: 'Jan',  type: 'finance',   sev: 'green', text: 'Mid-year forecast lifted by £188k', by: 'Bursar' },
        { t: 'Feb',  type: 'safeguard', sev: 'amber', text: '142 CPOMS referrals YTD (vs 128 same-time LY)', by: 'DSL' },
        { t: 'Mar',  type: 'academic',  sev: 'green', text: 'Oxbridge offers reach 22 (target 18)', by: 'UCAS Office' },
      ],
    },
  };

  // Sector benchmarks — surfaced when "Show benchmarks" is toggled on.
  // Source label varies (top-25 indep avg, sector avg, ISC, IB global).
  const benchmarks = {
    onRoll:       { value: 880,    label: 'Top-25 indep. avg', better: 'higher' },
    attendance:   { value: 95.2,   label: 'ISC sector avg',    better: 'higher', unit: '%' },
    netSurplus:   { value: '£1.8m', label: 'Top-25 indep. avg', better: 'higher' },
    ibPoints:     { value: 35.1,   label: 'IB global avg',     better: 'higher' },
    oxbridge:     { value: 14,     label: 'Peer school avg',   better: 'higher' },
    safeguarding: { value: 97,     label: 'ISC sector avg',    better: 'higher', unit: '%' },
    // Cashflow benchmark line — sector EBITDA trend, £m
    cashflow:     [1.6, 1.7, 1.8, 1.9, 2.0, 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 2.7],
  };

  // Section-level period overrides for the deep pages. Each entry maps a
  // period to the four hero KPIs displayed on that section's deep page.
  // Order of hero entries matches the Deep components' hero strip.
  const sectionPeriods = {
    admissions: {
      today: [
        { value: 921, delta: { value: -3,   suffix: ' v roll' },  note: '3 absent today' },
        { value: 53,  delta: null,                                 note: 'Boarding %' },
        { value: 41,  delta: { value: '+1', suffix: ' today' },    note: '1 new accept' },
        { value:  0,  delta: null,                                 note: 'No withdrawals today' },
      ],
      week: [
        { value: 924, delta: { value: +4,  suffix: ' v bud' }, note: '+12 v last year' },
        { value: 53,  delta: { value: -1,  suffix: '% v bud' }, note: 'Below target 54%' },
        { value: 41,  delta: { value: +3,  suffix: ' v LY' },   note: 'Strong wk' },
        { value:  7,  delta: { value: -2,  suffix: ' v LY', invertColor: true }, note: 'Trending down' },
      ],
      term: [
        { value: 924, delta: { value: +12, suffix: ' v term start' }, note: 'Net +9 movements' },
        { value: 53,  delta: { value: -1,  suffix: '% v term 1' },     note: 'Watch trend' },
        { value: 39,  delta: { value: -2,  suffix: ' v term 1' },      note: 'Term avg' },
        { value: 18,  delta: { value: -3,  suffix: ' v term 1', invertColor: true }, note: 'Term total' },
      ],
      ytd: [
        { value: 924, delta: { value: +12, suffix: ' v 24/25' },  note: '99% retention' },
        { value: 53,  delta: { value: -2,  suffix: 'pp v LY' },   note: 'YTD' },
        { value: 41,  delta: { value: +3,  suffix: ' v LY' },     note: 'YTD avg 41%' },
        { value: 24,  delta: { value: -6,  suffix: ' v LY', invertColor: true }, note: '11mo total' },
      ],
    },
    academic: {
      today: [
        { value: 'A*A*A', delta: null,                                  note: 'Unchanged today' },
        { value: 38.4,    delta: null,                                  note: 'Static · projected' },
        { value: 22,      delta: { value: '+1', suffix: ' today' },     note: 'New offer · History' },
        { value: 94,      delta: { value: +0.4, suffix: ' v 7d avg' },  note: 'Live · 09:30' },
      ],
      week: [
        { value: 'A*A*A', delta: null,                              note: '+1 grade avg v LY' },
        { value: 38.4,    delta: { value: +0.6, suffix: ' v LY' },  note: 'Max 45' },
        { value: 22,      delta: { value: '+4', suffix: ' v target' }, note: '48 applications' },
        { value: 94,      delta: { value: +1,   suffix: 'pp v LW' },   note: 'Strong week' },
      ],
      term: [
        { value: 'A*A*A', delta: { value: '+1', suffix: ' grade v term 1' }, note: 'Mocks landed' },
        { value: 38.1,    delta: { value: +0.3, suffix: ' v term 1' },        note: 'Trending up' },
        { value: 22,      delta: { value: '+4', suffix: ' v target' },         note: 'Term cumulative' },
        { value: 92,      delta: { value: -1,   suffix: 'pp v term 1' },       note: 'Term avg' },
      ],
      ytd: [
        { value: 'A*A*A', delta: { value: '+1', suffix: ' v LY' },  note: '3-yr trend up' },
        { value: 38.0,    delta: { value: +0.5, suffix: ' v LY' },  note: 'Year forecast' },
        { value: 22,      delta: { value: '+8', suffix: ' v 24/25' }, note: 'Full year' },
        { value: 93,      delta: { value: +2,   suffix: 'pp v LY' },   note: 'YTD avg' },
      ],
    },
    pastoral: {
      today: [
        { value: 96.4, delta: null,                                  note: 'Live · 09:30' },
        { value: 4,    delta: { value: +1, invertColor: true },     note: 'New today' },
        { value: 58,   delta: null,                                  note: '6.3% of roll' },
        { value: 3,    delta: { value: -1, invertColor: true },     note: 'Today only' },
      ],
      week: [
        { value: 96.4, delta: { value: +0.2, suffix: ' v LY' }, note: 'Target 96.0%' },
        { value: 34,   delta: { value: +3, invertColor: true },  note: 'CPOMS this week' },
        { value: 58,   delta: { value: +11, invertColor: true }, note: '6.3% of roll' },
        { value: 41,   delta: null,                              note: '312 this term' },
      ],
      term: [
        { value: 95.9, delta: { value: -0.5, suffix: ' v target' }, note: 'Term average' },
        { value: 142,  delta: { value: +14, invertColor: true },    note: 'Term total · watch' },
        { value: 58,   delta: { value: +9,  invertColor: true },    note: 'On caseload' },
        { value: 312,  delta: null,                                  note: 'Term running total' },
      ],
      ytd: [
        { value: 96.1, delta: { value: +0.4, suffix: ' v LY' },     note: '11-month avg' },
        { value: 421,  delta: { value: +14, invertColor: true },    note: 'YTD vs same time LY' },
        { value: 71,   delta: { value: +13, invertColor: true },    note: 'YTD touched' },
        { value: 1180, delta: { value: -42, suffix: ' v LY' },      note: 'YTD total' },
      ],
    },
    people: {
      today: [
        { value: 100, delta: null,                            note: 'No changes today' },
        { value: 99,  delta: null,                            note: '2 outstanding' },
        { value: 12,  delta: { value: +1, invertColor: true }, note: 'New today: 1 ops' },
        { value: 8.2, delta: null,                            note: 'Sector 11.0%' },
      ],
      week: [
        { value: 100, delta: null,                          note: 'Target 100%' },
        { value: 99,  delta: null,                          note: '2 outstanding' },
        { value: 12,  delta: null,                          note: '5 teach · 7 ops' },
        { value: 8.2, delta: null,                          note: 'Sector 11.0%' },
      ],
      term: [
        { value: 100, delta: null,                                  note: 'SCR maintained' },
        { value: 98,  delta: { value: -1, suffix: 'pp v term 1', invertColor: true }, note: '4 outstanding' },
        { value: 17,  delta: { value: +5, invertColor: true },        note: 'Term peak' },
        { value: 7.4, delta: { value: -0.3, suffix: 'pp v term 1' },   note: 'Trending down' },
      ],
      ytd: [
        { value: 100, delta: null,                                note: 'Year on target' },
        { value: 99,  delta: { value: +1, suffix: 'pp v LY' },    note: '2 outstanding' },
        { value: 38,  delta: null,                                note: 'YTD opened' },
        { value: 8.2, delta: { value: -0.4, suffix: 'pp v LY' },  note: 'Improving' },
      ],
    },
    cocurr: {
      today: [
        { value: 12,  delta: { value: '+2', suffix: ' v plan' }, note: 'Today fixtures' },
        { value: 67,  delta: null,                                note: '3 played today' },
        { value: 88,  delta: { value: +4, suffix: ' v LY' },      note: 'Today only' },
        { value: 92,  delta: null,                                note: 'Live attendance' },
      ],
      week: [
        { value: 48,  delta: { value: '+5', suffix: ' v plan' }, note: '186 fixtures season' },
        { value: 62,  delta: null,                                note: '186 fixtures season' },
        { value: 88,  delta: { value: +4, suffix: ' v LY' },      note: 'Sport & activities' },
        { value: 92,  delta: null,                                note: '312 enrolled' },
      ],
      term: [
        { value: 186, delta: { value: '+12', suffix: ' v term 1' }, note: 'Term fixtures' },
        { value: 64,  delta: { value: +2,    suffix: 'pp v term 1' }, note: 'Term win rate' },
        { value: 87,  delta: { value: +3,    suffix: 'pp v term 1' }, note: 'Term avg' },
        { value: 91,  delta: { value: -1,    suffix: 'pp v term 1' }, note: '312 enrolled' },
      ],
      ytd: [
        { value: 412, delta: { value: '+38', suffix: ' v LY' }, note: 'Year fixtures' },
        { value: 65,  delta: { value: +3, suffix: 'pp v LY' },   note: 'Year win rate' },
        { value: 88,  delta: { value: +4, suffix: ' v LY' },     note: 'YTD' },
        { value: 91,  delta: { value: -2, suffix: 'pp v LY' },   note: '298 enrolled' },
      ],
    },
    finance: {
      today: [
        { value: '£1.9m', delta: null,                              note: 'Forecast unchanged' },
        { value: '£2.5m', delta: null,                              note: 'Forecast unchanged' },
        { value: '£2.5m', delta: null,                              note: 'No spend today' },
        { value: '£402k', delta: { value: '+£2k', invertColor: true }, note: '1 new arrear' },
      ],
      week: [
        { value: '£1.9m', delta: { value: '+188', suffix: 'k v bud' }, note: 'Core surplus' },
        { value: '£2.5m', delta: { value: '+188', suffix: 'k v bud' }, note: 'Net surplus' },
        { value: '£2.5m', delta: null,                                  note: 'Capex on plan' },
        { value: '£400k', delta: { value: '+40', suffix: 'k v bud', invertColor: true }, note: '3 accts > 30d' },
      ],
      term: [
        { value: '£1.9m', delta: { value: '+£0.1m', suffix: ' v term 1' }, note: 'Term forecast' },
        { value: '£2.5m', delta: { value: '+£0.1m', suffix: ' v term 1' }, note: 'Term forecast' },
        { value: '£1.7m', delta: null,                                       note: 'Term spend' },
        { value: '£420k', delta: { value: '+£40k', invertColor: true },      note: '4 accts > 30d' },
      ],
      ytd: [
        { value: '£1.9m', delta: { value: '+£0.4m', suffix: ' v LY' }, note: 'YTD forecast' },
        { value: '£2.5m', delta: { value: '+£0.4m', suffix: ' v LY' }, note: 'YTD forecast' },
        { value: '£2.3m', delta: { value: -8,  suffix: '% v plan' },    note: 'Underspend' },
        { value: '£480k', delta: { value: '+£60k', invertColor: true }, note: '6 accts > 30d' },
      ],
    },
  };

  // Section-level benchmarks (one per hero KPI on each Deep page).
  // Order matches the hero strip on each Deep page.
  const sectionBenchmarks = {
    admissions: [
      { value: 880,  label: 'Top-25 indep. avg' },
      { value: 47,   label: 'Sector boarding %', unit: '%' },
      { value: 32,   label: 'Sector conversion', unit: '%' },
      { value: 11,   label: 'Sector avg withdrawals' },
    ],
    academic: [
      { value: 'AAB',  label: 'Top-25 A-Level avg' },
      { value: 35.1,   label: 'IB global avg' },
      { value: 14,     label: 'Peer school avg' },
      { value: 88,     label: 'Sector avg', unit: '%' },
    ],
    pastoral: [
      { value: 95.2,   label: 'ISC sector avg', unit: '%' },
      { value: 22,     label: 'Sector avg (wk)' },
      { value: 4.1,    label: 'Sector avg %', unit: '% of roll' },
      { value: 36,     label: 'Sector avg (wk)' },
    ],
    people: [
      { value: 98,     label: 'ISC sector avg', unit: '%' },
      { value: 97,     label: 'ISC sector avg', unit: '%' },
      { value: 18,     label: 'Sector avg vacancies' },
      { value: 11.0,   label: 'Sector turnover', unit: '%' },
    ],
    cocurr: [
      { value: 32,     label: 'Sector avg (wk)' },
      { value: 54,     label: 'Sector win rate', unit: '%' },
      { value: 78,     label: 'Sector avg', unit: '%' },
      { value: 81,     label: 'Sector avg', unit: '%' },
    ],
    finance: [
      { value: '£1.4m', label: 'Top-25 indep. core' },
      { value: '£1.8m', label: 'Top-25 indep. net' },
      { value: '£2.1m', label: 'Sector avg capex' },
      { value: '£560k', label: 'Sector avg arrears' },
    ],
  };

  // Calendar heatmap (last 28 days of incidents/flags — for density view)
  const heat28 = Array.from({length: 28}, (_,i) => Math.round(4 + Math.sin(i/3)*3 + Math.random()*6));

  return {
    today, termWeeks, HOUSES, YEARS,
    admissions, academic, people, pastoral, coCurricular, finance,
    feed, heat28, periods, benchmarks, sectionPeriods, sectionBenchmarks,
  };
})();
