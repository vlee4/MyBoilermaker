//Can make one big reducer or multiple tiny reducers and use combineReducers and use that during the creation of the store instead
// import {combineReducers} from 'redux'
//import all the single reducers...

/*const appReducer = combineReducers({
  A: reducerA,
  B: reducerB,
  C: reducerC
})
*/
//If this is just the big reducer, then actions, action creators, & thunks (creators) may also go in here.

export const dummyReducer = (state = {}, action) => {
  return state;
};
