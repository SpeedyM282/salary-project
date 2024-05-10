import { client, handleError } from "../config";
import { IPosition } from "@/app/types";

export const createPosition = (data: IPosition[]) =>
	client
		.post("/position/create", { positions: data })
		.catch((e) => handleError(e));

export const getPositions = () =>
	client.get("/position/get").catch((e) => handleError(e));

export const getPositionById = (id: string) =>
	client.get(`/position/get/${id}`).catch((e) => handleError(e));

export const updatePosition = (id: string, data: IPosition) =>
	client.put(`/position/put/${id}`, data).catch((e) => handleError(e));

export const deletePosition = (id: string) =>
	client.delete(`/position/delete/${id}`).catch((e) => handleError(e));
