import useAxios from 'axios-hooks';
import { createContext, useContext, useEffect } from 'react';
import APIEndpoints from '../lib/Constants/Endpoints';
import useIsLoggedIn from '../lib/Hooks/useIsLoggedIn';
import { OutboundObservationModel } from '../lib/Models/Outbound/OutboundObservationModel';
import { OutboundObsLocationModel } from '../lib/Models/Outbound/OutboundObsLocationModel';

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
}

const AstroCueObjectContext = createContext<AstroCueObjectContextValues>({
  observationLocations: undefined,
  updateObservationLocations: () => {},
  observations: undefined,
  updateObservations: () => {},
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

  useEffect(() => {
    if (isLoggedIn) {
      updateObservationLocations();
      updateObservations();
    }
  }, [isLoggedIn, updateObservationLocations, updateObservations]);

  return (
    <AstroCueObjectProvider
      value={{
        observationLocations,
        updateObservationLocations,
        observations,
        updateObservations,
      }}
    >
      {children}
    </AstroCueObjectProvider>
  );
};
