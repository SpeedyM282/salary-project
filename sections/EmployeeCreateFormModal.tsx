import React, { FormEvent, useState } from "react";
import { IEmployee } from "@/app/types";
import { createEmployee } from "@/services/sections/employee";
import { Button, IconButton, Stack, TextField } from "@mui/material";
import CustomModal, { ICustomModalProps } from "@/components/CustomModal";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";
import { getDateDifference, latinToCyrillicUzbek } from "@/app/utils";

interface IProps extends ICustomModalProps {
	addTableData: (data: IEmployee[]) => void;
}

const INITIAL_STATE = {
	FIOlotin: "",
	FIOkril: "",
	inn: 0,
	inps: 0,
	plastic: 0,
	dateOfEmployment: "",
};

const EmployeeCreateFormModal = ({ open, onClose, addTableData }: IProps) => {
	const [experience, setExperience] = useState<string>("");
	const [dataForms, setDataForms] = useState<IEmployee[]>([INITIAL_STATE]);

	const handleClose = () => {
		setDataForms([INITIAL_STATE]);
		onClose();
	};

	const handleChange = (value: string, key: keyof IEmployee, index: number) => {
		if (key === "FIOlotin") {
			setDataForms((prev: IEmployee[]) =>
				prev.map((e: IEmployee, i: number) =>
					i === index ? { ...e, FIOkril: latinToCyrillicUzbek(value) } : e
				)
			);
		} else if (key === "dateOfEmployment") {
			setExperience(getDateDifference(value));
		}
		setDataForms((prev: IEmployee[]) =>
			prev.map((e: IEmployee, i: number) =>
				i === index ? { ...e, [key]: value } : e
			)
		);
	};

	const handleAddForm = () => {
		setDataForms((prev: IEmployee[]) => [...prev, INITIAL_STATE]);
	};

	const handleDeleteForm = (index: number) => {
		setDataForms((prev: IEmployee[]) => prev.filter((_, i) => i !== index));
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		createEmployee(dataForms).then((res) => {
			if (res) {
				addTableData(res.data?.data);
				handleClose();
			}
		});
	};

	return (
		<CustomModal
			width={600}
			padding={0}
			open={open}
			title="Ishchi"
			onClose={handleClose}
			reset={() => setDataForms([INITIAL_STATE])}
		>
			<Stack
				component="form"
				onSubmit={onSubmit}
				direction="column"
				gap={3}
				maxHeight={785}
				overflow="auto"
				p={3}
			>
				{dataForms.map((employee, index) => (
					<Stack
						key={index}
						pb={3}
						gap={2}
						direction="column"
						borderBottom="1px solid #999999"
					>
						<Stack direction="row" gap={2}>
							<TextField
								fullWidth
								label="FIO lotincha"
								value={employee.FIOlotin}
								onChange={(e) =>
									handleChange(e.target.value, "FIOlotin", index)
								}
							/>
							<TextField
								fullWidth
								label="FIO kirilcha"
								value={employee.FIOkril}
								inputProps={{ readOnly: true }}
								onChange={(e) => handleChange(e.target.value, "FIOkril", index)}
							/>
						</Stack>

						<Stack direction="row" gap={2}>
							<TextField
								fullWidth
								label="INN"
								type="number"
								value={employee.inn}
								onChange={(e) => handleChange(e.target.value, "inn", index)}
							/>
							<TextField
								fullWidth
								label="INPS"
								type="number"
								value={employee.inps}
								onChange={(e) => handleChange(e.target.value, "inps", index)}
							/>
						</Stack>

						<Stack direction="row" gap={2}>
							<TextField
								fullWidth
								type="number"
								label="Karta raqami"
								value={employee.plastic}
								onChange={(e) => handleChange(e.target.value, "plastic", index)}
							/>
							<TextField
								fullWidth
								type="date"
								label="Ishga qabul sanasi"
								value={employee.dateOfEmployment}
								onChange={(e) =>
									handleChange(e.target.value, "dateOfEmployment", index)
								}
								InputLabelProps={{ shrink: true }}
							/>
						</Stack>

						<Stack
							width="100%"
							gap={2}
							direction="row"
							alignItems="center"
							justifyContent="space-between"
						>
							<TextField
								fullWidth
								label="Tajriba"
								value={experience}
								inputProps={{ readOnly: true }}
							/>

							<Stack width="100%" direction="row" justifyContent="flex-end">
								{dataForms.length - 1 === index ? (
									<IconButton
										color="success"
										onClick={handleAddForm}
										sx={{ width: 35, height: 35 }}
									>
										<AddCircleOutlineRoundedIcon />
									</IconButton>
								) : (
									<IconButton
										color="error"
										onClick={() => handleDeleteForm(index)}
										sx={{ width: 35, height: 35 }}
									>
										<HighlightOffRoundedIcon />
									</IconButton>
								)}
							</Stack>
						</Stack>
					</Stack>
				))}

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
