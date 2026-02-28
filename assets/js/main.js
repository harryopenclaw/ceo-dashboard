/* main.js — render dashboard from data */

const chevronSVG = `<svg class="accordion__chevron" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="5 8 10 13 15 8"/></svg>`;

/* ── Sparkline ── */
function sparkline(data, color = '#fff') {
  const W = 280, H = 80, pad = 4;
  const min = Math.min(...data), max = Math.max(...data);
  const scaleY = v => H - pad - ((v - min) / (max - min || 1)) * (H - pad * 2);
  const scaleX = i => pad + (i / (data.length - 1)) * (W - pad * 2);
  const pts = data.map((v, i) => `${scaleX(i)},${scaleY(v)}`).join(' ');
  const area = `M${scaleX(0)},${H} ` + data.map((v, i) => `L${scaleX(i)},${scaleY(v)}`).join(' ') + ` L${scaleX(data.length-1)},${H} Z`;
  return `
    <svg class="sparkline" viewBox="0 0 ${W} ${H}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sg" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${color}" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <path d="${area}" fill="url(#sg)"/>
      <polyline points="${pts}" fill="none" stroke="${color}" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="${scaleX(data.length-1)}" cy="${scaleY(data[data.length-1])}" r="4" fill="${color}" stroke="rgba(255,255,255,0.4)" stroke-width="2"/>
    </svg>`;
}

/* ── Hero KPI ── */
function renderHero(kpi) {
  const pct = Math.round((parseFloat(kpi.value.replace('$','')) / parseFloat(kpi.target.replace('$',''))) * 100);
  document.getElementById('hero-kpi').innerHTML = `
    <div>
      <div class="hero-kpi__label">${kpi.label}</div>
      <div class="hero-kpi__value">${kpi.value}</div>
      <div class="hero-kpi__sub">Target: ${kpi.target} &nbsp;·&nbsp; ${kpi.vsLastWeek} vs last week</div>
      <div class="hero-kpi__stats">
        <div>
          <div class="hero-kpi__stat-label">vs Target</div>
          <div class="hero-kpi__stat-value">${pct}%</div>
        </div>
        <div>
          <div class="hero-kpi__stat-label">7-Day Trend</div>
          <div class="hero-kpi__stat-value">${kpi.direction === 'up' ? '↑' : '↓'} Rising</div>
        </div>
      </div>
    </div>
    <div class="hero-kpi__sparkline">${sparkline(kpi.trend, '#fff')}</div>`;
}

/* ── KPI Cards ── */
function renderKpiCards(cards) {
  document.getElementById('kpi-cards').innerHTML = cards.map(c => `
    <div class="kpi-card">
      <div class="kpi-card__label">${c.label}</div>
      <div class="kpi-card__value" style="color:${c.color}">${c.value}</div>
      <div class="kpi-card__delta kpi-card__delta--${c.dir === 'up' ? 'up' : 'down'}">
        ${c.dir === 'up' ? '▲' : '▼'} ${c.delta} this week
      </div>
    </div>`).join('');
}

/* ── Status badge helper ── */
function statusBadge(s) {
  const map = {
    active:    ['green', 'Active'],
    planning:  ['blue',  'Planning'],
    paused:    ['amber', 'Paused'],
    completed: ['gray',  'Completed'],
    quoting:   ['purple','Quoting'],
    'in-progress': ['blue', 'In Progress'],
    overdue:   ['red',   'Overdue'],
    pending:   ['amber', 'Pending'],
  };
  const [color, label] = map[s] || ['gray', s];
  return `<span class="badge badge--${color}">${label}</span>`;
}

