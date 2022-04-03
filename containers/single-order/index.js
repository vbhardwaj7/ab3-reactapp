import React from "react";
import { Box, Heading, HStack, Spinner, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { BASE_API_URL, LOGIN_PAGE_URL } from "utils/constants";
import { Image } from "components/data-display";
import Link from "next/link";

const List = props => <VStack mt="16" spacing="6" {...props} />;

const getOrderDetails = async id => {
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
      `${BASE_API_URL}getorderdetailsbyorderid`,
      { orderId: id },
      {
        headers: {
          Authorizer: accessToken,
        },
      }
    )
    .then(({ data: { orderDetails }, status }) => {
      if (status === 401) {
        window.location.replace(LOGIN_PAGE_URL);
      } else {
        return orderDetails;
      }
    })
    .catch(err => {
      window.location.replace(LOGIN_PAGE_URL);
    });
};

const useGetOrderDetails = id => {
  return useQuery(["getOrderDetails", id], () => getOrderDetails(id), {
    enabled: !!id,
  });
};

const SingleOrderContainer = () => {
  const {
    query: { orderId },
  } = useRouter();

  const { data, isLoading } = useGetOrderDetails(orderId);
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

  // console.log({ data, isLoading });
  return (
    <Box>
      <Heading align="center">Order Details</Heading>
      <List>
        <Box
          px="16"
          py="12"
          borderRadius="xl"
          bgColor="transparent"
          border="1px solid black"
        >
          <VStack align="flex-start" rowGap="8">
            <HStack>
              <Text fontWeight="bold" w="10"></Text>
              <Text fontWeight="bold" w="60"></Text>
              <Text fontWeight="bold" w="60"></Text>
              <Text fontWeight="bold" w="60"></Text>
            </HStack>
            {data?.map(
              (item, index) =>
                console.log({ item }) || (
                  <HStack
                    justifyContent="space-between"
                    w="97%"
                    key={item.orderId}
                    title={item.itemTitle}
                    // my="20"
                  >
                    <Image
                      src={item["imgURL "]}
                      alt={item.itemTitle}
                      width="100%"
                      height="100%"
                    />
                    <Link href={`/deal/${item["itemId"]}`}>
                      <Text
                        w="220px"
                        // marginLeft="auto"
                        sx={{
                          display: "-webkit-box",
                          maxWidth: "200px",
                          "-webkit-line-clamp": "2",
                          "-webkit-box-orient": "vertical",
                          overflow: "hidden",
                        }}
                        color="blue.500"
                        cursor="pointer"
                        _hover={{
                          textDecoration: "underline",
                        }}
                      >
                        {item.itemTitle}
                      </Text>
                    </Link>
                    <Text
                      sx={
                        index === 0
                          ? {
                              "&::after": {
                                content: '"Count"',
                                display: "block",
                                width: "200px",
                                position: "absolute",
                                top: "-80px",
                                left: "-12px",
                              },
                            }
                          : {}
                      }
                      position="relative"
                    >
                      2
                    </Text>
                    <Text
                      sx={
                        index === 0
                          ? {
                              "&::after": {
                                content: '"Quantity"',
                                display: "block",
                                width: "200px",
                                position: "absolute",
                                top: "-80px",
                                left: "-12px",
                              },
                            }
                          : {}
                      }
                      position="relative"
                    >
                      {item.itemPrice}
                    </Text>
                  </HStack>
                )
            )}
          </VStack>
        </Box>
      </List>
    </Box>
  );
};

export default SingleOrderContainer;
