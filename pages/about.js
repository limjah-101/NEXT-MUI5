import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ProTip from '../src/ProTip';
import Link from '../src/Link';
import Copyright from '../src/Copyright';
import { useSession } from 'next-auth/react'


export default function About() {
    const data = useSession(); //@desc access session from client side
    console.log(data);

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Typography variant="body1" component="h1" gutterBottom color='error'>
            {data && data.status}
        </Typography>
        <Button variant="contained" component={Link} noLinkStyle href="/">
          Go to the main page
        </Button>
        <ProTip />
        <Copyright />
      </Box>
    </Container>
  );
}
