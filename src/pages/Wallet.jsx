// import React, { useState } from 'react';
// import { useContext } from 'react';
// import { AppContext } from '../context/AppContext';
// import { CreditCard, Edit, Trash2, Plus, X } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

// export default function Wallet() {
//   const { user } = useContext(AppContext);
//   const [cards, setCards] = useState([
//     { id: 1, name: 'Primary Card', number: '5257 0800 3712 2456', expiry: '12/26', bank: 'Access Bank', balance: user.balance, color: 'from-purple-500 to-pink-500' },
//     { id: 2, name: 'Savings Account', number: '0012 3456 7890 1234', expiry: '', bank: 'GT Bank', balance: 150000, color: 'from-blue-500 to-cyan-500' },
//   ]);
//   const [showAddCard, setShowAddCard] = useState(false);
//   const [newCard, setNewCard] = useState({ name: '', number: '', bank: '' });

// const navigate = useNavigate();

// if (!user) {
//   navigate('/login');
//   return null;
// }

//   const handleAddCard = (e) => {
//     e.preventDefault();
//     if (!newCard.name || !newCard.number || !newCard.bank) return;
//     setCards(prev => [...prev, { id: Date.now(), ...newCard, balance: 0, color: 'from-gray-500 to-gray-700' }]);
//     setNewCard({ name: '', number: '', bank: '' });
//     setShowAddCard(false);
//   };

//   return (
//     <div className="p-8">
//       <div className="mb-8">
//         <h1 className="text-3xl font-bold text-gray-800">My Wallet</h1>
//         <p className="text-gray-500 mt-1">Manage your accounts and cards</p>
//       </div>

//       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
//         {cards.map(card => (
//           <div key={card.id} className={`bg-gradient-to-br ${card.color} rounded-2xl p-6 text-white card-shadow`}>
//             <div className="flex justify-between items-start mb-8">
//               <div>
//                 <p className="text-white/80 text-sm">{card.bank}</p>
//                 <p className="text-xl font-bold mt-1">{card.name}</p>
//               </div>
//               <div className="flex space-x-2">
//                 <button className="p-2 bg-white/20 rounded-lg"><Edit className="w-4 h-4" /></button>
//                 <button className="p-2 bg-white/20 rounded-lg"><Trash2 className="w-4 h-4" /></button>
//               </div>
//             </div>
//             <div className="space-y-4">
//               <div>
//                 <p className="text-white/80 text-sm">Card Number</p>
//                 <p className="text-lg font-mono tracking-wider">{card.number}</p>
//               </div>
//               <div className="flex justify-between items-end">
//                 <div>
//                   <p className="text-white/80 text-sm">Balance</p>
//                   <p className="text-2xl font-bold">₦{card.balance.toLocaleString()}</p>
//                 </div>
//                 {card.expiry && (
//                   <div>
//                     <p className="text-white/80 text-sm">Expiry</p>
//                     <p className="font-medium">{card.expiry}</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         ))}

//         <button
//           onClick={() => setShowAddCard(true)}
//           className="bg-gray-100 rounded-2xl p-6 flex flex-col items-center justify-center border-2 border-dashed border-gray-300"
//         >
//           <Plus className="w-12 h-12 text-gray-400 mb-4" />
//           <p className="text-gray-600 font-medium">Add New Card</p>
//         </button>
//       </div>

//       {showAddCard && (
//         <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-2xl p-6 w-full max-w-md">
//             <div className="flex justify-between items-center mb-6">
//               <h2 className="text-xl font-bold text-gray-800">Add New Card</h2>
//               <button onClick={() => setShowAddCard(false)} className="p-2">
//                 <X className="w-5 h-5 text-gray-600" />
//               </button>
//             </div>
//             <form onSubmit={handleAddCard} className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Card Name</label>
//                 <input
//                   type="text"
//                   value={newCard.name}
//                   onChange={(e) => setNewCard(p => ({ ...p, name: e.target.value }))}
//                   placeholder="e.g., Primary Card"
//                   className="w-full p-3 bg-gray-50 rounded-xl border focus:border-purple-500 outline-none"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Card Number</label>
//                 <input
//                   type="text"
//                   value={newCard.number}
//                   onChange={(e) => setNewCard(p => ({ ...p, number: e.target.value }))}
//                   placeholder="0000 0000 0000 0000"
//                   className="w-full p-3 bg-gray-50 rounded-xl border focus:border-purple-500 outline-none"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Bank</label>
//                 <select
//                   value={newCard.bank}
//                   onChange={(e) => setNewCard(p => ({ ...p, bank: e.target.value }))}
//                   className="w-full p-3 bg-gray-50 rounded-xl border focus:border-purple-500 outline-none"
//                 >
//                   <option value="">Select Bank</option>
//                   <option value="Access Bank">Access Bank</option>
//                   <option value="GT Bank">GT Bank</option>
//                   <option value="First Bank">First Bank</option>
//                   <option value="Zenith Bank">Zenith Bank</option>
//                   <option value="UBA">UBA</option>
//                 </select>
//               </div>
//               <button
//                 type="submit"
//                 className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium py-3 rounded-xl"
//               >
//                 Add Card
//               </button>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { CreditCard, Edit, Trash2, Plus, X,  Building2, Calendar, Hash } from 'lucide-react';

