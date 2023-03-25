import { createContext, useReducer } from "react";
export const PlayerContext = createContext();

//state represent: current 'state' coming from PlayerContextProvider
//action represent: new info coming with 'dispatch'
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

// Information first coming here in state.
// But
// Before storing coming information in 'state' =>
// With useReducer we reduce the information as we want with playerReducer =>
// player is one of the field playerReducer use to store data. Then send it to state.
// Then we store it in state.
export const PlayerContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(playerReducer, {
    player: null,
  });
  return (
    <PlayerContext.Provider value={{ ...state, dispatch }}>
      {children}
    </PlayerContext.Provider>
  );
};
