export interface IBroker {
	id: string;
	name: string;
	email: string;
	phone: string;
	address: string;
	brokerRate: number;
	active: boolean;
}

export interface IBrokerState {
	brokers: IBroker[];
	selectedBroker: IBroker | null;
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null;
}
