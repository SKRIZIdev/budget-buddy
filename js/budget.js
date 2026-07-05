const BKEY = 'budgetbuddy.tx';
const loadTx = () => JSON.parse(localStorage.getItem(BKEY) || '[]');
const saveTx = t => localStorage.setItem(BKEY, JSON.stringify(t));
const money = n => (n < 0 ? '-$' : '$') + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const CATEGORIES = {
  expense: ['Food', 'Rent', 'Transport', 'Shopping', 'Bills', 'Health', 'Fun', 'Other'],
  income: ['Salary', 'Freelance', 'Gift', 'Investment', 'Other'],
};
