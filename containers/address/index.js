import { Box, Heading, HStack, Spinner, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { BASE_API_URL, LOGIN_PAGE_URL } from "utils/constants";

const getAddresses = () => {
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
    .get(`${BASE_API_URL}getuseraddress`, {
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
    })
    .catch(err => {
      window.location.replace(LOGIN_PAGE_URL);
    });
};
const useGetAddresses = () => {
  return useQuery("addresses", getAddresses);
};

const AddressContainer = () => {
  const { data, isLoading } = useGetAddresses();

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
      <Heading align="center">Address</Heading>
      <VStack spacing="4" align="center" my="28" mx="auto" maxW="container.md">
        <VStack align="flex-start">
          <HStack align="flex-start">
            <Text fontWeight="bold" align="left" w="80">
              Home Address
            </Text>
            <Text align="left">
              {data?.address?.homeAddresses?.map(address => {
                return (
                  <div key={address.zipCode}>
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
                  </div>
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
                  <div key={address.zipCode}>
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
                  </div>
                );
              })}
            </Text>
          </HStack>
        </VStack>
      </VStack>
    </Box>
  );
};

export default AddressContainer;
