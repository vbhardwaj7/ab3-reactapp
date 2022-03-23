import React from "react";
import { Box, HStack, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";

const OrderOverviewCard = ({ data }) => {
  const { push } = useRouter();

  const handleClick = () => {
    push(`/order/${data.orderId}`);
  };

  return (
    <Box
      px="16"
      py="12"
      borderRadius="xl"
      bgColor="transparent"
      border="1px solid black"
      cursor="pointer"
      _hover={{
        background: "white",
      }}
      onClick={handleClick}
    >
      <VStack align="flex-start">
        <HStack>
          <Text w="40">Number</Text>
          <Text>{data.orderId}</Text>
        </HStack>
        <HStack>
          <Text w="40">Creation Date</Text>
          <Text>{data.orderCreatedAt}</Text>
        </HStack>
        <HStack>
          <Text w="40">Status</Text>
          <Text>{data.orderStatus}</Text>
        </HStack>
        <HStack>
          <Text w="40">Amount</Text>
          <Text>{data.orderAmount}</Text>
        </HStack>
        <HStack>
          <Text w="40">No. of Items</Text>
          <Text>{data.numberOfItemsInOrder}</Text>
        </HStack>
      </VStack>
    </Box>
  );
};

export default OrderOverviewCard;
