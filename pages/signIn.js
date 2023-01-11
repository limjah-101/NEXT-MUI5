import React, { useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ProTip from "../src/ProTip";
import Link from "../src/Link";
import Copyright from "../src/Copyright";
import { Button, TextField, Alert } from "@mui/material";
import { Stack } from "@mui/system";
// ====================================
import { getProviders, useSession, signIn } from "next-auth/react";
//import Router from "next/router";
import { useRouter } from "next/router";

export default function LogIn() {
    const router = useRouter();
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [authError, setAuthError] = useState(null);

    const handleChange = (e) => {
        //e.preventDefault();
        if (e.target.name === "email") {
            setEmail(e.target.value);
        } else if (e.target.name === "password") {
            setPassword(e.target.value);
        }
    };

    /**
     *
     */
    const redirectToHome = () => {
        const { pathname } = router;
        if (pathname === "/signIn") router.push("/dashboard");
    };

    /**
     * @desc
     * @param {*} e
     * @returns
     */
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (email === "" || password === "") return false;
        const res = await signIn("credentials", {
            email: email,
            password: password,
            redirect: false,
            //callbackUrl: `${window.location.origin}`
            callbackUrl: "/dashboard",
        });

        // if(res.error){
        //     setAuthError(res.error)
        // } else {
        //     redirectToHome();
        // }
        res.error ? setAuthError(res.error) : redirectToHome();
    };

    const handleClearForms = (e) => {
        e.preventDefault();
        setEmail("");
        setPassword("");
        setAuthError(null);
    };
    return (
        <Container>
            <Box sx={{ maxWidth: 500, mt: 10 }}>
                <Typography variant="h4" sx={{ mb: 3 }}>
                    Sign In
                </Typography>
                {authError !== null && (
                    <Alert severity="error">{authError}</Alert>
                )}

                <Stack spacing={5} sx={{ mt: 5 }}>
                    <TextField
                        id="outlined-name"
                        label="Email"
                        name="email"
                        type={"email"}
                        value={email}
                        onChange={(e) => handleChange(e)}
                    />

                    <TextField
                        id="outlined-password"
                        label="Password"
                        value={password}
                        name="password"
                        type={"password"}
                        onChange={(e) => handleChange(e)}
                    />

                    <Stack direction={"row"} spacing={5}>
                        <Button variant="contained" onClick={handleSubmit}>
                            Sign In
                        </Button>
                        <Button
                            variant="contained"
                            color="info"
                            onClick={(e) => handleClearForms(e)}
                        >
                            Clear
                        </Button>
                    </Stack>
                </Stack>
                <Box sx={{ mt: 5 }}>
                    <Link href="/register" color="secondary">
                        Go to the register page
                    </Link>
                </Box>
            </Box>
        </Container>
    );
}
