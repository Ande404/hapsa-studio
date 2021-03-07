import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';

export const AccountTab = ({ data }) => (
  <div>
    <Tabs mt="12">
      <TabList>
        {data.map((tab, index) => (
          <Tab key={index}>{tab.label}</Tab>
        ))}
      </TabList>
      <TabPanels>
        {data.map((tab, index) => (
          <TabPanel p={4} key={index}>
            {tab.content}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  </div>
);
