import type * as Types from "./types";

export enum statusCode {
	CONTINUE = 100,
	SWITCHING_PROTOCOLS = 101,
	PROCESSING = 102,
	EARLY_HINTS = 103,
	OK = 200,
	CREATED = 201,
	ACCEPTED = 202,
	NON_AUTHORITATIVE_INFORMATION = 203,
	NO_CONTENT = 204,
	RESET_CONTENT = 205,
	PARTIAL_CONTENT = 206,
	MULTI_STATUS = 207,
	ALREADY_REPORTED = 208,
	IM_USED = 226,
	MULTIPLE_CHOICES = 300,
	MOVED_PERMANENTLY = 301,
	FOUND = 302,
	SEE_OTHER = 303,
	NOT_MODIFIED = 304,
	USE_PROXY = 305,
	UNUSED = 306,
	TEMPORARY_REDIRECT = 307,
	PERMANENT_REDIRECT = 308,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	PAYMENT_REQUIRED = 402,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	METHOD_NOT_ALLOWED = 405,
	NOT_ACCEPTABLE = 406,
	PROXY_AUTHENTICATION_REQUIRED = 407,
	REQUEST_TIMEOUT = 408,
	CONFLICT = 409,
	GONE = 410,
	LENGTH_REQUIRED = 411,
	PRECONDITION_FAILED = 412,
	PAYLOAD_TOO_LARGE = 413,
	URI_TOO_LONG = 414,
	UNSUPPORTED_MEDIA_TYPE = 415,
	RANGE_NOT_SATISFIABLE = 416,
	EXPECTATION_FAILED = 417,
	IM_A_TEAPOT = 418,
	MISDIRECTED_REQUEST = 421,
	UNPROCESSABLE_ENTITY = 422,
	LOCKED = 423,
	FAILED_DEPENDENCY = 424,
	TOO_EARLY = 425,
	UPGRADE_REQUIRED = 426,
	PRECONDITION_REQUIRED = 428,
	TOO_MANY_REQUESTS = 429,
	REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
	UNAVAILABLE_FOR_LEGAL_REASONS = 451,
	INTERNAL_SERVER_ERROR = 500,
	NOT_IMPLEMENTED = 501,
	BAD_GATEWAY = 502,
	SERVICE_UNAVAILABLE = 503,
	GATEWAY_TIMEOUT = 504,
	HTTP_VERSION_NOT_SUPPORTED = 505,
	VARIANT_ALSO_NEGOTIATES = 506,
	INSUFFICIENT_STORAGE = 507,
	LOOP_DETECTED = 508,
	NOT_EXTENDED = 510,
	NETWORK_AUTHENTICATION_REQUIRED = 511,
}

const http_main = async <Data, Error = unknown>(
	endpoint: string,
	options: Types.RequestOptions
) => {
	if (!options.method) options.method = "GET";

	if (!options.response) options.response = "json";

	if (options.params) {
		const params = new URLSearchParams(object.filter(options.params, undefined)).toString();

		if (!!params) {
			endpoint = `${endpoint}?${params}`;
		}
	}

	if (options.cookies)
		options.headers = { ...options.headers, cookie: object.serialize(options.cookies) };

	const response = await fetch(endpoint, {
		method: options.method,
		headers: {
			accept: "application/json",
			...options.headers,
		},
		body: typeof options.body === "object" ? JSON.stringify(options.body) : options.body,
	});

	const responseBody =
		options.response !== "none" ? await response[options.response]() : response.body;

	let data: Data | undefined;
	let error: Error | undefined;

	if (response.ok) {
		data = responseBody;
	} else {
		error = responseBody;
	}

	return {
		data,
		error,
		ok: response.ok,
		status: response.status,
		headers: response.headers,
	};
};

const http_delete = <Data, Error = unknown>(endpoint: string, options?: Types.RequestOptions) =>
	http_main<Data, Error>(endpoint, { method: "DELETE", ...options });

const http_head = <Data, Error = unknown>(endpoint: string, options?: Types.RequestOptions) =>
	http_main<Data, Error>(endpoint, { method: "HEAD", ...options });

const http_get = <Data, Error = unknown>(endpoint: string, options?: Types.RequestOptions) =>
	http_main<Data, Error>(endpoint, { method: "GET", ...options });

const http_patch = <Data, Error = unknown>(endpoint: string, options?: Types.RequestOptions) =>
	http_main<Data, Error>(endpoint, { method: "PATCH", ...options });

const http_post = <Data, Error = unknown>(endpoint: string, options?: Types.RequestOptions) =>
	http_main<Data, Error>(endpoint, { method: "POST", ...options });

const http_put = <Data, Error = unknown>(endpoint: string, options?: Types.RequestOptions) =>
	http_main<Data, Error>(endpoint, { method: "PUT", ...options });

export const http = {
	statusCode,
	custom: http_main,
	CUSTOM: http_main,
	delete: http_delete,
	DELETE: http_delete,
	head: http_head,
	HEAD: http_head,
	get: http_get,
	GET: http_get,
	patch: http_patch,
	PATCH: http_patch,
	post: http_post,
	POST: http_post,
	put: http_put,
	PUT: http_put,
};

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
	serialize: (object: Record<string, string>, separator: string = "; ") => {
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

export default { http, object, string };
