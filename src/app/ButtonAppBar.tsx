'use client'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ConnectionIndicatorButton from './ConnectionIndicatorButton';
import Link from 'next/link';
import { usePathname } from 'next/navigation';


export default function ButtonAppBar() {
  const path = usePathname();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Tracking 
          </Typography>
          <ConnectionIndicatorButton />
          <Link href="/" passHref legacyBehavior>
            <Button color="inherit" variant={path === '/' ? 'contained' : 'text'}>Events</Button>
          </Link>
          <Link href="/config" passHref legacyBehavior>
            <Button color="inherit" variant={path === '/config' ? 'contained' : 'text'}>Config</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
