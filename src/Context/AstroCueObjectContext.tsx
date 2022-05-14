import useAxios from 'axios-hooks';
import { createContext, useContext, useEffect } from 'react';
import APIEndpoints from '../lib/Constants/Endpoints';
import useIsLoggedIn from '../lib/Hooks/useIsLoggedIn';
import { OutboundObservationLogModel } from '../lib/Models/Outbound/OutboundObservationLogModel';
import { OutboundObservationModel } from '../lib/Models/Outbound/OutboundObservationModel';
import { OutboundObsLocationModel } from '../lib/Models/Outbound/OutboundObsLocationModel';
import { OutboundObsLocReportModel } from '../lib/Models/Outbound/OutboundObsLocReportModel';

/** Interface representing the values stored in the data context */
interface AstroCueObjectContextValues {
  /** Observation locations */
  observationLocations?: OutboundObsLocationModel[];
  /** Updates observation locations from the server */
  updateObservationLocations?: () => void;
  /** Astronomical observations */
  observations?: OutboundObservationModel[];
  /** Updates observations from the server */
  updateObservations?: () => void;
  /** Reports */
  locReports?: OutboundObsLocReportModel[];
  /** Updates reports from the server */
  updateReports?: () => void;
  /** Observation logs */
  observationLogs?: OutboundObservationLogModel[];
  /** Updates observation logs from the server */
  updateObservationLogs?: () => void;
}

const vals: AstroCueObjectContextValues = {
  observationLocations: undefined,
  updateObservationLocations: () => {},
  observations: undefined,
  updateObservations: () => {},
  locReports: undefined,
  updateReports: () => {},
  observationLogs: undefined,
  updateObservationLogs: () => {},
};

export const AstroCueObjectContext = createContext(vals);

export const AstroCueObjectContextProvider: React.FC = (props) => {
  const loggedIn = useIsLoggedIn();

  const [{ data: observationLocations }, updateObservationLocations] = useAxios<
    OutboundObsLocationModel[]
  >(APIEndpoints.ObservationLocation.All, {
    manual: true,
  });

  const [{ data: observations }, updateObservations] = useAxios<
    OutboundObservationModel[]
  >(APIEndpoints.Observation.All, {
    manual: true,
  });

  const [{ data: reports }, updateReports] = useAxios<
    OutboundObsLocReportModel[]
  >(APIEndpoints.Report.All, {
    manual: true,
  });

  const [{ data: logs }, updateObservationLogs] = useAxios<
    OutboundObservationLogModel[]
  >(APIEndpoints.ObservationLog.All, {
    manual: true,
  });

  useEffect(() => {
    const getData = async () => {
      if (loggedIn) {
        await updateObservationLocations();
        await updateObservations();
        await updateReports();
        await updateObservationLogs();
      }
    };
    if (loggedIn) {
      getData();
    }
  }, [
    loggedIn,
    updateObservationLocations,
    updateObservations,
    updateReports,
    updateObservationLogs,
  ]);

  return (
    <AstroCueObjectContext.Provider
      value={{
        observationLocations,
        updateObservationLocations,
        observations,
        updateObservations,
        locReports: reports,
        updateReports,
        observationLogs: logs,
        updateObservationLogs,
      }}
    >
      {props.children}
    </AstroCueObjectContext.Provider>
  );
};
