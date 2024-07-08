'use client'

import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useMemo } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";

export default function DarkTheme({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)', { defaultMatches: true });

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: prefersDarkMode ? 'dark' : 'light',
        },
      }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      {children}
    </ThemeProvider>
  );
}
