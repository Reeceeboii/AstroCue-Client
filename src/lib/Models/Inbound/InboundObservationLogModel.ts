import * as yup from 'yup';

/** Model type representing an outgoing observation log taken against a report */
export type InboundObservationLogModel = {
  /** The ID of the report that the log is being taken against */
  reportId: number;
  /** A textual description of what was observed */
  textualDescription: string;
  /** The observer(s) that carried out the observation being logged */
  observer: string;
  /** The type of observation that was carried out */
  observationType: string;
};

/** The available observation type options */
export const observationTypeOptions = [
  'NakedEye',
  'LongExposure',
  'Telescope',
  'Binoculars',
  'Other',
];

/** A set of initial values */
export const initialValues = {
  /** The report ID default */
  reportId: 0,
  /** The textual description default */
  textualDescription: '',
  /** The observer(s) default */
  observer: '',
  /** The type of observation default */
  observationType: observationTypeOptions[0],
};

/** Yup validation schema */
export const validationSchema = yup.object().shape({
  /** reportId validation */
  reportId: yup.number().required('Report ID is required'),
  /** textualDescription validation */
  textualDescription: yup
    .string()
    .required('Description is required')
    .max(2000, 'Description cannot exceed 2000 characters')
    .min(1, 'Description must be at least 1 character'),
  /** observer validation */
  observer: yup
    .string()
    .max(250, 'Observer(s) cannot exceed 250 characters')
    .nullable(),
  /** observationType validation */
  observationType: yup.string().oneOf(observationTypeOptions),
});
