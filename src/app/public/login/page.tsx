'use client';

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import NextLink from 'next/link';
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { LoginError } from "@/app/api/users/login/route";

export default function Login() {
  const router = useRouter();
  const [data, setData] = useState({
    username: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<LoginError>({});

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errors = await response.json() as LoginError;
        setErrors(errors); 
      } else {
        router.push('/user');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleFormnChange = (field: keyof typeof data, value: string | boolean) => {
    setData(prev => ({ ...prev, [field]: value }));
    setErrors({});
  }

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <Box component="form" noValidate sx={{ mt: 1 }}>
          <TextField
            error={!!errors?.username}
            helperText={errors?.username}
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={data.username}
            onChange={(e) => handleFormnChange('username', e.target.value)}
          />
          <TextField
            error={!!errors?.password}
            helperText={errors?.password}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={data.password}
            onChange={(e) => handleFormnChange('password', e.target.value)}
          />
          <FormControlLabel
            control={<Checkbox
              color="primary"
              checked={data.rememberMe}
              onChange={(e) => handleFormnChange('rememberMe', e.target.checked)}
            />}
            label="Remember me"
          />
          <Button
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item xs>
                <Link href="#" display="none" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <NextLink passHref legacyBehavior href="/public/signup">
                <Link variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </NextLink>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
