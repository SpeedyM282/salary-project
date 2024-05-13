import { IRank } from "@/app/types";
import React, { FormEvent, useState } from "react";
import { createRank } from "@/services/sections/rank";
import { Button, IconButton, Stack, TextField } from "@mui/material";
import CustomModal, { ICustomModalProps } from "@/components/CustomModal";
import HighlightOffRoundedIcon from "@mui/icons-material/HighlightOffRounded";
import AddCircleOutlineRoundedIcon from "@mui/icons-material/AddCircleOutlineRounded";

interface IProps extends ICustomModalProps {
	addTableData: (data: IRank[]) => void;
}

const INITIAL_STATE = { name: "", summa: 0 };

const RankCreateFormModal = ({ open, onClose, addTableData }: IProps) => {
	const [dataForms, setDataForms] = useState<IRank[]>([INITIAL_STATE]);

	const handleClose = () => {
		setDataForms([INITIAL_STATE]);
		onClose();
	};

	const handleChange = (
		value: number | string,
		key: keyof IRank,
		index: number
	) => {
		setDataForms((prev: IRank[]) =>
			prev.map((e: IRank, i: number) =>
				i === index ? { ...e, [key]: value } : e
			)
		);
	};

	const handleAddForm = () => {
		setDataForms((prev: IRank[]) => [...prev, INITIAL_STATE]);
	};

	const handleDeleteForm = (index: number) => {
		setDataForms((prev: IRank[]) => prev.filter((_, i) => i !== index));
	};

	const onSubmit = (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();

		createRank(dataForms).then((res) => {
			if (res) {
				addTableData(res.data?.data);
				handleClose();
			}
		});
	};

	return (
		<CustomModal
			open={open}
			title="Unvon"
			onClose={handleClose}
			reset={() => setDataForms([INITIAL_STATE])}
		>
			<Stack component="form" onSubmit={onSubmit} direction="column" gap={3}>
				{dataForms.map((rank, index) => (
					<Stack
						key={index}
						pb={3}
						gap={2}
						direction="row"
						borderBottom="1px solid #999999"
					>
						<TextField
							fullWidth
							value={rank.name}
							label="Unvon nomi"
							onChange={(e) => handleChange(e.target.value, "name", index)}
						/>

						<Stack width="100%" direction="row" alignItems="center">
							<TextField
								label="Summa"
								type="number"
								value={rank.summa}
								onChange={(e) => handleChange(e.target.value, "summa", index)}
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

				<Stack direction="row" gap={2}>
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
