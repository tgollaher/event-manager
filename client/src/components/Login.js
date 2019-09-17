import React from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';


// This component handles our login form and has a link to the register form
const Login = (props) => {

  return (
    
    <div>
      <Header />
    <div className="auth-container">
      <h2 className="login-header">Login</h2>
      <hr />
      <form onSubmit={(e) => {
        e.preventDefault();
        props.handleLogin();}} >
        <p>Username:</p>
        <input name="username" type="text" value={props.formData.username} onChange={props.handleChange} />
        <p>Password:</p>
        <input name="password" type="password" value={props.formData.password} onChange={props.handleChange} />
        <hr/>
        <button>Login</button>
      </form>
      <Link to="/register">Register</Link>
    </div>
    </div>
  );
}

export default Login;