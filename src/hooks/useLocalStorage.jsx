import { useState } from "react";

const useLocalStorage = (key, val) => {
	const [storedValue, setStoredValue] = useState(() => {
		try {
			const value = window.localStorage.getItem(key);
			return value ? JSON.parse(value) : val;
		} catch (error) {
			console.log(error);
			return val;
		}
	});

	const setValue = (value) => {
		try {
			const valueToStore =
				value instanceof Function ? value(storedValue) : value;
			setStoredValue(valueToStore);
			window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			console.log(error);
		}
	};
	return [storedValue, setValue]
};

export default useLocalStorage;
