import React from "react"
import { AppBar, Toolbar, Button, } from "@mui/material"
import { useNavigate, } from "react-router-dom"

function Navbar() {
    const nav = useNavigate()

    function logout() {
        localStorage.removeItem(
            "token"
        );
        nav("/login");
    }

    //ui
    return (
        <AppBar position="static" >
            <Toolbar>
                <Button
                    color="inherit"
                    onClick={() =>
                        nav("/")
                    }
                >
                    Home
                </Button>

                <Button
                    color="inherit"
                    onClick={() =>
                        nav("/dashboard")
                    }
                >
                    Dashboard
                </Button>

                <Button
                    color="inherit"
                    onClick={() =>
                        nav("/leads")}>
                    Leads
                </Button>

                <Button
                    color="inherit"
                    onClick={() => { nav("/login") }}
                >
                    Login
                </Button>

                <Button
                    color="inherit"
                    onClick={logout}
                >
                    Logout
                </Button>

            </Toolbar>
        </AppBar>
    )
}
export default Navbar