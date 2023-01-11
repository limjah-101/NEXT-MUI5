import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import ProTip from "../src/ProTip";
import Link from "../src/Link";
import Copyright from "../src/Copyright";
// ========= components =================
import Layout from "../components/Layout";

export default function Index() {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    
   
    return (
        <Layout title={"Accueil"}>
            <Container maxWidth="sm">
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        NEXT MUI 5
                    </Typography>
                    <Stack>
                        <Link href="/about" color="secondary">
                            Go to the about page
                        </Link>
                        <Link href="/signIn" color="secondary">
                            Go to the sign in page
                        </Link>
                        <Link href="/register" color="secondary">
                            Go to the register page
                        </Link>
                    </Stack>
                    <ProTip />
                    <Copyright />
                </Box>
            </Container>
        </Layout>
    );
}
