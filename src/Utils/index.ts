export function generateId() {
	const timestamp = Math.floor(Date.now() / 1000).toString(16);
	const random = Array.from({ length: 16 }, () => Math.floor(Math.random() * 16).toString(16)).join("");

	return timestamp + random;
}

export const generateStockNumber = (): string => {
	const numberPart = Math.floor(1000000 + Math.random() * 9000000);

	const lettersPart = Array.from({ length: 3 }, () => String.fromCharCode(65 + Math.floor(Math.random() * 26))).join("");

	return `${numberPart}${lettersPart}`;
};
