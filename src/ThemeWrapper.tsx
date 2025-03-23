/** @format */

import { IChildrenNode } from "./Interfaces/App";
import { ConfigProvider } from "antd";

const ThemeWrapper: React.FC<IChildrenNode> = ({ children }) => {
	return (
		<ConfigProvider
			theme={{
				token: {
					colorPrimary: "#2169B2",
					fontFamily: "poppins",
					borderRadius: 6,
					colorLink: "#2169B2",
				},
				components: {
					Input: {
						colorPrimary: "#2169B2",
						algorithm: true,
						controlPaddingHorizontal: 14,
						paddingContentHorizontalLG: 14,
						fontSize: 16,
						colorTextBase: "#0A1013",
						colorBgBase: "#FFFFFF",
						colorBorder: "#69677433",
						controlHeightSM: 34,
						controlHeightLG: 38,
						fontSizeLG: 16,
						fontSizeSM: 14,
						colorTextPlaceholder: "#98999A",
					},
					InputNumber: {
						colorPrimary: "#2169B2",
						algorithm: true,
						controlPaddingHorizontal: 14,
						paddingContentHorizontalLG: 14,
						fontSize: 16,
						colorTextBase: "#0A1013",
						colorBgBase: "#FFFFFF",
						colorBorder: "#69677433",
						controlHeightSM: 34,
						controlHeightLG: 38,
						fontSizeLG: 16,
						fontSizeSM: 14,
						colorTextPlaceholder: "#98999A",
					},
					Select: {
						colorPrimary: "#2169B2",
						algorithm: true,
						controlPaddingHorizontal: 14,
						paddingContentHorizontalLG: 14,
						fontSize: 16,
						colorTextBase: "#0A1013",
						colorBgBase: "#FFFFFF",
						colorBorder: "#69677433",
						controlHeightSM: 34,
						controlHeightLG: 38,
						fontSizeLG: 16,
						fontSizeSM: 14,
						colorTextPlaceholder: "#98999A",
					},
					DatePicker: {
						colorPrimary: "#2169B2",
						algorithm: true,
						controlPaddingHorizontal: 14,
						paddingContentHorizontalLG: 14,
						fontSize: 16,
						colorTextBase: "#0A1013",
						colorBgBase: "#FFFFFF",
						colorBorder: "#69677433",
						controlHeightSM: 34,
						controlHeightLG: 38,
						fontSizeLG: 16,
						fontSizeSM: 14,
						colorTextPlaceholder: "#98999A",
					},
					Button: {
						colorPrimary: "#2169B2",
						algorithm: true,
						fontSizeLG: 16,
						fontSizeSM: 14,
						paddingContentHorizontal: 14,
						paddingContentVertical: 10,
						controlHeightSM: 32,
						paddingContentHorizontalSM: 14,
						controlHeightLG: 38,
						defaultColor: "#2A67B2",
						defaultActiveBorderColor: "#2169B2",
						borderRadiusLG: 6,
						borderRadiusSM: 6,
					},
					Form: {
						labelFontSize: 14,
						labelColor: "#393c43",
						itemMarginBottom: 16,
					},
				},
			}}
		>
			{children}
		</ConfigProvider>
	);
};

export default ThemeWrapper;
