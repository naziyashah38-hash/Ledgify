import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { format } from 'date-fns';

export default function ExpenseChart() {
  const { transactions } = useContext(AppContext);

  const getChartData = () => {
    const data = {};
    transactions.forEach(t => {
      const date = format(new Date(t.date), 'MMM dd');
      if (!data[date]) data[date] = { date, income: 0, expense: 0 };
      if (t.type === 'income') data[date].income += parseFloat(t.amount);
      else data[date].expense += parseFloat(t.amount);
    });
    return Object.values(data).sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const chartData = getChartData();

  return (
    <div className="bg-white ml-4 rounded-2xl p-6 card-shadow">
      <h3 className="text-lg  font-semibold text-gray-800 mb-4">Expenses Statistics</h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="date" stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#6b7280" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(v) => `₦${v.toLocaleString()}`} />
            <Tooltip contentStyle={{ backgroundColor: 'white', border: 'none', borderRadius: '12px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }} />
            <Legend wrapperStyle={{ paddingTop: '20px' }} />
            <Line type="monotone" dataKey="income" name="Income" stroke="#22c55e" strokeWidth={3} />
            <Line type="monotone" dataKey="expense" name="Expense" stroke="#ef4444" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}