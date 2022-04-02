import React from "react";
import { Image } from "components/data-display";
import { Flex, Box, Heading, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";

// Styles
const Card = props => (
  <Box
    width="56"
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

// maxW="28"
const CardImageContainer = props => <Box textAlign="center" {...props} />;
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
    <Card onClick={redirectToSingleDealPage} title={deal.dealTitle}>
      <CardImageContainer>
        <Image
          src={deal["imgURL"] ? deal["imgURL"] : deal["imgUrl "]}
          alt={deal.dealTitle}
          width="100%"
          height="100%"
        />
      </CardImageContainer>
      <ContentContainer>
        <Heading
          sx={{
            display: "-webkit-box",
            maxWidth: "200px",
            "-webkit-line-clamp": "2",
            "-webkit-box-orient": "vertical",
            overflow: "hidden",
          }}
          mt={2}
          size="xs"
          textAlign="left"
        >
          {deal.dealTitle}
        </Heading>
        {(deal.originalPrice || deal.itemPrice) && (
          <Flex alignItems="flex-end">
            <Text
              mb="1px"
              color="gray.400"
              textDecoration="line-through"
              fontSize="md"
            >
              &nbsp;{deal.originalPrice || deal.itemPrice}&nbsp;
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
