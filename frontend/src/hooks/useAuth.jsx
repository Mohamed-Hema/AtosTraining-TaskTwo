import { useState, useEffect, useRef } from "react";
import Keycloak from "keycloak-js";

const useAuth = () => {
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
    
    const client = new Keycloak(keycloakConfig);

    client
      .init({
        onLoad: 'login-required',
      })
      .then((res) => {
        setLogin(res);
      })
      .catch((error) => {
        console.log('Failed to initialize Keycloak client:', error);
      });
  }, []);

  return [isLogin];
};

export default useAuth;
