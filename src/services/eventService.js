import api from './api';

export const eventService = {
  async getAllEvents() {
    try {
      const response = await api.get('/eventos');
      return response.data;
    } catch (error) {
      console.error('Erro ao carregar eventos:', error);
      return [];
    }
  },

  async getOpenEvents() {
    try {
      const response = await api.get('/eventos');
      return response.data.filter(event => event.status === 'aberto');
    } catch (error) {
      console.error('Erro ao carregar eventos abertos:', error);
      return [];
    }
  },

  async getClosedEvents() {
    try {
      const response = await api.get('/eventos');
      return response.data.filter(event => event.status === 'encerrado');
    } catch (error) {
      console.error('Erro ao carregar eventos encerrados:', error);
      return [];
    }
  },

  async createEvent(eventData) {
    try {
      const response = await api.post('/eventos', {
        ...eventData,
        status: 'aberto',
        resultado: ''
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async updateEvent(eventId, eventData) {
    try {
      const response = await api.patch(`/eventos/${eventId}`, eventData);
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async deleteEvent(eventId) {
    try {
      await api.delete(`/eventos/${eventId}`);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },

  async closeEvent(eventId, winner) {
    try {
      const response = await api.patch(`/eventos/${eventId}`, {
        status: 'encerrado',
        resultado: winner
      });
      return { success: true, data: response.data };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
};