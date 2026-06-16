import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import PrivateRoute from './PrivateRoute';
import Login from '../pages/Login';
import AdminDashboard from '../pages/Admin/AdminDashboard';
import ManageEvents from '../pages/Admin/ManageEvents';
import Statistics from '../pages/Admin/Statistics';
import UserDashboard from '../pages/User/UserDashboard';
import Events from '../pages/User/Events';
import History from '../pages/User/History';
import Ranking from '../pages/User/Ranking';

const AppRoutes = () => {
  const { user } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      
      <Route path="/" element={
        <PrivateRoute>
          {user?.perfil === 'admin' ? <AdminDashboard /> : <UserDashboard />}
        </PrivateRoute>
      } />
      
      {/* Admin Routes */}
      <Route path="/admin/events" element={
        <PrivateRoute adminOnly>
          <ManageEvents />
        </PrivateRoute>
      } />
      
      <Route path="/admin/statistics" element={
        <PrivateRoute adminOnly>
          <Statistics />
        </PrivateRoute>
      } />
      
      {/* User Routes */}
      <Route path="/events" element={
        <PrivateRoute>
          <Events />
        </PrivateRoute>
      } />
      
      <Route path="/history" element={
        <PrivateRoute>
          <History />
        </PrivateRoute>
      } />
      
      <Route path="/ranking" element={
        <PrivateRoute>
          <Ranking />
        </PrivateRoute>
      } />
    </Routes>
  );
};

export default AppRoutes;