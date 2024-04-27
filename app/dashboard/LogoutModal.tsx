import { Button, Modal, Stack, Typography } from "@mui/material";
import React from "react";

interface IProps {
	open: boolean;
	handleClose: () => void;
	handleLogout: () => void;
}

const LogoutModal = ({ open, handleClose, handleLogout }: IProps) => {
	return (
		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="modal-modal-title"
			aria-describedby="modal-modal-description"
		>
			<Stack
				direction="column"
				gap={5}
				sx={{
					position: "absolute",
					top: "50%",
					left: "50%",
					transform: "translate(-50%, -50%)",
					width: 450,
					bgcolor: "background.paper",
					borderRadius: 2,
					p: 4,
				}}
			>
				<Typography textAlign="center" variant="h5">
					Siz rostdan ham chiqmoqchimisiz?
				</Typography>

				<Stack direction="row" gap={3} justifyContent="center">
					<Button variant="contained" onClick={handleClose}>
						Bekor qilish
					</Button>
					<Button variant="contained" color="error" onClick={handleLogout}>
						Chiqish
					</Button>
				</Stack>
			</Stack>
		</Modal>
	);
};

export default LogoutModal;
