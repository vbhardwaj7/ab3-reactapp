import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { Flex, Heading, Box } from "@chakra-ui/react";
import { useQuery } from "react-query";
import axios from "axios";
import { DealCard } from "components/cards";

const getCategoryDeals = categoryId => {
  // API: create API handler
  // TODO: API: support dynamic category
  return axios
    .post(`https://api.octank.click/getitemsbycategory`, { categoryId })
    .then(({ data: { itemsByCategory } }) => itemsByCategory);
};

const useGetCategoryDeals = categoryId => {
  // TODO: API: create API Hook
  return useQuery(
    ["category", categoryId],
    () => getCategoryDeals(categoryId),
    {
      enabled: !!categoryId,
    }
  );
};

const SingleCategoryContainer = () => {
  const {
    query: { categoryId },
  } = useRouter();

  // use category to get deals for that category
  const { data, error, isLoading } = useGetCategoryDeals(categoryId);

  // TODO: API: later add pagination

  console.log({ data });

  useEffect(() => {
    // TODO: handle incorrect category-name
  }, [isLoading, categoryId]);

  // TODO: handle empty state

  if (isLoading) {
    return <>Loading...</>;
  }

  console.log({ data });

  //  UI: Category Dynamic Heading
  //  create grid for products listing
  return (
    <>
      <Heading align="center">{data ? data[0].dealCategory : ""}</Heading>
      <Flex wrap="wrap" my={12}>
        {(data || []).map((deal, index) => (
          <Box m={2} key={index}>
            <DealCard deal={{ ...deal, dealTitle: deal.itemTitle }} />
          </Box>
        ))}
      </Flex>
    </>
  );
};

export default SingleCategoryContainer;
