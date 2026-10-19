import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { format } from 'date-fns';
import { MoreVertical } from 'lucide-react';

export default function RecentTransactions() {
  const { getRecentTransactions, getCategoryIcon, deleteTransaction } = useContext(AppContext);
  const recentTransactions = getRecentTransactions(5);

  return (
    <div className="bg-white rounded-2xl ml-4 p-6 card-shadow">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold text-gray-800">Recent Payments</h3>
        <button className="text-purple-600 text-sm font-medium">View All</button>
      </div>

      <div className="space-y-4">
        {recentTransactions.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No recent transactions</p>
        ) : (
          recentTransactions.map(transaction => {
            const iconName = getCategoryIcon(transaction.category);
            const Icon = require('lucide-react')[iconName];
            const isIncome = transaction.type === 'income';
            const amount = parseFloat(transaction.amount);

            return (
              <div key={transaction.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isIncome ? 'bg-green-light' : 'bg-red-light'}`}>
                    {Icon && <Icon className={`w-6 h-6 ${isIncome ? 'text-green-600' : 'text-red-600'}`} />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{transaction.description}</p>
                    <p className="text-sm text-gray-500">{transaction.category}</p>
                    <p className="text-xs text-gray-400 mt-1">
                      {format(new Date(transaction.date), 'MMM dd, yyyy')} at {format(new Date(transaction.date), 'hh:mm a')}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <p className={`font-semibold ${isIncome ? 'text-green-600' : 'text-red-600'}`}>
                    {isIncome ? '+' : '-'}₦{amount.toLocaleString()}
                  </p>
                  <button onClick={() => deleteTransaction(transaction.id)} className="p-2 text-gray-400 hover:text-red-500">
                    <MoreVertical className="w-4 h-4" />
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}