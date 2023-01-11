import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
//import ProTip from "../src/ProTip";
import Link from "../src/Link";
//import Copyright from "../src/Copyright";
import { Button, TextField, Alert } from "@mui/material";
import { Stack } from "@mui/system";
// -----------------------
import axios from "axios";
import { useRouter } from "next/router";

export default function Register() {
    const router = useRouter();
    const [error, setError] = useState(null);
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setCredentials({ ...credentials, [name]: value });
    };

    const handleClearForms = (e) => {
        e.preventDefault;
        setPassword("");
        setEmail("");
    };

    const handleSubmit = async (e) => {
        console.log(credentials);
        const { name, email, password } = credentials;

        const res = await axios
            .post(
                "/api/register",
                { name, email, password },
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                    },
                }
            )
            .then(async (res) => {
                console.log(res);
                if (res.data.success) router.push("/signIn");
                //@todo
                // sign in the new user

                // redirect to the dashboard
                //await loginUser();
                //redirectToHome();
            })
            .catch((error) => {
                console.log(error.response.data.error);
                setError(error.response.data.error);
            });
        //console.log(res);
    };

    return (
        <Container>
            <Box sx={{ maxWidth: 500, mt: 10 }}>
                <Typography variant="h4" sx={{ mb: 3 }}>
                    Create an account.
                </Typography>
                {error !== null && <Alert severity="error">{error}</Alert>}
                <Stack spacing={5} sx={{ mt: 5 }}>
                    <TextField
                        id="outlined-name"
                        label="name"
                        name="name"
                        type={"name"}
                        onChange={handleChange}
                    />
                    <TextField
                        id="outlined-name"
                        label="Email"
                        name="email"
                        type={"email"}
                        onChange={handleChange}
                    />

                    <TextField
                        id="outlined-password"
                        label="Password"
                        name="password"
                        type={"password"}
                        onChange={handleChange}
                    />

                    <Stack direction={"row"} spacing={5}>
                        <Button variant="contained" onClick={handleSubmit}>
                            Register
                        </Button>
                    </Stack>
                </Stack>
                <Box sx={{ mt: 5 }}>
                    <Link href="/signIn" color="secondary">
                        Go to the sign in page
                    </Link>
                </Box>
            </Box>
        </Container>
    );
}
