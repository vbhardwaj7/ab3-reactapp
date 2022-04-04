import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Flex, Heading, Box, HStack, Button, Spinner } from "@chakra-ui/react";
import { useQuery } from "react-query";
import axios from "axios";
import { DealCard } from "components/cards";
import { BASE_API_URL, LOGIN_PAGE_URL } from "utils/constants";

const getCategoryDeals = categoryId => {
  let accessToken = "";

  // check for storage
  accessToken = sessionStorage.getItem("accessToken");

  // Check for url
  if (window?.location?.hash) {
    accessToken = window.location.hash.split("&")[1].split("=")[1];
  }

  if (!accessToken) {
    window.location.replace(process.env.NEXT_PUBLIC_LOGIN_PAGE_URL);
  }

  return axios
    .post(
      `${process.env.NEXT_PUBLIC_API_URL}put/getitemsbycategory`,
      { categoryId },
      {
        headers: {
          Authorizer: accessToken,
        },
      }
    )
    .then(({ data: { itemsByCategory }, status }) => {
      if (status === 401) {
        window.location.replace(process.env.NEXT_PUBLIC_LOGIN_PAGE_URL);
      } else {
        return itemsByCategory;
      }
    })
    .catch(err => {
      window.location.replace(process.env.NEXT_PUBLIC_LOGIN_PAGE_URL);
    });
};

const useGetCategoryDeals = categoryId => {
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
  const ITEMS_PER_PAGE = 12;
  const [page, setPage] = useState(1);

  // TODO: API: later add pagination

  // console.log({ data });

  useEffect(() => {
    // TODO: handle incorrect category-name
  }, [isLoading, categoryId]);

  // TODO: handle empty state

  if (isLoading) {
    return (
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="80vh"
      >
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
        />
      </Box>
    );
  }

  // console.log({ data, m: page * ITEMS_PER_PAGE });

  //  UI: Category Dynamic Heading
  //  create grid for products listing
  return (
    <>
      <Heading align="center">{data ? data[0].itemCategory : ""}</Heading>
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
