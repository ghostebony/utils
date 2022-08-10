export const object = {
	filter: (object: Record<string | number, any>, ...filters: Array<any>) =>
		Object.keys(object).reduce((obj: Record<string | number, any>, key) => {
			if (!filters.includes(object[key])) {
				obj[key] = object[key];
			}
			return obj;
		}, {}),
};
