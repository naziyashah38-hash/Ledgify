import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { PiggyBank, TrendingUp, TrendingDown } from 'lucide-react';

export default function BudgetOverview() {
  const { budget, getTotalExpenses, getBudgetUsage, getBalance } = useContext(AppContext);

  const totalExpenses = getTotalExpenses();
  const budgetUsage = getBudgetUsage();
  const balance = getBalance();

  return (
    <div className="bg-white rounded-2xl p-6 card-shadow">
      <h3 className="text-lg font-semibold text-gray-800 mb-6">Budget Overview</h3>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div>
            <p className="text-gray-500 text-sm">Monthly Limit</p>
            <p className="text-2xl font-bold text-gray-800">₦{budget.limit.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-gray-500 text-sm">Spent</p>
            <p className="text-2xl font-bold text-purple-600">₦{totalExpenses.toLocaleString()}</p>
          </div>
        </div>

        <div className="w-full bg-gray-200 rounded-full h-3">
          <div
            className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
            style={{ width: `${budgetUsage}%` }}
          ></div>
        </div>
        <p className="text-sm text-gray-500 mt-2">{budgetUsage.toFixed(1)}% of budget used</p>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-center p-4 bg-gray-50 rounded-xl">
          <div className="w-12 h-12 bg-purple-light rounded-xl flex items-center justify-center mx-auto mb-2">
            <PiggyBank className="w-6 h-6 text-purple-600" />
          </div>
          <p className="text-xl font-bold  text-gray-800">₦{balance.toLocaleString()}</p>
          <p className="text-sm text-gray-500">Current Balance</p>
        </div>

        <div className="text-center p-4 bg-gray-50 rounded-xl">
          <div className="w-12 h-12 bg-green-light rounded-xl flex items-center justify-center mx-auto mb-2">
            <TrendingUp className="w-6 h-6 text-green-600" />
          </div>
          <p className="text-xl font-bold text-green-600">₦{budget.limit.toLocaleString()}</p>
          <p className="text-sm text-gray-500">Monthly Limit</p>
        </div>

        <div className="text-center p-4 bg-gray-50 rounded-xl">
          <div className="w-12 h-12 bg-red-light rounded-xl flex items-center justify-center mx-auto mb-2">
            <TrendingDown className="w-6 h-6 text-red-600" />
          </div>
          <p className="text-xl font-bold text-red-600">₦{totalExpenses.toLocaleString()}</p>
          <p className="text-sm text-gray-500">Total Spent</p>
        </div>
      </div>
    </div>
  );
}