/* ── Initiatives ── */
function renderInitiatives(items) {
  document.getElementById('initiatives-list').innerHTML = items.map(i => `
    <div class="accordion__item">
      <button class="accordion__trigger">
        <span style="font-size:18px">${i.status === 'active' ? '🚀' : i.status === 'paused' ? '⏸' : '📋'}</span>
        <span style="flex:1">${i.title}</span>
        ${statusBadge(i.status)}
        <span style="font-size:var(--text-xs);color:var(--color-text-3);margin-right:var(--space-2)">${i.progress}%</span>
        ${chevronSVG}
      </button>
      <div class="accordion__body">
        <div class="accordion__inner">
          <p style="font-size:var(--text-sm);color:var(--color-text-2);margin-bottom:var(--space-3)">${i.description}</p>
          <div class="progress" style="margin-bottom:var(--space-4)">
            <div class="progress__fill" style="width:${i.progress}%;background:var(--color-primary)"></div>
          </div>
          <div style="display:flex;gap:var(--space-6);font-size:var(--text-xs);color:var(--color-text-2);margin-bottom:var(--space-3)">
            <span>Owner: <strong>${i.owner}</strong></span>
            <span>Due: <strong>${i.dueDate}</strong></span>
          </div>
          <div style="display:flex;flex-direction:column;gap:var(--space-2)">
            ${i.milestones.map((m,idx) => `
              <div style="display:flex;align-items:center;gap:var(--space-2);font-size:var(--text-sm)">
                <span style="color:${m.includes('✓') ? 'var(--color-success)' : 'var(--color-text-3)'}">
                  ${m.includes('✓') ? '✓' : '○'}
                </span>
                <span style="color:${m.includes('✓') ? 'var(--color-text-2)' : 'var(--color-text)'}">${m.replace(' ✓','')}</span>
              </div>`).join('')}
          </div>
        </div>
      </div>
    </div>`).join('');
}

/* ── Projects ── */
function renderProjects(items) {
  document.getElementById('projects-list').innerHTML = items.map(p => `
    <div class="accordion__item">
      <button class="accordion__trigger">
        <span style="font-size:18px">${p.status === 'completed' ? '✅' : p.status === 'quoting' ? '📝' : '🔧'}</span>
        <span style="flex:1">${p.title}</span>
        ${statusBadge(p.status)}
        ${chevronSVG}
      </button>
      <div class="accordion__body">
        <div class="accordion__inner">
          <p style="font-size:var(--text-sm);color:var(--color-text-2);margin-bottom:var(--space-3)">${p.description}</p>
          ${p.progress > 0 ? `<div class="progress" style="margin-bottom:var(--space-4)">
            <div class="progress__fill" style="width:${p.progress}%;background:var(--color-success)"></div>
          </div>` : ''}
          <div style="display:flex;gap:var(--space-6);font-size:var(--text-xs);color:var(--color-text-2)">
            <span>Client: <strong>${p.client}</strong></span>
            <span>Value: <strong>${p.value}</strong></span>
            <span>PM: <strong>${p.pm}</strong></span>
            <span>${p.dueDate}</span>
          </div>
        </div>
      </div>
    </div>`).join('');
}

/* ── Todos ── */
function renderTodos(items) {
  const priorityColor = { high: 'var(--color-danger)', medium: 'var(--color-warning)', low: 'var(--color-text-3)' };
  document.getElementById('todos-list').innerHTML = items.map(t => `
    <div class="todo-item ${t.done ? 'is-done' : ''}" data-id="${t.id}">
      <div class="todo-check"></div>
      <div style="flex:1">
        <div class="todo-text">${t.text}</div>
        <div class="todo-meta">${t.due}</div>
      </div>
      <span class="badge badge--${t.priority === 'high' ? 'red' : t.priority === 'medium' ? 'amber' : 'gray'}">${t.priority}</span>
    </div>`).join('');
}

/* ── Delegation ── */
function renderDelegation(items) {
  const rows = items.map(d => {
    const isOverdue = d.status === 'overdue';
    return `
      <div class="del-row ${isOverdue ? 'del-row--overdue' : ''}">
        <div>${isOverdue ? '<span class="overdue-dot"></span>' : ''}${d.task}</div>
        <div class="del-person">
          <span class="avatar">${d.initials}</span>${d.person}
        </div>
        <div style="color:var(--color-text-2)">${d.due}</div>
        <div>${statusBadge(d.status)}</div>
      </div>`;
  }).join('');
  document.getElementById('delegation-list').innerHTML = `
    <div class="del-row del-row--header">
      <div>Task</div><div>Assigned to</div><div>Due</div><div>Status</div>
    </div>${rows}`;
}

/* ── Init ── */
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('topbar-period').textContent = DATA.period;
  renderHero(DATA.kpis.heroMetric);
  renderKpiCards(DATA.kpis.cards);
  renderInitiatives(DATA.initiatives);
  renderProjects(DATA.projects);
  renderTodos(DATA.todos);
  renderDelegation(DATA.delegation);
  initAccordions();
  initTodos();
});
