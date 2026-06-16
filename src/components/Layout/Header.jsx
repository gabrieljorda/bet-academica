import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getNavLinks = () => {
    if (user?.perfil === 'admin') {
      return [
        { to: '/', label: 'Dashboard' },
        { to: '/admin/events', label: 'Eventos' },
        { to: '/admin/statistics', label: 'Estatísticas' }
      ];
    }
    
    return [
      { to: '/', label: 'Dashboard' },
      { to: '/events', label: 'Eventos' },
      { to: '/history', label: 'Histórico' },
      { to: '/ranking', label: 'Ranking' }
    ];
  };

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-primary">
            Bet Acadêmica
          </Link>
          
          <div className="flex items-center gap-6">
            <div className="hidden md:flex gap-6">
              {getNavLinks().map(link => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-gray-700 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            
            <div className="flex items-center gap-4">
              {user && (
                <>
                  {user.perfil === 'usuario' && (
                    <div className="text-sm font-semibold text-green-600">
                      Saldo: R$ {user.saldo?.toFixed(2)}
                    </div>
                  )}
                  <div className="text-sm text-gray-600">
                    Olá, {user?.nome}
                  </div>
                  <button
                    onClick={handleLogout}
                    className="text-red-600 hover:text-red-700 transition-colors"
                  >
                    Sair
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;