import TransectionForm from "../../Components/Transections/TransectionForm";
import DiamondsTable from "../../Components/Table/DiamondsTable";

const Transaction = () => {
	return (
		<div className="w-full h-full">
			<TransectionForm />
			<DiamondsTable showActions={false} />
		</div>
	);
};

export default Transaction;
