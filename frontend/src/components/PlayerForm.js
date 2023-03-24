import { useState } from "react";
import { usePlayerContext } from "../hooks/usePlayerContext";
import { useAuthContext } from "../hooks/useAuthContext";
const PlayerForm = () => {
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
    const player = { name, power };

    const response = await fetch("/api/pitch", {
      method: "POST",
      body: JSON.stringify(player),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
      setEmptyFields(json.emptyFields);
    }
    if (response.ok) {
      setName("");
      setPower("");
      setError(null);
      setEmptyFields([]);
      console.log("new Player added", json);
      dispatch({ type: "CREATE_PLAYER", payload: json });
    }
  };
  return (
    <form className="form-create" onSubmit={handleSubmit}>
      <h3>Add a New Player</h3>
      <label>Player Name:</label>
      <input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        className={emptyFields.includes("name") ? "error" : ""}
      ></input>
      <label>Power:</label>
      <input
        type="number"
        onChange={(e) => setPower(e.target.value)}
        value={power}
        className={emptyFields.includes("power") ? "error" : ""}
      ></input>
      <button>Add Player</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default PlayerForm;
