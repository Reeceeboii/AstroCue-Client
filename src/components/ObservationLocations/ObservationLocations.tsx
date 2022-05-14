import AddLocationIcon from '@mui/icons-material/AddLocation';
import { Box, Button, Grid } from '@mui/material';
import React, { useContext, useRef } from 'react';
import { AstroCueObjectContext } from '../../Context/AstroCueObjectContext';
import { InboundObsLocationModel } from '../../lib/Models/Inbound/InboundObsLocationModel';
import { OutboundObsLocationModel } from '../../lib/Models/Outbound/OutboundObsLocationModel';
import DeleteObservationLocationDialog from './DeleteObservationLocationDialog';
import EditObservationLocationDialog from './EditObservationLocationDialog';
import NewObservationLocationDialog from './NewObservationLocationDialog';
import ObservationLocation from './ObservationLocation';

const ObservationLocations = () => {
  const { observationLocations } = useContext(AstroCueObjectContext);

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
      <Box>
        <Grid
          container
          alignItems='stretch'
          justifyContent='center'
          spacing={2}
        >
          {observationLocations?.map((observationLocation) => (
            <Grid
              item
              xs={12}
              sm={12}
              md={8}
              lg={3}
              key={`${observationLocation.id}
                ${observationLocation.name}
                ${observationLocation.latitude}
                ${observationLocation.longitude}`}
            >
              <ObservationLocation
                location={observationLocation}
                onDelete={onDeleteLocation}
                onEdit={onEditLocation}
              />
            </Grid>
          ))}
        </Grid>
      </Box>
      <DeleteObservationLocationDialog
        open={deleteDialogOpen}
        handleClose={() => setDeleteDialogOpen(false)}
        location={targetedForDeletetion.current}
      />
      <NewObservationLocationDialog
        open={newDialogOpen}
        handleClose={() => setNewDialogOpen(false)}
      />
      <EditObservationLocationDialog
        open={editDialogOpen}
        handleClose={() => setEditDialogOpen(false)}
        location={targetedForEdit.current}
        targetedId={targetedForEditId.current}
      />
    </div>
  );
};

export default ObservationLocations;
