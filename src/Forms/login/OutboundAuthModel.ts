import * as yup from 'yup';

/** Model class reresenting an outgoing set of authentication credentials */
export interface OutboundAuthModel {
  /** The user's email address */
  emailAddress: string;
  /** The user's password */
  password: string;
}

/** A set of initial values */
export const initialValues = {
  /** The email address default */
  emailAddress: '',
  /** The password default */
  password: '',
}

/** Yup validation schema */
export const validationSchema = yup.object().shape({
  /** email address validation */
  emailAddress: yup
    .string()
    .email('Invalid email')
    .required('Email is required'),
  /** password validation */
  password: yup
    .string()
    .required('Password is required'),
});