import React, { createContext, useState, useEffect, useCallback } from 'react';

export const AuthContext = createContext(null);

const AuthContextProvider = (props) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [failedLogin, setFailedLogin] = useState(false);

  const Login = (data) => {
    console.log('logging in', data.username);
    if (data.username === 'wizeline' && data.password === 'Rocks!') {
      window.localStorage.setItem('logged', true);
      return true;
    }
    setFailedLogin(true);
    return false;
  };

  const Logged = () => {
    if (window.localStorage.getItem('logged')) {
      console.log('logged in');
      return true;
    }
    return false;
  };

  const Logout = () => {
    window.localStorage.removeItem('logged');
  };

  return (
    <AuthContext.Provider
      value={{
        failedLogin,
        setFailedLogin,
        Login,
        Logged,
        authenticated,
        Logout,
        userInfo,
        setUserInfo,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
