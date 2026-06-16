import React, { useState } from 'react';
import { useBetting } from '../../contexts/BettingContext';
import { useAuth } from '../../contexts/AuthContext';
import Layout from '../../components/Layout/Layout';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';
import BetForm from '../../components/Forms/BetForm';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const Events = () => {
  const { events } = useBetting();
  const { user } = useAuth();
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [sportFilter, setSportFilter] = useState('all');
  const [showBetModal, setShowBetModal] = useState(false);

  const openEvents = events.filter(e => e.status === 'aberto');
  const sports = ['all', ...new Set(events.map(e => e.esporte))];
  const filteredEvents = sportFilter === 'all' 
    ? openEvents 
    : openEvents.filter(e => e.esporte === sportFilter);

  return (
    <Layout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Eventos Disponíveis</h1>
        
        <div className="flex gap-2 flex-wrap">
          {sports.map(sport => (
            <button
              key={sport}
              onClick={() => setSportFilter(sport)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                sportFilter === sport
                  ? 'bg-primary text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {sport === 'all' ? 'Todos' : sport}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map(event => (
          <div key={event.id} className="card hover:shadow-lg transition-shadow">
            <div className="mb-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="text-xl font-semibold">
                  {event.timeA} vs {event.timeB}
                </h3>
                <span className="text-xs text-gray-500">{event.esporte}</span>
              </div>
              
              <p className="text-sm text-gray-600 mb-4">
                📅 {format(new Date(event.data), "dd/MM/yyyy HH:mm", { locale: ptBR })}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">{event.timeA}</p>
                <p className="text-2xl font-bold text-primary">{event.oddA}</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600 mb-1">{event.timeB}</p>
                <p className="text-2xl font-bold text-primary">{event.oddB}</p>
              </div>
            </div>

            <Button 
              fullWidth 
              onClick={() => {
                setSelectedEvent(event);
                setShowBetModal(true);
              }}
            >
              Apostar
            </Button>
          </div>
        ))}

        {filteredEvents.length === 0 && (
          <div className="col-span-full text-center py-12">
            <p className="text-gray-500">Nenhum evento disponível para apostas</p>
          </div>
        )}
      </div>

      <Modal isOpen={showBetModal} onClose={() => setShowBetModal(false)}>
        {selectedEvent && (
          <BetForm
            event={selectedEvent}
            userSaldo={user.saldo}
            onClose={() => setShowBetModal(false)}
          />
        )}
      </Modal>
    </Layout>
  );
};

export default Events;