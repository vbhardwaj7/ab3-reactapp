import React, { useState } from "react";
import {
  Box,
  chakra,
  ChakraProvider,
  Flex,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MdFlight } from "react-icons/md";
import { ImUser, ImSearch } from "react-icons/im";

const TopBar = () => {
  return (
    <Flex
      px="8"
      h="14"
      w="100%"
      bg="blue.500"
      alignItems="center"
      justifyContent="space-between"
    >
      <Flex>
        <MdFlight fontSize="24px" color="white" />
        <Heading ml="2" size="md" color="white">
          We Fly
        </Heading>
      </Flex>
      <Flex>
        <IconButton
          variant="ghost"
          colorScheme="whiteAlpha"
          isRound
          aria-label="User"
          icon={<ImUser color="white" />}
          mr="1"
        />
        <IconButton
          variant="ghost"
          colorScheme="whiteAlpha"
          isRound
          aria-label="User"
          icon={<ImSearch color="white" />}
        />
      </Flex>
    </Flex>
  );
};

const Footer = () => {
  return (
    <Flex h="12" bgColor="blue.50" alignItems="center" justifyContent="center">
      © 2022 We Fly. All rights reserved.
    </Flex>
  );
};
// Styles
const Main = props => (
  <chakra.main
    py={12}
    bg="rgb(250, 250, 250)"
    minH="calc(100vh - 104px)"
    {...props}
  />
);

const DashboardWrapper = ({ children }) => {
  return (
    <>
      <TopBar />
      <Main>{children}</Main>
      <Footer />
    </>
  );
};

const LayoutWrapper = ({ children }) => {
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
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        <DashboardWrapper>{children}</DashboardWrapper>
      </QueryClientProvider>
    </ChakraProvider>
  );
};

const Layout = ({ children, ...props }) => {
  return <LayoutWrapper>{children}</LayoutWrapper>;
};

export default Layout;
