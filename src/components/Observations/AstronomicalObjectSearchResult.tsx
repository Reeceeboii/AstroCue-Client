import { Stack, Typography } from '@mui/material';
import { OutboundAstronomicalObjectModel } from '../../lib/Models/Outbound/OutboundAstronomicalObjectModel';

interface IAstronomicalObjectSearchResultProps {
  /** The selected result */
  option: OutboundAstronomicalObjectModel;
}

/** Component for a single search result from the astronomical object search */
const AstronomicalObjectSearchResult = ({
  option,
}: IAstronomicalObjectSearchResultProps) => {
  /**
   * Calculate the title colour of an astronomical object search result
   * using the severity of any visibility warnings returned from the server
   * @param vis boolean representing whether the object is visible
   * @param horizon boolean representing whether the object rises above the horizon over
   * the next 24 hours
   * @returns a text colour from the mui theme
   */
  const resultTitleColour = (vis: boolean, horizon: boolean) => {
    if (vis || horizon) {
      if (horizon) {
        return 'error.main';
      }
      return 'warning.main';
    }
    return 'success.main';
  };

  return (
    <Stack direction='column'>
      <Stack
        direction='row'
        spacing={0.4}
        color={() =>
          resultTitleColour(
            option.locationVisibilityModel.visibilityAlert,
            option.locationVisibilityModel.horizonAlert,
          )
        }
      >
        <Typography variant='body1'>{option.name}</Typography>
        <Typography
          variant='body1'
          fontSize={10}
          color='text.disabled'
          display='flex'
          alignItems='center'
          justifyContent='center'
        >
          {`(${option.type})`}
        </Typography>
      </Stack>

      {!option.locationVisibilityModel.visibilityAlert &&
        !option.locationVisibilityModel.horizonAlert && (
          <Typography variant='caption' fontSize={10} color='success.main'>
            • Bright and visible!
          </Typography>
        )}

      {option.locationVisibilityModel.horizonAlert && (
        <Typography variant='caption' fontSize={10} color='error.main'>
          {`• ${option.locationVisibilityModel.horizonMessage}`}
        </Typography>
      )}
      {option.locationVisibilityModel.visibilityAlert && (
        <Typography variant='caption' fontSize={10} color='warning.main'>
          {`• ${option.locationVisibilityModel.visibilityMessage}`}
        </Typography>
      )}
    </Stack>
  );
};

export default AstronomicalObjectSearchResult;
