import { createContext, useReducer } from "react";

export const PlayerContext = createContext();

//state represent: player: null,
//action represent: playerReducer (it has a payload)
export const playerReducer = (state, action) => {
  switch (action.type) {
    case "SET_PLAYER":
      return { player: action.payload };
    case "CREATE_PLAYER":
      return { player: [action.payload, ...state.player] };
    case "DELETE_PLAYER":
      return {
        player: state.player.filter(
          (playerFilter) => playerFilter._id !== action.payload._id
        ),
      };
    case "UPDATE_PLAYER":
      const updatedPlayerIndex = state.player.findIndex(
        (player) => player._id === action.payload._id
      );
      if (updatedPlayerIndex === -1) {
        return state; // player not found, return current state
      }
      const updatedPlayer = {
        ...state.player[updatedPlayerIndex],
        ...action.payload,
      };
      const updatedPlayers = [...state.player];
      updatedPlayers[updatedPlayerIndex] = updatedPlayer;
      return { player: updatedPlayers };
    default:
      return state;
  }
};

export const PlayerContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(playerReducer, {
    player: null,
  });
  console.log("PlayerContext state:", state);
  return (
    <PlayerContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PlayerContext.Provider>
  );
};
