import React, { createContext, useState } from 'react';

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
  const [userAuthenticated, setUserAuthenticated] = useState(
    window.localStorage.getItem('logged') || false
  );
  const [failedLogin, setFailedLogin] = useState(false);

  const Login = (data) => {
    if (data.username === 'wizeline' && data.password === 'Rocks!') {
      window.localStorage.setItem('logged', true);
      setUserAuthenticated(true);
      return true;
    }
    setFailedLogin(true);
    return false;
  };

  const Logged = () => {
    if (window.localStorage.getItem('logged')) {
      return true;
    }
    return false;
  };

  const Logout = () => {
    window.localStorage.removeItem('logged');
    setUserAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        failedLogin,
        setFailedLogin,
        Login,
        Logged,
        Logout,
        userAuthenticated,
        setUserAuthenticated,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
