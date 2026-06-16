import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../services/api';
import { useAuth } from './AuthContext';

const BettingContext = createContext();

export const useBetting = () => {
  const context = useContext(BettingContext);
  if (!context) {
    throw new Error('useBetting must be used within BettingProvider');
  }
  return context;
};

export const BettingProvider = ({ children }) => {
  const [events, setEvents] = useState([]);
  const [bets, setBets] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user, updateUser } = useAuth();

  useEffect(() => {
    fetchEvents();
    if (user) {
      fetchUserBets();
    }
  }, [user]);

  const fetchEvents = async () => {
    try {
      const response = await api.get('/eventos');
      setEvents(response.data);
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
    }
  };

  const fetchUserBets = async () => {
    try {
      const response = await api.get('/apostas');
      const userBets = response.data.filter(bet => bet.usuarioId === user.id);
      setBets(userBets);
    } catch (error) {
      console.error('Erro ao carregar apostas:', error);
    }
  };

  const createEvent = async (eventData) => {
    try {
      const response = await api.post('/eventos', {
        ...eventData,
        status: 'aberto',
        resultado: ''
      });
      setEvents([...events, response.data]);
      return { success: true, event: response.data };
    } catch (error) {
      return { success: false, error: 'Erro ao criar evento' };
    }
  };

  const updateEvent = async (eventId, eventData) => {
    try {
      const response = await api.patch(`/eventos/${eventId}`, eventData);
      setEvents(events.map(e => e.id === eventId ? response.data : e));
      return { success: true, event: response.data };
    } catch (error) {
      return { success: false, error: 'Erro ao atualizar evento' };
    }
  };

  const deleteEvent = async (eventId) => {
    try {
      await api.delete(`/eventos/${eventId}`);
      setEvents(events.filter(e => e.id !== eventId));
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Erro ao deletar evento' };
    }
  };

  const closeEvent = async (eventId, winner) => {
    try {
      const event = events.find(e => e.id === eventId);
      if (!event) return { success: false, error: 'Evento não encontrado' };

      // Atualizar evento
      const updatedEvent = await api.patch(`/eventos/${eventId}`, {
        status: 'encerrado',
        resultado: winner
      });

      // Processar apostas
      const eventBets = bets.filter(bet => bet.eventoId === eventId);
      
      for (const bet of eventBets) {
        const userData = await api.get(`/usuarios/${bet.usuarioId}`);
        const isWinner = bet.palpite === winner;
        
        let newStatus, retorno = 0;
        
        if (isWinner) {
          const odd = winner === event.timeA ? event.oddA : event.oddB;
          retorno = bet.valor * odd;
          newStatus = 'ganhou';
          
          // Atualizar saldo do usuário
          await api.patch(`/usuarios/${bet.usuarioId}`, {
            saldo: userData.data.saldo + retorno,
            vitorias: userData.data.vitorias + 1
          });
        } else {
          newStatus = 'perdeu';
          await api.patch(`/usuarios/${bet.usuarioId}`, {
            derrotas: userData.data.derrotas + 1
          });
        }
        
        // Atualizar aposta
        await api.patch(`/apostas/${bet.id}`, {
          status: newStatus,
          retorno: retorno
        });
      }
      
      setEvents(events.map(e => e.id === eventId ? updatedEvent.data : e));
      await fetchUserBets();
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Erro ao encerrar evento' };
    }
  };

  const placeBet = async (eventId, palpite, valor) => {
    if (!user) return { success: false, error: 'Usuário não autenticado' };
    if (valor > user.saldo) return { success: false, error: 'Saldo insuficiente' };
    
    try {
      // Criar aposta
      const newBet = await api.post('/apostas', {
        usuarioId: user.id,
        eventoId: eventId,
        palpite: palpite,
        valor: valor,
        status: 'pendente',
        retorno: 0
      });
      
      // Atualizar saldo do usuário
      const newSaldo = user.saldo - valor;
      await updateUser(user.id, {
        saldo: newSaldo,
        totalApostas: (user.totalApostas || 0) + 1
      });
      
      setBets([...bets, newBet.data]);
      await fetchEvents();
      
      return { success: true, bet: newBet.data };
    } catch (error) {
      return { success: false, error: 'Erro ao realizar aposta' };
    }
  };

  const getStatistics = () => {
    const totalUsers = 0; // Será calculado pelo admin
    const totalEvents = events.length;
    const openEvents = events.filter(e => e.status === 'aberto').length;
    const closedEvents = events.filter(e => e.status === 'encerrado').length;
    const totalBets = bets.length;
    
    return { totalUsers, totalEvents, openEvents, closedEvents, totalBets };
  };

  const getRanking = async () => {
    try {
      const response = await api.get('/usuarios');
      const users = response.data.filter(u => u.perfil === 'usuario');
      return users.sort((a, b) => b.saldo - a.saldo);
    } catch (error) {
      console.error('Erro ao carregar ranking:', error);
      return [];
    }
  };

  return (
    <BettingContext.Provider value={{
      events,
      bets,
      loading,
      createEvent,
      updateEvent,
      deleteEvent,
      closeEvent,
      placeBet,
      getStatistics,
      getRanking,
      fetchEvents
    }}>
      {children}
    </BettingContext.Provider>
  );
};