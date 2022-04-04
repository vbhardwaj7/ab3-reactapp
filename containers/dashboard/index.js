import React, { useState } from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { DealCard } from "components/cards";
import {
  Box,
  Flex,
  Heading,
  IconButton,
  Skeleton,
  SkeletonCircle,
  Spinner,
  Text,
  useMediaQuery,
  useTheme,
} from "@chakra-ui/react";
import ItemsCarousel from "react-items-carousel";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { BASE_API_URL, LOGIN_PAGE_URL } from "utils/constants";

const Section = () => {
  // TODO: Section Component
  return <div>Hey from Section...</div>;
};

const DealOfDaySection = ({ deals }) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const isWidthMoreThan550px = useMediaQuery("(min-width: 550px)");
  const isMediumDeviceAndUp = useMediaQuery("(min-width: 768px)");
  const isDesktopDeviceAndUp = useMediaQuery("(min-width: 1024px)");
  // console.log({ deals });
  const getChevronWidth = () =>
    isDesktopDeviceAndUp
      ? 50
      : isMediumDeviceAndUp
      ? 40
      : isWidthMoreThan550px
      ? 20
      : 12;
  const getNumberOfCards = () =>
    isDesktopDeviceAndUp
      ? 4
      : isMediumDeviceAndUp
      ? 2
      : isWidthMoreThan550px
      ? 2
      : 1;

  // TODO: Deal of day
  return (
    <div style={{ marginTop: "40px" }}>
      <Heading align="center">Deal of the Day</Heading>
      <div
        style={{
          padding: `0 ${getChevronWidth()}px`,
          maxWidth: "1340px",
          margin: "40px auto 0",
          paddingBottom: "40px",
          WebkitTapHighlightColor: "transparent",
        }}
      >
        <ItemsCarousel
          requestToChangeActive={setActiveItemIndex}
          activeItemIndex={activeItemIndex}
          numberOfCards={getNumberOfCards()}
          gutter={isDesktopDeviceAndUp ? 47 : isMediumDeviceAndUp ? 22 : 10}
          showSlither={isMediumDeviceAndUp ? false : true}
          leftChevron={
            <IconButton isRound aria-label="Go Left" icon={<AiOutlineLeft />} />
          }
          rightChevron={
            <IconButton
              isRound
              aria-label="Go Right"
              icon={<AiOutlineRight />}
            />
          }
          outsideChevron
          chevronWidth={getChevronWidth()}
        >
          {deals?.map(deal => (
            <DealCard key={deal.itemId} deal={deal} />
          ))}
        </ItemsCarousel>
      </div>
    </div>
  );
};

