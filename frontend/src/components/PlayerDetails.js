import { usePlayerContext } from "../hooks/usePlayerContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState } from "react";

const PlayerDetails = ({ player }) => {
  const { dispatch } = usePlayerContext();
  const { user } = useAuthContext();
  const [error, setError] = useState(null);

  const handleClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch(
      "http://localhost:4000/api/pitch/" + player._id,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }
    );
    const json = await response.json();
    if (response.ok) {
      dispatch({ type: "DELETE_PLAYER", payload: json });
    }
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
    const response = await fetch(
      "http://localhost:4000/api/pitch/" + updatedPlayer._id,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(updatedPlayer),
      }
    );
    const jsonUpdate = await response.json();
    if (!response.ok) {
      setError(jsonUpdate.error);
    }
    if (response.ok) {
      dispatch({ type: "UPDATE_PLAYER", payload: jsonUpdate });
    }
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
