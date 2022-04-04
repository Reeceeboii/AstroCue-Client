import * as yup from 'yup';

/** Model class representing a new user registration attempt */
export interface OutboundRegModel {
  /** The user's email address */
  emailAddress: string;
  /** The user's first name */
  firstName: string;
  /** The user's last name */
  lastName: string;
  /** The user's password */
  password: string;
}

/** A set of initial values */
export const initialValues = {
  /** The email address default */
  emailAddress: '',
  /** The first name default */
  firstName: '',
  /** The last name default */
  lastName: '',
  /** The password default */
  password: '',
};

/** Yup validation schema */
export const validationSchema = yup.object().shape({
  /** email address validation */
  emailAddress: yup
    .string()
    .email('Invalid email')
    .required('Email is required'),
  /** first name validation */
  firstName: yup.string().required('First name is required'),
  /** last name validation */
  lastName: yup.string().required('Last name is required'),
  /** password validation */
  password: yup.string().required('Password is required'),
});
