import AssessmentIcon from '@mui/icons-material/Assessment';
import BookIcon from '@mui/icons-material/Book';
import MapIcon from '@mui/icons-material/Map';
import VisibilityIcon from '@mui/icons-material/Visibility';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import { Box, Tab, Typography } from '@mui/material';
import type { NextPage } from 'next';
import { useState } from 'react';
import Layout from '../src/components/Layout/Layout';
import ObservationLocations from '../src/components/ObservationLocations/ObservationLocations';
import useLoginRedirect from '../src/lib/Hooks/useLoginRedirect';

const Tabs = [
  {
    label: 'Locations',
    icon: <MapIcon />,
    longTitle: 'Observation Locations',
    description:
      'Manage your observation locations - these are places you go to carry out your observations',
    component: <ObservationLocations />,
  },
  {
    label: 'Observations',
    icon: <VisibilityIcon />,
    longTitle: 'Astronomical Observations',
    description:
      'Manage your observations - observations are created when you combine an observation location with an astronomical object',
  },
  {
    label: 'Reports',
    icon: <AssessmentIcon />,
    longTitle: 'Observation Reports',
    description:
      'View your observation reports. Generated automatically every ~3 days, or manually on demand',
  },
  {
    label: 'Logs',
    icon: <BookIcon />,
    longTitle: 'Astronomical Logs',
    description: 'Create and view astronomical logs. Record what you saw!',
  },
];

/** Home page */
const Home: NextPage = () => {
  useLoginRedirect();
  const [tabIndex, setTabIndex] = useState('1');

  const handleChange = (_event: React.ChangeEvent<{}>, newValue: string) => {
    setTabIndex(newValue);
  };

  return (
    <Layout>
      <TabContext value={tabIndex}>
        <Box display='flex' justifyContent='center' width='100%'>
          <TabList
            scrollButtons
            allowScrollButtonsMobile
            onChange={handleChange}
            variant='scrollable'
          >
            {Tabs.map((tab, index) => (
              <Tab
                key={index}
                icon={tab.icon}
                iconPosition='start'
                label={tab.label}
                value={(index + 1).toString()}
              />
            ))}
          </TabList>
        </Box>

        {Tabs.map((tab, index) => (
          <TabPanel
            key={index}
            value={(index + 1).toString()}
            sx={{ padding: 0 }}
          >
            <Typography variant='h5' align='center'>
              {tab.longTitle}
            </Typography>
            <Typography
              display='block'
              color='textSecondary'
              variant='caption'
              align='center'
            >
              {tab.description}
            </Typography>
            {tab.component}
          </TabPanel>
        ))}
      </TabContext>
    </Layout>
  );
};

export default Home;
