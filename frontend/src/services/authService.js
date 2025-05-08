export const isAuthenticated = () => !!localStorage.getItem('token');
export const getUserRole = () => localStorage.getItem('role');
export const getUserId = () => localStorage.getItem('userId');  