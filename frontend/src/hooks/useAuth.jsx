import { useState, useEffect, useRef } from 'react';
import Keycloak from 'keycloak-js';

export const useAuth = () => {
  const isRun = useRef(false);
  const [token, setToken] = useState(null);
  const [isLogin, setLogin] = useState(false);

  const keycloakConfig = {
    url: import.meta.env.VITE_KEYCLOAK_URL,
    realm: import.meta.env.VITE_KEYCLOAK_REALM,
    clientId: import.meta.env.VITE_KEYCLOAK_CLIENT,
  };

  useEffect(() => {
    if (isRun.current) return;

    isRun.current = true;
    const client = Keycloak(keycloakConfig);

    client
      .init({
        onLoad: 'login-required',
      })
      .then((res) => {
        setLogin(res);
        setToken(client.token);
      });
  }, []);

  return [isLogin, token];
};

export default useAuth;
