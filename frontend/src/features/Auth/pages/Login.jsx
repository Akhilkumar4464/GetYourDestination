import React from 'react';
import { Link , useNavigate} from 'react-router-dom';
import '../auth.form.scss';

  export default function  Login (){
      const navigate = useNavigate();
    return (
    <main>
      <div className=" form-container">
        <h1>welcome Back !</h1>
<form>
  
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter your email'/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Enter your password'/>
  </div>
  <button type="submit" className="btn btn-primary">login </button>
</form>
       <p>Don't have an account ? <Link to="/register">Register</Link></p>
      </div>
    </main>
  
  );}


