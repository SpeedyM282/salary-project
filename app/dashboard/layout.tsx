"use client";
import LogoutModal from "./LogoutModal";
import { useParams, usePathname, useRouter } from "next/navigation";
import { Button, Divider, Stack, Typography } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import React, { useEffect, PropsWithChildren, useState } from "react";

const DashboardLayout = ({ children }: PropsWithChildren) => {
	const { region } = useParams();
	const router = useRouter();
	const pathname = usePathname();
	const [open, setOpen] = useState(false);
	const name = sessionStorage.getItem("name");

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleLogout = () => {
		sessionStorage.setItem("name", "");
		sessionStorage.setItem("token", "");
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

			<Stack p={5} m="0 auto" direction="column" gap={5}>
				<Stack
					pb={3}
					width="100%"
					direction="row"
					alignItems="center"
					justifyContent="space-between"
					borderBottom="1px solid #999999"
				>
					<Typography variant="h4">{region || name}</Typography>

					{name !== "Respublika" ||
						(pathname === "/dashboard" && (
							<Button
								variant="contained"
								color="error"
								sx={{ width: "fit-content" }}
								onClick={handleOpen}
							>
								<LogoutIcon /> Chiqish
							</Button>
						))}
				</Stack>

				{children}
			</Stack>
		</>
	);
};

export default DashboardLayout;
