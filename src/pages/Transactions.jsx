import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Button,
  Collapse,
  Pre,
  Tag,
  Intent,
  HTMLTable,
  Spinner,
  SpinnerSize,
  Callout
} from "@blueprintjs/core";
import useAxios from "../hooks/useAxios";

const Transactions = () => {
  const itemsPerPage = 10;
  const [totalItems, setTotalItems] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [startIndex, setStartIndex] = useState(0);
  const [endIndex, setEndIndex] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const { response, loading, error } = useAxios({
    url: `/payments/?display_size=${itemsPerPage}&page=${currentPage}`,
    method: "get",
  });
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [pages, setPages] = useState([1]);


  useEffect(() => {
    if (response !== null) {
      setData(response);
      setTotalItems(response.total)

      setPages(
        Array.from({ length: Math.ceil(totalItems / itemsPerPage) }, (_, i) => i + 1)
      );

      const totalPages = Math.ceil(totalItems / itemsPerPage);
      const startIndex = (currentPage - 1) * itemsPerPage + 1;
      const endIndex = Math.min(startIndex + itemsPerPage - 1, totalItems);

      setStartIndex(startIndex);
      setEndIndex(endIndex);
      setTotalPages(totalPages);

    }
  }, [response]);

  const handleCollapse = () => {
    setIsOpen(!isOpen);
  };

  const handlePageChange = (event) => {
    setCurrentPage(event.target.value);
  };

  return (
    <div className="bp3-running-text bp3-text-large">
      <h2 className="bp3-heading">Transactions</h2>
      <div>
        {loading ? (
          <Spinner size={SpinnerSize.STANDARD} />
        ) : (
          <div>
            {error && (
              <Callout
              title="There was a problem"
              intent={Intent.DANGER}
            >
              {error.message}
            </Callout>
            )}
            <HTMLTable bordered={true} striped={true} interactive={true}>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Amount</th>
                  <th>Description</th>
                  <th>Reference</th>
                  <th>Cardholder</th>
                  <th>Status</th>
                  <th>Datetime</th>
                </tr>
              </thead>
              <tbody>
                {data &&
                  data.results.map((r, i) => {
                    return (
                      <tr key={i}>
                        <td>
                          <Link to={`/transaction/${r.payment_id}`}>
                            {r.payment_id}
                          </Link>
                        </td>
                        <td>{r.amount}</td>
                        <td>{r.description}</td>
                        <td>{r.reference}</td>
                        <td>{r.card_details ? r.card_details.cardholder_name : 'Unavailable'}</td>
                        <td>
                          {r.state.status === "created" ||
                            r.state.status === "submitted" ||
                            r.state.status === "pending" ||
                            (r.state.status === "started" && (
                              <div>
                                <Tag
                                  large={true}
                                  icon="stopwatch"
                                  intent={Intent.PRIMARY}
                                >
                                  Pending
                                </Tag>
                              </div>
                            ))}
                          {r.state.status === "success" && (
                            <div>
                              <Tag
                                large={true}
                                icon="endorsed"
                                intent={Intent.SUCCESS}
                              >
                                Completed
                              </Tag>
                            </div>
                          )}
                          {r.state.status === "failed" && (
                            <div>
                              <Tag
                                large={true}
                                icon="warning-sign"
                                intent={Intent.DANGER}
                              >
                                {r.state.message}
                              </Tag>
                            </div>
                          )}
                        </td>
                        <td>{r.created_date}</td>
                      </tr>
                    );
                  })}
              </tbody>
              <tfoot>
                {data && (
                  <tr>
                    <td colSpan={6}>Total</td>
                    <td>
                      {startIndex} to {endIndex} of {totalItems}<br/>
                    </td>
                  </tr>
                )}
                <tr>
                  <td colSpan={6}></td>
                  <td>
                    <div className="bp3-html-select bp3-large">
                      <select
                        value={currentPage}
                        onChange={(event) => {
                          handlePageChange(event);
                        }}
                      >
                        {pages.map((p) => {
                          return (
                            <option
                              key={p}
                              value={p}
                              selected={p === currentPage}
                            >
                              page {p}
                            </option>
                          );
                        })}
                      </select>
                      <span className="bp3-icon bp3-icon-double-caret-vertical"></span>
                    </div>
                    &nbsp;of {totalPages}
                  </td>
                </tr>
              </tfoot>
            </HTMLTable>
            <Button onClick={handleCollapse}>
              {isOpen ? "Hide" : "Show"} raw transactions
            </Button>
            <Collapse isOpen={isOpen}>
              {data &&
                data.results.map((r, i) => {
                  return (
                    <Pre style={{ whiteSpace: "pre-wrap" }} key={i}>
                      {JSON.stringify(r, null, 2)}
                    </Pre>
                  );
                })}
            </Collapse>
          </div>
        )}
      </div>
    </div>
  );
};

export default Transactions;
