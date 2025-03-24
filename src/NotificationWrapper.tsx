import React, { createContext, useContext } from "react";
import { notification } from "antd";
import { IChildrenNode } from "./Interfaces/App";

type NotificationType = "success" | "info" | "warning" | "error";

interface NotificationContextType {
	openNotification: (type: NotificationType, message: string) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotificationContext = () => {
	const context = useContext(NotificationContext);
	if (!context) {
		throw new Error("useNotificationContext must be used within a NotificationProvider");
	}
	return context;
};

const NotificationProvider: React.FC<IChildrenNode> = ({ children }) => {
	const [api, contextHolder] = notification.useNotification();

	const openNotification = (type: NotificationType, message: string) => {
		api[type]({
			message: message,
			duration: 2,
		});
	};

	return (
		<NotificationContext.Provider value={{ openNotification }}>
			{contextHolder}
			{children}
		</NotificationContext.Provider>
	);
};

export default NotificationProvider;
