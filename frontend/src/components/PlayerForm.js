import { useState } from "react";
import { usePlayerContext } from "../hooks/usePlayerContext";
import { useAuthContext } from "../hooks/useAuthContext";
import Fetcher from "../helpers/Fetcher";
const PlayerForm = ({ getPlayers }) => {
  const { dispatch } = usePlayerContext();
  const { user } = useAuthContext();
  const [name, setName] = useState("");
  const [power, setPower] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError("You must be logged in");
      return;
    }

    const apiCon = new Fetcher();

    apiCon
      .post("pitch", { name, power })
      .then((pitch) => {
        getPlayers();
      })
      .catch((err) => {
        console.log(err);
      });

    const player = { name, power };

    // const response = await fetch("http://localhost:4000/api/pitch", {
    //   method: "POST",
    //   body: JSON.stringify(player),
    //   headers: {
    //     "Content-Type": "application/json",
    //     Authorization: `Bearer ${user.token}`,
    //   },
    // });
    // const json = await response.json();
    // if (!response.ok) {
    //   setError(json.error);
    //   setEmptyFields(json.emptyFields);
    // }
    // if (response.ok) {
    //   setName("");
    //   setPower("");
    //   setError(null);
    //   setEmptyFields([]);
    //   dispatch({ type: "CREATE_PLAYER", payload: json });
    // }
  };
  return (
    <form className="form-create-player" onSubmit={handleSubmit}>
      <div className="form-group-vertical">
        <input
          type="text"
          onChange={(e) => setName(e.target.value)}
          value={name}
          placeholder="Player name"
          className={emptyFields.includes("name") ? "error" : ""}
        ></input>
      </div>
      <div className="form-group-vertical">
        <input
          type="number"
          onChange={(e) => setPower(e.target.value)}
          value={power}
          placeholder="Player power"
          className={emptyFields.includes("power") ? "error" : ""}
        ></input>
      </div>
      <button className="green-button">Add Player</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default PlayerForm;
