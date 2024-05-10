"use client";
import { UseFormReset } from "react-hook-form";
import { PropsWithChildren, useEffect } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { IconButton, Modal, Stack, Typography } from "@mui/material";

export interface ICustomModalProps {
	open: boolean;
	title?: string;
	onClose: () => void;
	reset?: UseFormReset<any>;
}

const modalStyles = {
	position: "absolute" as "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 500,
	bgcolor: "background.paper",
	boxShadow: 24,
	borderRadius: 2.5,
	border: "none",
	outline: "none",
	p: 3,
};

const CustomModal = ({
	open,
	reset,
	title,
	onClose,
	children,
}: PropsWithChildren<ICustomModalProps>) => {
	useEffect(() => {
		if (open && reset) reset({});
	}, [open]);

	return (
		<Modal
			open={open}
			onClose={onClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Stack sx={modalStyles}>
				<Stack direction="row" justifyContent="space-between" mb={2}>
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
