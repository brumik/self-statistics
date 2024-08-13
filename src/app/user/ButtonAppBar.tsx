'use client'

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ConnectionIndicatorButton from './ConnectionIndicatorButton';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IUserHydrated } from '@/lib/models/User';


export default function ButtonAppBar() {
  const path = usePathname();
  const [username, setUsername] = useState('');
  const router = useRouter();

  const getUserame = async () => {
    try {
      const response = await fetch('/api/users/me');

      const user = await response.json() as IUserHydrated;
      setUsername(user.username);
    } catch (error) {
      console.error(error);
    }
  }

  const logout = async () => {
    try {
      await fetch('/api/users/logout');
      router.push('/public/login');
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => { getUserame() }, []);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="h6" sx={{ marginRight: 3 }}>
            Tracking
          </Typography>
          <Typography variant="body1" component="p" sx={{ flexGrow: 1 }}>
            User: {username}
          </Typography>
          <ConnectionIndicatorButton />
          <Link href="/user" passHref legacyBehavior>
            <Button color="inherit" variant={path === '/user' ? 'contained' : 'text'}>Events</Button>
          </Link>
          <Box ml={1}>
            <Link href="/user/config" passHref legacyBehavior>
              <Button color="inherit" variant={path === '/user/config' ? 'contained' : 'text'}>Config</Button>
            </Link>
          </Box>
          <Box ml={3}>
            <Button color="error" variant='outlined' onClick={logout}>Logout</Button>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
