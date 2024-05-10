import { client, handleError } from "../config";
import { IRank } from "@/app/types";

export const createRank = (data: IRank[]) =>
	client.post("/rank/create", { ranks: data }).catch((e) => handleError(e));

export const getRanks = () =>
	client.get("/rank/get/").catch((e) => handleError(e));

export const getRankById = (id: string) =>
	client.get(`/rank/get/${id}`).catch((e) => handleError(e));

export const updateRank = (id: string, data: IRank) =>
	client.put(`/rank/put/${id}`, data).catch((e) => handleError(e));

export const deleteRank = (id: string) =>
	client.delete(`/rank/delete/${id}`).catch((e) => handleError(e));
