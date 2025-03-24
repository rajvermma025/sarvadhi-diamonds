import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchBrokers } from "../../redux/slice/brokerSlice";
import { Descriptions, Select, Button, Table } from "antd";
import { IBroker } from "../../Interfaces/App/brokers";
import { useEffect, useState } from "react";
import autoTable from "jspdf-autotable";
import jsPDF from "jspdf";

const TransectionForm = () => {
	const dispatch = useAppDispatch();
	const { brokers } = useAppSelector((state) => state.broker);
	const { selectedDiamondTran } = useAppSelector((state) => state.diamond);
	const [brokersOptions, setBrokersOptions] = useState<{ label: string; value: string }[]>([]);
	const [selectedBroker, setSelectedBroker] = useState<string | undefined>(undefined);
	const [brokerDetails, setBrokerDetails] = useState<IBroker | null>(null);

	useEffect(() => {
		if (brokers) {
			const values = brokers.map((broker) => {
				return {
					label: broker.name,
					value: broker.id,
				};
			});
			setBrokersOptions(values);
			if (values.length > 0) {
				setSelectedBroker(values[0].value);
				setBrokerDetails(brokers.find((broker) => broker.id === values[0].value) || null);
			}
		}
	}, [brokers]);

	const columns = [
		{ title: "Summary", dataIndex: "summary", key: "summary" },
		{ title: "Total", dataIndex: "total", key: "total" },
		{ title: "Selected", dataIndex: "selected", key: "selected" },
		{ title: "Bill Amount", dataIndex: "billAmount", key: "billAmount" },
	];

	const dataSource = [
		{ key: "1", summary: "Qty", total: "Total Quantity", selected: selectedDiamondTran?.stockNo, billAmount: "Computed" },
		{ key: "2", summary: "Total Cts", total: "Total Carats", selected: selectedDiamondTran?.carat, billAmount: "Computed" },
		{ key: "3", summary: "Avg Dis", total: "Total Amount / Total Carat", selected: "Selected Total Amount / Selected Total Carat", billAmount: "Computed" },
		{ key: "4", summary: "Total Amount", total: "Sum of Amount", selected: "Sum of Selected Diamond Amount", billAmount: "Computed" },
	];

	const handleSelectBroker = (value: string) => {
		setSelectedBroker(value);
		setBrokerDetails(brokers.find((broker) => broker.id === value) || null);
	};

	const handleDownloadInvoice = () => {
		const doc = new jsPDF();
		doc.text("Invoice", 14, 20);

		doc.text(`Broker: ${brokerDetails?.name}`, 14, 30);
		doc.text(`Email: ${brokerDetails?.email}`, 14, 40);
		doc.text(`Phone: ${brokerDetails?.phone}`, 14, 50);
		doc.text(`Address: ${brokerDetails?.address}`, 14, 60);
		doc.text(`Broker Rate: ${brokerDetails?.brokerRate}`, 14, 70);

		autoTable(doc, {
			startY: 80,
			head: [["Summary", "Total", "Selected", "Bill Amount"]],
			body: dataSource?.map((row) => [row?.summary, row?.total, row?.selected, row?.billAmount]),
		});

		doc.save("Invoice.pdf");
	};

	useEffect(() => {
		dispatch(fetchBrokers());
	}, [dispatch]);

	return (
		<div className="w-full bg-bgPrimary p-6 pb-5.5">
			<div className="grid grid-cols-1 lg:grid-cols-12 gap-x-6">
				<div className="col-span-12 lg:col-span-5">
					<h1 className="text-lg font-semibold pb-3.5">Broker Details</h1>
					<Descriptions bordered column={1} className="bg-white rounded-lg text-black">
						<Descriptions.Item label="Broker">{brokerDetails?.name}</Descriptions.Item>
						<Descriptions.Item label="Email">{brokerDetails?.email}</Descriptions.Item>
						<Descriptions.Item label="Phone No">{brokerDetails?.phone}</Descriptions.Item>
						<Descriptions.Item label="Address">{brokerDetails?.address}</Descriptions.Item>
						<Descriptions.Item label="Broker Rate">{brokerDetails?.brokerRate}%</Descriptions.Item>
					</Descriptions>
				</div>
				<div className="col-span-12 lg:col-span-7">
					<h1 className="text-text text-base font-poppins font-semibold pb-3.5">Summary</h1>
					<Table columns={columns} dataSource={dataSource} pagination={false} bordered className="transaction-table bg-white rounded-lg text-black" />
				</div>
			</div>
			<div className="flex items-center justify-end mt-6 gap-6">
				<div className="flex items-center gap-3">
					<span className="text-xs font-medium text-[#06031C]">Broker Name</span>
					<Select options={brokersOptions} value={selectedBroker} onChange={handleSelectBroker} style={{ width: 200 }} />
				</div>
				<div className="flex gap-3">
					<Button type="primary" className="px-6">
						Purchase
					</Button>
					<Button type="default" className="px-6" onClick={handleDownloadInvoice}>
						Download
					</Button>
				</div>
			</div>
		</div>
	);
};

export default TransectionForm;
