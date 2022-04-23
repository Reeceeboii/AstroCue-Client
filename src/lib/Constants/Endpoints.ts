/** Authentication controller endpoints */
enum Auth {
  /** Login endpoint */
  Login = '/auth/login',
  /** Registration endpoint */
  Register = '/auth/register',
}

/** Geographic controller endpoints */
enum Geo {
  /** Forward geocode endpoint */
  Search = '/geo/search',
}

/** Observation controller endpoints */
enum Observation {
  /** Astronomical object search */
  ObjectSearch = '/observation/object-search',
  /** Create a new observation */
  New = '/observation/new',
  /** Get all observation */
  All = '/observation/all',
  /** Delete observation */
  Delete = '/observation/delete',
}

/** Observation location controller endpoints */
enum ObservationLocation {
  /** Create a new observation location */
  New = '/observationLocation/new',
  /** Edit an existing observation location */
  Edit = '/observationLocation/edit',
  /** Get all observation locations */
  All = '/observationLocation/all',
  /** Delete observation location */
  Delete = '/observationLocation/delete',
  /** Get a static map for an observation location */
  StaticMap = '/observationLocation/static-map', // :id
}

/** Observation report endpoints */
enum Report {
  /** Retrieve all reports */
  All = '/report/all',
  /** Force report creation */
  Force = '/report/force-generate',
  /** Delete a report */
  Delete = '/report/delete',
}

/** Observation log endpoints */
enum ObservationLog {
  /** Create a new observation log */
  New = '/observationLog/new',
  /** Retrieve all observation logs */
  All = '/observationLog/all',
  /** Delete an observation log */
  Delete = '/observationLog/delete',
  /** Edit an existing observation log */
  Edit = '/observationLog/edit',
}

/** Object exposing all endpoints */
const APIEndpoints = {
  /** Authentication controller endpoints */
  Auth,
  /** Geographic controller endpoints */
  Geo,
  /** Observation controller endpoints */
  Observation,
  /** Observation location controller endpoints */
  ObservationLocation,
  /** Report controller endpoints */
  Report,
  /** Observation log controller endpoints */
  ObservationLog,
};

export default APIEndpoints;
