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

const AstroCueObjectContext = createContext<AstroCueObjectContextValues>({
  observationLocations: undefined,
  updateObservationLocations: () => {},
  observations: undefined,
  updateObservations: () => {},
  locReports: undefined,
  updateReports: () => {},
  observationLogs: undefined,
  updateObservationLogs: () => {},
});

export const useAstroCueObjectContext = () => useContext(AstroCueObjectContext);
const AstroCueObjectProvider = AstroCueObjectContext.Provider;

export const AstroCueObjectContextProvider: React.FC = ({ children }) => {
  const isLoggedIn = useIsLoggedIn();

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
    if (isLoggedIn) {
      updateObservationLocations();
      updateObservations();
      updateReports();
      updateObservationLogs();
    }
  }, [
    isLoggedIn,
    updateObservationLocations,
    updateObservations,
    updateReports,
    updateObservationLogs,
  ]);

  return (
    <AstroCueObjectProvider
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
      {children}
    </AstroCueObjectProvider>
  );
};
