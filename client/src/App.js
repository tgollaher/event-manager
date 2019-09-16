import React from 'react';
import { Route } from 'react-router-dom';
import Editor from './components/Editor';
import './App.css';

const App = () => (
  <div className="main">
    <Route path="/events/:id?" component={Editor} />
  </div>
);

export default App;