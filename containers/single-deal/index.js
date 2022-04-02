import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import axios from "axios";
import {
  Box,
  Button,
  Flex,
  Heading,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Image } from "components/data-display";
import { AiOutlineHeart } from "react-icons/ai";
import { BASE_API_URL, LOGIN_PAGE_URL } from "utils/constants";

// TODO: API: integrate single deal API handler
// TODO: API: remove mock data
const getItemDetails = itemId => {
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
    .post(
      `${BASE_API_URL}put/getitem`,
      { itemId },
      {
        headers: {
          Authorizer: accessToken,
        },
      }
    )
    .then(({ data, status }) => {
      if (status === 401) {
        window.location.replace(LOGIN_PAGE_URL);
      } else {
        return data;
      }
    });
};
// TODO: API: integrate single deal API hook
const useGetItemDetails = itemId => {
  return useQuery(["deal", itemId], () => getItemDetails(itemId), {
    enabled: !!itemId,
  });
};

const CardImageContainer = props => <Box textAlign="center" {...props} />;

const SingleDealContainer = () => {
  // TODO: get deal id from URL
  const {
    query: { itemId },
  } = useRouter();

  const { data, error, isLoading } = useGetItemDetails(itemId);
  // console.log({ data, isLoading });

  // UI: create product image image UI
  // UI: create Likes Button
  // UI: create deal details section

  // TODO: If no product found, then redirect to previous page
  // TODO: if 401, then send user to login page

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
    <VStack>
      <CardImageContainer>
        <Image
          src={data?.["imgURL "]}
          alt={data?.itemTitle}
          width="100%"
          height="100%"
          style={{
            width: "300px",
            height: "300px",
          }}
        />
        <Flex mt="4" mb="12" justifyContent="flex-end">
          <Button colorScheme="blue" leftIcon={<AiOutlineHeart />}>
            {data?.itemLikeCount}
          </Button>
        </Flex>
      </CardImageContainer>
      <VStack align="flex-start">
        <Text mb="-2" color="blue.600">
          {data?.itemCategory}
        </Text>
        <Heading size="2xl">{data?.itemTitle}</Heading>
        <Text>{data?.itemDesc}</Text>
      </VStack>
    </VStack>
  );
};

export default SingleDealContainer;
