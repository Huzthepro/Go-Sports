import { useState, useEffect } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { usePlayerContext } from "../hooks/usePlayerContext";

//For fetching 1 Url at a time.
function useFetch(path, type, body) {
  // Put this if you wanna use your own server: http://localhost:4000/
  const url = "http://localhost:4000/api/" + path;
  const { user } = useAuthContext();
  const { player, dispatch: playerDispatch } = usePlayerContext();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(url, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
        const json = await response.json();
        if (response.ok) {
          playerDispatch({ type: type, payload: json });
          setLoading(false);
        }
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };
    if (user) {
      fetchData();
    }
  }, [playerDispatch, user, url, type]);

  return { player, loading, error, setError };
}

export default useFetch;
