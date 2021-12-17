import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
	Button,
	Collapse,
	Pre,
	Tag,
	Intent,
	HTMLTable,
} from "@blueprintjs/core";
import useAxios from "../hooks/useAxios";

const Transactions = () => {
	const { response, loading, error } = useAxios({
		url: "/payments/",
		method: "get",
	});
	const [data, setData] = useState([]);
	const [isOpen, setIsOpen] = useState(false);

	useEffect(() => {
		if (response !== null) {
			setData(response);
		}
	}, [response]);

	const handleCollapse = () => {
		setIsOpen(!isOpen);
	};

	return (
		<div className="bp3-running-text bp3-text-large">
			<h2 className="bp3-heading">Transactions</h2>
			<div>
				{loading ? (
					<p>loading...</p>
				) : (
					<div>
						{error && (
							<div>
								<p>{error.message}</p>
							</div>
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
												<td>{r.card_details.cardholder_name}</td>
												<td>
													{r.state.status === "created" && (
														<div>
															<Tag large={true} icon="updated" intent={Intent.PRIMARY}>
																Pending
															</Tag>
														</div>
													)}
													{r.state.status === "success" && (
														<div>
															<Tag large={true} icon="endorsed" intent={Intent.SUCCESS}>
																Completed
															</Tag>
														</div>
													)}
													{ r.state.status === "failed" && (
														<div>
															<Tag large={true} icon="error" intent={Intent.DANGER}>
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
										<td>{data.count}</td>
									</tr>
								)}
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
