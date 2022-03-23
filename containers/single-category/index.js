import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Flex, Heading, Box, HStack, Button } from "@chakra-ui/react";
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
  const ITEMS_PER_PAGE = 10;
  const [page, setPage] = useState(1);

  // TODO: API: later add pagination

  console.log({ data });

  useEffect(() => {
    // TODO: handle incorrect category-name
  }, [isLoading, categoryId]);

  // TODO: handle empty state

  if (isLoading) {
    return <>Loading...</>;
  }

  console.log({ data, m: page * ITEMS_PER_PAGE });

  //  UI: Category Dynamic Heading
  //  create grid for products listing
  return (
    <>
      <Heading align="center">{data ? data[0].dealCategory : ""}</Heading>
      <Flex wrap="wrap" my={12}>
        {(data || [])
          .slice((page - 1) * ITEMS_PER_PAGE, page * ITEMS_PER_PAGE)
          .map((deal, index) => (
            <Box m={2} key={index}>
              <DealCard deal={{ ...deal, dealTitle: deal.itemTitle }} />
            </Box>
          ))}
      </Flex>
      <HStack justifyContent="center">
        <Button
          isDisabled={page === 1}
          onClick={() => {
            setPage(p => p - 1);
          }}
        >
          Previous
        </Button>
        <Button
          onClick={() => {
            setPage(p => p + 1);
          }}
          isDisabled={page * ITEMS_PER_PAGE > data?.length}
        >
          Next
        </Button>
      </HStack>
    </>
  );
};

export default SingleCategoryContainer;
