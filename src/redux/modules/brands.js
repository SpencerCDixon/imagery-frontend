import { CALL_API } from 'redux/middleware/api';
// Constants
export const BRAND_REQUEST = 'imagery/brands/BRAND_REQUEST';
export const BRAND_SUCCESS = 'imagery/brands/BRAND_SUCCESS';
export const BRAND_FAIL    = 'imagery/brands/BRAND_FAIL';

export const constants = {
  BRAND_REQUEST,
  BRAND_SUCCESS,
  BRAND_FAIL,
};

// Action Creators
export const fetchBrands = () => {
  return {
    [CALL_API]: {
      endpoint: '/brands',
      types: [BRAND_REQUEST, BRAND_SUCCESS, BRAND_FAIL],
    },
  };
};
export const actions = {
  fetchBrands,
};

// Reducer
export const initialState = {
  isFetching: false,
  didInvalidate: false,
  items: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case BRAND_REQUEST:
      return {...state, isFetching: true};

    case BRAND_SUCCESS:
      return {...state, items: action.payload, isFetching: false};

    case BRAND_FAIL:
      return {...state, isFetching: false, didInvalidate: true};
    default:
      return state;
  }
}
