import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppContext , AppProvider } from './context/AppContext';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Transactions from './pages/Transactions';
import Wallet from './pages/Wallet';
import Login from './pages/Login';

function ProtectedRoute({ children }) {
  const { user } = React.useContext(AppContext);

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default function App() {
  return (
    <AppProvider>
      <Router>
        <div className="flex min-h-screen bg-slate-50">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/*"
              element={
                <>
                  <Sidebar />
                  <main className="flex-1 ml-64">
                    <Routes>
                      <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                      <Route path="/transactions" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
                      <Route path="/wallet" element={<ProtectedRoute><Wallet /></ProtectedRoute>} />
                    </Routes>
                  </main>
                </>
              }
            />
          </Routes>
        </div>
      </Router>
    </AppProvider>
  );
}