const box = document.getElementById('report');
const tx = loadTx().filter(t => t.type === 'expense');
if (!tx.length) {
  box.innerHTML = '<p class="empty">No expenses to report yet. Add some on the Tracker page.</p>';
} else {
  const byCat = {};
  tx.forEach(t => byCat[t.cat] = (byCat[t.cat] || 0) + t.amount);
  const total = Object.values(byCat).reduce((a, b) => a + b, 0);
  const rows = Object.entries(byCat).sort((a, b) => b[1] - a[1]);
  box.innerHTML = `<p style="color:var(--muted);margin-bottom:8px">Total spent: <b style="color:var(--txt)">${money(total)}</b></p>` +
    rows.map(([cat, amt]) => {
      const pct = Math.round(amt / total * 100);
      return `<div class="rrow"><div class="rhead"><b>${cat}</b><span>${money(amt)} · ${pct}%</span></div>
        <div class="rbar"><div style="width:${pct}%"></div></div></div>`;
    }).join('');
}
