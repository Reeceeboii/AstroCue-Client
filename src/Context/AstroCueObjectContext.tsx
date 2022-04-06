import useAxios from 'axios-hooks';
import { createContext, useContext, useEffect } from 'react';
import APIEndpoints from '../lib/Constants/Endpoints';
import useIsLoggedIn from '../lib/Hooks/useIsLoggedIn';
import { OutboundObsLocationModel } from '../lib/Models/ObservationLocations/OutboundObsLocationModel';

/** Interface representing the values stored in the data context */
interface AstroCueObjectContextValues {
  /** Observation locations */
  observationLocations?: OutboundObsLocationModel[];
  /** Updates observation locations from the server */
  updateObservationLocations?: () => void;
}

const AstroCueObjectContext = createContext<AstroCueObjectContextValues>({
  observationLocations: undefined,
  updateObservationLocations: () => {},
});

export const useAstroCueObjectContext = () => useContext(AstroCueObjectContext);
const AstroCueObjectProvider = AstroCueObjectContext.Provider;

export const AstroCueObjectContextProvider: React.FC = ({ children }) => {
  const isLoggedIn = useIsLoggedIn();

  const [{ data: observationLocations }, updateObservationLocations] = useAxios<
    OutboundObsLocationModel[]
  >(APIEndpoints.ObservationLocation.All);

  useEffect(() => {
    if (isLoggedIn) {
      updateObservationLocations();
    }
  }, [isLoggedIn, updateObservationLocations]);

  return (
    <AstroCueObjectProvider
      value={{
        observationLocations,
        updateObservationLocations,
      }}
    >
      {children}
    </AstroCueObjectProvider>
  );
};
