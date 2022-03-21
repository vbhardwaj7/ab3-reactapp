import React from "react";
import { Image } from "components/data-display";
import { Flex, Box, Heading, Text } from "@chakra-ui/react";

/* 
dealCategory: "Electronics"
dealId: "01BX5ZZKBKACTAV9WEVGEMMVRY"
dealPrice: "3"
dealTitle: "15% off on Monitors"
"imgUrl ": "https://images-fe.ssl-images-amazon.com/images/I/414e8Ntd7iL._AC_SX184_.jpg"
itemId: "4"
originalPrice: "5"


*/

// Styles
const Card = props => (
  <Box
    width="36"
    height="100%"
    borderRadius="lg"
    textAlign="center"
    border="1px solid #ccc"
    background="white"
    px={4}
    py={4}
    cursor="pointer"
    {...props}
  />
);
const CardImageContainer = props => (
  <Box maxW="28" textAlign="center" {...props} />
);
const ContentContainer = props => <Box {...props} />;

const DealCard = ({ deal, isCategory = false }) => {
  return (
    <Card>
      <CardImageContainer>
        <Image
          src={deal["imgUrl "]}
          alt={deal.dealTitle}
          width="100%"
          height="100%"
          objectFit="contain"
        />
      </CardImageContainer>
      <ContentContainer>
        <Heading mt={2} size="sm" textAlign="left">
          {deal.dealTitle}
        </Heading>
        {deal.originalPrice && (
          <Flex>
            <Box position="relative">
              <Text
                // position="absolute"
                _before={{
                  content: '""',
                  position: "absolute",
                  width: "20px",
                  height: "1px",
                  background: "gray.600",
                  bottom: "5px",
                  transform: "rotate(-45deg)",
                  transformOrigin: "bottom left",
                }}
                color="gray.400"
                // textDecoration="line-through"
                fontSize="lg"
              >
                {deal.originalPrice}&nbsp;
              </Text>
            </Box>
            <Text fontSize="lg">{deal.dealPrice}</Text>
          </Flex>
        )}
      </ContentContainer>
    </Card>
  );
};

export default DealCard;
