import React, { useState, useEffect, useRef, useContext } from 'react';
import Keycloak from 'keycloak-js';
import PropTypes from 'prop-types';

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const isRun = useRef(false);
  const [isLogin, setLogin] = useState(false);

  useEffect(() => {
    if (isRun.current) return;

    isRun.current = true;

    const keycloakConfig = {
      url: import.meta.env.VITE_KEYCLOAK_URL,
      realm: import.meta.env.VITE_KEYCLOAK_REALM,
      clientId: import.meta.env.VITE_KEYCLOAK_CLIENT,
    };

    const keycloak = new Keycloak(keycloakConfig);

    keycloak
      .init({
        onLoad: 'login-required',
      })
      .then((authenticated) => {
        setLogin(authenticated);
      });

  }, []);

  return (
    <AuthContext.Provider value={isLogin}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


export const useAuth = () => useContext(AuthContext);
