import React from "react";
import { useState } from "react";
import axios from "axios";
import { Container, Typography, TextField, Button, } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const nav = useNavigate();

    //regsiter
    async function register() {

        if (!email || !password) {
            alert("Email and Password required");
            return;
        }

        const res = await axios.post(
            "http://localhost:5000/register",
            {
                email,
                password,
            }
        );
        alert(res.data.message);
        nav("/login");
    }

    //for ui
    return (
        <Container maxWidth="sm">
            <Typography
                variant="h4"
                sx={{ mt: 5, mb: 3 }}>
                Register
            </Typography>

            <TextField
                fullWidth
                label="Email"
                sx={{ mb: 2 }}
                onChange={(e) =>
                    setEmail(e.target.value)
                }
            />

            <TextField
                fullWidth
                type="password"
                label="Password"
                sx={{ mb: 2 }}
                onChange={(e) =>
                    setPassword(e.target.value)
                } />

            <Button
                variant="contained"
                onClick={register}>
                Register
            </Button>

            <Typography
                variant="p"
                sx={{ mt: 5, mb: 3 }}
                > if you already have an account, please login
            </Typography>

            <Button
                variant="contained"
                onClick={() => { nav("/login") }}>
                Login
            </Button>
        </Container>
    );
}
export default Register;