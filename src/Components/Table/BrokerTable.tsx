import { deleteBroker, fetchBrokers, setSelectedBroker, updateBroker } from "../../redux/slice/brokerSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useNotificationContext } from "../../NotificationWrapper";
import { Button, Checkbox, Modal, Table, TableProps } from "antd";
import { IBroker } from "../../Interfaces/App/brokers";
import { useEffect, useState } from "react";

const BrokerTable = () => {
	const dispatch = useAppDispatch();
	const { brokers } = useAppSelector((state) => state.broker);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedBrokerId, setSelectedBrokerId] = useState<string | null>(null);
	const { openNotification } = useNotificationContext();

	const showDeleteModal = (id: string) => {
		setSelectedBrokerId(id);
		setIsModalVisible(true);
	};

	const handleDelete = () => {
		if (selectedBrokerId) {
			dispatch(deleteBroker(selectedBrokerId)).then(() => {
				openNotification("success", "Broker deleted successfully!");
			});
		}
		setIsModalVisible(false);
	};

	const handleStatusChange = (broker: IBroker) => {
		dispatch(updateBroker({ id: broker.id, broker: { ...broker, active: !broker.active } })).then(() => {
			openNotification("success", "Broker date updated successfully!");
		});
	};

	const BrokerTableColumn: TableProps<IBroker>["columns"] = [
		{
			title: "Name",
			dataIndex: "name",
			sorter: (a, b) => a.name.localeCompare(b.name),
		},
		{
			title: "Email ID",
			dataIndex: "email",
			sorter: (a, b) => a.email.localeCompare(b.email),
		},
		{
			title: "Phone No",
			dataIndex: "phone",
			sorter: (a, b) => a.phone.localeCompare(b.phone),
		},
		{
			title: "Address",
			dataIndex: "address",
			sorter: (a, b) => a.address.localeCompare(b.address),
		},
		{
			title: "Broker Rate",
			dataIndex: "brokerRate",
			sorter: (a, b) => a.brokerRate - b.brokerRate,
		},
		{
			title: "Status",
			dataIndex: "active",
			sorter: (a, b) => Number(a.active) - Number(b.active),
			render: (_, record) => {
				return (
					<div className="flex items-center justify-center">
						<Checkbox checked={record.active} onChange={() => handleStatusChange(record)} />
					</div>
				);
			},
			width: 122,
		},
		{
			title: "Action",
			render: (_, record) => {
				return (
					<div className="flex gap-4">
						<Button type="primary" size="small" className="!px-3.5" onClick={() => dispatch(setSelectedBroker(record))}>
							Edit
						</Button>
						<Button type="default" size="small" className="!px-3.5" onClick={() => showDeleteModal(record.id)}>
							Delete
						</Button>
					</div>
				);
			},
			width: 180,
		},
	];

	useEffect(() => {
		dispatch(fetchBrokers()).then(() => {
			openNotification("success", "Brokers Listed successfully!");
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);

	return (
		<div className="w-full h-full p-6">
			<Table
				columns={BrokerTableColumn}
				dataSource={brokers}
				rowKey="id"
				pagination={{
					total: brokers.length,
					showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
					showLessItems: true,
					responsive: true,
					showSizeChanger: true,
				}}
			/>

			<Modal title="Confirm Delete" open={isModalVisible} onOk={handleDelete} onCancel={() => setIsModalVisible(false)}>
				<p>Are you sure you want to delete this broker?</p>
			</Modal>
		</div>
	);
};

export default BrokerTable;
