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
	serialize: (object: Record<string, string | number | boolean>, separator: string = "; ") => {
		const scs: string[] = [];
		for (const name in object) scs.push(`${name}=${object[name]}`);
		return scs.join(separator);
	},
};

export const string = {
	base64: {
		decode: (base64: string) => Buffer.from(base64, "base64").toString(),
		encode: (string: string) => Buffer.from(string).toString("base64"),
	},
	classes: (...classes: Array<string | boolean | undefined>) => classes.filter(Boolean).join(" "),
	replacer: (string: string, data: Record<string | number, string | number | boolean>) =>
		string.replace(/\{(.*?)\}/g, ($1, $2) => ($2 in data ? data[$2].toString() : $1)),
};

export const array = {
	chunk: <T>(array: Array<T>, size: number) => {
		const result: Array<Array<T>> = [];
		for (let i = 0; i < array.length; i += size) {
			result.push(array.slice(i, i + size));
		}
		return result;
	},
};

export default { array, object, string };
