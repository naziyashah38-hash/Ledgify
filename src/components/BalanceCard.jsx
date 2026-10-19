import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { Eye, EyeOff, CreditCard, MoreVertical } from 'lucide-react';


export default function BalanceCard() {
  const { user, getBalance } = useContext(AppContext);
  const [showCardNumber, setShowCardNumber] = useState(false);
  const [showMenu, setShowMenu] = useState(false);

  const balance = getBalance().toLocaleString('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
  });

  const cardNumber = showCardNumber ? '5257 0800 3712 2456' : '**** **** **** 2456';

  return (
    <div className="bg-gradient-to-br ml-4 from-purple-500 to-pink-500 rounded-2xl p-6 text-white card-shadow relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="relative ml-4 z-10">
        <div className="flex justify-between items-start mb-8">
          <div>
            <p className="text-purple-100  text-sm">Welcome back, {user.name.split(' ')[0]}!</p>
            <h2 className="text-2xl font-bold mt-1">Your Balance</h2>
          </div>
          <button onClick={() => setShowMenu(!showMenu)} className="p-2 bg-white/20 rounded-lg">
            <MoreVertical className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-purple-100 text-sm">Available Balance</p>
          <p className="text-4xl font-bold mt-1">{balance}</p>
        </div>

        <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4 mb-4">
          <div className="flex items-center space-x-3">
            <CreditCard className="w-5 h-5 text-purple-200" />
            <span className="text-sm font-medium">{cardNumber}</span>
            <button onClick={() => setShowCardNumber(!showCardNumber)} className="ml-auto p-1">
              {showCardNumber ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2 text-purple-100">
          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
          <span className="text-sm">Monthly income: ₦{user.monthlyIncome.toLocaleString()}</span>
        </div>
      </div>
    </div>
  );
}