import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  chakra,
  InputLeftElement,
  Text,
  Box,
  Flex,
  Divider,
  Skeleton,
  SkeletonCircle,
  Input,
  InputGroup,
  InputRightElement,
  Spinner,
} from "@chakra-ui/react";
// import { useForm } from "react-hook-form";
import useDebounce from "hooks/use-debounce";
import { ImSearch } from "react-icons/im";
import { useQuery } from "react-query";
import axios from "axios";
import { useRouter } from "next/router";
import { BASE_API_URL, LOGIN_PAGE_URL } from "utils/constants";

const List = ({ children }) => {
  return (
    <chakra.div maxHeight="420px" overflowY="auto">
      {children}
    </chakra.div>
  );
};
const commonProps = { startColor: "gray.100", endColor: "gray.200" };

const Row = ({
  data,
  isLoading,
  isActive,
  setActiveIndex,
  index,
  handleItemClick,
}) => {
  const { itemTitle, itemId } = data;
  // console.log({ isActive, index });

  const handleClick = () => {
    handleItemClick(itemId);
  };

  const handleMouseEnter = () => {
    if (!isLoading) {
      setActiveIndex(index);
    }
  };
  return (
    <Flex
      align="center"
      w="95%"
      margin="8px auto 8px"
      background="gray.100"
      borderRadius={"9px"}
      py="12px"
      px="12px"
      cursor="pointer"
      onClick={handleClick}
      backgroundColor={isActive ? "blue.300" : "gray.100"}
      color={isActive ? "white" : "gray.600"}
      onMouseEnter={handleMouseEnter}
    >
      {isLoading ? (
        <Skeleton width="100px" height="16px" mt="0" ml="2" {...commonProps} />
      ) : (
        <Text ml={4}>{itemTitle}</Text>
      )}
    </Flex>
  );
};

const searchDeals = async searchInput => {
  let accessToken = "";

  // check for storage
  accessToken = sessionStorage.getItem("accessToken");

  // Check for url
  if (window?.location?.hash) {
    accessToken = window.location.hash.split("&")[1].split("=")[1];
  }

  if (!accessToken) {
    window.location.replace(LOGIN_PAGE_URL);
  }
  return axios
    .post(
      `${BASE_API_URL}searchitems`,
      { textToSearch: searchInput },
      {
        headers: {
          Authorizer: accessToken,
        },
      }
    )
    .then(({ data: { searchResults }, status }) => {
      if (status === 401) {
        window.location.replace(LOGIN_PAGE_URL);
      } else {
        return searchResults;
      }
    });
};

const useSearchDeals = searchInput => {
  return useQuery(["search", searchInput], () => searchDeals(searchInput), {
    enabled: !!searchInput,
  });
};

const SearchDealModal = ({ isOpen, onClose }) => {
  const [input, setInput] = useState("");
  const debouncedSearch = useDebounce(input, 500);
  const [activeIndex, setActiveIndex] = useState(-1);
  const { push } = useRouter();

  const { data, isLoading } = useSearchDeals(debouncedSearch);

  // console.log({ debouncedSearch, data, isLoading });

  const handleChange = e => {
    setInput(e.target.value);
  };

  const handleItemClick = itemId => {
    push(`/deal/${itemId}`);
    onClose();
  };

  const handleKeyDown = e => {
    if (isLoading || !data || !data.length) {
    } else {
      switch (e.code) {
        case "ArrowUp":
          if (activeIndex > 0) {
            setActiveIndex(activeIndex => --activeIndex);
          }
          break;
        case "ArrowDown":
          if (activeIndex < data.length - 1) {
            setActiveIndex(activeIndex => ++activeIndex);
          }
          break;
        default:
          break;
      }
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
      }}
      closeOnEsc
      size="2xl"
      blockScrollOnMount
    >
      <ModalOverlay />
      <ModalContent background="transparent" boxShadow="none">
        <chakra.form
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          mt={8}
          onKeyDown={handleKeyDown}
          onSubmit={e => {
            e.preventDefault();
            if (activeIndex !== -1) {
              handleItemClick(data[activeIndex]?.itemId);
            }
          }}
        >
          <InputGroup>
            <InputLeftElement pointerEvents="none" mt={"18px"} ml="22px">
              <ImSearch />
            </InputLeftElement>
            <Input
              sx={{
                border: "none",
                outline: "none",
                boxShadow: "none",
                height: "76px",
                paddingLeft: "64px",
                background: "white",
              }}
              fontSize="lg"
              _focus={{
                border: "0px solid transparent !important",
              }}
              value={input}
              onChange={handleChange}
            />
            <InputRightElement
              sx={{
                alignItems: "center",
                justifyContent: "middle",
                height: "100%",
                display: isLoading ? "flex" : "none",
              }}
              emptyColor="gray.200"
              color="blue.500"
            >
              <Spinner />
            </InputRightElement>
          </InputGroup>
          <Box
            background="white"
            zIndex={1500}
            marginTop={"-8px"}
            paddingTop="8px"
            display={isLoading || (data && data.length > 0) ? "block" : "none"}
          >
            <List>
              <Divider w="95%" background="gray.300" h="1px" margin="0 auto" />
              {data?.map((deal, index) => (
                <Row
                  key={deal.itemId}
                  data={deal}
                  isLoading={isLoading}
                  handleItemClick={handleItemClick}
                  // onClose={onClose}
                  isActive={activeIndex === index}
                  setActiveIndex={setActiveIndex}
                  index={index}
                />
              ))}
            </List>
          </Box>
        </chakra.form>
        {/* List */}
        {/* - Rows */}
      </ModalContent>
    </Modal>
  );
};

export default SearchDealModal;
