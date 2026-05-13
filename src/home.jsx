import React from "react";
import Navbar from "./navbar";

function Home() {
    return (
        <div>
            <Navbar />
            <h1
                style={{
                    textAlign: "center",
                    marginTop: "50px",
                }} > Welcome To CRM Project
            </h1>
        </div>
    );
}
export default Home;