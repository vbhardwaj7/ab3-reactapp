/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import {
  Box,
  chakra,
  ChakraProvider,
  Flex,
  Heading,
  IconButton,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MdFlight } from "react-icons/md";
import { ImSearch, ImCart, ImUser } from "react-icons/im";
import { SearchDealModal } from "components/features";
import { useRouter } from "next/router";
import { LOGIN_PAGE_URL } from "utils/constants";

const TopBar = ({ onOpen }) => {
  const { push } = useRouter();

  const goToHomePage = () => {
    push(`/`);
  };

  const goToOrders = () => {
    push(`/order`);
  };

  const goToProfile = () => {
    push(`/user/profile`);
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
        <img src="/logo.png" style={{ width: "40px" }} alt="logo" />
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
          icon={<ImUser color="white" />}
          mr="1"
          onClick={goToProfile}
        />
        <IconButton
          variant="ghost"
          colorScheme="whiteAlpha"
          isRound
          aria-label="Orders"
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

  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (window?.location?.hash) {
      sessionStorage.setItem(
        "accessToken",
        window.location.hash.split("&")[1].split("=")[1]
      );
      setIsAuth(true);
    }
  }, []);

  useEffect(() => {
    if (!isAuth) {
      if (sessionStorage?.getItem("accessToken")) {
        setIsAuth(true);
      } else {
        window.location.replace(LOGIN_PAGE_URL);
      }
    }
  }, [isAuth]);

  return (
    <ChakraProvider>
      <QueryClientProvider client={queryClient}>
        {!isAuth ? (
          <Box
            display="flex"
            alignItems="center"
            justifyContent="center"
            height="100vh"
            bgColor="blue.500"
          >
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
          </Box>
        ) : (
          <DashboardWrapper>{children}</DashboardWrapper>
        )}
      </QueryClientProvider>
    </ChakraProvider>
  );
};

const Layout = ({ children, ...props }) => {
  return <LayoutWrapper>{children}</LayoutWrapper>;
};

export default Layout;
