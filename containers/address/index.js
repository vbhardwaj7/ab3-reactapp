import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
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
    .then(({ data: { orderHistory }, status }) => {
      if (status === 401) {
        window.location.replace(LOGIN_PAGE_URL);
      } else {
        return orderHistory;
      }
    });
};
const useGetAddresses = () => {
  return useQuery("addresses", getAddresses);
};

const AddressContainer = () => {
  const { data, isLoading } = useGetAddresses();
  console.log({ data, isLoading });

  return (
    <Box>
      <Heading align="center">Address</Heading>
      {/* <VStack spacing="4" align="center" my="28" mx="auto" maxW="container.md">
        <VStack align="flex-start">
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
      </VStack> */}
    </Box>
  );
};

export default AddressContainer;
