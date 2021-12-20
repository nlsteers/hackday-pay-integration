import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Pre, Tag, Intent, Spinner,
	SpinnerSize } from "@blueprintjs/core";
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
		<div className="bp3-running-text bp3-text-large" style={{paddingTop:'10px'}}>
			<Tag icon="exchange" large={true} intent={Intent.PRIMARY}>{id}</Tag>
			{loading ? (
				<Spinner size={SpinnerSize.STANDARD} />
			) : (
				<div>
					{error && (
						<div>
							<p>{error.message}</p>
						</div>
					)}
					{data && (
						<Pre style={{ whiteSpace: "pre-wrap" }}>
							{JSON.stringify(data, null, 2)}
						</Pre>
					)}
				</div>
			)}
		</div>
	);
};

export default TransactionDetail;
