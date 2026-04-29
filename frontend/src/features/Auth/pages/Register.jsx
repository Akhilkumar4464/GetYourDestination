import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import '../auth.form.scss';

export default function Register() {
  const navigate = useNavigate();
  // states for two way binding of the form inputs and loading state from the auth context
  const { loading, handleRegister } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // this function navigates the user to the login after sucsessful reg.
  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleRegister({ name, email, password });
    if (success) {
      navigate('/login');
    }
  };


  if (loading) {
    return (
      <main>
        <div className="form-container">
          <h1>Loading...</h1>
        </div>
      </main>
    );
  }

  return (
    <main>
      <div className="form-container">
        <h1>signup here !</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p>already have an account ? <Link to="/login">Login</Link></p>
      </div>
    </main>
  );
}
