import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import Editor from './components/Editor';
import { withRouter } from 'react-router';
import Login from './components/Login'
import Register from './components/Register'
import './App.css';


import {
  loginUser,
  registerUser,
  verifyUser
} from './services/api-helper'



class App extends Component {
  state = {
    
    currentUser: null,
    authFormData: {
      username: "",
      email: "",
      password: ""
    }
  }
  // -------------- AUTH ------------------

 

  handleLoginButton = async () => {
    this.props.history.push('/')
  }

  handleLogin = async () => {
    await localStorage.getItem('userId')
    const userData = await loginUser(this.state.authFormData);
    this.setState({
      currentUser: userData
    })
    this.props.history.push('/events')
  }

  handleRegister = async (e) => {
    e.preventDefault();
    await registerUser(this.state.authFormData);
    await this.props.history.push('/events')
  }

  handleLogout = async () => {
    localStorage.removeItem("jwt");
    this.setState({
      currentUser: null
    })
    this.props.history.push('/')
  }

  authHandleChange = async (e) => {
    const { name, value } = e.target;
    this.setState(prevState => ({
      authFormData: {
        ...prevState.authFormData,
        [name]: value
      }
    }));
  }

  async componentDidMount() {
    const user = await verifyUser();
    if (user) {
      this.setState({
        currentUser: user
      })
    }
  }

  render() {
    return (
      <div>
        {/* <div>
            {this.state.currentUser
              ?
              <>
                <p>{this.state.currentUser.username}</p>
                <button onClick={this.handleLogout}>Logout</button>
              </>
              :
              <button onClick={this.handleLoginButton}>Login / Register</button>
            }
          </div> */}
        <Route exact path="/" render={() => (
          <Login
            handleLogin={this.handleLogin}
            handleChange={this.authHandleChange}
            formData={this.state.authFormData} />)} />
        <Route exact path="/register" render={() => (
          <Register
            handleRegister={this.handleRegister}
            handleChange={this.authHandleChange}
            formData={this.state.authFormData} />)} />
        <Route exact path="/events/:id" component={Editor} />
        <Route exact path="/events" component={Editor} />

      </div>
    );
  }
}

export default withRouter(App);


