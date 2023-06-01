import React, { useContext } from 'react';

import AuthContext from '../../store/auth-context'
import classes from './Navigation.module.css';

const Navigation = () => {
  const cxt = useContext(AuthContext)

  return (
    <nav className={classes.nav}>
     {cxt.isLoggedIn && (
      <ul>
        <li>
          <a href="/">Users</a>
        </li>
        <li>
          <a href="/">Admin</a>
        </li>
        <li>
          <button onClick={cxt.onLogout}>Logout</button>
        </li>
      </ul>
      )}
    </nav>
  );
};

export default Navigation;
