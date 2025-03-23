import { notification } from "antd";

interface NotificationProps {
	message: string;
	type?: "success" | "info" | "warning" | "error";
	placement?: "topLeft" | "topRight" | "bottomLeft" | "bottomRight";
	duration?: number;
	description?: string;
}

const ShowNotification = ({ message, type = "info", placement = "topRight", duration = 3, description = "" }: NotificationProps) => {
	notification[type]({ message, placement, duration, description });
};

export default ShowNotification;
