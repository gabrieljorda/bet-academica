import React, { useState } from 'react';
import { useBetting } from '../../contexts/BettingContext';
import Layout from '../../components/Layout/Layout';
import Button from '../../components/UI/Button';
import Modal from '../../components/UI/Modal';
import EventForm from '../../components/Forms/EventForm';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const ManageEvents = () => {
  const { events, updateEvent, deleteEvent, closeEvent } = useBetting();
  const [showModal, setShowModal] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [closingEvent, setClosingEvent] = useState(null);

  const handleSave = async (eventData) => {
    let result;
    if (editingEvent) {
      result = await updateEvent(editingEvent.id, eventData);
    } else {
      // Create event logic here
      result = { success: true };
    }
    
    if (result.success) {
      setShowModal(false);
      setEditingEvent(null);
    }
  };

  const handleCloseEvent = async (winner) => {
    const result = await closeEvent(closingEvent.id, winner);
    if (result.success) {
      setClosingEvent(null);
    }
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      aberto: { color: 'bg-green-100 text-green-800', text: 'Aberto' },
      encerrado: { color: 'bg-red-100 text-red-800', text: 'Encerrado' }
    };
    const config = statusConfig[status] || statusConfig.aberto;
    return <span className={`px-2 py-1 rounded-full text-xs font-medium ${config.color}`}>{config.text}</span>;
  };

  return (
    <Layout>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Gerenciar Eventos</h1>
        <Button onClick={() => setShowModal(true)}>Novo Evento</Button>
      </div>

      <div className="grid gap-4">
        {events.map(event => (
          <div key={event.id} className="card hover:shadow-lg transition-shadow">
            <div className="flex flex-wrap justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <h3 className="text-xl font-semibold">
                    {event.timeA} vs {event.timeB}
                  </h3>
                  {getStatusBadge(event.status)}
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-600 mb-4">
                  <div>🏆 {event.esporte}</div>
                  <div>📅 {format(new Date(event.data), "dd/MM/yyyy HH:mm", { locale: ptBR })}</div>
                  <div>📊 Odd {event.timeA}: {event.oddA}</div>
                  <div>📊 Odd {event.timeB}: {event.oddB}</div>
                </div>

                {event.resultado && (
                  <div className="mb-4 p-2 bg-gray-100 rounded">
                    <span className="font-medium">Resultado:</span> {event.resultado}
                  </div>
                )}
              </div>

              <div className="flex gap-2 mt-4 md:mt-0">
                {event.status === 'aberto' && (
                  <>
                    <Button variant="secondary" onClick={() => setClosingEvent(event)}>
                      Encerrar
                    </Button>
                    <Button variant="warning" onClick={() => {
                      setEditingEvent(event);
                      setShowModal(true);
                    }}>
                      Editar
                    </Button>
                  </>
                )}
                <Button variant="danger" onClick={() => deleteEvent(event.id)}>
                  Excluir
                </Button>
              </div>
            </div>
          </div>
        ))}

        {events.length === 0 && (
          <div className="text-center py-12 bg-white rounded-xl">
            <p className="text-gray-500">Nenhum evento cadastrado</p>
          </div>
        )}
      </div>

      <Modal isOpen={showModal} onClose={() => {
        setShowModal(false);
        setEditingEvent(null);
      }}>
        <EventForm 
          event={editingEvent}
          onSave={handleSave}
          onCancel={() => {
            setShowModal(false);
            setEditingEvent(null);
          }}
        />
      </Modal>

      <Modal isOpen={!!closingEvent} onClose={() => setClosingEvent(null)}>
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-4">Encerrar Evento</h2>
          <p className="mb-4">Selecione o vencedor do evento:</p>
          <div className="space-y-3">
            <button
              onClick={() => handleCloseEvent(closingEvent?.timeA)}
              className="w-full p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              {closingEvent?.timeA}
            </button>
            <button
              onClick={() => handleCloseEvent(closingEvent?.timeB)}
              className="w-full p-4 border rounded-lg hover:bg-gray-50 transition-colors"
            >
              {closingEvent?.timeB}
            </button>
          </div>
        </div>
      </Modal>
    </Layout>
  );
};

export default ManageEvents;