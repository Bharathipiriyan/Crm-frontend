import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./navbar";
import { Container, TextField, Button, Card, CardContent, Typography } from "@mui/material";

function Dashboard() {

    const [data, setData] = useState([]);
    const [text, setText] = useState("");
    const token = localStorage.getItem("token");

    // get
    async function getData() {
        try {
            const res = await axios.get("http://localhost:5000/leads", {
                headers: { authorization: token }
            });
            setData(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            console.log(err);
            setData([]);
        }
    }


    //page mounting fetch happens
    useEffect(() => {
        getData();
    }, []);


    // del
    async function removeItem(id) {
        await axios.delete(`http://localhost:5000/leads/${id}`, {
            headers: { authorization: token }
        });
        getData();
    }

    
    // edit
    function editItem(item) {
        localStorage.setItem("editLead", JSON.stringify(item));
        window.location.href = "/leads";
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

                {result.map((item) => (
                    <Card key={item._id} sx={{ mt: 3 }}>
                        <CardContent>

                            <Typography>{item.name}</Typography>
                            <Typography>{item.email}</Typography>
                            <Typography>{item.phone}</Typography>
                            <Typography>{item.status}</Typography>

                            <Button
                                sx={{ mt: 2, mr: 2 }}
                                variant="contained"
                                onClick={() => editItem(item)}>
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

                        </CardContent>
                    </Card>
                ))}
            </Container>
        </div>
    );
}
export default Dashboard;