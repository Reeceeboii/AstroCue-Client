import * as yup from 'yup';

/** Model type representing a new outgoing observation location */
export type InboundObsLocationModel = {
  /** The new observation location's name */
  name: string;
  /** The new observation location's longitude */
  longitude: number;
  /** The new observation location's latitude */
  latitude: number;
};

/** A set of initial values */
export const initialValues = {
  /** The name default */
  name: '',
  /** The longitude default */
  longitude: -0.102324,
  /** The latitude default */
  latitude: 51.527391,
};

export const validationSchema = yup.object().shape({
  /** name validation */
  name: yup
    .string()
    .required('Name is required')
    .min(1, 'Name must be at least 1 characters long')
    .max(50, 'Name must be less than 50 characters long'),
  /** longitude validation */
  longitude: yup
    .number()
    .required('Longitude is required')
    .min(-180, 'Longitude must be between -180 and 180')
    .max(180, 'Longitude must be between -180 and 180'),
  /** latitude validation */
  latitude: yup
    .number()
    .required('Latitude is required')
    .min(-90, 'Latitude must be between -90 and 90')
    .max(90, 'Latitude must be between -90 and 90'),
});
