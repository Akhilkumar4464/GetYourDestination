import { createContext, useState, useEffect } from 'react';
import { me } from './services/auth.api.js';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const restoreSession = async () => {
      try {
        const data = await me();
        setUser(data.user);
      } catch (error) {
        setUser(null);
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
