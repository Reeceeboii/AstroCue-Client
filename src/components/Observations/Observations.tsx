import { Box, Button, Grid, Select, Stack } from '@mui/material';
import { useRef, useState } from 'react';
import { useAstroCueObjectContext } from '../../Context/AstroCueObjectContext';
import { useAstroCueContext } from '../../Context/AstroCueUserContext';
import AddIcon from '@mui/icons-material/Add';
import Observation from './Observation';
import { OutboundObservationModel } from '../../lib/Models/Outbound/OutboundObservationModel';
import DeleteObservationDialog from './DeleteObservationDialog';

const Observations = () => {
  // contexts
  const { astroCueUser } = useAstroCueContext();
  const { observations } = useAstroCueObjectContext();

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
        >
          New observation
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
          {observations !== undefined && observations.length !== 0
            ? observations.map((observation) => (
                <Grid item xs={12} sm={12} md={8} lg={3} key={observation.id}>
                  <Observation
                    observation={observation}
                    onDelete={onDeleteObservation}
                  />
                </Grid>
              ))
            : ' '}
        </Grid>
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
