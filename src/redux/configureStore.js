import { createStore, combineReducers, applyMiddleware } from "redux";
import { CosmosReducer } from "./cosmos";
import { CommentsReducer } from "./comments";
import { MarsRoversReducer } from "./marsrovers";
import thunk from "redux-thunk";
import logger from "redux-logger";

export const ConfigureStore = () => {
  const store = createStore(
    combineReducers({
      cosmos: CosmosReducer,
      comments: CommentsReducer,
      marsrovers: MarsRoversReducer,
    }),
    applyMiddleware(thunk, logger)
  );

  return store;
};
