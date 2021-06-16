import { all, fork } from "redux-saga/effects";
import axios from "axios";

import boardSaga from "./board";
import calendarSaga from "./calendar";
import {backUrl} from "../config/config"

axios.defaults.baseURL = backUrl;
axios.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
axios.defaults.withCredentials = true;

export default function* rootSaga() {
    yield all([
        fork(boardSaga),
        fork(calendarSaga),
    ]);
}
