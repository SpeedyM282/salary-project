import React, { FormEvent, useState } from "react";
import { IRegion } from "@/app/types";
import { createRegion } from "@/services/sections/region";
import { Button, IconButton, Stack, TextField } from "@mui/material";
import CustomModal, { ICustomModalProps } from "@/components/CustomModal";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

interface IProps extends ICustomModalProps {
	addTableData: (data: IRegion[]) => void;
}

const INITIAL_STATE = { name: "", type: "" };

const RegionCreateFormModal = ({ open, onClose, addTableData }: IProps) => {
	const [dataForms, setDataForms] = useState<IRegion[]>([INITIAL_STATE]);

	const handleClose = () => {
		setDataForms([INITIAL_STATE]);
		onClose();
	};

	const handleChange = (
		value: number | string,
		key: keyof IRegion,
		index: number
	) => {
		setDataForms((prev: IRegion[]) =>
			prev.map((e: IRegion, i: number) =>
				i === index ? { ...e, [key]: value } : e
			)
		);
	};

	const handleAddForm = () => {
		setDataForms((prev: IRegion[]) => [...prev, INITIAL_STATE]);
	};

	const handleDeleteForm = (index: number) => {
		setDataForms((prev: IRegion[]) => prev.filter((_, i) => i !== index));
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		createRegion(dataForms).then((res: any) => {
			if (res) {
				addTableData(res.data?.data);
				handleClose();
			}
		});
	};

	return (
		<CustomModal
			open={open}
			title="Tuman"
			onClose={handleClose}
			reset={() => setDataForms([INITIAL_STATE])}
		>
			<Stack component="form" onSubmit={onSubmit} direction="column" gap={3}>
				{dataForms.map((region, index) => (
					<Stack
						key={index}
						pb={3}
						gap={2}
						direction="row"
						borderBottom="1px solid #999999"
					>
						<TextField
							fullWidth
							label="Tuman nomi"
							value={region.name}
							onChange={(e) => handleChange(e.target.value, "name", index)}
						/>

						<Stack width="100%" direction="row" alignItems="center">
							<TextField
								label="Tuman turi"
								value={region.type}
								onChange={(e) => handleChange(e.target.value, "type", index)}
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

export default RegionCreateFormModal;
