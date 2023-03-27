import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";
import Fetcher from "../helpers/Fetcher";

const PlayerDetails = ({ player, refreshPlayers }) => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const apiCon = new Fetcher();

  const handleClick = async () => {
    if (!user) {
      return;
    }

    apiCon
      .delete("pitch/" + player._id)
      .then(() => {
        refreshPlayers();
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  };

  const handleClick2 = async (team) => {
    const updatedPlayer = {
      ...player,
      team:
        team === "leftTeam"
          ? "left"
          : team === "rightTeam"
          ? "right"
          : team === "remove"
          ? null
          : null,
    };

    apiCon
      .patch("pitch/" + updatedPlayer._id, updatedPlayer)
      .then(() => {
        refreshPlayers();
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  };

  return (
    <div className="player-details">
      <h4>{player.name}</h4>
      <p className="player-power">
        <span className="material-symbols-outlined">charger</span>{" "}
        {player.power}
      </p>
      <div className="assign-team">
        <p
          className="material-symbols-outlined left"
          onClick={() => handleClick2("leftTeam")}
        >
          arrow_circle_left
        </p>
        <p
          className="material-symbols-outlined remove-player"
          onClick={() => handleClick2("removePlayer")}
        >
          do_not_disturb_on
        </p>
        <p
          className="material-symbols-outlined right"
          onClick={() => handleClick2("rightTeam")}
        >
          arrow_circle_right
        </p>
      </div>
      <span className="material-symbols-outlined delete" onClick={handleClick}>
        delete
      </span>
      {error && <div className="error">{error}</div>}
    </div>
  );
};
export default PlayerDetails;
