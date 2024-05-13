"use client";
import React, { useState } from "react";
import CustomMenu from "@/components/CustomMenu";
import TablePaginationActions from "@mui/material/TablePagination/TablePaginationActions";
import {
	Paper,
	Table,
	TableRow,
	TableBody,
	TableCell,
	TableHead,
	TableFooter,
	TableContainer,
	TablePagination,
} from "@mui/material";
import { formatDate } from "@/app/utils";

interface IProps {
	rows: any;
	columns: string[];
}

const CustomTable = ({ rows, columns }: IProps) => {
	const [page, setPage] = useState(0);
	const handleOpen = () => setOpen(true);
	const [open, setOpen] = useState(false);
	const handleClose = () => setOpen(false);

	const handleChangePage = (
		_: React.MouseEvent<HTMLButtonElement> | null,
		newPage: number
	) => {
		setPage(newPage);
	};

	return (
		<TableContainer component={Paper}>
			<Table sx={{ minWidth: 650 }} aria-label="simple table">
				{/* -------------------------------------- TABLE HEAD -------------------------------------- */}

				<TableHead>
					<TableRow
						sx={{
							bgcolor: "#d3d3d3",
						}}
					>
						<TableCell>№</TableCell>
						{columns.map((e) => (
							<TableCell key={e}>{e}</TableCell>
						))}
						<TableCell></TableCell>
					</TableRow>
				</TableHead>

				{/* -------------------------------------- TABLE BODY -------------------------------------- */}

				<TableBody>
					{rows.map((e: any, i: number) => (
						<TableRow
							key={e._id}
							sx={{
								"&:last-child td, &:last-child th": { border: 0 },
							}}
						>
							<TableCell component="th" scope="row">
								1
							</TableCell>
							<TableCell>{e.name}</TableCell>
							<TableCell>{e.summa || e.percent || e.type}</TableCell>
							{e.salary && <TableCell>{e.salary}</TableCell>}
							<TableCell>{formatDate(e.createdAt)}</TableCell>
							<TableCell>{formatDate(e.updatedAt)}</TableCell>
							<TableCell
								align="right"
								sx={{
									maxWidth: 15,
								}}
							>
								<CustomMenu onEditClick={() => {}} onDeleteClick={() => {}} />
							</TableCell>
						</TableRow>
					))}
				</TableBody>

				{/* -------------------------------------- TABLE FOOTER -------------------------------------- */}

				{rows && (
					<TableFooter
						sx={{
							width: "100%",
							height: "56px",
							position: "relative",
						}}
					>
						<TableRow
							sx={{
								position: "absolute",
								right: 10,
							}}
						>
							<TablePagination
								page={page}
								count={10}
								rowsPerPageOptions={[5]}
								rowsPerPage={5}
								onPageChange={handleChangePage}
								ActionsComponent={TablePaginationActions}
								sx={{
									border: "none",
								}}
							/>
						</TableRow>
					</TableFooter>
				)}
			</Table>
		</TableContainer>
	);
};

export default CustomTable;
