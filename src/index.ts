export const object = {
	filter: (object: Record<string | number, any>, ...filters: Array<any>) =>
		Object.keys(object).reduce((obj: Record<string | number, any>, key) => {
			if (!filters.includes(object[key])) {
				obj[key] = object[key];
			}
			return obj;
		}, {}),
	isEmpty: (object: Record<string | number, any>) =>
		Object.keys(object).length === 0 && object.constructor === Object,
};

export const string = {
	base64: {
		decode: (base64: string) => Buffer.from(base64, "base64").toString(),
		encode: (string: string) => Buffer.from(string).toString("base64"),
	},
};
