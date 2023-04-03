import { api } from "./axios";

export const apiFetcher = (key: string) => api.get(key).then((res) => res.data);
