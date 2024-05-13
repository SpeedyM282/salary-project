import React, { FormEvent, useState } from "react";
import { IPosition } from "@/app/types";
import { createPosition } from "@/services/sections/position";
import { Button, IconButton, Stack, TextField } from "@mui/material";
import CustomModal, { ICustomModalProps } from "@/components/CustomModal";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

interface IProps extends ICustomModalProps {
	addTableData: (data: IPosition[]) => void;
}

const INITIAL_STATE = { name: "", percent: 0 };

const PositionCreateFormModal = ({ open, onClose, addTableData }: IProps) => {
	const [dataForms, setDataForms] = useState<IPosition[]>([INITIAL_STATE]);

	const handleClose = () => {
		setDataForms([INITIAL_STATE]);
		onClose();
	};

	const handleChange = (
		value: number | string,
		key: keyof IPosition,
		index: number
	) => {
		setDataForms((prev: IPosition[]) =>
			prev.map((e: IPosition, i: number) =>
				i === index ? { ...e, [key]: value } : e
			)
		);
	};

	const handleAddForm = () => {
		setDataForms((prev: IPosition[]) => [...prev, INITIAL_STATE]);
	};

	const handleDeleteForm = (index: number) => {
		setDataForms((prev: IPosition[]) => prev.filter((_, i) => i !== index));
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		createPosition(dataForms).then((res) => {
			if (res) {
				addTableData(res.data?.data);
				handleClose();
			}
		});
	};

	return (
		<CustomModal
			open={open}
			title="Lavozim"
			onClose={handleClose}
			reset={() => setDataForms([INITIAL_STATE])}
		>
			<Stack
				component="form"
				onSubmit={onSubmit}
				direction="column"
				gap={3}
				pt={3}
			>
				{dataForms.map((position, index) => (
					<Stack
						key={index}
						pb={3}
						gap={2}
						direction="row"
						borderBottom="1px solid #999999"
					>
						<TextField
							fullWidth
							label="Lavozim nomi"
							value={position.name}
							onChange={(e) => handleChange(e.target.value, "name", index)}
						/>

						<Stack width="100%" direction="row" alignItems="center">
							<TextField
								label="Foiz"
								type="number"
								value={position.percent}
								onChange={(e) => handleChange(e.target.value, "percent", index)}
							/>
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

export default PositionCreateFormModal;
