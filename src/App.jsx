import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { BettingProvider } from './contexts/BettingContext';
import AppRoutes from './routes/AppRoutes';
import './styles/globals.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <BettingProvider>
          <AppRoutes />
        </BettingProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;