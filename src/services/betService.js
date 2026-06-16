import api from './api';

export const betService = {
  async getAllBets() {
    try {
      const response = await api.get('/apostas');
      return response.data;
    } catch (error) {
      console.error('Erro ao carregar apostas:', error);
      return [];
    }
  },

  async getBetsByUser(userId) {
    try {
      const response = await api.get('/apostas');
      return response.data.filter(bet => bet.usuarioId === userId);
    } catch (error) {
      console.error('Erro ao carregar apostas do usuário:', error);
      return [];
    }
  },

  async createBet(betData) {
    try {
      const response = await api.post('/apostas', betData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async updateBet(betId, betData) {
    try {
      const response = await api.patch(`/apostas/${betId}`, betData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async processBetResult(betId, result) {
    try {
      const bet = await api.get(`/apostas/${betId}`);
      const event = await api.get(`/eventos/${bet.data.eventoId}`);
      
      const isWinner = bet.data.palpite === result.winner;
      let retorno = 0;
      let status = 'perdeu';
      
      if (isWinner) {
        const odd = result.winner === event.data.timeA ? event.data.oddA : event.data.oddB;
        retorno = bet.data.valor * odd;
        status = 'ganhou';
      }
      
      const response = await api.patch(`/apostas/${betId}`, {
        status: status,
        retorno: retorno
      });
      
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};