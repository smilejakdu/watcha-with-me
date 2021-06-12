import { combineReducers } from "redux";
import board from "./board";
import search from "./search";
import calendar from "./calendar";

export default combineReducers({
    board,
    calendar,
    search
});
