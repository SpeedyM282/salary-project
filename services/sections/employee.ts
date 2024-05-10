import { client, handleError } from "../config";
import { IEmployee } from "@/app/types";

export const createEmployee = (data: IEmployee[]) =>
	client.post("/worker/create", { workers: data }).catch((e) => handleError(e));

export const getEmployees = () =>
	client.get("/worker/get/").catch((e) => handleError(e));

export const getEmployeeById = (id: string) =>
	client.get(`/worker/get/${id}`).catch((e) => handleError(e));

export const updateEmployee = (id: string, data: IEmployee) =>
	client.put(`/worker/put/${id}`, data).catch((e) => handleError(e));

export const deleteEmployee = (id: string) =>
	client.delete(`/worker/delete/${id}`).catch((e) => handleError(e));
