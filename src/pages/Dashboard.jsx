import React, { useState } from 'react';
import { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import BalanceCard from '../components/BalanceCard';
import BudgetOverview from '../components/BudgetOverview';
import ExpenseChart from '../components/ExpenseChart';
import RecentTransactions from '../components/RecentTransactions';
import MonthlyExpenses from '../components/MonthlyExpenses';
import TransactionForm from '../components/TransactionForm';
import { Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const [showForm, setShowForm] = useState(false);

  const { user } = useContext(AppContext);
const navigate = useNavigate();

if (!user) {
  navigate('/login');
  return null;
}

  return (
    <div className="p-8">
      <div className="mb-8 ml-10">
        <h1 className="text-3xl font-bold text-gray-800">Welcome back, {user.name.split(' ')[0]}! 👋</h1>
        <p className="text-gray-500 mt-1">Here's what's happening with your money today.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2"><BalanceCard /></div>
        <div><BudgetOverview /></div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <ExpenseChart />
        <MonthlyExpenses />
      </div>

      <div className="grid grid-cols-1 gap-6">
        <RecentTransactions />
      </div>

      <button
        onClick={() => setShowForm(true)}
        className="fixed bottom-8 right-8 w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 text-white rounded-full shadow-lg hover:from-purple-600 hover:to-pink-600 hover:scale-105 transition-all flex items-center justify-center"
      >
        <Plus className="w-8 h-8" />
      </button>

      {showForm && <TransactionForm onClose={() => setShowForm(false)} />}
    </div>
  );
}