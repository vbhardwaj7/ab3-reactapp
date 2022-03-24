import React from "react";
import { Image } from "components/data-display";
import { Flex, Box, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

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
  const { push } = useRouter();
  // TODO: redirect to required card
  const redirectToSingleDealPage = () => {
    if (isCategory) {
      push(`/category/${deal.categoryId}`);
    } else {
      push(`/deal/${deal.itemId}`);
    }
  };
  // console.log({ deal });
  return (
    <Card onClick={redirectToSingleDealPage}>
      <CardImageContainer>
        <Image
          src={deal["imgUrl "]}
          alt={deal.dealTitle}
          width="100%"
          height="100%"
        />
      </CardImageContainer>
      <ContentContainer>
        <Heading mt={2} size="sm" textAlign="left">
          {deal.dealTitle}
        </Heading>
        {deal.originalPrice && (
          <Flex alignItems="flex-end">
            <Text
              mb="1px"
              color="gray.400"
              textDecoration="line-through"
              fontSize="md"
            >
              &nbsp;{deal.originalPrice}&nbsp;
            </Text>
            <Text mb="0" fontWeight="medium" color="blue.300" fontSize="lg">
              &nbsp;{deal.dealPrice}
            </Text>
          </Flex>
        )}
      </ContentContainer>
    </Card>
  );
};

export default DealCard;
