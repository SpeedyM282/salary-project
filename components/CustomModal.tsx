"use client";
import { PropsWithChildren, useEffect } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { IconButton, Modal, Stack, Typography } from "@mui/material";

export interface ICustomModalProps {
	open: boolean;
	width?: number;
	title?: string;
	padding?: number;
	reset?: () => void;
	onClose: () => void;
}

const modalStyles = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	bgcolor: "background.paper",
	boxShadow: 24,
	borderRadius: 2.5,
	border: "none",
	outline: "none",
};

const CustomModal = ({
	open,
	reset,
	title,
	onClose,
	children,
	padding = 3,
	width = 500,
}: PropsWithChildren<ICustomModalProps>) => {
	useEffect(() => {
		if (open && reset) reset();
	}, [open]);

	return (
		<Modal
			open={open}
			onClose={onClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Stack sx={{ ...modalStyles, width, padding }}>
				<Stack
					direction="row"
					justifyContent="space-between"
					borderBottom="1px solid #999999"
				>
					<Typography variant="h6">{title}</Typography>

					<IconButton onClick={onClose}>
						<CloseRoundedIcon />
					</IconButton>
				</Stack>

				{children}
			</Stack>
		</Modal>
	);
};

export default CustomModal;
