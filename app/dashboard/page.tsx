import React from "react";
import Link from "next/link";
import { regions } from "../utils";
import { Stack, Typography } from "@mui/material";

const Dashboard = () => {
	return (
		<Stack maxWidth={600} width="100%" m="0 auto" direction="column" gap={2}>
			{regions.map((e) => (
				<Link key={e} href={`/dashboard/${e}/Bo'limlar`}>
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
	);
};

export default Dashboard;
