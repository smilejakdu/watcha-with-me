import axios from "axios";
import { all, fork, put, takeLatest, throttle, call } from "redux-saga/effects";

import {backUrl} from "../config/config"

import {
    LOAD_SCHEDULER_REQUEST,
    LOAD_SCHEDULER_SUCCESS,
    LOAD_SCHEDULER_FAILURE,
    ADD_COMMENT_REQUEST,
    ADD_COMMENT_SUCCESS,
    ADD_COMMENT_FAILURE,
} from "../reducers/scheduler";

function loadSchedulerAPI() {
    return axios.get(`${backUrl}/scheduler`);
}

function* loadScheduler(action) {
    try {
        const result = yield call(loadSchedulerAPI);
        console.log("result : ", result);
        let {data : {data}} = result;
        yield put({
            type: LOAD_SCHEDULER_SUCCESS,
            data: data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: LOAD_SCHEDULER_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchLoadScheduler() {
    yield throttle(5000,LOAD_SCHEDULER_REQUEST, loadScheduler);
}

export default function* boardSaga() {
    yield all(
        [
         fork(watchLoadScheduler),
        ]);
}
