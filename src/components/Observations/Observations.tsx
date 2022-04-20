import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Grid, Typography } from '@mui/material';
import { useRef, useState } from 'react';
import { useAstroCueObjectContext } from '../../Context/AstroCueObjectContext';
import { useAstroCueContext } from '../../Context/AstroCueUserContext';
import { OutboundObservationModel } from '../../lib/Models/Outbound/OutboundObservationModel';
import DeleteObservationDialog from './DeleteObservationDialog';
import NewObservationDialog from './NewObservationDialog';
import Observation from './Observation';

const Observations = () => {
  // contexts
  const { observations, observationLocations } = useAstroCueObjectContext();

  // dialog states
  const [newDialogOpen, setNewDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  // delete references
  const targetedForDeletetion = useRef<OutboundObservationModel | null>(null);

  const onDeleteObservation = (obs: OutboundObservationModel) => {
    targetedForDeletetion.current = obs;
    setDeleteDialogOpen(true);
  };

  return (
    <div>
      <Box textAlign='center' paddingBottom={3} paddingTop={3}>
        <Button
          variant='contained'
          startIcon={<AddIcon />}
          onClick={() => setNewDialogOpen(true)}
          disabled={observationLocations?.length === 0}
        >
          New observation
        </Button>
      </Box>
      {observationLocations?.length === 0 && (
        <Typography variant='body2' align='center' color='warning.main'>
          You can&apos;t setup an observation without any observation locations!
        </Typography>
      )}
      <Box>
        <Grid
          container
          alignItems='stretch'
          justifyContent='center'
          spacing={2}
        >
          {observations !== undefined && observations.length !== 0
            ? observations.map((observation) => (
                <Grid item xs={12} sm={12} md={6} lg={3} key={observation.id}>
                  <Observation
                    observation={observation}
                    onDelete={onDeleteObservation}
                  />
                </Grid>
              ))
            : ' '}
        </Grid>
        <NewObservationDialog
          open={newDialogOpen}
          handleClose={() => setNewDialogOpen(false)}
        />
        <DeleteObservationDialog
          observation={targetedForDeletetion.current}
          open={deleteDialogOpen}
          handleClose={() => setDeleteDialogOpen(false)}
        />
      </Box>
    </div>
  );
};

export default Observations;
