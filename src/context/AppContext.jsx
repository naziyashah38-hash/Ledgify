
import React, { createContext, useState, useEffect } from 'react';
import { format } from 'date-fns';

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

const TRANSACTION_TYPES = {
  EXPENSE: 'expense',
  INCOME: 'income',
};

const sampleTransactions = [
  { id: 1, description: 'Daily Savings', amount: '1500.00', category: 'Income', type: 'expense', date: new Date().toISOString() },
  { id: 2, description: 'Housekeeping', amount: '5000.00', category: 'Housing', type: 'expense', date: new Date(Date.now() - 86400000).toISOString() },
  { id: 3, description: 'Gadgets', amount: '17200.00', category: 'Shopping', type: 'expense', date: new Date(Date.now() - 172800000).toISOString() },
  { id: 4, description: 'Project Bonus', amount: '50000.00', category: 'Income', type: 'income', date: new Date(Date.now() - 259200000).toISOString() },
];

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('transactions');
    return saved ? JSON.parse(saved) : sampleTransactions;
  });

  const [budget, setBudget] = useState(() => {
    const saved = localStorage.getItem('budget');
    return saved ? JSON.parse(saved) : { limit: 350000, period: 'monthly' };
  });

  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('user');
    return saved ? JSON.parse(saved) : null;
  });

  const [cards, setCards] = useState(() => {
    const savedUser = localStorage.getItem('user');
    const userEmail = savedUser ? JSON.parse(savedUser).email : null;
    const saved = localStorage.getItem(`cards_${userEmail || 'default'}`);
    return saved ? JSON.parse(saved) : [
      {
        id: 1,
        name: 'Primary Card',
        number: '5257 0800 3712 2456',
        expiry: '12/26',
        cvv: '***',
        bank: 'Access Bank',
        balance: 321500.09,
        color: 'from-purple-500 to-pink-500',
      },
      {
        id: 2,
        name: 'Savings Account',
        number: '0012 3456 7890 1234',
        expiry: '',
        cvv: '',
        bank: 'GT Bank',
        balance: 150000,
        color: 'from-blue-500 to-cyan-500',
      },
    ];
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
      localStorage.setItem(`transactions_${user.email}`, JSON.stringify(transactions));
      localStorage.setItem(`budget_${user.email}`, JSON.stringify(budget));
      localStorage.setItem(`cards_${user.email}`, JSON.stringify(cards));
    }
  }, [user, transactions, budget, cards]);

  const addTransaction = (transaction) => {
    setTransactions(prev => [...prev, { ...transaction, id: Date.now() }]);
  };

  const deleteTransaction = (id) => {
    setTransactions(prev => prev.filter(t => t.id !== id));
  };

  const handleLogin = (name, email) => {
    const newUser = {
      name,
      email,
      avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
      balance: 321500.09,
      monthlyIncome: 500000,
    };
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const addCard = (card) => {
    setCards(prev => [...prev, { ...card, id: Date.now() }]);
  };

  const deleteCard = (id) => {
    setCards(prev => prev.filter(card => card.id !== id));
  };

  const updateCard = (id, updates) => {
    setCards(prev => prev.map(card => card.id === id ? { ...card, ...updates } : card));
  };

  const getCategoryIcon = (categoryName) => {
    const category = CATEGORIES.find(c => c.name === categoryName);
    return category ? category.icon : 'Tag';
  };

  const getCategoryColor = (categoryName) => {
    const category = CATEGORIES.find(c => c.name === categoryName);
    return category ? category.color : '#6b7280';
  };

  const getBalance = () => {
    if (!user) return 0;
    const income = transactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    const expenses = transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
    return user.balance + income - expenses;
  };

  const getTotalExpenses = () => {
    return transactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + parseFloat(t.amount), 0);
  };

  const getExpensesByCategory = () => {
    const categories = {};
    transactions
      .filter(t => t.type === 'expense')
      .forEach(t => {
        categories[t.category] = (categories[t.category] || 0) + parseFloat(t.amount);
      });
    return categories;
  };

  const getRecentTransactions = (limit = 5) => {
    return [...transactions]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);
  };

  const getBudgetUsage = () => {
    const totalExpenses = getTotalExpenses();
    return Math.min((totalExpenses / budget.limit) * 100, 100);
  };

  return (
    <AppContext.Provider value={{
      transactions, budget, user, cards,
      addTransaction, deleteTransaction,
      getCategoryIcon, getCategoryColor,
      getBalance, getTotalExpenses,
      getExpensesByCategory, getRecentTransactions,
      getBudgetUsage, setBudget,
      handleLogin, handleLogout, setUser,
      addCard, deleteCard, updateCard
    }}>
      {children}
    </AppContext.Provider>
  );
};
// ^ This closing brace was missing!