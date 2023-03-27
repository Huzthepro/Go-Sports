import { useEffect, useState } from "react";
import Fetcher from "../helpers/Fetcher";

import PlayerDetails from "../components/PlayerDetails";
import PlayerForm from "../components/PlayerForm";

import footballPitchImage from "../assets/footballPitch.png";
import blueTeam from "../assets/blueTeam.png";
import redTeam from "../assets/redTeam.png";

const Home = () => {
  const [player, setPlayer] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  console.log("test");
  const getPlayers = () => {
    const apiCon = new Fetcher();

    apiCon
      .get("pitch")
      .then((pitch) => {
        setPlayer(pitch);
      })
      .catch((err) => {
        setError(err.response.data.error);
      });
  };
  useEffect(() => {
    getPlayers();
  }, []);
  return (
    <div className="home">
      {error && <div className="error">{error}</div>}
      <PlayerForm getPlayers={getPlayers} />
      <div className="edit-container">
        <div className="players">
          {player &&
            player.map((mappedPlayer) => (
              <PlayerDetails
                key={mappedPlayer._id}
                player={mappedPlayer}
                getPlayers={getPlayers}
              />
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
                        <div className="player-image-container">
                          <img src={blueTeam} alt="blue-team-img"></img>
                        </div>
                        <div className="player-text-container">
                          <h4>{player.name} </h4>
                        </div>
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
                        <div className="player-image-container">
                          <img src={redTeam} alt="red-team-img"></img>
                        </div>
                        <div className="player-text-container">
                          <h4>{player.name} </h4>
                        </div>
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
      </div>
    </div>
  );
};

export default Home;
