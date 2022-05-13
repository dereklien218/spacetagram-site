import * as ActionTypes from "./ActionTypes";
import { COSMOS } from "../shared/cosmos";

export const addComment = (cosmoId, rating, author, text) => ({
  type: ActionTypes.ADD_COMMENT,
  payload: {
    cosmoId: cosmoId,
    rating: rating,
    author: author,
    text: text,
  },
});

export const fetchCosmos = () => (dispatch) => {
  dispatch(cosmosLoading());

  setTimeout(() => {
    dispatch(addCosmos(COSMOS));
  }, 2000);
};

export const cosmosLoading = () => ({
  type: ActionTypes.COSMOS_LOADING,
});

export const cosmosFailed = (errMess) => ({
  type: ActionTypes.COSMOS_FAILED,
  payload: errMess,
});

export const addCosmos = (cosmos) => ({
  type: ActionTypes.ADD_COSMOS,
  payload: cosmos,
});
