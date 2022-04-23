import { Box, Button, Divider, Grid, Stack, Typography } from '@mui/material';
import { useAstroCueObjectContext } from '../../Context/AstroCueObjectContext';
import AddchartIcon from '@mui/icons-material/Addchart';
import Report from './Report';
import { OutboundReportModel } from '../../lib/Models/Outbound/OutboundReportModel';
import GenerateReportsDialog from './GenerateReportsDialog';
import { useRef, useState } from 'react';
import useAxios from 'axios-hooks';
import APIEndpoints from '../../lib/Constants/Endpoints';
import { toast } from 'react-toastify';
import DeleteReportDialog from './DeleteReportDialog';

const Reports = () => {
  const { locReports } = useAstroCueObjectContext();

  const targetedForDeletion = useRef<OutboundReportModel | null>(null);

  const [generateDialogOpen, setGenerateDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const [{}, deleteReport] = useAxios(
    {
      url: APIEndpoints.Report.Delete,
      method: 'DELETE',
    },
    { manual: true },
  );

  const handleDelete = (model: OutboundReportModel) => {
    targetedForDeletion.current = model;
    setDeleteDialogOpen(true);
  };

  return (
    <div>
      <Box textAlign='center' paddingBottom={3} paddingTop={3}>
        <Button
          variant='contained'
          startIcon={<AddchartIcon />}
          onClick={() => setGenerateDialogOpen(true)}
        >
          Generate reports
        </Button>
      </Box>
      <Box>
        {locReports !== undefined && locReports.length !== 0
          ? locReports.map(
              (locReport) =>
                locReport.reports.length !== 0 && (
                  <Stack direction='column' key={locReport.name}>
                    <div>
                      <Typography variant='h4' sx={{ marginTop: '15px' }}>
                        {locReport.name}{' '}
                      </Typography>
                      <Typography variant='button' color='text.disabled'>
                        {`${locReport.bortleDesc} (${locReport.reports.length} reports)`}
                      </Typography>
                      <Divider
                        orientation='horizontal'
                        sx={{ marginBottom: '20px' }}
                      />
                      <Grid
                        container
                        alignItems='stretch'
                        justifyContent='left'
                        spacing={2}
                      >
                        {locReport.reports.map((report) => (
                          <Grid
                            item
                            xs={12}
                            sm={12}
                            md={6}
                            lg={3}
                            xl={2}
                            key={report.id}
                          >
                            <Report
                              report={report}
                              onDelete={(model: OutboundReportModel) =>
                                handleDelete(model)
                              }
                            />
                          </Grid>
                        ))}
                      </Grid>
                    </div>
                  </Stack>
                ),
            )
          : ' '}
        <GenerateReportsDialog
          open={generateDialogOpen}
          handleClose={() => setGenerateDialogOpen(false)}
        />
        <DeleteReportDialog
          report={targetedForDeletion.current}
          open={deleteDialogOpen}
          handleClose={() => setDeleteDialogOpen(false)}
        />
      </Box>
    </div>
  );
};

export default Reports;