export default function Wallet() {
  const { user, cards, addCard, deleteCard, updateCard } = useContext(AppContext);
  const navigate = useNavigate();
  const [showAddCard, setShowAddCard] = useState(false);
  const [editingCard, setEditingCard] = useState(null);
  const [newCard, setNewCard] = useState({
    name: '',
    number: '',
    bank: '',
    expiry: '',
    color: 'from-purple-500 to-pink-500',
  });

  if (!user) {
    navigate('/login');
    return null;
  }

  const handleAddCard = (e) => {
    e.preventDefault();
    if (!newCard.name || !newCard.number || !newCard.bank) {
      alert('Please fill in all required fields');
      return;
    }

    const cardWithBalance = {
      ...newCard,
      balance: 0,
      cvv: '***',
    };

    if (editingCard) {
      updateCard(editingCard.id, cardWithBalance);
      setEditingCard(null);
    } else {
      addCard(cardWithBalance);
    }

    setNewCard({ name: '', number: '', bank: '', expiry: '', color: 'from-purple-500 to-pink-500' });
    setShowAddCard(false);
  };

  const startEditing = (card) => {
    setEditingCard(card);
    setNewCard({
      name: card.name,
      number: card.number,
      bank: card.bank,
      expiry: card.expiry || '',
      color: card.color,
    });
    setShowAddCard(true);
  };

  const colorOptions = [
    { name: 'Purple-Pink', value: 'from-purple-500 to-pink-500' },
    { name: 'Blue-Cyan', value: 'from-blue-500 to-cyan-500' },
    { name: 'Green-Emerald', value: 'from-green-500 to-emerald-500' },
    { name: 'Orange-Red', value: 'from-orange-500 to-red-500' },
    { name: 'Indigo-Violet', value: 'from-indigo-500 to-violet-500' },
  ];

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-8 ml-10">
        <h1 className="text-3xl font-bold text-gray-800">My Wallet</h1>
        <p className="text-gray-500 mt-1">Manage your accounts and cards</p>
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 ml-4 gap-6 mb-8">
        {cards.map(card => (
          <div
            key={card.id}
            className={`bg-gradient-to-br ${card.color} rounded-2xl p-6 text-white card-shadow`}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <p className="text-white/80 text-sm">{card.bank}</p>
                <p className="text-xl font-bold mt-1">{card.name}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => startEditing(card)}
                  className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={() => deleteCard(card.id)}
                  className="p-2 bg-white/20 rounded-lg hover:bg-white/30 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-white/80 text-sm">Card Number</p>
                <p className="text-lg font-mono tracking-wider">{card.number}</p>
              </div>

              <div className="flex justify-between items-end">
                <div>
                  <p className="text-white/80 text-sm">Balance</p>
                  <p className="text-2xl font-bold">₦{card.balance.toLocaleString()}</p>
                </div>
                {card.expiry && (
                  <div>
                    <p className="text-white/80 text-sm">Expiry</p>
                    <p className="font-medium">{card.expiry}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {/* Add Card Button */}
        <button
          onClick={() => {
            setEditingCard(null);
            setNewCard({ name: '', number: '', bank: '', expiry: '', color: 'from-purple-500 to-pink-500' });
            setShowAddCard(true);
          }}
          className="bg-gray-50 rounded-2xl p-6 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 hover:bg-gray-100 transition-colors"
        >
          <Plus className="w-12 h-12 text-gray-400 mb-4" />
          <p className="text-gray-600 font-medium">Add New Card</p>
        </button>
      </div>

      {/* Add/Edit Card Modal */}
      {showAddCard && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-md">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                {editingCard ? 'Edit Card' : 'Add New Card'}
              </h2>
              <button
                onClick={() => {
                  setShowAddCard(false);
                  setEditingCard(null);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            <form onSubmit={handleAddCard} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Card Name *</label>
                <input
                  type="text"
                  value={newCard.name}
                  onChange={(e) => setNewCard(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="e.g., My Debit Card"
                  className="w-full p-3 bg-gray-50 rounded-xl border focus:border-purple-500 outline-none transition-all"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Card Number *</label>
                <div className="relative">
                  <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={newCard.number}
                    onChange={(e) => {
                      // Format card number with spaces
                      let value = e.target.value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
                      setNewCard(prev => ({ ...prev, number: value }));
                    }}
                    placeholder="0000 0000 0000 0000"
                    maxLength={19}
                    className="w-full pl-12 pr-4 p-3 bg-gray-50 rounded-xl border focus:border-purple-500 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Bank Name *</label>
                <div className="relative">
                  < Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={newCard.bank}
                    onChange={(e) => setNewCard(prev => ({ ...prev, bank: e.target.value }))}
                    placeholder="e.g., Access Bank"
                    className="w-full pl-12 pr-4 p-3 bg-gray-50 rounded-xl border focus:border-purple-500 outline-none transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Expiry Date (Optional)</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={newCard.expiry}
                    onChange={(e) => {
                      // Format expiry as MM/YY
                      let value = e.target.value.replace(/\D/g, '');
                      if (value.length > 2) {
                        value = value.substring(0, 2) + '/' + value.substring(2, 4);
                      }
                      setNewCard(prev => ({ ...prev, expiry: value }));
                    }}
                    placeholder="MM/YY"
                    maxLength={5}
                    className="w-full pl-12 pr-4 p-3 bg-gray-50 rounded-xl border focus:border-purple-500 outline-none transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Card Color</label>
                <div className="grid grid-cols-3 gap-2">
                  {colorOptions.map(option => (
                    <button
                      key={option.value}
                      type="button"
                      onClick={() => setNewCard(prev => ({ ...prev, color: option.value }))}
                      className={`h-10 rounded-xl transition-all border-2 ${newCard.color === option.value ? 'border-purple-500' : 'border-transparent'}`}
                      style={{ background: `linear-gradient(to right, ${option.value.replace('from-', '').replace('to-', '').replace('-500', '').split(' ').map(c => `var(--${c})`).join(', ')})` }}
                    ></button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white font-medium py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all"
              >
                {editingCard ? 'Update Card' : 'Add Card'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}