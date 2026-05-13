import react from "react";

import { useState } from "react";
import axios from "axios";
import { TextField, Button, Container, Typography, } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const nav = useNavigate();


    //logic
    async function login() {

        if (!email || !password) {
            alert("Email and Password required");
            return;
        }
        const res = await axios.post(
            "http://localhost:5000/login",
            {
                email,
                password,
            }
        );

        if (res.data.token) {
            localStorage.setItem(
                "token",
                res.data.token
            );
            nav("/dashboard");
        } else {
            alert(res.data.message);
        }
    }

    //for ui
    return (
        <Container maxWidth="sm" >

            <Typography
                variant="h4"
                sx={{ mt: 5, mb: 3 }}
            > Login
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
                onClick={login}>
                Login
            </Button>

            <Typography
                variant="p"
                
            > if you don't have an account, please register
            </Typography>

            <Button
                variant="contained"
                onClick={() => { nav("/register") }}>
                register
            </Button>
        </Container>
    );
}
export default Login;