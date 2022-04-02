import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BASE_API_URL, LOGIN_PAGE_URL } from "utils/constants";
import { useRouter } from "next/router";

const getUserProfile = () => {
  let accessToken = "";

  // check for storage
  accessToken = sessionStorage.getItem("accessToken");

  // Check for url
  if (window?.location?.hash) {
    accessToken = window.location.hash.split("&")[1].split("=")[1];
  }

  if (!accessToken) {
    window.location.replace(LOGIN_PAGE_URL);
  }

  return axios
    .get(`${BASE_API_URL}getuserrecord`, {
      headers: {
        Authorizer: accessToken,
      },
    })
    .then(({ data, status }) => {
      if (status === 401) {
        window.location.replace(LOGIN_PAGE_URL);
      } else {
        return data;
      }
    });
};

const useGetUserProfile = () => {
  return useQuery("profile", getUserProfile);
};

const ProfileContainer = () => {
  const { data, isLoading } = useGetUserProfile();

  const { push } = useRouter();

  const handleLoggedInUsersClick = () => {
    push(`/user/sessions`);
  };

  // console.log({ data, isLoading });

  if (isLoading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="80vh"
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
      <Heading align="center">User Profile</Heading>
      <VStack spacing="4" align="center" my="28" mx="auto" maxW="container.md">
        <VStack align="flex-start">
          <HStack align="flex-start">
            <Text fontWeight="bold" align="left" w="80">
              Email
            </Text>
            <Text align="left">{data?.userEmail}</Text>
          </HStack>
          <HStack align="flex-start">
            <Text fontWeight="bold" align="left" w="80">
              Loyalty Program No.
            </Text>
            <Text align="left">{data?.userLoyaltyNumber}</Text>
          </HStack>
          <HStack align="flex-start">
            <Text fontWeight="bold" align="left" w="80">
              Date of Birth
            </Text>
            <Text align="left">{data?.userDateOfBirth}</Text>
          </HStack>
          <HStack align="flex-start">
            <Text fontWeight="bold" align="left" w="80">
              Phone Number
            </Text>
            <Text align="left">{data?.userPhoneNumber}</Text>
          </HStack>
          <HStack align="flex-start">
            <Text fontWeight="bold" align="left" w="80">
              Home Address
            </Text>
            <Text align="left">
              {data?.address?.homeAddresses?.map(address => {
                return (
                  <>
                    {address.unit}
                    <br />
                    {address.street}
                    <br />
                    {address.city}
                    <br />
                    {address.country}
                    <br />
                    {address.zipCode}
                    <br />
                  </>
                );
              })}
            </Text>
          </HStack>
          <HStack align="flex-start">
            <Text fontWeight="bold" align="left" w="80">
              Business Address
            </Text>
            <Text align="left">
              {" "}
              {data?.address?.businessAddresses?.map(address => {
                return (
                  <>
                    {address.unit}
                    <br />
                    {address.street}
                    <br />
                    {address.city}
                    <br />
                    {address.country}
                    <br />
                    {address.zipCode}
                    <br />
                  </>
                );
              })}
            </Text>
          </HStack>
        </VStack>
      </VStack>
      <Flex justifyContent="center">
        <Button size="sm" onClick={handleLoggedInUsersClick} colorScheme="blue">
          View Active Sessions
        </Button>
      </Flex>
    </Box>
  );
};

export default ProfileContainer;
