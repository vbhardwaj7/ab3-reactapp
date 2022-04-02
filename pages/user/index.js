import Page from "components/layout/Page";
import ProfileContainer from "containers/profile";
import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Flex,
} from "@chakra-ui/react";
import OrdersContainer from "containers/order";
import SessionPage from "containers/session";
import AddressContainer from "containers/address";

const ProfilePage = () => {
  return (
    <Page>
      <Tabs isLazy variant="line" colorScheme="blue">
        <TabList alignItems="center" justifyContent="flex-start" mb="20">
          <Tab
            mr="2"
            _selected={{
              outline: "none",
              borderBottom: "2px solid #3182ce",
            }}
            __focus={{
              boxShadow: "none",
            }}
          >
            Profile
          </Tab>
          <Tab
            mr="2"
            _selected={{
              outline: "none",
              borderBottom: "2px solid #3182ce",
            }}
            __focus={{
              boxShadow: "none",
            }}
          >
            Address
          </Tab>
          <Tab
            mr="2"
            _selected={{
              outline: "none",
              borderBottom: "2px solid #3182ce",
            }}
            __focus={{
              boxShadow: "none",
            }}
          >
            Orders
          </Tab>
          <Tab
            mr="2"
            _selected={{
              outline: "none",
              borderBottom: "2px solid #3182ce",
            }}
            __focus={{
              boxShadow: "none",
            }}
          >
            Sessions
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <ProfileContainer />
          </TabPanel>
          <TabPanel>
            <AddressContainer />
          </TabPanel>
          <TabPanel>
            <OrdersContainer />
          </TabPanel>
          <TabPanel>
            <SessionPage />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Page>
  );
};

export default ProfilePage;
