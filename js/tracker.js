const $ = id => document.getElementById(id);
let type = 'expense';

function fillCats() { $('cat').innerHTML = CATEGORIES[type].map(c => `<option>${c}</option>`).join(''); }
document.querySelectorAll('#type button').forEach(b => b.onclick = () => {
  document.querySelectorAll('#type button').forEach(x => x.classList.remove('on'));
  b.classList.add('on'); type = b.dataset.v; fillCats();
});

function render() {
  const tx = loadTx();
  let inc = 0, exp = 0;
  tx.forEach(t => t.type === 'income' ? inc += t.amount : exp += t.amount);
  $('income').textContent = money(inc);
  $('expense').textContent = money(exp);
  $('balance').textContent = money(inc - exp);
  const list = $('list');
  if (!tx.length) { list.innerHTML = '<li class="empty">No transactions yet.</li>'; return; }
  list.innerHTML = tx.slice().reverse().map(t => `
    <li class="${t.type}">
      <div class="d">${t.desc.replace(/[&<>]/g, '')}<small>${t.cat} · ${new Date(t.ts).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</small></div>
      <span class="amt ${t.type}">${t.type === 'income' ? '+' : '−'}${money(t.amount).replace('$', '$')}</span>
      <button class="x" data-id="${t.ts}">✕</button>
    </li>`).join('');
  list.querySelectorAll('.x').forEach(b => b.onclick = () => {
    saveTx(loadTx().filter(t => String(t.ts) !== b.dataset.id)); render();
  });
}
$('form').addEventListener('submit', e => {
  e.preventDefault();
  const amount = parseFloat($('amount').value);
  const desc = $('desc').value.trim();
  if (!desc || !(amount > 0)) return;
  const tx = loadTx();
  tx.push({ type, desc, amount, cat: $('cat').value, ts: Date.now() });
  saveTx(tx); e.target.reset();
  document.querySelectorAll('#type button').forEach(x => x.classList.toggle('on', x.dataset.v === type));
  render();
});
fillCats();
render();
