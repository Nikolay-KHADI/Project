
import {combineReducers} from "redux";
import { modalReducer } from "./modalReducer";
import { dataParkingsReducer } from "./dataParkingsReducer";
import { bookedParkingReducer } from "./bookedParkingReducer";


export const rootReducer = combineReducers({
  modal: modalReducer,
  parkings: dataParkingsReducer,
  booked: bookedParkingReducer,
})