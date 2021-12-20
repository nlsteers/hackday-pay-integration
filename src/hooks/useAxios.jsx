import { useState, useEffect } from "react";
import axios from "axios";

axios.defaults.headers.common["Authorization"] = `Bearer ${
  import.meta.env.VITE_API_TOKEN
}`;

const useAxios = ({ url, method, body = null }) => {
  console.log(url);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState("");
  const [loading, setloading] = useState(true);

  const fetchData = () => {
    axios({ method: method, url: url, data: JSON.parse(body) })
      .then((res) => {
        setResponse(res.data);
      })
      .catch((err) => {
        setError(err);
      })
      .finally(() => {
        setloading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, [method, url, body]);

  return { response, error, loading };
};

export default useAxios;
