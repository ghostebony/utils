export interface RequestOptions extends RequestInit {
	cookies?: Record<string, string>;
	params?: Record<string | number, string | number | boolean>;
	response?: "arrayBuffer" | "blob" | "formData" | "json" | "text" | "none";
}
