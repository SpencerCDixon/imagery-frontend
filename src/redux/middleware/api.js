import { camelizeKeys } from 'humps';
import axios from 'axios';

// API Constants
export const CALL_API = Symbol('Call API');
export const API_ROOT = 'http://localhost:4567/';
export const API_VERSION = 'v2';
export const API_CLIENT = axios.create({
  baseURL: API_ROOT + API_VERSION,
  timeout: 5000,
  responseType: 'json',
  withCredentials: true,
});

// callApi is a good place to do any data normalization that might be
// needed in the future.
function callApi(endpoint, actionArgs = {}) {
  // Ensure all endpoints are formatted properly
  const url = endpoint[0] === '/' ? endpoint : `/${endpoint}`;

  // Set any required headers for interacting with API
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': true,
  };
  const headers = { ...defaultHeaders, ...actionArgs.headers };

  // Set up config for this request
  const config = {
    method: actionArgs.method || 'GET',
    params: actionArgs.payload,
    url,
    headers,
  };

  return API_CLIENT.request(config)
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
/* eslint-disable */
export default store => next => action => {
/* eslint-enable */
  const callAPI = action[CALL_API];

  // Bail out right away because this is not an action
  // that will be hitting the API
  if (typeof callAPI === 'undefined') {
    return next(action);
  }

  const { types, endpoint, ...actionArgs } = callAPI; // eslint-disable-line

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
  const [requestType, successType, failureType] = types;
  next({ type: requestType });

  return callApi(endpoint, actionArgs).then(
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
