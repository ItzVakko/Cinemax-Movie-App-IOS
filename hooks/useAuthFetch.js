import { useState } from "react";

const useAuthFetch = (fetchFunction, onSuccess) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [finished, setFinished] = useState(false);

  const fetchData = async (userData) => {
    try {
      setError(null);
      setFinished(false);
      const result = await fetchFunction(userData);
      setFinished(true);
      setData(result);

      onSuccess && onSuccess(result);
    } catch (err) {
      setError(err.message || "Something went wrong");
      setFinished(false);
    }
  };

  return { data, finished, error, setError, fetchData };
};

export default useAuthFetch;
