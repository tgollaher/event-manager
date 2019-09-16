import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <header>
    <h1>
      <Link to="/events">Hack-a-Manager</Link>
    </h1>
  </header>
);

export default Header;