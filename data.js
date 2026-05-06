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

  // Activity feed — mixed pan-school events
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

  // Calendar heatmap (last 28 days of incidents/flags — for density view)
  const heat28 = Array.from({length: 28}, (_,i) => Math.round(4 + Math.sin(i/3)*3 + Math.random()*6));

  return {
    today, termWeeks, HOUSES, YEARS,
    admissions, academic, people, pastoral, coCurricular, finance,
    feed, heat28,
  };
})();
