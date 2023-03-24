import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
// This hook will be used for AuthContext context
export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw Error("useAuthContext must be used inside an AuthContextProvider");
  }

  return context;
};
