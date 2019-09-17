import React from 'react';
import Header from './Header';

const Register = (props) => {

  return (
    <div>
      <Header />
    <div className="auth-container">
      <h2 className="register-header">Register</h2>
      <hr />
      <form onSubmit={props.handleRegister} >
        <p>Username:</p>
        <input name="username" type="text" value={props.formData.username} onChange={props.handleChange} />
        <p>Email:</p>
        <input name="email" type="text" value={props.formData.email} onChange={props.handleChange} />
        <p>Password:</p>
        <input name="password" type="password" value={props.formData.password} onChange={props.handleChange} />
        <hr/>
        <button>Register</button>
      </form>
    </div>
  </div>
  );
}

export default Register;