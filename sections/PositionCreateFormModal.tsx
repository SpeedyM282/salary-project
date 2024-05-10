import React from "react";
import * as yup from "yup";
import { IPosition } from "@/app/types";
import { Button, Stack, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import CustomModal, { ICustomModalProps } from "@/components/CustomModal";
import { createPosition } from "@/services/sections/position";

interface IProps extends ICustomModalProps {
	addTableData: (data: IPosition) => void;
}

const PositionCreateFormModal = ({ open, onClose, addTableData }: IProps) => {
	const positionSchema = yup.object().shape({
		name: yup.string().required("Lavozim nomi shart"),
		percent: yup.number().required("Foiz shart"),
	});

	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IPosition>({
		resolver: yupResolver(positionSchema),
	});

	const handleClose = () => {
		reset({});
		onClose();
	};

	const onSubmit: SubmitHandler<IPosition> = (data) => {
		createPosition([data]).then((res) => {
			if (res) {
				addTableData(res.data?.data[0]);
				handleClose();
			}
		});
	};

	return (
		<CustomModal
			open={open}
			onClose={handleClose}
			title="Lavozim"
			reset={reset}
		>
			<Stack
				component="form"
				onSubmit={handleSubmit(onSubmit)}
				direction="column"
				gap={3}
			>
				<TextField
					label="Lavozim nomi"
					{...register("name")}
					error={!!errors.name}
					helperText={errors.name?.message}
				/>
				<TextField
					label="Foiz"
					{...register("percent")}
					error={!!errors.percent}
					helperText={errors.percent?.message}
				/>

				<Stack direction="row" gap={3}>
					<Button fullWidth variant="outlined" onClick={handleClose}>
						Bekor qilish
					</Button>
					<Button fullWidth variant="contained" type="submit">
						Saqlash
					</Button>
				</Stack>
			</Stack>
		</CustomModal>
	);
};

export default PositionCreateFormModal;
