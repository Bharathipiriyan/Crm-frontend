import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./navbar";
import { Container, TextField, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Leads() {

    const api = "https://crm-backend-1-3efa.onrender.com/leads";
    const nav = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [status, setStatus] = useState("");

    const [editId, setEditId] = useState("");

    
    useEffect(() => {
        const data = localStorage.getItem("editLead");

        if (data) {
            const lead = JSON.parse(data);

            setName(lead.name || "");
            setEmail(lead.email || "");
            setPhone(lead.phone || "");
            setStatus(lead.status || "");
            setEditId(lead._id || "");

            localStorage.removeItem("editLead");
        }
    }, []);

    async function save() {

        
        const token = localStorage.getItem("token");

       
        if (!name || !email || !phone) {
            alert("Fill all required fields");
            return;
        }

        const data = { name, email, phone, status };

        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        try {

            if (editId && editId !== "") {

                const res = await axios.put(`${api}/${editId}`, data, config);
                console.log("UPDATED:", res.data);

            }
          
            else {

                const res = await axios.post(api, data, config);
                console.log("ADDED:", res.data);
            }

            // clear form after success
            setName("");
            setEmail("");
            setPhone("");
            setStatus("");
            setEditId("");

            // go to list page (better UX)
            nav("/dashboard");

        } catch (err) {
            console.log("ERROR:", err.response?.data || err.message);
        }
    }

    return (
        <div>
            <Navbar />

            <Container>

                <Typography variant="h4" sx={{ mt: 3 }}>
                    Leads
                </Typography>

                <TextField
                    fullWidth
                    label="Name"
                    sx={{ mt: 3 }}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <TextField
                    fullWidth
                    label="Email"
                    sx={{ mt: 2 }}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                    fullWidth
                    label="Phone"
                    sx={{ mt: 2 }}
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />

                <TextField
                    fullWidth
                    label="Status"
                    sx={{ mt: 2 }}
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                />

                <Button
                    variant="contained"
                    sx={{ mt: 2 }}
                    onClick={save}
                >
                    {editId ? "Update Lead" : "Add Lead"}
                </Button>

            </Container>
        </div>
    );
}

export default Leads;