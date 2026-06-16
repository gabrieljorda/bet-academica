import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useBetting } from '../../contexts/BettingContext';
import Layout from '../../components/Layout/Layout';
import Card from '../../components/UI/Card';

const UserDashboard = () => {
  const { user } = useAuth();
  const { bets } = useBetting();

  const userBets = bets.filter(bet => bet.usuarioId === user?.id);
  const totalBets = userBets.length;
  const wonBets = userBets.filter(bet => bet.status === 'ganhou').length;
  const lostBets = userBets.filter(bet => bet.status === 'perdeu').length;
  const pendingBets = userBets.filter(bet => bet.status === 'pendente').length;
  const totalWon = userBets.reduce((sum, bet) => sum + bet.retorno, 0);

  const statsCards = [
    { title: 'Saldo Atual', value: `R$ ${user?.saldo?.toFixed(2) || '0.00'}`, icon: '💰', color: 'bg-green-500' },
    { title: 'Total de Apostas', value: totalBets, icon: '🎲', color: 'bg-blue-500' },
    { title: 'Vitórias', value: wonBets, icon: '🏆', color: 'bg-emerald-500' },
    { title: 'Derrotas', value: lostBets, icon: '💔', color: 'bg-red-500' },
    { title: 'Pendentes', value: pendingBets, icon: '⏳', color: 'bg-yellow-500' },
    { title: 'Total Ganho', value: `R$ ${totalWon.toFixed(2)}`, icon: '💵', color: 'bg-purple-500' },
  ];

  return (
    <Layout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          Bem-vindo, {user?.nome}!
        </h1>
        <p className="text-gray-600 mt-2">
          Acompanhe suas estatísticas e faça suas apostas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {statsCards.map((card, index) => (
          <Card key={index} className="text-center">
            <div className={`${card.color} text-white rounded-full w-14 h-14 flex items-center justify-center text-2xl mx-auto mb-3`}>
              {card.icon}
            </div>
            <h3 className="text-2xl font-bold text-gray-800">{card.value}</h3>
            <p className="text-gray-600 text-sm">{card.title}</p>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link to="/events" className="card hover:shadow-lg transition-shadow text-center">
          <div className="text-5xl mb-3">🎯</div>
          <h3 className="text-xl font-semibold mb-2">Eventos Disponíveis</h3>
          <p className="text-gray-600">Faça suas apostas agora</p>
        </Link>

        <Link to="/history" className="card hover:shadow-lg transition-shadow text-center">
          <div className="text-5xl mb-3">📜</div>
          <h3 className="text-xl font-semibold mb-2">Histórico de Apostas</h3>
          <p className="text-gray-600">Veja suas apostas anteriores</p>
        </Link>

        <Link to="/ranking" className="card hover:shadow-lg transition-shadow text-center md:col-span-2">
          <div className="text-5xl mb-3">🏆</div>
          <h3 className="text-xl font-semibold mb-2">Ranking Geral</h3>
          <p className="text-gray-600">Compare-se com outros jogadores</p>
        </Link>
      </div>
    </Layout>
  );
};

export default UserDashboard;