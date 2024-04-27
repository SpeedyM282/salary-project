"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { regions } from "../utils";
import LogoutModal from "./LogoutModal";
import { useRouter } from "next/navigation";
import LogoutIcon from "@mui/icons-material/Logout";
import { Button, Stack, Typography } from "@mui/material";

const Dashboard = () => {
	const router = useRouter();
	const [open, setOpen] = useState(false);

	useEffect(() => {
		const name = localStorage.getItem("name");

		if (name !== "Respublika") {
			router.push(`/dashboard/${name}`);
		}
	}, []);

	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const handleLogout = () => {
		localStorage.setItem("name", "");
		localStorage.setItem("token", "");
		router.push("/login");
	};

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
				<Button
					variant="contained"
					color="error"
					sx={{ width: "fit-content" }}
					onClick={handleOpen}
				>
					<LogoutIcon /> Chiqish
				</Button>

				<Stack width="100%" direction="column" gap={2}>
					{regions.map((e) => (
						<Link key={e} href={`/dashboard/${e}`}>
							<Stack
								p={3}
								borderRadius={3}
								sx={{
									transition: "0.3s",
									cursor: "pointer",
									"&:hover": {
										boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
									},
								}}
								border="1px solid rgba(0, 0, 0, 0.15)"
							>
								<Typography>{e} byudjeti</Typography>
							</Stack>
						</Link>
					))}
				</Stack>
			</Stack>
		</>
	);
};

export default Dashboard;
