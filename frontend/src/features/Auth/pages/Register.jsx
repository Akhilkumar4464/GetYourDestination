import React from 'react'
import {useNavigate , Link} from 'react-router-dom'

export default function Register() {
     const navigate = useNavigate();
  return (
     <main>
      <div className=" form-container">
        <h1>signup here !</h1>
<form>
   <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" aria-describedby="emailHelp" placeholder='Enter your name'/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter your email'/>
    
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" className="form-control" id="exampleInputPassword1" placeholder='Enter your password'/>
  </div>
  <button type="submit" className="btn btn-primary">Register</button>

</form>  
<p>already have an account ? <Link to="/login">Login</Link></p>
      </div>
    </main>
  );
}