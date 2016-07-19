import {
    ADD_FILTER} from '../Constants/ActionTypes';

const filters = (state = [], action) => {
  switch (action.type) {
    case ADD_FILTER:
      return [
        ...state,
        action.filter
      ]
    default:
      return state
  }
}

export default filters
