import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { format } from 'date-fns';
import { Plus, X, ChevronDown } from 'lucide-react';

const CATEGORIES = [
  { name: 'Food & Dining', icon: 'Utensils', color: '#ef4444' },
  { name: 'Transport', icon: 'Car', color: '#f97316' },
  { name: 'Housing', icon: 'Home', color: '#8b5cf6' },
  { name: 'Utilities', icon: 'Zap', color: '#06b6d4' },
  { name: 'Shopping', icon: 'ShoppingBag', color: '#ec4899' },
  { name: 'Entertainment', icon: 'Film', color: '#f59e0b' },
  { name: 'Health', icon: 'Heart', color: '#10b981' },
  { name: 'Income', icon: 'DollarSign', color: '#22c55e' },
];

export default function TransactionForm({ onClose }) {
  const { addTransaction } = useContext(AppContext);
  const [formData, setFormData] = useState({
    type: 'expense',
    description: '',
    amount: '',
    category: CATEGORIES[0].name,
    date: format(new Date(), 'yyyy-MM-dd'),
  });
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.description || !formData.amount) return;

    addTransaction({
      ...formData,
      amount: parseFloat(formData.amount).toFixed(2),
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-800">Add Transaction</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg">
            <X className="w-5 h-5 text-gray-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
            <button
              type="button"
              onClick={() => setShowTypeDropdown(!showTypeDropdown)}
              className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl border"
            >
              <div className="flex items-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${formData.type === 'income' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                <span className="capitalize">{formData.type}</span>
              </div>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </button>
            {showTypeDropdown && (
              <div className="absolute w-full mt-2 bg-white rounded-xl shadow-lg border overflow-hidden">
                <button type="button" onClick={() => { setFormData(p => ({ ...p, type: 'income' })); setShowTypeDropdown(false); }} className="w-full p-3 hover:bg-gray-50 flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Income</span>
                </button>
                <button type="button" onClick={() => { setFormData(p => ({ ...p, type: 'expense' })); setShowTypeDropdown(false); }} className="w-full p-3 hover:bg-gray-50 flex items-center space-x-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>Expense</span>
                </button>
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <input
              type="text"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="e.g., Groceries, Salary"
              className="w-full p-3 bg-gray-50 rounded-xl border focus:border-purple-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Amount (₦)</label>
            <input
              type="number"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              min="0"
              className="w-full p-3 bg-gray-50 rounded-xl border focus:border-purple-500 outline-none"
            />
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
            <button
              type="button"
              onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
              className="w-full flex items-center justify-between p-3 bg-gray-50 rounded-xl border"
            >
              <span>{formData.category}</span>
              <ChevronDown className="w-5 h-5 text-gray-400" />
            </button>
            {showCategoryDropdown && (
              <div className="absolute w-full mt-2 bg-white rounded-xl shadow-lg border overflow-y-auto max-h-60">
                {CATEGORIES.map(category => {
                  const Icon = require('lucide-react')[category.icon];
                  return (
                    <button
                      key={category.name}
                      type="button"
                      onClick={() => { setFormData(p => ({ ...p, category: category.name })); setShowCategoryDropdown(false); }}
                      className="w-full p-3 hover:bg-gray-50 flex items-center space-x-2"
                    >
                      <Icon className="w-5 h-5" style={{ color: category.color }} />
                      <span>{category.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="w-full p-3 bg-gray-50 rounded-xl border focus:border-purple-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all"
          >
            <Plus className="w-5 h-5 inline mr-2" />
            Add Transaction
          </button>
        </form>
      </div>
    </div>
  );
}