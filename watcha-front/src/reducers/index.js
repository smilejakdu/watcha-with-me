import { combineReducers } from "redux";
import board from "./board";
import scheduler from "./scheduler";
export default combineReducers({
    board,
    scheduler,
});
