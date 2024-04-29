"use client";
import React from "react";
import { Stack, Typography } from "@mui/material";

const Region = () => {
	const name = sessionStorage.getItem("name");

	return (
		<Stack
			maxWidth={600}
			width="100%"
			gap={2}
			direction="column"
			alignItems="center"
		>
			<Stack
				p={3}
				width="100%"
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
				<Typography variant="h6" textAlign="center">
					Mayor
				</Typography>
			</Stack>

			<Stack
				p={3}
				width="100%"
				borderRadius={3}
				border="1px solid rgba(0, 0, 0, 0.15)"
				sx={{
					transition: "0.3s",
					cursor: "pointer",
					"&:hover": {
						boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
					},
				}}
			>
				<Typography variant="h6" textAlign="center">
					Serjant
				</Typography>
			</Stack>
			<Stack
				p={3}
				width="100%"
				borderRadius={3}
				border="1px solid rgba(0, 0, 0, 0.15)"
				sx={{
					transition: "0.3s",
					cursor: "pointer",
					"&:hover": {
						boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
					},
				}}
			>
				<Typography variant="h6" textAlign="center">
					Ofitser
				</Typography>
			</Stack>
		</Stack>
	);
};

export default Region;
