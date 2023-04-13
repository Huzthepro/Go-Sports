import { useEffect, useState } from "react";
import Fetcher from "../helpers/Fetcher";

import PlayerWaiting from "../components/PlayerWaiting";
import AddPlayer from "../components/AddPlayer";
import PlayField from "../components/PlayField";
import Spinner from "../components/Spinner";

const Pitch = () => {
  const [players, setPlayer] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(null);

  const refreshPlayers = () => {
    const apiCon = new Fetcher();
    setIsLoading(true);
    apiCon
      .get("pitch")
      .then((fetchedPlayers) => {
        setPlayer(fetchedPlayers);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err.response.data.error);
        setIsLoading(false);
      });
  };
  useEffect(() => {
    refreshPlayers();
  }, []);

  return (
    <div className="home">
      {isLoading && <Spinner />}

      <AddPlayer refreshPlayers={refreshPlayers} />

      {error && <div className="error">{error}</div>}

      <div className="edit-container">
        <PlayerWaiting players={players} refreshPlayers={refreshPlayers} />

        <PlayField players={players} refreshPlayers={refreshPlayers} />
      </div>
    </div>
  );
};

export default Pitch;
