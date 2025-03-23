import BrokerForm from "../../Components/Brokers/BrokerForm";
import BrokerTable from "../../Components/Table/BrokerTable";

const Brokers = () => {
	return (
		<div className="w-full h-full">
			<BrokerForm />
			<BrokerTable />
		</div>
	);
};

export default Brokers;
