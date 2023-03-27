import footballPitchImage from "../assets/footballPitch.png";
import blueTeam from "../assets/blueTeam.png";
import redTeam from "../assets/redTeam.png";

const PlayField = ({ players }) => {
  return (
    <div className="pitch">
      <div className="teams">
        <div className="left-team">
          {players &&
            players.map((mappedPlayer) => {
              if (mappedPlayer.team === "left") {
                return (
                  <div className="grid-item" key={mappedPlayer._id}>
                    <div className="player-image-container">
                      <img src={blueTeam} alt="blue-team-img"></img>
                    </div>
                    <div className="player-text-container">
                      <h4>{mappedPlayer.name} </h4>
                    </div>
                  </div>
                );
              } else {
                return null;
              }
            })}
        </div>
        <div className="right-team">
          {players &&
            players.map((mappedPlayer) => {
              if (mappedPlayer.team === "right") {
                return (
                  <div className="grid-item" key={mappedPlayer._id}>
                    <div className="player-image-container">
                      <img src={redTeam} alt="red-team-img"></img>
                    </div>
                    <div className="player-text-container">
                      <h4>{mappedPlayer.name} </h4>
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
  );
};

export default PlayField;
