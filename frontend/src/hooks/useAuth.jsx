import React, { useState, useEffect, useRef, useContext } from 'react';
import Keycloak from 'keycloak-js';
import PropTypes from 'prop-types';

export const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
  const isRun = useRef(false);
  const [isLogin, setLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({ isLogin: false, userType: null });

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
        if (authenticated) {
          const userType = keycloak.tokenParsed.userType;
          setLogin(authenticated);
          setUserInfo({ isLogin: authenticated, userType });
        }
      });

  }, []);

  return (
    <AuthContext.Provider value={userInfo}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
