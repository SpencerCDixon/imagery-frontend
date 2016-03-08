import { camelizeKeys } from 'humps';
import axios from 'axios';

// API Constants
export const CALL_API = Symbol('Call API');
export const API_ROOT = 'example-api-root';
export const API_VERSION = 'v1';
export const API = axios.create({
  baseURL: API_ROOT,
  timeout: 5000,
  responseType: 'json'
});

// callApi is a good place to do any data normalization that might be
// needed in the future.
function callApi(endpoint, params = {}) {
  // Ensure all endpoints are formatted properly
  const finalEndPoint = endpoint[0] === '/' ? endpoint : `/${endpoint}`;

  // Set any required headers for interacting with API
  let defaultHeaders = {
    'Content-Type': 'application/json'
  };
  const headers = {...defaultHeaders, ...params.headers};

  // Set up config for this request
  let config    = { headers: headers };
  config.method = params.method || 'GET';
  config.data   = params.body || {};
  config.url    = finalEndPoint;

  return API.request(config)
    .then((response) => {
      const { data, status } = response;

      if (!(status >= 200 && status < 300)) {
        return Promise.reject(data);
      }

      // This is javascript and we don't want to deal with
      // snake_case key names so sanitize data before resolving promise.
      const camelizedJson = camelizeKeys(data);
      return Promise.resolve(camelizedJson);
    });
}

// Clean syntax for currying our functions to create the actual middleware
export default store => next => action => {
  const callAPI = action[CALL_API];

  // Bail out right away because this is not an action
  // that will be hitting the API
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const { types, endpoint, ...params } = callAPI;

  // Useful error messages to make sure developers comply
  // with the public API of this middleware.
  if (typeof endpoint !== 'string') {
    throw new Error('Specify a string endpoint URL.');
  }

  if (!Array.isArray(types) || types.length !== 3) {
    throw new Error('Expected an array of three action types.');
  }

  if (!types.every(type => typeof type === 'string')) {
    throw new Error('Expected action types to be strings.');
  }

  // Extract our three different types to be dispatched
  // via the 'types' key on the CALL_API action
  const [ requestType, successType, failureType ] = types;
  next({ type: requestType });

  return callApi(endpoint, params).then(
    response => {
      return next({
        payload: response,
        type: successType,
      });
    },
    error => {
      return next({
        type: failureType,
        payload: error.message || 'Something bad happened',
        error: true,
      });
    }
  );
};

