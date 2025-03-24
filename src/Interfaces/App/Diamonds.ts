export interface IDiamond {
	id: string;
	stockNo: string;
	carat: string;
	shape: string;
	color: string;
	clarity: string;
	rapPrice: string;
	disc: string;
	ppc: string;
	totalAmount: string;
}

export interface IDiamondState {
	diamonds: IDiamond[];
	selectedDiamond: IDiamond | null;
	selectedDiamondTran: IDiamond | null;
	status: "idle" | "loading" | "succeeded" | "failed";
	error: string | null;
}
