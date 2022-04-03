import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Box, Heading, Spinner, VStack } from "@chakra-ui/react";
import { OrderOverviewCard } from "components/cards";
import { BASE_API_URL, LOGIN_PAGE_URL } from "utils/constants";

const List = props => <VStack mt="16" spacing="6" {...props} />;

const getOrders = () => {
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
    .get(`${BASE_API_URL}getorderhistorybyuserid`, {
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

const useGetOrders = () => {
  return useQuery("getOrders", getOrders);
};

const OrdersContainer = () => {
  const { data, isLoading } = useGetOrders();

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

  // console.log({ data });

  return (
    <Box>
      <Heading align="center">Orders</Heading>
      <List>
        {(data || []).map((card, index) => (
          <OrderOverviewCard key={`${index}-${card.orderId}`} data={card} />
        ))}
      </List>
    </Box>
  );
};

export default OrdersContainer;
