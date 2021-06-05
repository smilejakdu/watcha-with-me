import { combineReducers } from "redux";
import board from "./board";
import scheduler from "./scheduler";
import search from "./search";

export default combineReducers({
    board,
    scheduler,
    search
});
