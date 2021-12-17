import { useParams } from "react-router-dom";
import { useState } from "react";
import { Button, Pre, Intent, ControlGroup, Tag } from "@blueprintjs/core";
import { useForm } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

axios.defaults.headers.common["Authorization"] = `Bearer ${
	import.meta.env.VITE_API_TOKEN
}`;

const Payment = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();

	const { status } = useParams();
	const [result, setResult] = useState("");
	// const [paymentOutcome, setPaymentOutcome] = useState("")
	const [paymentInProgress, setPaymentInProgress] = useState(false);

	const createPaymentandRedirect = () => {
		setPaymentInProgress(!paymentInProgress);
		axios
			.post("/payments/", JSON.parse(result))
			.then((response) => {
				setPaymentInProgress(!paymentInProgress);
				// put the payment id in storage for retrieval on return
				window.location.href = response.data._links.next_url.href;
			})
			.catch((err) => {
				console.log(err);
			});
	};

	// todo
	// const getPaymentStatus = () => {
	// 	if status === completed
	// 	get payment status
	// 	set payment outcome
	// 	display in render
	// }

	const onSubmit = (data) => {
		console.log(data);
		const submissionRef = uuidv4();
		const body = {
			amount: Number(data.amount),
			reference: submissionRef,
			description: data.description,
			return_url: "http://localhost:3000/payment/completed",
			delayed_capture: false,
			email: "test@user.com",
			prefilled_cardholder_details: {
				cardholder_name: "TEST USER",
			},
			language: "en",
		};

		setResult(JSON.stringify(body, null, 2));
	};

	return (
		<div className="bp3-running-text bp3-text-large">

			{status === "completed" ? (
					<h2 className="bp3-heading">You made it!</h2>
				) : (		
				<div>
					<h2 className="bp3-heading">Create a payment</h2>
					<form onSubmit={handleSubmit(onSubmit)}>
						<ControlGroup>
							<div className="bp3-html-select bp3-large">
								<select {...register("amount")}>
									<option value="1000">£10.00</option>
									<option value="2000">£20.00</option>
									<option value="3000">£30.00</option>
									<option value="4000">£40.00</option>
									<option value="5000">£50.00</option>
								</select>
								<span className="bp3-icon bp3-icon-double-caret-vertical"></span>
							</div>
							<input
								{...register("description", {
									required: true,
									minLength: 1,
								})}
								className={`bp3-input bp3-large ${
									errors.description ? "bp3-intent-warning" : ""
								}`}
								placeholder="Payment desc..."
							/>
							<Button
								intent={Intent.PRIMARY}
								large={true}
								type="submit"
								rightIcon="add"
							>
								Create
							</Button>
						</ControlGroup>

						{errors.description?.type === "required" && (
							<div style={{ paddingTop: "10px" }}>
								<Tag large={true} icon="warning-sign" intent={Intent.WARNING}>
									Description is required
								</Tag>
							</div>
						)}

						{result && (
							<div>
								<Pre style={{ whiteSpace: "pre-wrap" }}>{result}</Pre>
								<Button large={true} icon="credit-card" intent={Intent.SUCCESS} onClick={() => createPaymentandRedirect()}>
									Pay!
								</Button>
							</div>
						)}
					</form>
				</div>
			)}
		</div>
	);
};

export default Payment;