
import {combineReducers} from "redux";
import { modalReducer } from "./modalReducer";
import { parkingsReducer } from "./parkingsReducer";


export const rootReducer = combineReducers({
  modal: modalReducer,
  parkings: parkingsReducer,
})