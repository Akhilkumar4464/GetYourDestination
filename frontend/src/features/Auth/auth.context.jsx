import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);


  //   const restoreSession = async () => {
  //     try {
  //       const data = await me();
  //       setUser(data.user);
  //     } catch (error) {
  //       console.error('Session restore failed:', error);
  //       setUser(null);
  //       localStorage.removeItem('token');
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   restoreSession();
  // }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading, setLoading, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
