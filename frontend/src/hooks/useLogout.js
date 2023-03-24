import { useAuthContext } from "./useAuthContext";
import { usePlayerContext } from "./usePlayerContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: playerDispatch } = usePlayerContext();
  const logout = () => {
    //Remove user from storage
    localStorage.removeItem("user");

    //dispatch logout action
    dispatch({ type: "LOGOUT" });
    playerDispatch({ type: "SET_PLAYER", payload: null });
  };

  return { logout };
};
