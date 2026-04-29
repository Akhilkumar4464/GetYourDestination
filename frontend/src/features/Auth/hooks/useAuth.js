import { AuthContext } from '../../Auth/auth.context.jsx';
import { useContext , useEffect} from 'react';

import { login, register, logout, me } from '../services/auth.api.js';

export const useAuth = () => {
  const authContext = useContext(AuthContext);

  const { user, setUser, token, setToken, loading, setLoading } = authContext;

  const handleLogin = async ({ email, password }) => {
    try {
      setLoading(true);
      const data = await login({ email, password });
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('token', data.token); // Persist token
      return true;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ name, email, password }) => {
    try {
      setLoading(true);
      const data = await register({ name, email, password });
      setUser(data.user);
      setToken(data.token);
      localStorage.setItem('token', data.token); // Persist token
      return true;
    } catch (error) {
      console.error('Registration failed:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      localStorage.removeItem('token');
      await logout();
      setUser(null);
      setToken(null);
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchUser = async () => {
    try {
      setLoading(true);
      const data = await me();
      setUser(data.user);
    } catch (error) {
      console.error('Fetch user failed:', error);
    } finally {
      setLoading(false);
    }
  };

    useEffect(() => {
    const storedToken = localStorage.getItem("token");
  
    // ❌ No token → user not logged in
    if (!storedToken) {
      setLoading(false);
      return;
    }
  
    setToken(storedToken);
  
    const restoreSession = async () => {
      try {
        const data = await me(); // ✅ correct function
        setUser(data.user);
        
      } catch (error) {
        console.error("Session restore failed:", error);
        setUser(null);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };
  
    restoreSession();
  }, []);

  return {
    user,
    token,
    loading,
    handleLogin,
    handleRegister,
    handleLogout,
    fetchUser,
  };
};
