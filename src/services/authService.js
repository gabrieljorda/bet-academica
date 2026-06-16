import api from './api';

export const authService = {
  async login(email, senha) {
    try {
      const response = await api.get('/usuarios');
      const user = response.data.find(
        u => u.email === email && u.senha === senha
      );
      
      if (user) {
        const { senha, ...userWithoutPassword } = user;
        localStorage.setItem('user', JSON.stringify(userWithoutPassword));
        return { success: true, user: userWithoutPassword };
      }
      
      return { success: false, error: 'Credenciais inválidas' };
    } catch (error) {
      return { success: false, error: 'Erro ao fazer login' };
    }
  },

  logout() {
    localStorage.removeItem('user');
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  async updateUser(userId, data) {
    try {
      const response = await api.patch(`/usuarios/${userId}`, data);
      const currentUser = this.getCurrentUser();
      if (currentUser && currentUser.id === userId) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return { success: true, user: response.data };
    } catch (error) {
      return { success: false, error: 'Erro ao atualizar usuário' };
    }
  }
};