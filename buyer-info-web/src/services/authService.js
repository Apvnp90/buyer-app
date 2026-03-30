export const authService = {
  getToken: () => {
    return localStorage.getItem('token');
  },

  getUsername: () => {
    return localStorage.getItem('username');
  },

  getEmail: () => {
    return localStorage.getItem('email');
  },

  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },

  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('email');
  },

  getAuthHeader: () => {
    const token = authService.getToken();
    return token ? { 'Authorization': `Bearer ${token}` } : {};
  }
};
