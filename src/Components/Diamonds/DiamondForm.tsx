import { createValidationRulesForInputField, createValidationRulesForNumber, createValidationRulesForText } from "../../Utils/FormRules";
import { addDiamonds, setSelectedDiamond, updateDiamond } from "../../redux/slice/diamondSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useNotificationContext } from "../../NotificationWrapper";
import { generateId, generateStockNumber } from "../../Utils";
import { IDiamond } from "../../Interfaces/App/Diamonds";
import { Button, Form, Input, InputNumber } from "antd";
import { useEffect, useState } from "react";
import TextInput from "../TextInput";

const DiamondForm = () => {
	const [DiamondForm] = Form.useForm();
	const dispatch = useAppDispatch();
	const [isEditing, setIsEditing] = useState(false);
	const { selectedDiamond } = useAppSelector((state) => state.diamond);
	const { openNotification } = useNotificationContext();

	useEffect(() => {
		if (selectedDiamond) {
			DiamondForm.setFieldsValue(selectedDiamond);
			setIsEditing(true);
		} else {
			DiamondForm.resetFields();
			setIsEditing(false);
		}
	}, [selectedDiamond, DiamondForm]);

	const handleFinish = (values: Omit<IDiamond, "id">) => {
		if (isEditing) {
			dispatch(updateDiamond({ id: selectedDiamond?.id as string, diamond: { ...values } })).then(() => {
				openNotification("success", "Broker updated successfully!");
			});
		} else {
			dispatch(addDiamonds({ id: generateId(), ...values })).then(() => {
				openNotification("success", "Broker updated successfully!");
			});
		}
		DiamondForm.resetFields();
		setIsEditing(false);
	};

	const handleReset = () => {
		DiamondForm.resetFields();
		setIsEditing(false);
		dispatch(setSelectedDiamond(null));
	};

	const handleValuesChange = (_: unknown, values: IDiamond) => {
		const { rapPrice, disc, carat } = values;

		const rap = Number(rapPrice) || 0;
		const discount = 100 - Math.abs(Number(disc) || 0);
		const caratWeight = Number(carat) || 0;

		const ppc = rap + (rap * discount) / 100;

		const totalAmount = ppc * caratWeight;

		DiamondForm.setFieldsValue({
			ppc: ppc,
			totalAmount: totalAmount,
		});
	};

	return (
		<div className="w-full bg-bgPrimary p-6 pb-5.5">
			<h1 className="text-text text-base font-poppins font-semibold pb-3.5">Diamond details</h1>
			<Form
				form={DiamondForm}
				onFinish={handleFinish}
				onValuesChange={handleValuesChange}
				initialValues={{ stockNo: generateStockNumber() }}
				layout="vertical"
				className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-x-6"
			>
				<Form.Item label="Stock No" name="stockNo">
					<TextInput disabled placeholder="Stock No" />
				</Form.Item>
				<Form.Item label="Carat" name="carat" rules={createValidationRulesForNumber("Carat")}>
					<InputNumber size="large" placeholder="Enter Carat" />
				</Form.Item>
				<Form.Item label="Shape" name="shape" rules={createValidationRulesForText("Shape")}>
					<TextInput placeholder="Enter shape" />
				</Form.Item>
				<Form.Item label="Color" name="color" rules={createValidationRulesForText("Color")}>
					<TextInput placeholder="Enter Color" />
				</Form.Item>
				<Form.Item label="Clarity" name="clarity" rules={createValidationRulesForInputField("Clarity")}>
					<Input placeholder="Enter Clarity" />
				</Form.Item>
				<Form.Item label="RAP Price" name="rapPrice" rules={createValidationRulesForNumber("RAP Price")}>
					<InputNumber
						size="large"
						placeholder="Enter RAP Price"
						formatter={(value) => (value ? `$${Number(value)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "")}
						parser={(value) => (value ? value.replace(/[^0-9.]/g, "") : "")}
					/>
				</Form.Item>
				<Form.Item
					label="Disc %"
					name="disc"
					rules={createValidationRulesForNumber("Disc", [
						{
							validator: (_, value) => (Number(value) > 100 ? Promise.reject(new Error("Disc cannot be greater than 100!")) : Promise.resolve()),
						},
					])}
				>
					<InputNumber
						size="large"
						placeholder="Enter Disc %"
						formatter={(value) => (value ? `-${Number(value)}%` : "")}
						parser={(value) => (value ? value.replace(/[^0-9.]/g, "") : "")}
					/>
				</Form.Item>
				<Form.Item label="PPC" name="ppc" rules={createValidationRulesForNumber("PPC")}>
					<InputNumber
						readOnly
						size="large"
						placeholder="Enter PPC"
						formatter={(value) => (value ? `$${Number(value)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "")}
						parser={(value) => (value ? value.replace(/[^0-9.]/g, "") : "")}
					/>
				</Form.Item>
				<Form.Item label="Total Amount" name="totalAmount" rules={createValidationRulesForNumber("Total Amount")}>
					<InputNumber
						readOnly
						size="large"
						placeholder="Enter Total Amount"
						formatter={(value) => (value ? `$${Number(value)}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "")}
						parser={(value) => (value ? value.replace(/[^0-9.]/g, "") : "")}
					/>
				</Form.Item>
				<div className="flex gap-2.5 justify-end items-center">
					<Button htmlType="submit" type="primary" size="large" className="!px-5">
						{isEditing ? "Update" : "Add"}
					</Button>
					<Button htmlType="button" type="default" size="large" className="!px-5" onClick={handleReset}>
						Reset
					</Button>
				</div>
			</Form>
		</div>
	);
};

export default DiamondForm;
