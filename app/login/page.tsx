"use client";
import * as yup from "yup";
import Image from "next/image";
import React, { useState } from "react";
import salary from "@/public/salary.png";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, SubmitHandler } from "react-hook-form";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
	Stack,
	Select,
	MenuItem,
	InputLabel,
	Typography,
	FormControl,
	SelectChangeEvent,
	OutlinedInput,
	InputAdornment,
	IconButton,
	Button,
} from "@mui/material";
import { regions } from "../utils";
import { login } from "@/services/auth";
import { useRouter } from "next/navigation";

interface FormData {
	name: string;
	password: string;
}

const Login = () => {
	const router = useRouter();
	const [showPassword, setShowPassword] = useState(false);

	const loginSchema = yup.object().shape({
		name: yup.string().required("Foydalanuvchi nomi shart"),
		password: yup.string().required("Parol shart"),
	});

	const {
		watch,
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>({
		resolver: yupResolver(loginSchema),
	});

	const handleClickShowPassword = () => setShowPassword((show) => !show);

	const handleMouseDownPassword = (
		event: React.MouseEvent<HTMLButtonElement>
	) => {
		event.preventDefault();
	};

	const onSubmit: SubmitHandler<FormData> = (data) => {
		login(data).then((res: any) => {
			if (res?.data) {
				console.log(res.data);
				localStorage.setItem("token", res.data?.token);
				localStorage.setItem("name", res.data?.data?.name);
				router.push(
					res.data?.data?.name === "Respublika"
						? "/dashboard"
						: `/dashboard/${res.data?.data?.name}`
				);
			}
		});
	};

	return (
		<Stack p={3} position="relative" width="100vw" height="100vh">
			<Stack
				p={3}
				gap={5}
				top="40%"
				left="50%"
				width="100%"
				maxWidth="700px"
				minWidth="300px"
				borderRadius={3}
				direction="column"
				position="absolute"
				sx={{ transform: "translate(-50%, -50%)" }}
				boxShadow="rgba(0, 0, 0, 0.35) 0px 5px 15px"
			>
				<Typography variant="h5" textAlign="center">
					АРМ Oylik
				</Typography>

				<Stack direction="row" gap={5} flexWrap="wrap" justifyContent="center">
					<Image src={salary} width={300} height={300} alt="Salary" />

					<Stack
						gap={3}
						width={"300px"}
						component="form"
						direction="column"
						onSubmit={handleSubmit(onSubmit)}
					>
						<FormControl fullWidth>
							<InputLabel id="demo-simple-select-label">
								Foydalanuvchi nomi
							</InputLabel>
							<Select
								error={!!errors.name}
								{...register("name")}
								id="demo-simple-select"
								label="Foydalanuvchi nomi"
								labelId="demo-simple-select-label"
							>
								<MenuItem value="Respublika">Respublika byudjeti</MenuItem>
								{regions.map((e) => (
									<MenuItem value={e} key={e}>
										{e} byudjeti
									</MenuItem>
								))}
							</Select>
							{!!errors.name && (
								<Typography variant="subtitle2" color="error">
									{errors.name.message}
								</Typography>
							)}
						</FormControl>

						<FormControl sx={{ width: "100%" }} variant="outlined">
							<InputLabel htmlFor="outlined-adornment-password">
								Parolni kiriting
							</InputLabel>
							<OutlinedInput
								label="Parolni kiriting"
								error={!!errors.password}
								{...register("password")}
								autoComplete="new-password"
								id="outlined-adornment-password"
								type={showPassword ? "text" : "password"}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={handleClickShowPassword}
											onMouseDown={handleMouseDownPassword}
											edge="end"
										>
											{showPassword ? <VisibilityOff /> : <Visibility />}
										</IconButton>
									</InputAdornment>
								}
							/>
							{!!errors.password && (
								<Typography variant="subtitle2" color="error">
									{errors.password.message}
								</Typography>
							)}
						</FormControl>

						<Button
							variant="contained"
							type="submit"
							disabled={!watch("password") || !watch("name")}
						>
							OK
						</Button>
					</Stack>
				</Stack>
			</Stack>
		</Stack>
	);
};

export default Login;
