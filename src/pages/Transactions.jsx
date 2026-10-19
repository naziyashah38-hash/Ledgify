import React, { useState, useContext } from 'react';
import { AppContext } from '../context/AppContext';
import TransactionForm from '../components/TransactionForm';
import { format } from 'date-fns';
import { Plus, Search, Filter, MoreVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Transactions() {
  const { transactions, deleteTransaction, getCategoryIcon } = useContext(AppContext);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const { user } = useContext(AppContext);
const navigate = useNavigate();

if (!user) {
  navigate('/login');
  return null;
}

  const filteredTransactions = transactions
    .filter(t => filterType === 'all' || t.type === filterType)
    .filter(t => t.description.toLowerCase().includes(searchQuery.toLowerCase()) || t.category.toLowerCase().includes(searchQuery.toLowerCase()))
    .sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="p-8">
      <div className="flex ml-10 justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Transactions</h1>
          <p className="text-gray-500 mt-1">View and manage all your transactions</p>
        </div>
        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium px-6 py-3 rounded-xl flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Transaction</span>
        </button>
      </div>

      <div className="flex items-center space-x-4 ml-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5  text-gray-400" />
          <input
            type="text"
            placeholder="Search transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 p-3 bg-gray-50 rounded-xl border focus:border-purple-500 outline-none"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="p-3 bg-gray-50 rounded-xl border focus:border-purple-500 outline-none"
          >
            <option value="all">All</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </div>
      </div>

      <div className="bg-white ml-4 rounded-2xl card-shadow overflow-hidden">
        <div className="p-6">
          <div className="grid grid-cols-6 gap-4 text-sm font-medium text-gray-500 border-b pb-4 mb-4">
            <span>Date</span>
            <span>Description</span>
            <span>Category</span>
            <span>Type</span>
            <span className="text-right">Amount</span>
            <span>Actions</span>
          </div>

          {filteredTransactions.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No transactions found</p>
          ) : (
            <div className="space-y-4">
              {filteredTransactions.map(transaction => {
                const iconName = getCategoryIcon(transaction.category);
                const Icon = require('lucide-react')[iconName];
                const isIncome = transaction.type === 'income';
                const amount = parseFloat(transaction.amount);

                return (
                  <div key={transaction.id} className="grid grid-cols-6 gap-4 items-center p-4 bg-gray-50 rounded-xl">
                    <span className="text-sm text-gray-600">{format(new Date(transaction.date), 'MMM dd, yyyy')}</span>
                    <span className="font-medium text-gray-800">{transaction.description}</span>
                    <div className="flex items-center space-x-2">
                      {Icon && <Icon className="w-4 h-4 text-gray-600" />}
                      <span className="text-sm text-gray-600">{transaction.category}</span>
                    </div>
                    <span className={`text-sm font-medium ${isIncome ? 'text-green-600' : 'text-red-600'}`}>
                      {isIncome ? 'Income' : 'Expense'}
                    </span>
                    <span className={`text-right font-medium ${isIncome ? 'text-green-600' : 'text-red-600'}`}>
                      {isIncome ? '+' : '-'}₦{amount.toLocaleString()}
                    </span>
                    <button onClick={() => deleteTransaction(transaction.id)} className="p-2 text-gray-400 hover:text-red-500">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {showForm && <TransactionForm onClose={() => setShowForm(false)} />}
    </div>
  );
}