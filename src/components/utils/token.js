import { jwtDecode } from 'jwt-decode';

export const getTokenData = () => {
  const token = localStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return {
      username: decoded.username,
      role: decoded.role,
    };
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
