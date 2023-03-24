import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);
  //useAuthContext will change global Auth state.
  const { dispatch } = useAuthContext();

  //This information come from Signup form
  const signup = async (email, password) => {
    setIsLoading(true);
    setError(null);

    //User information posted to server
    const response = await fetch(
      "https://gosports.onrender.com/api/user/signup",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );
    const json = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setError(json.error);
    }
    if (response.ok) {
      //Save the user to local storage
      //It has mail and Token. This token later will be used for auto login
      localStorage.setItem("user", JSON.stringify(json));

      //update the authContext with json coming from server and status is now: LOGIN not SIGNUP!!! because no need.
      dispatch({ type: "LOGIN", payload: json });
      setIsLoading(false);
    }
  };
  return { signup, isLoading, error };
};
