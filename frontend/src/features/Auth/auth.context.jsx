import { createContext, useState, useEffect } from 'react';
import { me } from './services/auth.api.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
  
    // No token → user not logged in
    if (!storedToken) {
      setLoading(false);
      return;
    }
  
    setToken(storedToken);
  
    const restoreSession = async () => {
      try {
        const data = await me();
        setUser(data.user);
      } catch (error) {
        // Stale or expired token - reset state and clear token
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };
  
    restoreSession();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
