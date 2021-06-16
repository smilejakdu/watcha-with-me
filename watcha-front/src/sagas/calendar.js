import axios from "axios";
import { all, fork, put, takeLatest, throttle, call } from "redux-saga/effects";

import {
  LOAD_SCHEDULE_REQUEST,
  LOAD_SCHEDULE_SUCCESS,
  LOAD_SCHEDULE_FAILURE,
  ADD_SCHEDULE_REQUEST,
  ADD_SCHEDULE_SUCCESS,
  ADD_SCHEDULE_FAILURE,
} from "../reducers/calendar";


function loadScheduleAPI() {
  return axios.get("/scheduler");
}

function* loadSchedule(action) {
  try {
    const result = yield call(loadScheduleAPI);
    let {
      data: { data },
    } = result;
    yield put({
      type: LOAD_SCHEDULE_SUCCESS,
      data: data,
    });
  } catch (error) {
    console.log(error);
    yield put({
      type: LOAD_SCHEDULE_FAILURE,
      error: error.response.data,
    });
  }
}

function addScheduleAPI(data) {
  return axios.post("/scheduler", data, {
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
}

function* addSchedule(action) {
  console.log(action);
  try {
    const result = yield call(addScheduleAPI, action.data);
    console.log("result : ", result);
    yield put({
      type: ADD_SCHEDULE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: ADD_SCHEDULE_FAILURE,
      error: err.response.data,
    });
  }
}


function* watchLoadBoard() {
  yield throttle(5000, LOAD_SCHEDULE_REQUEST, loadSchedule);
}

function* watchAddSchedule() {
  yield throttle(5000, ADD_SCHEDULE_REQUEST, addSchedule);
}


export default function* boardSaga() {
  yield all([
		fork(watchLoadBoard),
		fork(watchAddSchedule),
  ]);
}
