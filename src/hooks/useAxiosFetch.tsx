import { useState, useEffect } from "react";
import axios from "axios";

const useAxiosFetch = (url: string) => {
  const [data, setData] = useState([]);
  const [fetchError, setFetchError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let isMounted = true;
    const source = axios.CancelToken.source();

    (async () => {
      setIsLoading(true);
      try {
        const response = await axios.get(url, { cancelToken: source.token });
        if (!isMounted) return;

        setData(response.data);
        setFetchError("");
      } catch (err) {
        if (!isMounted) return;

        setData([]);
        setFetchError((err as Error).message);
      } finally {
        isMounted && setIsLoading(false);
      }
    })();

    return () => {
      isMounted = false;
      source.cancel();
    };
  }, [url]);

  return { data, isLoading, fetchError };
};

export default useAxiosFetch;
