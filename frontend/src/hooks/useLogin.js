import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

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
    const response = await fetch("http://localhost:4000/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    //Server validate the user, give us back its information as json
    if (response.ok) {
      //Save the user to local storage
      localStorage.setItem("user", JSON.stringify(json));

      //update the authContext with user
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    }
  };
  return { login, isLoading, error };
};
