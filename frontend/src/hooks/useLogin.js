import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import Fetcher from "../helpers/Fetcher";
export const useLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  //useAuthContext will change global Auth state.
  const { dispatch } = useAuthContext();

  //This information come from login form
  const login = async (email, password) => {
    setIsLoading(true);
    setError(null);

    //User information(mail+password) posted to server
    const apiCon = new Fetcher();

    apiCon
      .post("user/login", { email, password })
      .then((userData) => {
        //Save the user to local storage
        localStorage.setItem("user", JSON.stringify(userData));
        //update the authContext with user
        dispatch({ type: "LOGIN", payload: userData });
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.error);
        setIsLoading(false);
      });
  };
  return { login, isLoading, error };
};
