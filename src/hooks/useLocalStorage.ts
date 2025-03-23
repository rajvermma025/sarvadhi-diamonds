const useLocalStorage = () => {
	const getLocalStorageValue = (key: string) => {
		const storedValue = localStorage.getItem(key);
		return storedValue ?? "";
	};

	const setLocalStorageValue = (key: string, value: string) => {
		localStorage.setItem(key, value);
	};

	const removeLocalStorageValue = (key: string) => {
		localStorage.removeItem(key);
	};

	const clearLocalStorage = () => {
		localStorage.clear();
	};

	return { getLocalStorageValue, setLocalStorageValue, removeLocalStorageValue, clearLocalStorage };
};

export default useLocalStorage;
