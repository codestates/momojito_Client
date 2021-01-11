import { ThemeProvider } from "styled-components";
import { Reset } from "styled-reset";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Reset />
      <ThemeProvider
        theme={{
          main: "limegreen",
          grey: "grey",
        }}
      >
        <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default MyApp;
