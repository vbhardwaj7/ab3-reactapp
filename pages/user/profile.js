import Page from "components/layout/Page";
import ProfileContainer from "containers/profile";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";

const Tabit = () => {
  return (
    <Tabs variant="soft-rounded" colorScheme="blue" orientation="vertical">
      <TabList alignItems="flex-start">
        <Tab mb="1">Profile</Tab>
        <Tab mb="1">Address</Tab>
        <Tab mb="1">Orders</Tab>
        <Tab mb="1">Sessions</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <ProfileContainer />
        </TabPanel>
        <TabPanel>{/* <p>two!</p> */}</TabPanel>
      </TabPanels>
    </Tabs>
  );
};

const ProfilePage = () => {
  return (
    <Page>
      <Tabit />
      {/* <ProfileContainer /> */}
    </Page>
  );
};

export default ProfilePage;
