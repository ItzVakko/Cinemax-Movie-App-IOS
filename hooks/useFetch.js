import { useEffect, useState } from "react";

const useFetch = ({
  fetchFunction,
  autoFetch,
  params = {},
  headers = {},
  onSuccess,
  onError,
  dependencies = [],
  debounce = 0,
} = {}) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [finished, setFinished] = useState(false);

  const fetchData = async (fetchData) => {
    setFinished(false);

    try {
      setLoading(true);
      setError(null);

      const result = await fetchFunction(fetchData || params, headers);
      setData(result);
      setFinished(true);

      onSuccess && onSuccess(result);
    } catch (err) {
      setError(err.message || "Something went wrong");

      if (onError) onError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (autoFetch) {
      if (debounce > 0) {
        const timeout = setTimeout(() => fetchData(), debounce);
        return () => clearTimeout(timeout);
      }
      fetchData();
    }
  }, dependencies);

  const reset = () => {
    setData(null);
    setLoading(false);
    setError(null);
  };

  return { data, loading, error, setError, finished, fetchData, reset };
};

export default useFetch;
