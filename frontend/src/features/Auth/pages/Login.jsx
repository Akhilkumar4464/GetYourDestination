import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

import '../auth.form.scss';

export default function Login() {
const { loading, handleLogin } = useAuth();
  const navigate = useNavigate();
  // states for two way binding of the form inputs and loading state from the auth context
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');


  // this function handles the login and navigates the user to the home page after sucsessful login.
const handleSubmit = async (e) => {
  e.preventDefault();
  
  const success = await handleLogin({ email, password });
console.log("Login success:", success);
  if (success) {
    navigate('/');
  }
};

if (loading){
  return (
    <main>
      <div className=" form-container">
        <h1>Loading...</h1>
      </div>
    </main>
  )
}



  return (
    <main>
      <div className=" form-container">
        <h1>welcome Back !</h1>
        <form onSubmit={handleSubmit}>

          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
         <input
  value={email} // 🔥 ADD THIS
  onChange={(e) => setEmail(e.target.value)}
  type="email"
  className="form-control"
  placeholder="Enter your email"
/>

          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
           <input
  value={password} // 🔥 ADD THIS
  onChange={(e) => setPassword(e.target.value)}
  type="password"
  className="form-control"
  placeholder="Enter your password"
/>
          </div>
          <button 
         
            type="submit" className="btn btn-primary"> {loading ? "Logging in..." : "Login"} </button>
        </form>
        <p>Don't have an account ? <Link to="/register">Register</Link></p>
      </div>
    </main>

  );
}


