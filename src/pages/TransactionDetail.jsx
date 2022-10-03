import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Intent, Spinner, SpinnerSize, Callout } from "@blueprintjs/core";
import PaymentStatus from "../components/PaymentStatus.jsx";
import useAxios from "../hooks/useAxios";

const TransactionDetail = () => {
  const { id } = useParams();

  const { response, loading, error } = useAxios({
    url: `/payments/${id}`,
    method: "get",
  });

  const [data, setData] = useState([]);

  useEffect(() => {
    if (response !== null) {
      setData(response);
    }
  }, [response]);
  return (
    <div
      className="bp3-running-text bp3-text-large"
      style={{ paddingTop: "10px" }}
    >
      {loading ? (
        <Spinner size={SpinnerSize.STANDARD} />
      ) : (
        <div>
          {error && (
            <Callout title="There was a problem" intent={Intent.DANGER}>
              {error.message}
            </Callout>
          )}
          {data && (
            <PaymentStatus paymentState={data} />
          )}
        </div>
      )}
    </div>
  );
};

export default TransactionDetail;
