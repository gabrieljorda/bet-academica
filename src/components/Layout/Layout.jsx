import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import Header from './Header';
import Footer from './Footer';

const Layout = ({ children }) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;