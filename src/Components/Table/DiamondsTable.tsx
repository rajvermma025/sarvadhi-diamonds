import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useNotificationContext } from "../../NotificationWrapper";
import { deleteDiamond, fetchDiamonds, setSelectedDiamond } from "../../redux/slice/diamondSlice";
import { Button, Modal, Table, TableProps } from "antd";
import { IDiamond } from "../../Interfaces/App/Diamonds";

interface DiamondsTableProps {
	showActions?: boolean;
}

const DiamondsTable: React.FC<DiamondsTableProps> = ({ showActions = true }) => {
	const dispatch = useAppDispatch();
	const { diamonds } = useAppSelector((state) => state.diamond);
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [selectedDiamondId, setSelectedDiamondId] = useState<string | null>(null);
	const { openNotification } = useNotificationContext();

	const showDeleteModal = (id: string) => {
		setSelectedDiamondId(id);
		setIsModalVisible(true);
	};

	const handleDelete = () => {
		if (selectedDiamondId) {
			dispatch(deleteDiamond(selectedDiamondId)).then(() => {
				openNotification("success", "Diamond deleted successfully!");
			});
		}
		setIsModalVisible(false);
	};

	const DiamondTableColumns: TableProps<IDiamond>["columns"] = [
		{
			title: "Stock No",
			dataIndex: "stockNo",
			sorter: (a, b) => a.stockNo.localeCompare(b.stockNo),
		},
		{
			title: "Carat",
			dataIndex: "carat",
			sorter: (a, b) => parseFloat(a.carat) - parseFloat(b.carat),
		},
		{
			title: "Shape",
			dataIndex: "shape",
			sorter: (a, b) => a.shape.localeCompare(b.shape),
		},
		{
			title: "Color",
			dataIndex: "color",
			sorter: (a, b) => a.color.localeCompare(b.color),
		},
		{
			title: "Clarity",
			dataIndex: "clarity",
			sorter: (a, b) => a.clarity.localeCompare(b.clarity),
		},
		{
			title: "RAP Price",
			dataIndex: "rapPrice",
			sorter: (a, b) => parseFloat(a.rapPrice) - parseFloat(b.rapPrice),
		},
		{
			title: "Disc%",
			dataIndex: "disc",
			sorter: (a, b) => parseFloat(a.disc) - parseFloat(b.disc),
		},
		{
			title: "PPC",
			dataIndex: "ppc",
			sorter: (a, b) => parseFloat(a.ppc) - parseFloat(b.ppc),
		},
		{
			title: "Total Amount",
			dataIndex: "totalAmount",
			sorter: (a, b) => a.totalAmount - b.totalAmount,
		},
	];

	if (showActions) {
		DiamondTableColumns.push({
			title: "Action",
			render: (_, record) => (
				<div className="flex gap-4">
					<Button type="primary" size="small" className="!px-3.5" onClick={() => dispatch(setSelectedDiamond(record))}>
						Edit
					</Button>
					<Button type="default" size="small" className="!px-3.5" onClick={() => showDeleteModal(record.id)}>
						Delete
					</Button>
				</div>
			),
			width: 180,
		});
	}

	useEffect(() => {
		dispatch(fetchDiamonds()).then(() => {
			openNotification("success", "Diamonds listed successfully!");
		});
	}, [dispatch]);

	return (
		<div className="w-full h-full p-6">
			<Table
				columns={DiamondTableColumns}
				dataSource={diamonds}
				rowKey="id"
				pagination={{
					total: diamonds.length,
					showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
					showLessItems: true,
					responsive: true,
					showSizeChanger: true,
				}}
				onRow={(record) => ({
					onClick: () => {
						dispatch(setSelectedDiamond(record));
					},
				})}
			/>

			<Modal title="Confirm Delete" open={isModalVisible} onOk={handleDelete} onCancel={() => setIsModalVisible(false)}>
				<p>Are you sure you want to delete this diamond?</p>
			</Modal>
		</div>
	);
};

export default DiamondsTable;
