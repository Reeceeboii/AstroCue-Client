import { Box, Button, Grid, Typography } from '@mui/material';
import { useAstroCueObjectContext } from '../../Context/AstroCueObjectContext';
import { useAstroCueContext } from '../../Context/AstroCueUserContext';
import ObservationLocation from './ObservationLocation';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import React, { useRef } from 'react';
import { OutboundObsLocationModel } from '../../lib/Models/ObservationLocations/OutboundObsLocationModel';
import DeleteDialog from './DeleteDialog';
import NewDialog from './NewDialog';

const ObservationLocations = () => {
  const { astroCueUser } = useAstroCueContext();
  const { observationLocations } = useAstroCueObjectContext();

  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [newDialogOpen, setNewDialogOpen] = React.useState(false);

  const targetedForDeletetion = useRef<OutboundObsLocationModel | null>(null);

  const onDeleteLocation = (location: OutboundObsLocationModel) => {
    targetedForDeletetion.current = location;
    setDeleteDialogOpen(true);
  };

  const handleConfirmDeleteDialogClose = () => {
    setDeleteDialogOpen(false);
  };

  const handleNewDialogClose = () => {
    setNewDialogOpen(false);
  };

  return (
    <div>
      <Box textAlign='center' paddingBottom={3} paddingTop={3}>
        <Button
          variant='contained'
          startIcon={<AddLocationIcon />}
          onClick={() => setNewDialogOpen(true)}
        >
          Add Location
        </Button>
      </Box>
      <Box
        sx={{
          marginLeft: '15vw',
          marginRight: '15vw',
        }}
      >
        <Grid container alignItems='center' justifyContent='center' spacing={2}>
          {observationLocations !== undefined &&
          observationLocations.length !== 0 ? (
            observationLocations?.map((observationLocation) => (
              <Grid item xs={12} sm={6} md={4} key={observationLocation.id}>
                <ObservationLocation
                  location={observationLocation}
                  onDelete={onDeleteLocation}
                />
              </Grid>
            ))
          ) : (
            <Box paddingTop={5}>
              <Typography variant='subtitle1' align='center'>
                {`You don't have any observation locations yet, ${astroCueUser?.firstName}.`}
              </Typography>
              <Typography variant='subtitle1' align='center'>
                Add your first one using the button above!
              </Typography>
            </Box>
          )}
        </Grid>
      </Box>
      <DeleteDialog
        open={deleteDialogOpen}
        handleClose={handleConfirmDeleteDialogClose}
        location={targetedForDeletetion.current}
      />
      <NewDialog open={newDialogOpen} handleClose={handleNewDialogClose} />?
    </div>
  );
};

export default ObservationLocations;
