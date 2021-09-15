import { ChakraProvider } from "@chakra-ui/react";
import { createClient, Provider } from "urql";

import theme from "../theme";
import { AppProps } from "next/app";

const client = createClient({
  url: "http://localhost:5000/graphql",
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider resetCSS theme={theme}>
      <Provider value={client}>
        <Component {...pageProps} />
      </Provider>
    </ChakraProvider>
  );
}

export default MyApp;
