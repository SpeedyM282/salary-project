"use client";
import { redirect } from "next/navigation";

const RegionPage = () => {
	const name: string = sessionStorage.getItem("name") || "";

	if (name === "Respublika") {
		redirect("/dashboard");
	} else {
		redirect(`/dashboard/${name}/Bo'limlar`);
	}
};

export default RegionPage;
