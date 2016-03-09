import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import brands from 'redux/modules/brands';

export default combineReducers({
  router,
  brands,
});
