import React from "react";
import { Button, Typography } from "@mui/material";
import { Container } from "@mui/system";
import { useSession, signOut } from "next-auth/react";
import Layout from "../components/admin/Layout";

const Dashboard = () => {
    const { data: session } = useSession();

    const logout = async (e) => {
        e.preventDefault();
        signOut({ callbackUrl: "/" });
    };

    return (
        <Layout>
            <Container maxWidth="md" sx={{ mt: 10 }}>
                <Typography>Dashboard page</Typography>
                <Typography variant="h5" sx={{ my: 5 }}>
                    Hi {session && session.user.name}
                </Typography>

                <Button variant="contained" onClick={(e) => logout(e)}>
                    sign out
                </Button>
            </Container>
        </Layout>
    );
};

Dashboard.auth = { isAdmin: true };

export default Dashboard;
