import {combineReducers} from "redux";
import { modalReducer } from "./modalReducer";
import { dataParkingsReducer } from "./dataParkingsReducer";
import { bookedParkingReducer } from "./bookedParkingReducer";
import { favouriteReducer } from "./favouriteReducer";
import { windowFindReducer } from "./windowFindReducer";
export const rootReducer = combineReducers({
  modal: modalReducer,
  parkings: dataParkingsReducer,
  booked: bookedParkingReducer,
  favourite: favouriteReducer,
  windowFindOpen: windowFindReducer,
})

