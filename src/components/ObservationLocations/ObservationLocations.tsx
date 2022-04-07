import { Box, Button, Grid, Typography } from '@mui/material';
import { useAstroCueObjectContext } from '../../Context/AstroCueObjectContext';
import { useAstroCueContext } from '../../Context/AstroCueUserContext';
import ObservationLocation from './ObservationLocation';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import React, { useRef } from 'react';
import { OutboundObsLocationModel } from '../../lib/Models/Outbound/OutboundObsLocationModel';
import DeleteDialog from './DeleteDialog';
import NewDialog from './NewDialog';
import EditDialog from './EditDialog';
import { InboundObsLocationModel } from '../../lib/Models/Inbound/InboundObsLocationModel';

const ObservationLocations = () => {
  // contexts
  const { astroCueUser } = useAstroCueContext();
  const { observationLocations, updateObservationLocations } =
    useAstroCueObjectContext();

  // dialog states
  const [newDialogOpen, setNewDialogOpen] = React.useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = React.useState(false);
  const [editDialogOpen, setEditDialogOpen] = React.useState(false);

  // edit and delete references
  const targetedForDeletetion = useRef<OutboundObsLocationModel | null>(null);
  const targetedForEdit = useRef<InboundObsLocationModel | null>(null);
  const targetedForEditId = useRef<number>(0);

  const onDeleteLocation = (location: OutboundObsLocationModel) => {
    targetedForDeletetion.current = location;
    setDeleteDialogOpen(true);
  };

  const onEditLocation = (location: OutboundObsLocationModel) => {
    targetedForEdit.current = location;
    targetedForEditId.current = location.id;
    setEditDialogOpen(true);
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
          marginLeft: '20',
          marginRight: '20',
        }}
      >
        <Grid
          container
          alignItems='stretch'
          justifyContent='center'
          spacing={2}
        >
          {observationLocations !== undefined &&
          observationLocations.length !== 0 ? (
            observationLocations?.map((observationLocation) => (
              <Grid
                item
                xs={12}
                sm={12}
                md={8}
                lg={3}
                key={`${observationLocation.name}
                ${observationLocation.latitude}
                ${observationLocation.longitude}`}
              >
                <ObservationLocation
                  key={observationLocation.id}
                  location={observationLocation}
                  onDelete={onDeleteLocation}
                  onEdit={onEditLocation}
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
        handleClose={() => setDeleteDialogOpen(false)}
        location={targetedForDeletetion.current}
      />
      <NewDialog
        open={newDialogOpen}
        handleClose={() => setNewDialogOpen(false)}
      />
      <EditDialog
        open={editDialogOpen}
        handleClose={() => setEditDialogOpen(false)}
        location={targetedForEdit.current}
        targetedId={targetedForEditId.current}
      />
    </div>
  );
};

export default ObservationLocations;
