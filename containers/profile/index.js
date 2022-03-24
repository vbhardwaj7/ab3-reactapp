import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { BASE_API_URL } from "utils/constants";

const getUserProfile = () => {
  // TODO: implement access token...
  return axios.get(`${BASE_API_URL}getuserrecord`).then(({ data }) => data);
};

const useGetUserProfile = () => {
  return useQuery("profile", getUserProfile);
};

const ProfileContainer = () => {
  const { data, isLoading } = useGetUserProfile();

  console.log({ data, isLoading });

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <Box>
      <Heading align="center">User Profile</Heading>
      <Box my="20" mx="auto" maxW="container.md">
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
            <Text align="left">{data?.address[0]?.addressName}</Text>
          </HStack>
          <HStack align="flex-start">
            <Text fontWeight="bold" align="left" w="80">
              Business Address
            </Text>
            <Text align="left">{data?.address[1]?.businessAddress}</Text>
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

export default ProfileContainer;
