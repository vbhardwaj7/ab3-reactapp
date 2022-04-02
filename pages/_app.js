import React, { useState, useEffect } from "react";

import "../styles/globals.css";
import Layout from "components/layout";

// TODO: Layout Component

// TODO: Wrap providers

const App = ({ Component, pageProps }) => {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
};

export default App;
