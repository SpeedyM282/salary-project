"use client";
import LogoutModal from "./LogoutModal";
import { usePathname, useRouter } from "next/navigation";
import { Button, Stack } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import React, { useEffect, PropsWithChildren, useState } from "react";

const DashboardLayout = ({ children }: PropsWithChildren) => {
	const router = useRouter();
	const pathname = usePathname();
	const [open, setOpen] = useState(false);
	const name = localStorage.getItem("name");

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleLogout = () => {
		localStorage.setItem("name", "");
		localStorage.setItem("token", "");
		router.push("/login");
	};

	useEffect(() => {
		if (name !== "Respublika") {
			router.push(`/dashboard/${name}`);
		}
	}, []);

	return (
		<>
			<LogoutModal
				open={open}
				handleClose={handleClose}
				handleLogout={handleLogout}
			/>

			<Stack
				maxWidth={600}
				p={5}
				m="0 auto"
				direction="column"
				gap={5}
				alignItems="flex-end"
			>
				{name === "Respublika" && pathname !== "/dashboard" ? (
					<></>
				) : (
					<Button
						variant="contained"
						color="error"
						sx={{ width: "fit-content" }}
						onClick={handleOpen}
					>
						<LogoutIcon /> Chiqish
					</Button>
				)}
				{children}
			</Stack>
		</>
	);
};

export default DashboardLayout;
