import * as yup from "yup";
import React, { useEffect } from "react";
import { IEmployee, IRank } from "@/app/types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { Button, Stack, TextField } from "@mui/material";
import { createEmployee } from "@/services/sections/employee";
import CustomModal, { ICustomModalProps } from "@/components/CustomModal";

interface IProps extends ICustomModalProps {
	addTableData: (data: IEmployee) => void;
}

const EmployeeCreateFormModal = ({ open, onClose, addTableData }: IProps) => {
	const rankSchema = yup.object().shape({
		FIOlotin: yup.string().required("FIO lotinchada shart"),
		FIOkril: yup.string().required("FIO kirilchada shart"),
		inn: yup.number().required("INN shart"),
		inps: yup.number().required("INPS shart"),
		plastic: yup.number().required("Karta raqami shart"),
		dateOfEmployment: yup.string().required("Ishga qabul sanasi shart"),
	});

	const {
		reset,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IEmployee>({
		resolver: yupResolver(rankSchema),
	});

	const handleClose = () => {
		reset({});
		onClose();
	};

	const onSubmit: SubmitHandler<IEmployee> = (data) => {
		createEmployee([data]).then((res) => {
			if (res) {
				addTableData(res.data?.data[0]);
				handleClose();
			}
		});
	};

	return (
		<CustomModal open={open} onClose={handleClose} title="Ishchi" reset={reset}>
			<Stack
				component="form"
				onSubmit={handleSubmit(onSubmit)}
				direction="column"
				gap={3}
			>
				<TextField
					label="FIO lotincha"
					{...register("FIOlotin")}
					error={!!errors.FIOlotin}
					helperText={errors.FIOlotin?.message}
				/>
				<TextField
					label="FIO kirilcha"
					{...register("FIOkril")}
					error={!!errors.FIOkril}
					helperText={errors.FIOkril?.message}
				/>
				<TextField
					label="INN"
					type="number"
					{...register("inn")}
					error={!!errors.inn}
					helperText={errors.inn?.message}
				/>
				<TextField
					label="INPS"
					type="number"
					{...register("inps")}
					error={!!errors.inps}
					helperText={errors.inps?.message}
				/>
				<TextField
					type="number"
					label="Karta raqami"
					{...register("plastic")}
					error={!!errors.plastic}
					helperText={errors.plastic?.message}
				/>
				<TextField
					type="date"
					label="Ishga qabul sanasi"
					{...register("dateOfEmployment")}
					error={!!errors.dateOfEmployment}
					InputLabelProps={{ shrink: true }}
					helperText={errors.dateOfEmployment?.message}
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

export default EmployeeCreateFormModal;
