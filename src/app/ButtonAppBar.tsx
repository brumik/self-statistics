import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import ConnectionIndicatorButton from './ConnectionIndicatorButton';
import Link from 'next/link';

export default function ButtonAppBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Tracking 
          </Typography>
          <ConnectionIndicatorButton />
          <Link href="/" passHref legacyBehavior>
            <Button color="inherit">Events</Button>
          </Link>
          <Link href="/edit-event-types" passHref legacyBehavior>
            <Button color="inherit">Configuration</Button>
          </Link>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
