import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

export default function MonthlyExpenses() {
  const { getExpensesByCategory, getCategoryColor, getCategoryIcon } = useContext(AppContext);

  const expensesByCategory = getExpensesByCategory();
  const chartData = Object.entries(expensesByCategory).map(([category, amount]) => ({
    name: category,
    value: amount,
    color: getCategoryColor(category),
  }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border">
          <p className="font-medium text-gray-800">{payload[0].payload.name}</p>
          <p className="text-gray-600">₦{payload[0].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl p-6 card-shadow">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Monthly Expenses</h3>
      <div className="flex items-center justify-between">
        <div className="w-2/3">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="w-1/3 space-y-3">
          {chartData.map((item, index) => {
            const iconName = getCategoryIcon(item.name);
            const Icon = require('lucide-react')[iconName];
            return (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                <Icon className="w-4 h-4 text-gray-600" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800 truncate">{item.name}</p>
                </div>
                <p className="text-sm font-medium text-gray-800">₦{item.value.toLocaleString()}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}