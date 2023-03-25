import useFetch from "../hooks/useFetch";
import PlayerDetails from "../components/PlayerDetails";
import PlayerForm from "../components/PlayerForm";

import footballPitchImage from "../assets/footballPitch.png";
import blueTeam from "../assets/blueTeam.png";
import redTeam from "../assets/redTeam.png";

const Home = () => {
  const path = "pitch";
  const type = "SET_PLAYER";
  const { player } = useFetch(path, type);

  return (
    <div className="home">
      <PlayerForm />
      <div className="edit-container">
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
