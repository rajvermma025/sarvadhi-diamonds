/** @format */

import { Input, InputProps } from "antd";

interface ICustomInput extends InputProps {
	placeholder: string;
}
const NumberInput: React.FC<ICustomInput> = ({ placeholder, size = "small", ...props }) => {
	return (
		<Input
			size={size}
			placeholder={placeholder}
			onKeyDown={(event) => {
				if (/^[A-Z]$/i.test(event.key) && !event.ctrlKey && !event.metaKey) {
					event.preventDefault();
				}
			}}
			{...props}
		/>
	);
};

export default NumberInput;
