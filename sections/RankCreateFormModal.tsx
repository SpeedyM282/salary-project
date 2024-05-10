import * as yup from "yup";
import { IRank } from "@/app/types";
import React, { useEffect } from "react";
import { Button, Stack, TextField } from "@mui/material";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import CustomModal, { ICustomModalProps } from "@/components/CustomModal";
import { createRank } from "@/services/sections/rank";

interface IProps extends ICustomModalProps {
	addTableData: (data: IRank) => void;
}

const RankCreateFormModal = ({ open, onClose, addTableData }: IProps) => {
	const rankSchema = yup.object().shape({
		name: yup.string().required("Unvon nomi shart"),
		summa: yup.number().required("Summa shart"),
	});

	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IRank>({
		resolver: yupResolver(rankSchema),
	});

	const handleClose = () => {
		reset({});
		onClose();
	};

	const onSubmit: SubmitHandler<IRank> = (data) => {
		createRank([data]).then((res) => {
			if (res) {
				addTableData(res.data?.data[0]);
				handleClose();
			}
		});
	};

	return (
		<CustomModal open={open} onClose={handleClose} title="Unvon" reset={reset}>
			<Stack
				component="form"
				onSubmit={handleSubmit(onSubmit)}
				direction="column"
				gap={3}
			>
				<TextField
					label="Unvon nomi"
					{...register("name")}
					error={!!errors.name}
					helperText={errors.name?.message}
				/>
				<TextField
					label="Summa"
					{...register("summa")}
					error={!!errors.summa}
					helperText={errors.summa?.message}
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

export default RankCreateFormModal;
