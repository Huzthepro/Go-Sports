import { useEffect } from "react";
import { usePlayerContext } from "../hooks/usePlayerContext";

import PlayerDetails from "../components/PlayerDetails";
import PlayerForm from "../components/PlayerForm";
import { useAuthContext } from "../hooks/useAuthContext";
import footballPitchImage from "../assets/footballpitch.png";

const Home = () => {
  const { player, dispatch } = usePlayerContext();
  const { user } = useAuthContext();
  useEffect(() => {
    const fetchPlayers = async () => {
      const response = await fetch("/api/pitch", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_PLAYER", payload: json });
      }
    };

    if (user) {
      fetchPlayers();
    }
  }, [dispatch, user, player]);

  return (
    <div className="home">
      <div className="players">
        {player &&
          player.map((mappedPlayer) => (
            <PlayerDetails key={mappedPlayer._id} player={mappedPlayer} />
          ))}
      </div>
      <div className="pitch">
        <div className="teams">
          <div className="left-team">
            {player &&
              player.map((player) => {
                if (player.team === "left") {
                  return (
                    <div className="grid-item" key={player._id}>
                      <span className="material-symbols-outlined">
                        account_circle
                      </span>
                      <h4>{player.name}</h4>
                      <p>{player.power}</p>
                    </div>
                  );
                } else {
                  return null;
                }
              })}
          </div>
          <div className="right-team">
            {player &&
              player.map((player) => {
                if (player.team === "right") {
                  return (
                    <div className="grid-item" key={player._id}>
                      <span className="material-symbols-outlined">
                        account_circle
                      </span>
                      <h4>{player.name}</h4>
                      <p>{player.power}</p>
                    </div>
                  );
                } else {
                  return null;
                }
              })}
          </div>
        </div>
        <img src={footballPitchImage} alt="football pitch"></img>
      </div>
      <PlayerForm />
    </div>
  );
};

export default Home;
