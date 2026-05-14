import { useState } from "react"
import axios from "axios"
import { TextField, Button, Container, Typography } from "@mui/material"
import { useNavigate } from "react-router-dom"

function Logincomponent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("")

    const nav = useNavigate()

    
    async function login() {
        console.log("login called")

        if (!email || !password) {
            alert("Email and Password required")
            return
        }

        try {
            const res = await axios.post("http://localhost:5000/login", {
                email,
                password,
            });

            if (res.data.token) {
                localStorage.setItem("token", res.data.token)
                nav("/dashboard")
            }
        } catch (err) {
            console.log(err.response?.data)

            alert(err.response?.data?.message || "Login failed")
        }
    }



    ///ui
    return (
        <Container maxWidth="sm">
            <Typography variant="h4" sx={{ mt: 5, mb: 3 }}>
                Login
            </Typography>

            <TextField
                fullWidth
                label="Email"
                sx={{ mb: 2 }}
                onChange={(e) => setEmail(e.target.value)}
            />

            <TextField
                fullWidth
                type="password"
                label="Password"
                sx={{ mb: 2 }}
                onChange={(e) => setPassword(e.target.value)} />

            <Button variant="contained" onClick={login}>
                Login
            </Button>

            <Typography sx={{ mt: 2 }} color="text.secondary">
                Don’t have an account?
            </Typography>

            <Button variant="contained" onClick={() => nav("/register")}>
                Register
            </Button>
        </Container>
    )
}
export default Logincomponent