import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { Box, Heading, VStack } from "@chakra-ui/react";
import { OrderOverviewCard } from "components/cards";

const List = props => <VStack mt="16" spacing="6" {...props} />;

const getOrders = () => {
  return axios
    .get(`https://api.octank.click/getorderhistorybyuserid`)
    .then(({ data: { orderHistory } }) => orderHistory);
};

const useGetOrders = () => {
  // TODO: Attach auth token
  // TODO: Handle 401 request
  return useQuery("getOrders", getOrders);
};

const OrdersContainer = () => {
  const { data, isLoading } = useGetOrders();

  if (isLoading) {
    return <>Loading...</>;
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
