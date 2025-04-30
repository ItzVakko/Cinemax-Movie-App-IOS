import { useEffect, useState } from "react";

const useFetch = (fetchFunction, autoFetch = true, selectedGenre, query) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await fetchFunction();
      setData(result);
    } catch (err) {
      setLoading(true);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setLoading(false);
    setError(null);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [selectedGenre]);

  useEffect(() => {
    if (query?.trim()) {
      const timeout = setTimeout(() => {
        fetchData();
      }, 500);

      return () => clearTimeout(timeout);
    } else {
      fetchData();
    }
  }, [query]);

  return { data, loading, error, reset, fetchData };
};

export default useFetch;
