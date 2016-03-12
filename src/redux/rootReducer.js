import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import brands from 'redux/modules/brands';
import photos from 'redux/modules/photos';

export default combineReducers({
  router,
  brands,
  photos,
});
