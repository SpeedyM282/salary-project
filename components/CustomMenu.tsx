"use client";
import { useState } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { IconButton, Menu, MenuItem } from "@mui/material";
import EditRoundedIcon from "@mui/icons-material/EditRounded";
import MoreVertRoundedIcon from "@mui/icons-material/MoreVertRounded";

interface IProps {
	onEditClick: () => void;
	onDeleteClick: () => void;
}

const CustomMenu = ({ onDeleteClick, onEditClick }: IProps) => {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const open = Boolean(anchorEl);
	const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

	return (
		<>
			<IconButton onClick={handleClick}>
				<MoreVertRoundedIcon />
			</IconButton>

			<Menu
				id="basic-menu"
				anchorEl={anchorEl}
				open={open}
				onClose={handleClose}
				MenuListProps={{
					"aria-labelledby": "basic-button",
				}}
			>
				<MenuItem
					sx={{
						display: "flex",
						gap: 1,
						color: "#2196f3",
					}}
					onClick={() => {
						onEditClick();
						handleClose();
					}}
				>
					<EditRoundedIcon color="primary" /> O'zgartirish
				</MenuItem>

				<MenuItem
					sx={{
						display: "flex",
						gap: 1,
						color: "#ba000d",
					}}
					onClick={() => {
						onDeleteClick();
						handleClose();
					}}
				>
					<DeleteIcon color="error" /> O'chirish
				</MenuItem>
			</Menu>
		</>
	);
};

export default CustomMenu;
