import React from "react";
// import PropTypes from "prop-types";

import { Container, Heading, Box } from "@chakra-ui/react";

const Page = ({ title, children }) => {
  return (
    <Box >
      <Container maxW="container.lg">
        {!!title && <Heading textAlign="center">{title}</Heading>}
        {children}
      </Container>
    </Box>
  );
};

export default Page;
