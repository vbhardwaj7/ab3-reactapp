import React from "react";
import { Box, Heading, HStack, Text, VStack } from "@chakra-ui/react";
import { useQuery } from "react-query";
import axios from "axios";
import { useRouter } from "next/router";

const List = props => <VStack mt="16" spacing="6" {...props} />;

const getOrderDetails = async id => {
  return axios
    .post(`https://api.octank.click/getorderdetailsbyorderid`)
    .then(({ data: { orderDetails } }) => orderDetails);
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
    return <>Loading...</>;
  }
  console.log({ data, isLoading });
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
          <VStack align="flex-start">
            <HStack>
              <Text fontWeight="bold" w="80">
                Name
              </Text>
              <Text fontWeight="bold">Quantity</Text>
            </HStack>
            {data?.map(item => (
              <HStack
                justifyContent="space-between"
                w="97%"
                key={item.orderId}
              >
                <Text w="80">{item.itemTitle}</Text>
                <Text>2</Text>
              </HStack>
            ))}
          </VStack>
        </Box>
      </List>
    </Box>
  );
};

export default SingleOrderContainer;
