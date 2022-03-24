import React from "react";
import { Box, Button, Flex, HStack, Text, VStack } from "@chakra-ui/react";

const SessionCard = ({ session }) => {
  return (
    <Box
      px="16"
      pt="12"
      pb="6"
      borderRadius="xl"
      bgColor="transparent"
      border="1px solid black"
    >
      <VStack align="flex-start">
        <HStack>
          <Text w="60">Device</Text>
          <Text>{session.deviceName}</Text>
        </HStack>
        <HStack>
          <Text w="60">Operating System</Text>
          <Text>{session.operatingSystem}</Text>
        </HStack>
        <HStack>
          <Text w="60">IP Address</Text>
          <Text>{session.iPAddress}</Text>
        </HStack>
        <HStack>
          <Text w="60">Last logged in Time</Text>
          <Text>{session.sessionCreationTime}</Text>
        </HStack>
        <Flex w="100%" pt="6" justifyContent="center">
          <Button variant="outline" colorScheme="red">
            &nbsp;Logout&nbsp;
          </Button>
        </Flex>
      </VStack>
    </Box>
  );
};

export default SessionCard;
