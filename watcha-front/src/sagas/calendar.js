import axios from "axios";
import { all, fork, put, takeLatest, throttle, call } from "redux-saga/effects";

import {
  LOAD_SCHEDULE_REQUEST,
  LOAD_SCHEDULE_SUCCESS,
  LOAD_SCHEDULE_FAILURE,

  ADD_SCHEDULE_REQUEST,
  ADD_SCHEDULE_SUCCESS,
  ADD_SCHEDULE_FAILURE,

  UPDATE_SCHEDULE_REQUEST,
  UPDATE_SCHEDULE_SUCCESS,
  UPDATE_SCHEDULE_FAILURE,

  REMOVE_SCHEDULE_REQUEST,
  REMOVE_SCHEDULE_SUCCESS,
  REMOVE_SCHEDULE_FAILURE,
} from "../reducers/calendar";


function loadScheduleAPI() {
  return axios.get("/scheduler/");
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
  return axios.post("/scheduler/", data, {
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
}

function* addSchedule(action) {
  console.log(action);
  try {
    const result = yield call(addScheduleAPI, action.data);
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

function updateScheduleAPI(data) {
  return axios.put("/scheduler/", data, {
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
  });
}

function* updateSchedule(action) {
  try {
    const result = yield call(updateScheduleAPI, action.data);
    yield put({
      type: UPDATE_SCHEDULE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: UPDATE_SCHEDULE_FAILURE,
      error: err.response.data,
    });
  }
}

function removeScheduleAPI(data) {
  return axios.delete("/scheduler/", {
    headers: {
      Authorization: `${localStorage.getItem("token")}`,
    },
    data
  });
}

function* removeSchedule(action) {
  try {
    const result = yield call(removeScheduleAPI, action.data);
    yield put({
      type: REMOVE_SCHEDULE_SUCCESS,
      data: result.data,
    });
  } catch (err) {
    console.error(err);
    yield put({
      type: REMOVE_SCHEDULE_FAILURE,
      error: err.response.data,
    });
  }
}


function* watchLoadBoard() {
  yield throttle(5000, LOAD_SCHEDULE_REQUEST , loadSchedule);
}

function* watchAddSchedule() {
  yield takeLatest( ADD_SCHEDULE_REQUEST , addSchedule);
}

function* watchUpdateSchedule() {
  yield takeLatest( UPDATE_SCHEDULE_REQUEST , updateSchedule);
}

function* watchRemoveSchedule() {
  yield takeLatest( REMOVE_SCHEDULE_REQUEST , removeSchedule);
}

export default function* calendarSaga() {
  yield all([
    fork(watchLoadBoard),
    fork(watchAddSchedule),
    fork(watchUpdateSchedule),
    fork(watchRemoveSchedule),
  ]);
}
