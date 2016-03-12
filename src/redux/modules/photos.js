import { CALL_API } from 'redux/middleware/api';
// Constants

export const PHOTO_REQUEST = 'imagery/photos/PHOTO_REQUEST';
export const PHOTO_SUCCESS = 'imagery/photos/PHOTO_SUCCESS';
export const PHOTO_FAILURE = 'imagery/photos/PHOTO_FAILURE';

export const constants = {
  PHOTO_REQUEST,
  PHOTO_SUCCESS,
  PHOTO_FAILURE,
};

// Action Creators
export const fetchPhotos = (payload) => {
  return {
    [CALL_API]: {
      endpoint: '/stream',
      types: [PHOTO_REQUEST, PHOTO_SUCCESS, PHOTO_FAILURE],
      payload,
    },
  };
};

export const actions = {
  fetchPhotos,
};

// Reducer
export const initialState = {
  isFetching: false,
  didInvalidate: false,
  items: [],
  pagination: undefined,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case PHOTO_REQUEST:
      return {...state, isFetching: true};

    case PHOTO_SUCCESS:
      return {
        ...state,
        isFetching: false,
        items: action.payload.photos,
        pagination: action.payload.nextOffset,
      };

    case PHOTO_FAILURE:
      return {...state, isFetching: false, didInvalidate: true};
    default:
      return state;
  }
}
