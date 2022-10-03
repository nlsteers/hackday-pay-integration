import { Callout, Intent, Pre, Tag, AnchorButton } from "@blueprintjs/core";
import { Link } from "react-router-dom";

const PaymentStatus = ({ paymentState }) => {
  return (
    <div>
      {paymentState && (
        <Callout icon="exchange" large={true} intent={Intent.PRIMARY}>
          {paymentState.payment_id }
        </Callout>
      )}
      {paymentState && (
        <div>
          {paymentState.state.status === "created" ||
            paymentState.state.status === "submitted" ||
            paymentState.state.status === "pending" ||
            (paymentState.state.status === "started" && (
              <Callout>
                <a
                  rel="noreferrer"
                  target="_blank"
                  href={paymentState._links.next_url.href}
                >
                  <AnchorButton
                    large={true}
                    icon="credit-card"
                  >
                    Complete your payment here
                  </AnchorButton>
                </a>
              </Callout>
            ))}
          {paymentState.state.status === "success" && (
            <Callout title="Success" intent={Intent.SUCCESS}>
              Payment completed
            </Callout>
          )}
          {paymentState.state.status === "failed" && (
            <Callout
              title="There was a problem with your payment"
              intent={Intent.WARNING}
            >
              {paymentState.state.message}
            </Callout>
          )}
          <Pre style={{ whiteSpace: "pre-wrap" }}>
            {JSON.stringify(paymentState, null, 2)}
          </Pre>
        </div>
      )}
    </div>
  );
};

export default PaymentStatus;
