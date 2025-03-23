/** @format */

import { Input, InputProps } from "antd";
import React from "react";

interface ICustomInput extends InputProps {
	placeholder: string;
}

const TextInput: React.FC<ICustomInput> = ({ placeholder, size = "small", ...props }) => {
	return (
		<Input
			size={size}
			placeholder={placeholder}
			onKeyDown={(event) => {
				if (!isNaN(Number(event.key)) && event.key !== " ") {
					event.preventDefault();
				}
			}}
			{...props}
		/>
	);
};

export default TextInput;
