import reducer, { constants, initialState, actions } from 'redux/modules/photos';
import deepFreeze from 'deep-freeze';
import { CALL_API } from 'redux/middleware/api';

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

    it('handles SHUFFLE', function() {
      const initialState = {
        items: [
          {id: 1, userHandle: 'spencercdixon'},
          {id: 2, userHandle: 'reactjsnews'},
          {id: 3, userHandle: 'dittolabs'},
          {id: 4, userHandle: 'launchacademy'},
        ]
      };
      deepFreeze(initialState);

      const action = { type: constants.SHUFFLE };
      const nextState = reducer(initialState, action);

      expect(nextState).to.not.eql(initialState);
    });

    it('handles VIEW_CHANGE', function() {
      const initialState = {view: 'list'};
      deepFreeze(initialState);

      const action = {
        type: constants.VIEW_CHANGE, newView: 'grid'
      };
      const nextState = {view: 'grid'};

      expect(reducer(initialState, action)).to.eql(nextState);
    });
  });

  describe('(Actions)', function() {
    describe('#fetchInfinitePhotos', function() {
      const { fetchInfinitePhotos } = actions;
      const dispatch = () => {};

      it('bails out if there are no photos yet', function() {
        const getState = () => {
          return {
            photos: { items: [] },
            brands: { selectedBrand: '1' },
          };
        }
        const thunk = fetchInfinitePhotos();
        expect(thunk(dispatch, getState)).to.be.undefined;
      });

      it('bails out if there is no pagination link offset', function() {
        const getState = () => {
          return {
            photos: { items: [1], pagination: undefined },
            brands: { selectedBrand: '1' },
          };
        }
        const thunk = fetchInfinitePhotos();
        expect(thunk(dispatch, getState)).to.be.undefined;
      });

      it('deletes brand filter if none is selected', function() {
        const dispatch = sinon.spy();
        const getState = () => {
          return {
            photos: { items: [1], pagination: 'somepage' },
            brands: { selectedBrand: 'none' },
          };
        }
        const thunk = fetchInfinitePhotos();
        thunk(dispatch, getState);
        expect(dispatch).to.be.called;
        expect(dispatch).to.be.calledWith({
          [CALL_API]: {
            endpoint: '/stream',
            types: [constants.PHOTO_REQUEST, constants.PHOTO_INFINITE, constants.PHOTO_FAILURE],
            payload: { offset: 'somepage' },
          }
        });
      });

      it('makes api request with proper payload when all fields are present', function() {
        const dispatch = sinon.spy();
        const getState = () => {
          return {
            photos: { items: [1], pagination: 'somepage' },
            brands: { selectedBrand: '1' },
          };
        }
        const thunk = fetchInfinitePhotos();
        thunk(dispatch, getState);
        expect(dispatch).to.be.called;
        expect(dispatch).to.be.calledWith({
          [CALL_API]: {
            endpoint: '/stream',
            types: [constants.PHOTO_REQUEST, constants.PHOTO_INFINITE, constants.PHOTO_FAILURE],
            payload: { offset: 'somepage', brands: '1' },
          }
        });
      });
    });
  });
});
