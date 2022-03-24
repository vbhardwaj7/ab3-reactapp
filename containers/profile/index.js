import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { BASE_API_URL } from "utils/constants";
import { useRouter } from "next/router";

const getUserProfile = () => {
  // TODO: implement access token...
  return axios.get(`${BASE_API_URL}getuserrecord`).then(({ data }) => data);
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
    return <>Loading...</>;
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
            <Text align="left">{data?.address[0]?.addressName}</Text>
          </HStack>
          <HStack align="flex-start">
            <Text fontWeight="bold" align="left" w="80">
              Business Address
            </Text>
            <Text align="left">{data?.address[1]?.businessAddress}</Text>
          </HStack>
        </VStack>
      </VStack>
      <Flex justifyContent="center">
        <Button size="sm" onClick={handleLoggedInUsersClick} colorScheme="blue">
          View Logged in Users
        </Button>
      </Flex>
    </Box>
  );
};

export default ProfileContainer;
