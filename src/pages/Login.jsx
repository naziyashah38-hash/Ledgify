import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { ArrowRight, User, Mail  } from 'lucide-react';
import Logo from "../components/Logo"

export default function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const { user, handleLogin } = useContext(AppContext);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setError('Please enter both name and email');
      return;
    }
    if (!email.includes('@')) {
      setError('Please enter a valid email');
      return;
    }
    handleLogin(name, email);
    navigate('/');
  };

  return (
    <div className="fixed inset-0 bg-slate-50 flex items-center justify-center p-4 z-50">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          {/* Logo - Centered */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
             <Logo size={64} />
            </div>
          </div>

          {/* Heading - Centered */}
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">Welcome to Ledgify</h1>
            <p className="text-gray-500">Sign in to track your expenses</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="John Doe"
                  className="w-full pl-12 pr-4 p-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  className="w-full pl-12 pr-4 p-3 bg-gray-50 rounded-xl border border-gray-200 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 outline-none"
                />
              </div>
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-blue-300 text-white font-medium py-3 rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all flex items-center justify-center space-x-2"
            >
              <span>Sign In</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </form>

          <p className="text-xs text-gray-400 text-center mt-6">
            This is a demo app. Data is saved locally in your browser.
          </p>
        </div>
      </div>
    </div>
  );
}