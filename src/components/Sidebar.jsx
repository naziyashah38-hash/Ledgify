import React, { useContext } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import {  LogOut, Star,HandCoins , LogIn } from 'lucide-react';
import Logo from "./Logo";

const NAV_LINKS = [
  { name: 'Dashboard', path: '/', icon: 'Home' },
  { name: 'Transactions', path: '/transactions', icon: 'Receipt' },
  { name: 'Wallet', path: '/wallet', icon: 'Wallet' },
];

export default function Sidebar() {
  const { user, handleLogout } = useContext(AppContext);
  const navigate = useNavigate();

  const handleSignOut = () => {
    handleLogout();
    navigate('/login');
  };

  return (
    <aside className="w-70 h-screen bg-white shadow-lg fixed left-0 top-0 z-40">
      
      <div className="p-6 border-b">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <Logo size={40} />
          </div>
          <span className="text-xl font-bold text-gray-800">Ledgify</span>
        </div>
      </div>

      {user ? (
        <>
          {/* User Profile */}
          <div className="p-6 border-b">
            <div className="flex items-center space-x-3">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <p className="font-semibold text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="p-4">
            <ul className="space-y-2">
              {NAV_LINKS.map((link) => {
                const Icon = require('lucide-react')[link.icon];
                return (
                  <li key={link.path}>
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all ${
                          isActive
                            ? 'bg-purple-light text-purple-600 font-medium'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`
                      }
                    >
                      <Icon className="w-5 h-5" />
                      <span>{link.name}</span>
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </nav>
        </>
      ) : (
        <div className="p-6 text-center">
          <p className="text-gray-500 mb-4">Please sign in to continue</p>
        </div>
      )}

      {/* Sign Out / Sign In Button */}
      <div className="absolute bottom-6 left-6 right-6">
        {user ? (
          <button
            onClick={handleSignOut}
            className="w-full flex items-center justify-center space-x-3 px-4 py-3 rounded-lg text-gray-600 hover:bg-gray-50 hover:text-red-500 transition-all"
          >
            <LogOut className="w-5 h-5" />
            <span>Sign Out</span>
          </button>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="w-full flex items-center justify-center space-x-3 px-4 py-3 rounded-lg bg-purple-500 text-white hover:bg-purple-600 transition-all"
          >
            <LogIn className="w-5 h-5" />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </aside>
  );
}