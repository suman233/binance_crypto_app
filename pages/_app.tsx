import Wrapper from "@/layout/Wrapper/Wrapper";
import { theme } from "@/mui_theme/mui_palette";
import { ThemeProvider, createTheme, styled } from "@mui/material";
import type { AppProps } from "next/app";
import React, { useMemo, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
// import AppBar from '@mui/material/AppBar';


interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window?: () => Window;
}
const queryClient = new QueryClient()


export default function App({ Component, pageProps }: AppProps) {
  const [dark, setDark] = useState(true);
  const darkTheme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: dark ? 'dark' : 'light',
        },
      }),
    [dark]
  );

  return (
    <ThemeProvider theme={darkTheme ? darkTheme: theme}>

      <QueryClientProvider client={queryClient}>

        <Wrapper>

          <Component {...pageProps} />
        </Wrapper>
      </QueryClientProvider>
    </ThemeProvider >
  )
}
