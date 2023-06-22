
export const getAccessToken = async () => {
  try {
    const response = await axios.post(
      "http://127.0.0.1:8080/realms/examengine/protocol/openid-connect/token",
      new URLSearchParams({
        username: import.meta.env.VITE_KEYCLOAK_ADMIN,
        password: import.meta.env.VITE_KEYCLOAK_ADMINPASS,
        grantType: import.meta.env.GRANT_TYPE,
        clientId: import.meta.env.VITE_KEYCLOAK_CLIENT,
    }).toString()
    );

    const { access_token } = response.data;
    return access_token;
  } catch (error) {
    console.error("Failed to authenticate:", error);
    throw new Error("Failed to retrieve access token");
  }
};

export const getUsersWithToken = async (token) => {
  try {
    const response = await axios.get(
      "http://127.0.0.1:8080/admin/realms/examengine/users",
      {
        headers: {
          Authorization: "`Bearer ${token}`",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Failed to retrieve users:", error.message);
  }
};