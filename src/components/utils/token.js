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

export const handleApiRequest = async (url, options = {}) => {
  const token = localStorage.getItem('token');
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      if (response.status === 401 || response.status === 403) {
        // Clear token from localStorage if unauthorized or forbidden
        localStorage.removeItem('token');
        // Redirect to login page or handle session expiration
        // Example: navigate('/login'); // Use your routing logic here
      }
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('API request failed:', error);
    throw error; // Propagate the error for further handling
  }
};
