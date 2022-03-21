import React from "react";
// import PropTypes from "prop-types";

import { Container, Heading, Box } from "@chakra-ui/react";

const Page = ({ title, children }) => {
  return (
    <Box py={12} bg="rgb(250, 250, 250)">
      <Container maxW="container.md">
        {!!title && <Heading textAlign="center">{title}</Heading>}
        {children}
      </Container>
    </Box>
  );
};

export default Page;
