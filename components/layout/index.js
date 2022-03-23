import React, { useState } from "react";
import {
  Box,
  chakra,
  ChakraProvider,
  Flex,
  Heading,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MdFlight } from "react-icons/md";
import { ImSearch, ImCart } from "react-icons/im";
import { SearchDealModal } from "components/features";
import { useRouter } from "next/router";

const TopBar = ({ onOpen }) => {
  const { push } = useRouter();

  const goToHomePage = () => {
    push(`/`);
  };

  const goToOrders = () => {
    push(`/order`);
  };

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
        <MdFlight
          onClick={goToHomePage}
          fontSize="24px"
          color="white"
          cursor="pointer"
        />
        <Heading
          onClick={goToHomePage}
          ml="2"
          size="md"
          color="white"
          cursor="pointer"
        >
          Octank Airlines Loyalty Program!
        </Heading>
      </Flex>
      <Flex>
        <IconButton
          variant="ghost"
          colorScheme="whiteAlpha"
          isRound
          aria-label="User"
          icon={<ImCart color="white" />}
          mr="1"
          onClick={goToOrders}
        />
        <IconButton
          variant="ghost"
          colorScheme="whiteAlpha"
          isRound
          aria-label="User"
          icon={<ImSearch color="white" />}
          onClick={onOpen}
        />
      </Flex>
    </Flex>
  );
};

const Footer = () => {
  return (
    <Flex h="12" bgColor="blue.50" alignItems="center" justifyContent="center">
      © 2022 Octank Airlines Loyalty Program. All rights reserved.
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
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <TopBar onOpen={onOpen} />
      <SearchDealModal isOpen={isOpen} onClose={onClose} />
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
