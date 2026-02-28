/* data.js — mock data for Immediac CEO Dashboard */

const DATA = {

  company: 'Immediac',
  ceo: 'John',
  period: 'Week of Feb 24 – Mar 2, 2026',

  kpis: {
    heroMetric: {
      label: 'Avg Revenue / Employee Hour',
      value: '$142.50',
      target: '$150.00',
      trend: [118, 124, 131, 128, 138, 135, 142],
      vsLastWeek: '+4.2%',
      vsTarget: '95%',
      direction: 'up',
    },
    cards: [
      { label: 'New Inquiries',    value: '14',    delta: '+3',  dir: 'up',   color: '#2563eb' },
      { label: 'Quotes Written',   value: '9',     delta: '+1',  dir: 'up',   color: '#7c3aed' },
      { label: 'Quotes Closed',    value: '5',     delta: '-1',  dir: 'down', color: '#059669' },
      { label: 'Deals in Funnel',  value: '23',    delta: '+5',  dir: 'up',   color: '#0891b2' },
      { label: 'Hours Billed',     value: '312',   delta: '+28', dir: 'up',   color: '#d97706' },
    ]
  },

  initiatives: [
    {
      id: 'i1', title: 'Launch Immediac Pro Tier', status: 'active',
      description: 'Design and launch a premium service tier targeting enterprise clients. Includes dedicated account management and SLA guarantees.',
      progress: 65, owner: 'John', dueDate: 'Mar 31, 2026',
      milestones: ['Pricing model finalised ✓', 'Sales deck drafted ✓', 'Pilot client identified', 'Go-to-market plan']
    },
    {
      id: 'i2', title: 'Ops Efficiency Program', status: 'active',
      description: 'Reduce non-billable overhead by 20% through process automation and role clarity.',
      progress: 40, owner: 'John', dueDate: 'Apr 15, 2026',
      milestones: ['Time audit complete ✓', 'Bottlenecks mapped', 'Automation tools selected', 'Rollout']
    },
    {
      id: 'i3', title: 'Team Growth Plan Q2', status: 'planning',
      description: 'Hire 3 senior technicians and 1 project coordinator to support revenue growth targets.',
      progress: 15, owner: 'John', dueDate: 'May 1, 2026',
      milestones: ['Job descriptions written', 'Job boards posted', 'Interview pipeline', 'Onboarding plan']
    },
    {
      id: 'i4', title: 'Customer Portal v1', status: 'paused',
      description: 'Self-service portal for clients to view job status, invoices, and book follow-ups.',
      progress: 25, owner: 'John', dueDate: 'TBD',
      milestones: ['Wireframes done ✓', 'Dev scoped', 'Build', 'Launch']
    },
  ],

  projects: [
    {
      id: 'p1', title: 'Riverside Medical — HVAC Retrofit', status: 'active',
      client: 'Riverside Medical', value: '$84,000', progress: 70,
      description: '3-phase HVAC replacement across 4 floors. Phase 2 in progress.',
      dueDate: 'Mar 14, 2026', pm: 'Mike D.'
    },
    {
      id: 'p2', title: 'Harbour View Condos — Electrical Panel Upgrade', status: 'active',
      client: 'Harbour View', value: '$31,500', progress: 45,
      description: 'Panel upgrades for 18 units. Currently 8 of 18 complete.',
      dueDate: 'Mar 7, 2026', pm: 'Sarah K.'
    },
    {
      id: 'p3', title: 'Dalhousie Univ. — Lab Ventilation', status: 'quoting',
      client: 'Dalhousie University', value: '~$55,000', progress: 0,
      description: 'Quote requested for new lab ventilation install in Steele Building.',
      dueDate: 'Quote due Mar 3, 2026', pm: 'John'
    },
    {
      id: 'p4', title: 'Atlantic Logistics — Generator Install', status: 'completed',
      client: 'Atlantic Logistics', value: '$22,000', progress: 100,
      description: 'Standby generator installation and commissioning. Signed off Feb 21.',
      dueDate: 'Completed Feb 21', pm: 'Mike D.'
    },
  ],

  todos: [
    { id: 't1', text: 'Review Dalhousie quote before sending', priority: 'high', due: 'Today', done: false },
    { id: 't2', text: 'Sign off on Riverside Phase 2 change order', priority: 'high', due: 'Today', done: false },
    { id: 't3', text: 'Call insurance broker re: Q2 coverage review', priority: 'medium', due: 'Mar 3', done: false },
    { id: 't4', text: 'Review March payroll adjustments', priority: 'medium', due: 'Mar 5', done: false },
    { id: 't5', text: 'Send Pro Tier deck to pilot client', priority: 'high', due: 'Mar 4', done: false },
    { id: 't6', text: 'Update LinkedIn company page', priority: 'low', due: 'Mar 7', done: false },
    { id: 't7', text: 'Approve Q1 marketing budget', priority: 'medium', due: 'Completed', done: true },
    { id: 't8', text: 'Onboarding checklist for new hire', priority: 'low', due: 'Completed', done: true },
  ],

  delegation: [
    {
      task: 'Finalise Harbour View punch list', person: 'Sarah K.', initials: 'SK',
      assigned: 'Feb 24', due: 'Mar 3, 2026', status: 'in-progress'
    },
    {
      task: 'Source generator parts for next job', person: 'Mike D.', initials: 'MD',
      assigned: 'Feb 25', due: 'Mar 1, 2026', status: 'overdue'
    },
    {
      task: 'Update CRM with Feb closed deals', person: 'Lisa T.', initials: 'LT',
      assigned: 'Feb 28', due: 'Mar 4, 2026', status: 'in-progress'
    },
    {
      task: 'Draft operations manual section 3', person: 'Lisa T.', initials: 'LT',
      assigned: 'Feb 20', due: 'Mar 10, 2026', status: 'in-progress'
    },
    {
      task: 'Permit application — Riverside Phase 3', person: 'Mike D.', initials: 'MD',
      assigned: 'Feb 27', due: 'Mar 6, 2026', status: 'pending'
    },
  ],

};
