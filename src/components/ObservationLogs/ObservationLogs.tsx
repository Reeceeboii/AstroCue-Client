import { Box, Grid } from '@mui/material';
import { useRef, useState } from 'react';
import { useAstroCueObjectContext } from '../../Context/AstroCueObjectContext';
import { OutboundObservationLogModel } from '../../lib/Models/Outbound/OutboundObservationLogModel';
import DeleteObservationLogDialog from './DeleteObservationLogDialog';
import EditObservationLogDialog from './EditObservationLogDialog';
import ExpandedObservationLogDialog from './ExpandedObservationLogDialog';
import ObservationLog from './ObservationLog';

const ObservationLogs = () => {
  const { observationLogs } = useAstroCueObjectContext();

  const [expandedDialogOpen, setExpandedDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const targetedForEdit = useRef<OutboundObservationLogModel | null>(null);
  const targetedForDeletion = useRef<OutboundObservationLogModel | null>(null);
  const targetedForExpansion = useRef<OutboundObservationLogModel | null>(null);

  const handleEdit = (model: OutboundObservationLogModel) => {
    targetedForEdit.current = model;
    setEditDialogOpen(true);
  };

  const handleDelete = (model: OutboundObservationLogModel) => {
    targetedForDeletion.current = model;
    setDeleteDialogOpen(true);
  };

  const handleExpand = (model: OutboundObservationLogModel) => {
    targetedForExpansion.current = model;
    setExpandedDialogOpen(true);
  };

  return (
    <Box textAlign='center' paddingBottom={3} paddingTop={3}>
      <Grid container alignItems='stretch' justifyContent='left' spacing={2}>
        {observationLogs !== undefined &&
          observationLogs.length !== 0 &&
          observationLogs.map((log: OutboundObservationLogModel) => (
            <Grid item xs={12} sm={6} key={log.id}>
              <ObservationLog
                observationLog={log}
                onDelete={(model: OutboundObservationLogModel) => {
                  handleDelete(model);
                }}
                onEdit={(model: OutboundObservationLogModel) => {
                  handleEdit(model);
                }}
                onExpand={(model: OutboundObservationLogModel) => {
                  handleExpand(model);
                }}
              />
            </Grid>
          ))}
      </Grid>
      <ExpandedObservationLogDialog
        observationLog={targetedForExpansion.current}
        open={expandedDialogOpen}
        handleClose={() => setExpandedDialogOpen(false)}
      />
      <DeleteObservationLogDialog
        observationLog={targetedForDeletion.current}
        open={deleteDialogOpen}
        handleClose={() => setDeleteDialogOpen(false)}
      />
      <EditObservationLogDialog
        observationLog={targetedForEdit.current}
        open={editDialogOpen}
        handleClose={() => setEditDialogOpen(false)}
      />
    </Box>
  );
};

export default ObservationLogs;
