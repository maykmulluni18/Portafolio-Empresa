import { create } from 'zustand';
import { authService } from '../api/services';

const useAuthStore = create((set) => ({
  user:    JSON.parse(localStorage.getItem('user') || 'null'),
  token:   localStorage.getItem('token') || null,
  loading: false,
  error:   null,

  login: async (credentials) => {
    set({ loading: true, error: null });
    try {
      const { data } = await authService.login(credentials);
      localStorage.setItem('token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      set({ user: data.user, token: data.access_token, loading: false });
      return true;
    } catch (err) {
      set({ error: err.response?.data?.message || 'Error al iniciar sesión', loading: false });
      return false;
    }
  },

  logout: async () => {
    try { await authService.logout(); } catch {}
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    set({ user: null, token: null });
  },

  clearError: () => set({ error: null }),
}));

export default useAuthStore;
