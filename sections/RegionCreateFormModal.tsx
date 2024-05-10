import React from "react";
import * as yup from "yup";
import { IRegion } from "@/app/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Stack, TextField } from "@mui/material";
import { useForm, SubmitHandler } from "react-hook-form";
import { createRegion } from "@/services/sections/region";
import CustomModal, { ICustomModalProps } from "@/components/CustomModal";

interface IProps extends ICustomModalProps {
	addTableData: (data: IRegion) => void;
}

const RegionCreateFormModal = ({ open, onClose, addTableData }: IProps) => {
	const rankSchema = yup.object().shape({
		name: yup.string().required("Tuman nomi shart"),
		type: yup.string().required("Tuman turi shart"),
	});

	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IRegion>({
		resolver: yupResolver(rankSchema),
	});

	const handleClose = () => {
		reset({});
		onClose();
	};

	const onSubmit: SubmitHandler<IRegion> = (data) => {
		createRegion([data]).then((res: any) => {
			if (res) {
				addTableData(res.data?.data[0]);
				handleClose();
			}
		});
	};

	return (
		<CustomModal open={open} onClose={handleClose} title="Tuman" reset={reset}>
			<Stack
				component="form"
				onSubmit={handleSubmit(onSubmit)}
				direction="column"
				gap={3}
			>
				<TextField
					label="Tuman nomi"
					{...register("name")}
					error={!!errors.name}
					helperText={errors.name?.message}
				/>
				<TextField
					label="Tuman turi"
					{...register("type")}
					error={!!errors.type}
					helperText={errors.type?.message}
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

export default RegionCreateFormModal;
