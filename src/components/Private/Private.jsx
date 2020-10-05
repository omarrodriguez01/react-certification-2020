import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';

import { AuthContext } from '../../providers/Auth/AuthContext';

function Private({ children, ...rest }) {
  const { Logged } = useContext(AuthContext);

  return <Route {...rest} render={() => (Logged() ? children : <Redirect to="/" />)} />;
}

export default Private;
