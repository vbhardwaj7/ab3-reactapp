import React, { useState } from "react";

import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";

import "../styles/globals.css";
import Layout from "components/layout";

// TODO: Layout Component

// TODO: Wrap providers

const App = ({ Component, pageProps }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            refetchOnWindowFocus: false,
          },
        },
      })
  );
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
