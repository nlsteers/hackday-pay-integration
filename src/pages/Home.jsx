import { Link } from "react-router-dom";

const Home = () => {
	return (
		<div className="bp3-running-text bp3-text-large">
			<h2 className="bp3-heading">Scenarios</h2>
			<p>
				<Link to="/payment/create">Make a payment</Link>
			</p>
			<p>
				<Link to="/payment/completed">Last payment state</Link>
			</p>
		</div>
	);
};

export default Home;
