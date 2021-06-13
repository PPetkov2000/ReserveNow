import { useState, useEffect } from "react";
import axios from "axios";
import api from "../utils/api-instance";

function useFetch(url) {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    const CancelToken = axios.CancelToken;
    const source = CancelToken.source();

    api
      .get(url, { cancelToken: source.token })
      .then((response) => {
        setData(response.data);
        setLoading(false);
        setError(null);
      })
      .catch((error) => {
        if (axios.isCancel(error)) {
          console.log("Request canceled", error.message);
        } else {
          setError(error);
          setLoading(false);
        }
      });

    return () => source.cancel("Operation canceled.");
  }, [url]);

  return { loading, data, error };
}

export default useFetch;
