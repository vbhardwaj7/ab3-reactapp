import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Flex, Heading, Box } from "@chakra-ui/react";
import { useQuery } from "react-query";
import axios from "axios";
import { DealCard } from "components/cards";

const getCategoryDeals = category => {
  // API: create API handler
  // TODO: API: support dynamic category
  //   TODO: remove mock items data
  return axios
    .post(`https://api.octank.click/getitemsbycategory`)
    .then(({ data: { itemsByCategory } }) =>
      itemsByCategory.map(item => ({
        dealCategory: "Office Products",
        dealId: "01BX5ZZKBKACTAV9WEVGEMMVRY",
        dealPrice: "3",
        dealTitle: "35% off on Paper",
        "imgUrl ":
          "https://images-na.ssl-images-amazon.com/images/I/71XrK2g-BlL._AC._SR360,460.jpg",
        itemId: "8",
        originalPrice: "5",
      }))
    );
};

const useGetCategoryDeals = category => {
  // TODO: API: create API Hook
  return useQuery(["category", category], () => getCategoryDeals(category), {
    enabled: !!category,
  });
};

const SingleCategoryContainer = () => {
  const {
    query: { category },
  } = useRouter();

  // use category to get deals for that category
  const { data, error, isLoading } = useGetCategoryDeals(category);

  // TODO: API: later add pagination

  console.log({ data });

  useEffect(() => {
    // TODO: handle incorrect category-name
  }, [isLoading, category]);

  // TODO: handle empty state

  if (isLoading) {
    return <>Loading...</>;
  }

  //  UI: Category Dynamic Heading
  //  create grid for products listing
  return (
    <>
      <Heading align="center">{category}</Heading>
      <Flex wrap="wrap" my={12}>
        {(data || []).map((deal, index) => (
          <Box m={2} key={index}>
            <DealCard deal={deal} />
          </Box>
        ))}
        {(data || []).map((deal, index) => (
          <Box m={2} key={index}>
            <DealCard deal={deal} />
          </Box>
        ))}
        {(data || []).map((deal, index) => (
          <Box m={2} key={index}>
            <DealCard deal={deal} />
          </Box>
        ))}
        {(data || []).map((deal, index) => (
          <Box m={2} key={index}>
            <DealCard deal={deal} />
          </Box>
        ))}
        {(data || []).map((deal, index) => (
          <Box m={2} key={index}>
            <DealCard deal={deal} />
          </Box>
        ))}
      </Flex>
    </>
  );
};

export default SingleCategoryContainer;