const SingleCategoryDealsSection = ({ categoryName, list }) => {
  // TODO: Single Category Deals
  // console.log({ categoryName }, list);
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const isWidthMoreThan550px = useMediaQuery("(min-width: 550px)");
  const isMediumDeviceAndUp = useMediaQuery("(min-width: 768px)");
  const isDesktopDeviceAndUp = useMediaQuery("(min-width: 1024px)");
  // console.log({ list });
  const getChevronWidth = () =>
    isDesktopDeviceAndUp
      ? 50
      : isMediumDeviceAndUp
      ? 40
      : isWidthMoreThan550px
      ? 20
      : 12;
  const getNumberOfCards = () =>
    isDesktopDeviceAndUp
      ? 4
      : isMediumDeviceAndUp
      ? 2
      : isWidthMoreThan550px
      ? 2
      : 1;

  return (
    <div style={{ marginTop: "80px" }}>
      <Heading align="center">Latest {categoryName} Deals</Heading>
      <div
        style={{
          padding: `0 ${getChevronWidth()}px`,
          maxWidth: "1340px",
          margin: "40px auto 0",
          paddingBottom: "40px",
          WebkitTapHighlightColor: "transparent",
        }}
      >
        <ItemsCarousel
          requestToChangeActive={setActiveItemIndex}
          activeItemIndex={activeItemIndex}
          numberOfCards={getNumberOfCards()}
          gutter={isDesktopDeviceAndUp ? 47 : isMediumDeviceAndUp ? 22 : 10}
          showSlither={isMediumDeviceAndUp ? false : true}
          leftChevron={
            <IconButton isRound aria-label="Go Left" icon={<AiOutlineLeft />} />
          }
          rightChevron={
            <IconButton
              isRound
              aria-label="Go Right"
              icon={<AiOutlineRight />}
            />
          }
          outsideChevron
          chevronWidth={getChevronWidth()}
        >
          {list[0]?.map(deal => (
            <DealCard key={deal.itemId} deal={deal} />
          ))}
        </ItemsCarousel>
      </div>
    </div>
  );
};
const CategoriesSection = ({ categories }) => {
  // console.log({ categories });
  // TODO: Browse products by category
  // console.log({ categories });
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const isWidthMoreThan550px = useMediaQuery("(min-width: 550px)");
  const isMediumDeviceAndUp = useMediaQuery("(min-width: 768px)");
  const isDesktopDeviceAndUp = useMediaQuery("(min-width: 1024px)");
  // console.log({ categories });
  const getChevronWidth = () =>
    isDesktopDeviceAndUp
      ? 50
      : isMediumDeviceAndUp
      ? 40
      : isWidthMoreThan550px
      ? 20
      : 12;
  const getNumberOfCards = () =>
    isDesktopDeviceAndUp
      ? 4
      : isMediumDeviceAndUp
      ? 2
      : isWidthMoreThan550px
      ? 2
      : 1;

  return (
    <div style={{ marginTop: "80px" }}>
      <Heading align="center">Categories</Heading>
      <div
        style={{
          padding: `0 ${getChevronWidth()}px`,
          maxWidth: "1340px",
          margin: "40px auto 0",
          paddingBottom: "40px",
          WebkitTapHighlightColor: "transparent",
        }}
      >
        <ItemsCarousel
          requestToChangeActive={setActiveItemIndex}
          activeItemIndex={activeItemIndex}
          numberOfCards={getNumberOfCards()}
          gutter={isDesktopDeviceAndUp ? 47 : isMediumDeviceAndUp ? 22 : 10}
          showSlither={isMediumDeviceAndUp ? false : true}
          leftChevron={
            <IconButton isRound aria-label="Go Left" icon={<AiOutlineLeft />} />
          }
          rightChevron={
            <IconButton
              isRound
              aria-label="Go Right"
              icon={<AiOutlineRight />}
            />
          }
          outsideChevron
          chevronWidth={getChevronWidth()}
        >
          {categories?.map(deal => (
            <DealCard
              key={deal.categoryId}
              deal={{
                "imgUrl ": deal["categoryImageURL"],
                dealTitle: deal.dealCategory,
                categoryId: deal.categoryId,
              }}
              isCategory
            />
          ))}
        </ItemsCarousel>
      </div>
    </div>
  );
};

const getDashboard = async () => {
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
    .get(`${process.env.NEXT_PUBLIC_API_URL}getdashboard`, {
      headers: {
        Authorizer: accessToken,
      },
    })
    .then(({ data, status }) => {
      // check for 401
      console.log({ status, data });
      if (status === 401) {
        window.location.replace(process.env.NEXT_PUBLIC_LOGIN_PAGE_URL);
      } else {
        return data;
      }
    })
    .catch(err => {
      window.location.replace(process.env.NEXT_PUBLIC_LOGIN_PAGE_URL);
    });
};

const useGetDashboard = () => {
  return useQuery("getDashboard", getDashboard);
};

const DashboardContainer = () => {
  const { data, error, isLoading } = useGetDashboard();

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

  return (
    <>
      <DealOfDaySection deals={data?.dealsOfTheDay} />
      {data?.dealsByCategory.map(category => {
        let categoryName = "";
        const list = [];
        Object.keys(category).forEach(c => {
          list.push(category[c]);
          categoryName = c;
        });
        return (
          <SingleCategoryDealsSection
            key={categoryName}
            categoryName={categoryName}
            list={list}
          />
        );
      })}
      <CategoriesSection categories={data?.dealCategories} />
    </>
  );
};

export default DashboardContainer;
