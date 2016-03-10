import reducer, { constants, initialState } from 'redux/modules/brands';
import deepFreeze from 'deep-freeze';

describe('(Redux) brands', () => {
  describe('(Reducer)', () => {
    it('sets up initial state', () => {
      expect(reducer(undefined, {})).to.eql(initialState);
    });

    it('handles BRAND_REQUEST', function() {
      const initialState = { isFetching: false };
      deepFreeze(initialState);

      const action = { type: constants.BRAND_REQUEST };
      const nextState = { isFetching: true };

      expect(reducer(initialState, action)).to.eql(nextState);
    });

    it('handles BRAND_SUCCESS', function() {
      const initialState = {
        isFetching: true,
        items: []
      };
      deepFreeze(initialState);

      const action = {
        type: constants.BRAND_SUCCESS,
        payload: [
          {id: 1, name: 'Apple'},
          {id: 2, name: 'StarBucks'}
        ],
      };
      const nextState = {
        isFetching: false,
        items: [
          {id: 1, name: 'Apple'},
          {id: 2, name: 'StarBucks'}
        ]
      };

      expect(reducer(initialState, action)).to.eql(nextState);
    });

    it('handles BRAND_FAILURE', function() {
      const initialState = { isFetching: true, didInvalidate: false };
      deepFreeze(initialState);

      const action = {
        type: constants.BRAND_FAIL
      };
      const nextState = {
        isFetching: false,
        didInvalidate: true,
      };

      expect(reducer(initialState, action)).to.eql(nextState);
    });

    it('handles SET_FILTER', function() {
      const initialState = { selectedBrand: undefined };
      deepFreeze(initialState);

      const action = { type: constants.SET_FILTER, id: '1' };
      const nextState = { selectedBrand: '1' };

      expect(reducer(initialState, action)).to.eql(nextState);
    });
  });
});
