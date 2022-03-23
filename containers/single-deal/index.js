import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import axios from "axios";
import { Box, Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { Image } from "components/data-display";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

// TODO: API: integrate single deal API handler
// TODO: API: remove mock data
const getItemDetails = itemId =>
  axios
    .post(`https://api.octank.click/getitemdetails`, { itemId })
    .then(({ data }) => ({
      itemId: "28",
      itemTitle: "Item Title 28",
      itemDesc:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
      "imgUrl ":
        "https://m.media-amazon.com/images/I/71eGb1FcyiL._AC_SL1500_.jpg",
      originalPrice: "5",
      dealPrice: "3",
      itemCategory: "Office",
      itemLikeCount: "300",
    }));

// TODO: API: integrate single deal API hook
const useGetItemDetails = itemId => {
  return useQuery(["deal", itemId], () => getItemDetails(itemId), {
    enabled: !!itemId,
  });
};

const CardImageContainer = props => (
  <Box maxW="36" textAlign="center" {...props} />
);

const SingleDealContainer = () => {
  // TODO: get deal id from URL
  const {
    query: { itemId },
  } = useRouter();

  const { data, error, isLoading } = useGetItemDetails(itemId);
  console.log({ data, isLoading });

  // UI: create product image image UI
  // UI: create Likes Button
  // UI: create deal details section

  // TODO: If no product found, then redirect to previous page
  // TODO: if 401, then send user to login page

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <VStack>
      <CardImageContainer>
        <Image
          src={data?.["imgUrl "]}
          alt={data?.itemTitle}
          width="100%"
          height="100%"
        />
      </CardImageContainer>
      <Flex mb="12" justify="flex-end">
        <Button colorScheme="blue" leftIcon={<AiOutlineHeart />}>
          {data?.itemLikeCount}
        </Button>
      </Flex>
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
