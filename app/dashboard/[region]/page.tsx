import React from "react";
import { Stack, Typography } from "@mui/material";

const Region = () => {
	return (
		<Stack
			p={10}
			gap={7}
			direction="row"
			flexWrap="wrap"
			justifyContent="center"
		>
			<Stack
				width={170}
				p={5}
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
				<Typography variant="h5" textAlign="center">
					Mayor
				</Typography>
			</Stack>
			<Stack
				p={5}
				width={170}
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
				<Typography variant="h5" textAlign="center">
					Serjant
				</Typography>
			</Stack>
			<Stack
				p={5}
				width={170}
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
				<Typography variant="h5" textAlign="center">
					Ofitser
				</Typography>
			</Stack>
		</Stack>
	);
};

export default Region;
