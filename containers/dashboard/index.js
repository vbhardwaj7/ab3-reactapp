import { useState } from "react";
import React from "react";
import { useQuery } from "react-query";
import axios from "axios";
import { DealCard } from "components/cards";
import { Heading, IconButton, useMediaQuery, useTheme } from "@chakra-ui/react";
import ItemsCarousel from "react-items-carousel";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const Section = () => {
  // TODO: Section Component
  return <div>Hey from Section...</div>;
};

const DealOfDaySection = ({ deals }) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const isWidthMoreThan550px = useMediaQuery("(min-width: 550px)");
  const isMediumDeviceAndUp = useMediaQuery("(min-width: 768px)");
  const isDesktopDeviceAndUp = useMediaQuery("(min-width: 1024px)");
  console.log({ deals });
  const getChevronWidth = () =>
    isDesktopDeviceAndUp
      ? 60
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
          {deals.map(deal => (
            <DealCard key={deal.itemId} deal={deal} />
          ))}
        </ItemsCarousel>
      </div>
    </div>
  );
};

const SingleCategoryDealsSection = ({ categoryName, list }) => {
  // TODO: Single Category Deals
  console.log({ categoryName }, list);
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const isWidthMoreThan550px = useMediaQuery("(min-width: 550px)");
  const isMediumDeviceAndUp = useMediaQuery("(min-width: 768px)");
  const isDesktopDeviceAndUp = useMediaQuery("(min-width: 1024px)");
  console.log({ list });
  const getChevronWidth = () =>
    isDesktopDeviceAndUp
      ? 60
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
          {list[0].map(deal => (
            <DealCard key={deal.itemId} deal={deal} />
          ))}
        </ItemsCarousel>
      </div>
    </div>
  );
};
const CategoriesSection = ({ categories }) => {
  // TODO: Browse products by category
  console.log({ categories });
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const isWidthMoreThan550px = useMediaQuery("(min-width: 550px)");
  const isMediumDeviceAndUp = useMediaQuery("(min-width: 768px)");
  const isDesktopDeviceAndUp = useMediaQuery("(min-width: 1024px)");
  console.log({ categories });
  const getChevronWidth = () =>
    isDesktopDeviceAndUp
      ? 60
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
          {categories.map(deal => (
            <DealCard
              key={deal.categoryId}
              deal={{
                "imgUrl ": deal["categoryImageURL"],
                dealTitle: deal.dealCategory,
              }}
            />
          ))}
        </ItemsCarousel>
      </div>
    </div>
  );
};

const getDashboard = async () => {
  return axios
    .get(`https://api.octank.click/getdashboard`)
    .then(({ data }) => data);
};

const useGetDashboard = () => {
  return useQuery("getDashboard", getDashboard);
};

const DashboardContainer = () => {
  const { data, error, isLoading } = useGetDashboard();
  console.log({ data, error, isLoading });

  if (isLoading) {
    return <>Loading...</>;
  }

  return (
    <>
      <DealOfDaySection deals={data.dealsOfTheDay} />
      {data.dealsByCategory.map(category => {
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
      <CategoriesSection categories={data.dealCategories} />
    </>
  );
};

export default DashboardContainer;
