import Navbar from "./navbar"
import { Container, Typography } from "@mui/material"

function Home() {
    return (
        <div>
            <Navbar />
            <Container maxWidth="md">
                <Typography
                    variant="h4"
                    sx={{
                        textAlign: "center",
                        mt: 6,
                        fontWeight: 500,
                    }}
                >
                    Welcome To CRM Project
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        textAlign: "center",
                     mt: 2,
                        color: "gray",}}
                >
                    Manage your leads and customers easily using this simple CRM system.
                </Typography>

            </Container>
        </div>
    )
}

export default Home