export interface RequestOptions extends Omit<RequestInit, "body"> {
	body?: Record<string, any> | BodyInit | null;
	cookies?: Record<string, string>;
	params?: Record<string | number, string | number | boolean>;
	response?: "arrayBuffer" | "blob" | "formData" | "json" | "text" | "none";
}
