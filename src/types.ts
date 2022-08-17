export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
	k: infer I
) => void
	? I
	: never;

export interface RequestOptions extends Omit<RequestInit, "body"> {
	body?: Record<string, any> | BodyInit | null;
	cookies?: Record<string, string>;
	params?: Record<string | number, string | number | boolean | undefined | null>;
	response?: "arrayBuffer" | "blob" | "formData" | "json" | "text" | "none";
}
