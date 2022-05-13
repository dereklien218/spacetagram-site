import * as ActionTypes from "./ActionTypes";

export const CosmosReducer = (
  state = {
    isLoading: true,
    errMess: null,
    cosmos: [],
  },
  action
) => {
  switch (action.type) {
    case ActionTypes.ADD_COSMOS:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        cosmos: action.payload,
      };
    case ActionTypes.COSMOS_LOADING:
      return { ...state, isLoading: true, errMess: null, cosmos: [] };
    case ActionTypes.COSMOS_FAILED:
      return { ...state, isLoading: false, errMess: action.payload };
    default:
      return state;
  }
};
