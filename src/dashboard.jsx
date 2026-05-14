import { useEffect, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import Navbar from "./navbar"
import { Container, TextField, Button, Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, } from "@mui/material"

function Dashboard() {
    const nav = useNavigate()

    const api = "https://crm-backend-1-3efa.onrender.com/leads"

    const [data, setData] = useState([])
    const [text, setText] = useState("")


    const token = localStorage.getItem("token")

    //this get
    async function getData() {
        try {
            const res = await axios.get(api, {
                headers: { authorization: token }
            });
            setData(Array.isArray(res.data) ? res.data : [])
        } catch (err) {
            console.log(err)
            setData([])
        }
    }


    //page mounting fetch happens
    useEffect(() => {
        getData();
    }, [])


    // del
    async function removeItem(id) {
        await axios.delete(`${api}/${id}`, {
            headers: { authorization: token }
        });
        getData()
    }


    // edit
   

    function editItem(item) {
        localStorage.setItem("editLead", JSON.stringify(item));
        nav("/leads")
    }


    // search
    const result = data.filter((item) =>
        item.name.toLowerCase().includes(text.toLowerCase())
    );



    //ui
    return (
        <div>
            <Navbar />
            <Container>
                <Typography variant="h4" sx={{ mt: 3 }}>
                    Dashboard
                </Typography>

                <TextField
                    fullWidth
                    label="Search"
                    sx={{ mt: 3 }}
                    onChange={(e) => setText(e.target.value)}
                />

                <Typography sx={{ mt: 2 }}>
                    Total: {data.length}
                </Typography>

                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Phone</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>


                        <TableBody>
                            {result.map((item) => (
                                <TableRow key={item._id}>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.email}</TableCell>
                                    <TableCell>{item.phone}</TableCell>
                                    <TableCell>{item.status}</TableCell>
                                    <TableCell>
                                        <Button
                                            sx={{ mt: 2, mr: 2 }}
                                            variant="contained"
                                            onClick={() => editItem(item)}
                                        >
                                            Edit
                                        </Button>

                                        <Button
                                            sx={{ mt: 2 }}
                                            color="error"
                                            variant="outlined"
                                            onClick={() => removeItem(item._id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}

                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </div>
    )
}
export default Dashboard