import { CALL_API } from 'redux/middleware/api';
import shuffle from 'lodash.shuffle';
// Constants

export const PHOTO_REQUEST = 'imagery/photos/PHOTO_REQUEST';
export const PHOTO_SUCCESS = 'imagery/photos/PHOTO_SUCCESS';
export const PHOTO_FAILURE = 'imagery/photos/PHOTO_FAILURE';
export const SHUFFLE       = 'imagery/photos/SHUFFLE';
export const VIEW_CHANGE   = 'imagery/photos/VIEW_CHANGE';

export const constants = {
  PHOTO_REQUEST,
  PHOTO_SUCCESS,
  PHOTO_FAILURE,
  SHUFFLE,
  VIEW_CHANGE,
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

export const shufflePhotos = () => {
  return { type: SHUFFLE };
};

export const changePhotoView = (newView) => {
  return { type: VIEW_CHANGE, newView };
};

export const actions = {
  fetchPhotos,
  shufflePhotos,
  changePhotoView,
};

// Reducer
export const initialState = {
  isFetching: false,
  didInvalidate: false,
  items: [],
  pagination: undefined,
  view: 'list',
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

    case SHUFFLE:
      return {...state, items: shuffle(state.items)};

    case VIEW_CHANGE:
      return {...state, view: action.newView};

    default:
      return state;
  }
}
