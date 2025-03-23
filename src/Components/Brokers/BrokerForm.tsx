import { createValidationRulesForNumber, createValidationRulesForPhoneNumber, createValidationRulesForText } from "../../Utils/FormRules";
import { addBroker, setSelectedBroker, updateBroker } from "../../redux/slice/brokerSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { useNotificationContext } from "../../NotificationWrapper";
import { IBroker } from "../../Interfaces/App/brokers";
import { Button, Checkbox, Form, Input, InputNumber } from "antd";
import { useEffect, useState } from "react";
import NumberInput from "../NumberInput";
import { generateId } from "../../Utils";
import TextInput from "../TextInput";

const BrokerForm = () => {
	const [BrokerForm] = Form.useForm();
	const dispatch = useAppDispatch();
	const { selectedBroker } = useAppSelector((state) => state.broker);
	const [isEditing, setIsEditing] = useState(false);
	const { openNotification } = useNotificationContext();

	useEffect(() => {
		if (selectedBroker) {
			BrokerForm.setFieldsValue(selectedBroker);
			setIsEditing(true);
		} else {
			BrokerForm.resetFields();
			setIsEditing(false);
		}
	}, [selectedBroker, BrokerForm]);

	const handleFinish = (values: Omit<IBroker, "id">) => {
		if (isEditing) {
			dispatch(updateBroker({ id: selectedBroker?.id as string, broker: { ...values } })).then(() => {
				openNotification("success", "Broker updated successfully!");
			});
		} else {
			dispatch(addBroker({ id: generateId(), ...values })).then(() => {
				openNotification("success", "Broker added successfully!");
			});
		}
		BrokerForm.resetFields();
		setIsEditing(false);
	};

	const handleReset = () => {
		BrokerForm.resetFields();
		dispatch(setSelectedBroker(null));
		setIsEditing(false);
	};

	return (
		<div className="w-full bg-bgPrimary">
			<div className="p-6 pb-5.5">
				<h1 className="text-text text-base font-poppins font-semibold pb-3.5">Broker details</h1>
				<Form form={BrokerForm} onFinish={handleFinish} layout="vertical" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-6">
					<Form.Item label="Name" name="name" rules={createValidationRulesForText("Name")}>
						<TextInput placeholder="Enter Name" />
					</Form.Item>
					<Form.Item
						label="Email"
						name="email"
						rules={[
							{ required: true, message: "Email is a required field." },
							{ type: "email", message: "Please enter a valid email." },
						]}
					>
						<Input size="large" placeholder="Enter Email" />
					</Form.Item>
					<Form.Item
						label="Phone No"
						name="phone"
						rules={createValidationRulesForPhoneNumber("Phone", [
							{
								max: 10,
								message: "The input must be a 10 digit number characters long!",
							},
						])}
					>
						<NumberInput maxLength={10} size="large" placeholder="Enter Number" />
					</Form.Item>
					<Form.Item label="Address" name="address" rules={[{ required: true, message: "Address is a required field." }]}>
						<Input.TextArea size="large" rows={1} placeholder="Enter Address" />
					</Form.Item>
					<Form.Item
						label="Broker Rate"
						name="brokerRate"
						rules={createValidationRulesForNumber("Broker Rate", [
							{
								validator: (_, value) =>
									Number(value) > 100 ? Promise.reject(new Error("Broker Rate cannot be greater than 100!")) : Promise.resolve(),
							},
						])}
					>
						<InputNumber
							size="large"
							placeholder="Enter Number"
							formatter={(value) => (value ? `${Number(value)}%` : `${value}%`)}
							parser={(value) => (value ? value.replace(/[^0-9.]/g, "") : "")}
						/>
					</Form.Item>
					<Form.Item label="Status" name="active" valuePropName="checked" initialValue={true}>
						<Checkbox />
					</Form.Item>
					<div className="flex gap-2.5 col-span-2 justify-end items-center">
						<Button htmlType="submit" type="primary" size="large" className="!px-5">
							{isEditing ? "Update" : "Add"}
						</Button>
						<Button htmlType="button" type="default" size="large" className="!px-5" onClick={handleReset}>
							Reset
						</Button>
					</div>
				</Form>
			</div>
		</div>
	);
};

export default BrokerForm;
