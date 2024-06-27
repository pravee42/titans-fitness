import { jwtDecode } from 'jwt-decode';

export const getTokenData = () => {
  const token = sessionStorage.getItem('token');
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return {
      id: decoded.id,
      username: decoded.username,
      role: decoded.role,
    };
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};
