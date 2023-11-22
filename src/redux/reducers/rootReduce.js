
import {combineReducers} from "redux";
import { modalReducer } from "./modalReducer";
import { dataParkingsReducer } from "./dataParkingsReducer";
import { bookedParkingReducer } from "./bookedParkingReducer";
import { favouriteReducer } from "./favouriteReducer";


export const rootReducer = combineReducers({
  modal: modalReducer,
  parkings: dataParkingsReducer,
  booked: bookedParkingReducer,
  favourite: favouriteReducer,
})