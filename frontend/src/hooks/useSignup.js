import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import Fetcher from "../helpers/Fetcher";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  //useAuthContext will change global Auth state.
  const { dispatch } = useAuthContext();

  //This information come from Signup form
  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    //User information(mail+password) posted to server
    const apiCon = new Fetcher();

    apiCon
      .post("user/signup", { email, password })
      .then((userData) => {
        //Save the user to local storage
        localStorage.setItem("user", JSON.stringify(userData));
        //update the authContext with user
        dispatch({ type: "LOGIN", payload: userData });
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setError(err.response.data.error);
      });
  };
  return { signup, isLoading, error };
};
