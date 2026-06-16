import React, { useState } from 'react';
import { useBetting } from '../../contexts/BettingContext';
import Layout from '../../components/Layout/Layout';

const History = () => {
  const { bets, events } = useBetting();
  const [statusFilter, setStatusFilter] = useState('all');

  const getEventDetails = (eventId) => {
    return events.find(e => e.id === eventId);
  };

  const filteredBets = statusFilter === 'all' 
    ? bets 
    : bets.filter(bet => bet.status === statusFilter);

  const getStatusBadge = (status) => {
    const statusConfig = {
      pendente: { color: 'bg-yellow-100 text-yellow-800', text: 'Pendente' },
      ganhou: { color: 'bg-green-100 text-green-800', text: 'Ganhou' },
      perdeu: { color: 'bg-red-100 text-red-800', text: 'Perdeu' }
    };
    const config = statusConfig[status] || statusConfig.pendente;
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>{config.text}</span>;
  };

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Histórico de Apostas</h1>
        
        <div className="flex gap-2">
          {['all', 'pendente', 'ganhou', 'perdeu'].map(status => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                statusFilter === status
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {status === 'all' ? 'Todas' : status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredBets.map(bet => {
          const event = getEventDetails(bet.eventoId);
          if (!event) return null;
          
          return (
            <div key={bet.id} className="card hover:shadow-lg transition-shadow">
              <div className="flex flex-wrap justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold">
                      {event.timeA} vs {event.timeB}
                    </h3>
                    {getStatusBadge(bet.status)}
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>🎯 Palpite: {bet.palpite}</div>
                    <div>💰 Valor: R$ {bet.valor.toFixed(2)}</div>
                    {bet.status === 'ganhou' && (
                      <div>🏆 Retorno: R$ {bet.retorno.toFixed(2)}</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {filteredBets.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl">
            <p className="text-gray-500">Nenhuma aposta encontrada</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default History;