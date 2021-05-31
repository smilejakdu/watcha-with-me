import { all, fork } from "redux-saga/effects";
import axios from "axios";

import boardSaga from "./board";
import schedulerSaga from "./scheduler";
import {backUrl} from "../config/config"

axios.defaults.baseURL = backUrl;
axios.defaults.withCredentials = true;

export default function* rootSaga() {
    yield all([
        fork(boardSaga),
        fork(schedulerSaga),
    ]);
}
