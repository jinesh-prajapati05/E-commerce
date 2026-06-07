import { useEffect, useContext } from "react";
import { AuthContext } from "../authContext.jsx";
import { getMe, login, logout, register } from "../services/api.services.js";

export default function useAuthUser() {
  const {user, setUser, loading, setLoading } = useContext(AuthContext);

  const handleRegister = async ({ userName, email, password }) => {
    try {
      setLoading(true);
      const response = await register({ userName, email, password });
      setUser(response.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async ({ email, password }) => {
    try {
      setLoading(true);
      const response = await login({ email, password });
      setUser(response.user);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
        const response = await logout();
        return response.message
    } catch (error) {
        console.error(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
  }


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe();
        if (data && data.user) {
          setUser(data.user);
        }
      } catch (error) {
        console.error(error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [setUser, setLoading]);

  return { handleRegister, handleLogin, handleLogout, user, loading };
}
