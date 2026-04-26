import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000',
  withCredentials: true,
});

export async function register({ name, email, password }) {
  try {
    const response = await api.post('/auth/register', {
      name,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error in register API:', error.response?.data || error.message);
    throw error;
  }
}

export async function login({ email, password }) {
  try {
    const response = await api.post('/auth/login', {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.error('Error in login API:', error.response?.data || error.message);
    throw error;
  }
}

export async function logout() {
  try {
    await api.get('/auth/logout');
  } catch (error) {
    console.log(error);
    console.error('Error in logout API:', error.response ? error.response.data : error.message);
    throw error;
  }
}

export async function me() {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    console.log(error);
    console.error('Error in me API:', error.response ? error.response.data : error.message);
    throw error;
  }
}
        