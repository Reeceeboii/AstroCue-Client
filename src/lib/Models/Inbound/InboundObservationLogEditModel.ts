import { observationTypeOptions } from './InboundObservationLogModel';
import * as yup from 'yup';

/** Model type representing an edit to an observation log */
export type InboundObservationLogEditModel = {
  /** The ID of the log that is being edited */
  id: number;
  /** A textual description of what was observed */
  textualDescription: string;
  /** The observer(s) that carried out the observation being logged */
  observer: string;
  /** The type of observation that was carried out */
  observationType: string;
};

/** A set of initial values */
export const initialValues = {
  /** The log ID default */
  id: 0,
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
  id: yup.number().required('ID is required'),
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
