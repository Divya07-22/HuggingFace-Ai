// src/components/TransactionList.jsx
import { Laptop, Coffee, ArrowUpCircle } from 'lucide-react';

export default function TransactionList() {
  const transactions = [
    { id: 1, title: 'Apple Store', category: 'Technology', date: 'Feb 20, 2026', amount: '-$999.00', type: 'expense', icon: Laptop, iconBg: 'bg-gray-800', iconColor: 'text-gray-300' },
    { id: 2, title: 'Starbucks', category: 'Food & Drink', date: 'Feb 19, 2026', amount: '-$15.50', type: 'expense', icon: Coffee, iconBg: 'bg-gray-800', iconColor: 'text-gray-300' },
    { id: 3, title: 'Salary Deposit', category: 'Income', date: 'Feb 18, 2026', amount: '+$5000.00', type: 'income', icon: ArrowUpCircle, iconBg: 'bg-emerald-900/30', iconColor: 'text-emerald-500' },
  ];

  return (
    <div className="space-y-6">
      {transactions.map((tx) => (
        <div key={tx.id} className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`p-3 rounded-xl border border-gray-700 ${tx.iconBg}`}>
              <tx.icon className={`w-5 h-5 ${tx.iconColor}`} />
            </div>
            <div>
              <p className="font-semibold text-gray-100">{tx.title}</p>
              <p className="text-xs text-gray-400">{tx.category} • {tx.date}</p>
            </div>
          </div>
          <div className="text-right">
            <p className={`font-semibold ${tx.type === 'income' ? 'text-emerald-500' : 'text-white'}`}>{tx.amount}</p>
            <p className="text-xs text-gray-400">Completed</p>
          </div>
        </div>
      ))}
    </div>
  );
}