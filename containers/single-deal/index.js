import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useQuery } from "react-query";
import axios from "axios";
import { Box, Button, Flex, Heading, Text, VStack } from "@chakra-ui/react";
import { Image } from "components/data-display";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

// TODO: API: integrate single deal API handler
const getItemDetails = dealId =>
  // TODO: API: remove mock data
  axios.post(`https://api.octank.click/getitemdetails`).then(({ data }) => ({
    dealCategory: "Office Products",
    dealId: "01BX5ZZKBKACTAV9WEVGEMMVRY",
    dealPrice: "3",
    dealTitle: "35% off on Paper",
    "imgUrl ":
      "https://images-na.ssl-images-amazon.com/images/I/71XrK2g-BlL._AC._SR360,460.jpg",
    itemId: "8",
    originalPrice: "5",
    likesCount: "300",
    description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit voluptate eos odio ex sequi dolorum fuga ut incidunt dolorem minus enim saepe quam exercitationem eligendi, reiciendis quos, aperiam quasi optio.
    Illo maiores deserunt, error ex delectus, eum quidem quibusdam doloremque omnis necessitatibus inventore! Aperiam maxime ad fugit dolorem perferendis aut! Ut, labore facere? Officiis, dolorum doloremque unde quod suscipit nulla?
    Sint quo maxime commodi cum numquam autem sequi atque illum ipsum dolores illo culpa perspiciatis quam animi voluptatem libero, fugit neque quos sed voluptates recusandae minus voluptatum tenetur. Iste, natus!`,
  }));

// TODO: API: integrate single deal API hook
const useGetItemDetails = dealId => {
  return useQuery(["deal", dealId], () => getItemDetails(dealId), {
    enabled: !!dealId,
  });
};

const CardImageContainer = props => (
  <Box maxW="36" textAlign="center" {...props} />
);

const SingleDealContainer = () => {
  // TODO: get deal id from URL
  const {
    query: { dealId },
  } = useRouter();

  const { data, error, isLoading } = useGetItemDetails(dealId);
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
          alt={data?.dealTitle}
          width="100%"
          height="100%"
        />
      </CardImageContainer>
      <Flex mb="12" justify="flex-end">
        <Button colorScheme="blue" leftIcon={<AiOutlineHeart />}>
          {data?.likesCount}
        </Button>
      </Flex>
      <VStack align="flex-start">
        <Text mb="-2" color="blue.600">
          {data?.dealCategory}
        </Text>
        <Heading size="2xl">{data?.dealTitle}</Heading>
        <Text>{data?.description}</Text>
      </VStack>
    </VStack>
  );
};

export default SingleDealContainer;
