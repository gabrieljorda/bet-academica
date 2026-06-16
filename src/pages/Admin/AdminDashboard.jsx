import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useBetting } from '../../contexts/BettingContext';
import Layout from '../../components/Layout/Layout';
import Card from '../../components/UI/Card';

const AdminDashboard = () => {
  const { user, logout } = useAuth();
  const { getStatistics, events } = useBetting();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalEvents: 0,
    openEvents: 0,
    closedEvents: 0,
    totalBets: 0
  });

  useEffect(() => {
    loadStats();
  }, [events]);

  const loadStats = async () => {
    const statistics = getStatistics();
    setStats(statistics);
  };

  const statCards = [
    { title: 'Total de Usuários', value: stats.totalUsers, color: 'bg-blue-500', icon: '👥' },
    { title: 'Total de Eventos', value: stats.totalEvents, color: 'bg-green-500', icon: '🎯' },
    { title: 'Eventos Abertos', value: stats.openEvents, color: 'bg-yellow-500', icon: '🔓' },
    { title: 'Eventos Encerrados', value: stats.closedEvents, color: 'bg-red-500', icon: '🔒' },
    { title: 'Total de Apostas', value: stats.totalBets, color: 'bg-purple-500', icon: '💰' },
  ];

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Dashboard Administrativo</h1>
        <p className="text-gray-600 mt-2">Bem-vindo, {user?.nome}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
        {statCards.map((card, index) => (
          <Card key={index} className="text-center">
            <div className={`${card.color} text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl mx-auto mb-4`}>
              {card.icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{card.value}</h3>
            <p className="text-gray-600 text-sm">{card.title}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/admin/events" className="card hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">Gerenciar Eventos</h3>
              <p className="text-gray-600">Cadastre, edite e gerencie eventos esportivos</p>
            </div>
            <div className="text-4xl">🎯</div>
          </div>
        </Link>

        <Link to="/admin/statistics" className="card hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">Estatísticas Avançadas</h3>
              <p className="text-gray-600">Visualize métricas detalhadas da plataforma</p>
            </div>
            <div className="text-4xl">📊</div>
          </div>
        </Link>
      </div>
    </Layout>
  );
};

export default AdminDashboard;