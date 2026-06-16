import React, { useState, useEffect } from 'react';
import { useBetting } from '../../contexts/BettingContext';
import { useAuth } from '../../contexts/AuthContext';
import Layout from '../../components/Layout/Layout';
import Card from '../../components/UI/Card';
import api from '../../services/api';

const Statistics = () => {
  const { events, bets } = useBetting();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await api.get('/usuarios');
      setUsers(response.data);
    } catch (error) {
      console.error('Erro ao carregar usuários:', error);
    } finally {
      setLoading(false);
    }
  };

  const totalUsers = users.filter(u => u.perfil === 'usuario').length;
  const totalEvents = events.length;
  const openEvents = events.filter(e => e.status === 'aberto').length;
  const closedEvents = events.filter(e => e.status === 'encerrado').length;
  const totalBets = bets.length;
  const pendingBets = bets.filter(b => b.status === 'pendente').length;
  const wonBets = bets.filter(b => b.status === 'ganhou').length;
  const lostBets = bets.filter(b => b.status === 'perdeu').length;
  
  const totalBetAmount = bets.reduce((sum, bet) => sum + bet.valor, 0);
  const totalPayout = bets.reduce((sum, bet) => sum + bet.retorno, 0);
  const platformProfit = totalBetAmount - totalPayout;

  const statsCards = [
    { title: 'Total de Usuários', value: totalUsers, icon: '👥', color: 'bg-blue-500' },
    { title: 'Total de Eventos', value: totalEvents, icon: '🎯', color: 'bg-green-500' },
    { title: 'Eventos Abertos', value: openEvents, icon: '🔓', color: 'bg-yellow-500' },
    { title: 'Eventos Encerrados', value: closedEvents, icon: '🔒', color: 'bg-red-500' },
    { title: 'Total de Apostas', value: totalBets, icon: '💰', color: 'bg-purple-500' },
    { title: 'Apostas Pendentes', value: pendingBets, icon: '⏳', color: 'bg-orange-500' },
    { title: 'Apostas Ganhas', value: wonBets, icon: '🏆', color: 'bg-emerald-500' },
    { title: 'Apostas Perdidas', value: lostBets, icon: '💔', color: 'bg-rose-500' },
  ];

  const financialCards = [
    { title: 'Total Apostado', value: totalBetAmount, icon: '💵', color: 'bg-indigo-500', prefix: 'R$' },
    { title: 'Total Pago', value: totalPayout, icon: '💸', color: 'bg-red-500', prefix: 'R$' },
    { title: 'Lucro da Plataforma', value: platformProfit, icon: '📈', color: 'bg-green-500', prefix: 'R$' },
  ];

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Estatísticas da Plataforma</h1>
        <p className="text-gray-600 mt-2">Visão geral completa do sistema</p>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Visão Geral</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {statsCards.map((card, index) => (
            <Card key={index} className="text-center">
              <div className={`${card.color} text-white rounded-full w-12 h-12 flex items-center justify-center text-xl mx-auto mb-3`}>
                {card.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-800">{card.value}</h3>
              <p className="text-gray-600 text-sm">{card.title}</p>
            </Card>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Financeiro</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {financialCards.map((card, index) => (
            <Card key={index} className="text-center">
              <div className={`${card.color} text-white rounded-full w-12 h-12 flex items-center justify-center text-xl mx-auto mb-3`}>
                {card.icon}
              </div>
              <h3 className="text-2xl font-bold text-gray-800">
                {card.prefix} {card.value.toFixed(2)}
              </h3>
              <p className="text-gray-600 text-sm">{card.title}</p>
            </Card>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-4">Eventos por Esporte</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {['Futebol', 'Basquete', 'Vôlei', 'E-sports', 'Tênis', 'MMA'].map(sport => {
            const sportEvents = events.filter(e => e.esporte === sport);
            return (
              <Card key={sport}>
                <h3 className="font-semibold text-lg mb-2">{sport}</h3>
                <p className="text-2xl font-bold text-primary">{sportEvents.length}</p>
                <p className="text-sm text-gray-600">eventos</p>
              </Card>
            );
          })}
        </div>
      </div>
    </Layout>
  );
};

export default Statistics;