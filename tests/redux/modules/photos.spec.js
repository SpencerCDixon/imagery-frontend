import reducer, { constants, initialState } from 'redux/modules/photos';
import deepFreeze from 'deep-freeze';

describe('(Redux) photos', () => {
  describe('(Reducer)', () => {
    it('sets up initial state', () => {
      expect(reducer(undefined, {})).to.eql(initialState);
    });

    it('handles PHOTO_REQUEST', function() {
      const initialState = { isFetching: false };
      deepFreeze(initialState);

      const action = { type: constants.PHOTO_REQUEST };
      const nextState = { isFetching: true };

      expect(reducer(initialState, action)).to.eql(nextState);
    });

    it('handles PHOTO_SUCCESS by setting photos and pagination', function() {
      const initialState = {
        isFetching: true,
        items: []
      };
      deepFreeze(initialState);

      const action = {
        type: constants.PHOTO_SUCCESS,
        payload: {
          nextOffset: 'some page',
          photos: [
            {id: 1, userHandle: 'spencercdixon'},
          ]
        }
      };
      const nextState = {
        isFetching: false,
        pagination: 'some page',
        items: [
          {id: 1, userHandle: 'spencercdixon'},
        ]
      };

      expect(reducer(initialState, action)).to.eql(nextState);
    });

    it('handles PHOTO_FAILURE', function() {
      const initialState = { isFetching: true, didInvalidate: false };
      deepFreeze(initialState);

      const action = {
        type: constants.PHOTO_FAILURE
      };
      const nextState = {
        isFetching: false,
        didInvalidate: true,
      };

      expect(reducer(initialState, action)).to.eql(nextState);
    });
  });
});
