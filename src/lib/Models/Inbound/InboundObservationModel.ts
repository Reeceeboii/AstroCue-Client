import * as yup from 'yup';

/** Model type representing a new observation sent to the server */
export type InboundObservationModel = {
  /** The ID of the observation location */
  locationId: number;
  /** The ID of the astronomical object being observed there */
  astronomicalObjectId: number;
};

export const validationSchema = yup.object().shape({
  locationId: yup
    .number()
    .required('An observation location is required')
    .min(1, 'An observation location is required'),
  astronomicalObjectId: yup
    .number()
    .required('An astronomical object is required')
    .min(1, 'An astronomical object is required'),
});
