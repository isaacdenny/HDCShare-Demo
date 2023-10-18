import { Box, TextField } from "@mui/material";
import React from "react";

const LoginPage = () => {
    return (
        <Box
            component="form"
            sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
        >
            <TextField
                required
                id="username"
                label="Username"
                variant="outlined"
            />
            <TextField
                required
                id="password"
                label="Password"
                variant="outlined"
            />
        </Box>
    );
};

export default LoginPage;
