import React from "react";
import { Box, Button, Heading, VStack, Flex, Spinner } from "@chakra-ui/react";
import { useQuery } from "react-query";
import axios from "axios";
import { SessionCard } from "components/cards";
import { BASE_API_URL, LOGIN_PAGE_URL } from "utils/constants";

const List = props => <VStack mt="16" spacing="6" {...props} />;

const getActiveSessions = async () => {
  let accessToken = "";

  // check for storage
  accessToken = sessionStorage.getItem("accessToken");

  // Check for url
  if (window?.location?.hash) {
    accessToken = window.location.hash.split("&")[1].split("=")[1];
  }

  if (!accessToken) {
    window.location.replace(process.env.NEXT_PUBLIC_LOGIN_PAGE_URL);
  }

  return axios
    .get(`${process.env.NEXT_PUBLIC_API_URL}getactivesessions`, {
      headers: {
        Authorizer: accessToken,
      },
    })
    .then(({ data: { activeSessions }, status }) => {
      if (status === 401) {
        window.location.replace(process.env.NEXT_PUBLIC_LOGIN_PAGE_URL);
      } else {
        return activeSessions;
      }
    })
    .catch(err => {
      window.location.replace(process.env.NEXT_PUBLIC_LOGIN_PAGE_URL);
    });
};

const useGetActiveSessions = () =>
  useQuery("getActiveSessions", getActiveSessions);

const SessionPage = () => {
  const { data, isLoading } = useGetActiveSessions();

  console.log({ data, isLoading });

  if (isLoading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="40vh"
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Box>
    );
  }

  return (
    <Box>
      <Heading align="center">Active Sessions</Heading>
      <List>
        {(data || [])?.map(session => (
          <SessionCard key={session.sessionId} session={session} />
        ))}
      </List>
      <Flex justifyContent="center" py="16">
        <Button size="lg" colorScheme="red">
          Logout all Devices
        </Button>
      </Flex>
    </Box>
  );
};

export default SessionPage;
