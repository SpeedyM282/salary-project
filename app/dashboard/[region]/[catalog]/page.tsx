"use client";
import React, { PropsWithChildren, useEffect, useState } from "react";
import Link from "next/link";
import { REGION_CATALOG } from "./utils";
import { useParams } from "next/navigation";
import CustomTable from "@/components/CustomTable";
import { Button, Stack, Typography } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import RankCreateFormModal from "@/sections/RankCreateFormModal";
import RegionCreateFormModal from "@/sections/RegionCreateFormModal";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import PositionCreateFormModal from "@/sections/PositionCreateFormModal";
import EmployeeCreateFormModal from "@/sections/EmployeeCreateFormModal";
import {
	rankColumns,
	regionColumns,
	employeeColumns,
	positionColumns,
} from "./utils";
import { getRanks } from "@/services/sections/rank";
import { getPositions } from "@/services/sections/position";
import { getEmployees } from "@/services/sections/employee";
import { getRegions } from "@/services/sections/region";
import { IEmployee, IRank } from "@/app/types";

const RegionLayout = () => {
	const { region, catalog } = useParams();
	const [open, setOpen] = useState(false);
	const [tableData, setTableData] = useState<any>(null);
	const name: string = sessionStorage.getItem("name") || "";

	const onClose = () => setOpen(false);

	const addTableData = (data: any[]) => {
		setTableData((prev: any[]) => [...prev, ...data]);
	};

	useEffect(() => {
		switch (catalog) {
			case "Unvon": {
				getRanks().then((res: any) => {
					if (res) {
						setTableData(res.data?.data);
					}
				});
				break;
			}
			case "Lavozim": {
				getPositions().then((res: any) => {
					if (res) {
						setTableData(res.data?.data);
					}
				});
				break;
			}
			case "Ishchi": {
				getEmployees().then((res: any) => {
					if (res) {
						setTableData(res.data?.data);
					}
				});
				break;
			}
			case "Tuman": {
				getRegions().then((res: any) => {
					if (res) {
						setTableData(res.data?.data);
					}
				});
				break;
			}
		}
	}, []);

	return (
		<>
			{catalog === "Unvon" ? (
				<RankCreateFormModal
					open={open}
					onClose={onClose}
					addTableData={addTableData}
				/>
			) : catalog === "Tuman" ? (
				<RegionCreateFormModal
					open={open}
					onClose={onClose}
					addTableData={addTableData}
				/>
			) : catalog === "Lavozim" ? (
				<PositionCreateFormModal
					open={open}
					onClose={onClose}
					addTableData={addTableData}
				/>
			) : catalog === "Ishchi" ? (
				<EmployeeCreateFormModal
					open={open}
					onClose={onClose}
					addTableData={addTableData}
				/>
			) : (
				<></>
			)}

			<Stack maxWidth={1024} width="100%" m="0 auto" direction="column" gap={5}>
				<Stack
					gap={3}
					direction="row"
					alignItems="center"
					justifyContent="space-between"
				>
					{name === "Respublika" && (
						<Link
							href="/dashboard"
							style={{ marginRight: 50, display: "flex", gap: 5 }}
						>
							<ArrowBackRoundedIcon />
							<Typography>Orqaga</Typography>
						</Link>
					)}

					<Stack direction="row" gap={3} alignItems="center">
						{REGION_CATALOG.map((e) => (
							<Link key={e} href={`/dashboard/${region}/${e}`}>
								<Typography
									p={1}
									fontSize={18}
									fontWeight={500}
									sx={{
										cursor: "pointer",
										transition: "0.3s",
										borderBottom: "1px solid transparent",
										color: catalog === e ? "#115293" : "#000",
										borderColor: catalog === e ? "#115293" : "transparent",
										"&:hover": {
											color: "#115293",
											borderColor: "#115293",
										},
									}}
								>
									{e}
								</Typography>
							</Link>
						))}
					</Stack>

					<Button
						variant="contained"
						sx={{
							padding: "6px 16px 6px 10px",
							display: "flex",
							gap: 0.5,
						}}
						onClick={() => setOpen(true)}
					>
						<AddRoundedIcon sx={{ m: 0, p: 0 }} />
						<Typography fontWeight={500}>{catalog}</Typography>
					</Button>
				</Stack>

				{tableData && catalog !== "Bo'limlar" ? (
					<CustomTable
						columns={
							catalog === "Unvon"
								? rankColumns
								: catalog === "Ishchi"
								? employeeColumns
								: catalog === "Lavozim"
								? positionColumns
								: regionColumns
						}
						rows={tableData}
					/>
				) : (
					<Typography my={5} textAlign="center" variant="h5">
						Hozircha malumotlar yo'q
					</Typography>
				)}
			</Stack>
		</>
	);
};

export default RegionLayout;
