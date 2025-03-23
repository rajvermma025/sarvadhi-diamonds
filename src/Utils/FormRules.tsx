import { Rule } from "antd/es/form";

export const createValidationRulesForNumber = (label: string, customValidator: Rule[] = []) => [
	{ required: true, message: `Please enter ${label}.` },
	// { whitespace: true, message: `${label} cannot be empty or only contain spaces.` },
	{
		validator: (_: unknown, value: string) => {
			if (!/^\d+(\.\d+)?$/.test(value) && value) {
				return Promise.reject(new Error(`${label} must be a valid number.`));
			}
			return Promise.resolve();
		},
	},
	...customValidator,
];

export const createValidationRulesForText = (label: string, customValidator: Rule[] = []) => [
	{ required: true, message: `${label} is a required field.` },
	{ whitespace: true, message: `${label} cannot be empty or only contain spaces.` },
	{ pattern: /^[^\d]*$/, message: `${label} cannot contain numbers.` },
	...customValidator,
];

export const createValidationRulesForInputField = (label: string, customValidator: Rule[] = []) => [
	{ required: true, message: `${label} is a required field.` },
	{ whitespace: true, message: `${label} cannot be empty or only contain spaces.` },
	...customValidator,
];

export const createValidationRulesForPhoneNumber = (label: string, customValidator: Rule[] = []) => [
	{ required: true, message: `${label} is a required field.` },
	{ whitespace: true, message: `${label} cannot be empty or only contain spaces.` },
	{
		validator: (_: unknown, value: string) => {
			if (!/^\d+$/.test(value) && value) {
				return Promise.reject(new Error(`${label} must be a valid number.`));
			}
			return Promise.resolve();
		},
	},
	...customValidator,
];
