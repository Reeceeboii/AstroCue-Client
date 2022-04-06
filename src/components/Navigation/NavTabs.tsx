import MapIcon from '@mui/icons-material/Map';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Tab } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';

const NavTabs = () => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setValue(newValue);
  };

  return (
    <TabContext value={value}>
      <TabList onChange={handleChange}>
        <Tab
          icon={<MapIcon />}
          iconPosition='start'
          label='Locations'
          value='1'
        />
        <Tab label='Locations' value='2' />
        <Tab label='Locations' value='3' />
        <Tab label='Locations' value='4' />
      </TabList>
      <TabPanel value='1'>
        <p>observation locations</p>
      </TabPanel>
    </TabContext>
  );
};

export default NavTabs;
