import { client, handleError } from "../config";
import { IRegion } from "@/app/types";

export const createRegion = (data: IRegion[]) =>
	client.post("/region/create", { regions: data }).catch((e) => handleError(e));

export const getRegions = () =>
	client.get("/region/get").catch((e) => handleError(e));

export const getRegionById = (id: string) =>
	client.get(`/region/get/${id}`).catch((e) => handleError(e));

export const updateRegion = (id: string, data: IRegion) =>
	client.put(`/region/put/${id}`, data).catch((e) => handleError(e));

export const deleteRegion = (id: string) =>
	client.delete(`/region/delete/${id}`).catch((e) => handleError(e));
