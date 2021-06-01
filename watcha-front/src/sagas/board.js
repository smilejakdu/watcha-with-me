import axios from "axios";
import { all, fork, put, takeLatest, throttle, call } from "redux-saga/effects";

import {
    LOAD_BOARD_REQUEST,
    LOAD_BOARD_SUCCESS,
    LOAD_BOARD_FAILURE,
    LOAD_DETAIL_BOARD_REQUEST,
    LOAD_DETAIL_BOARD_SUCCESS,
    LOAD_DETAIL_BOARD_FAILURE,
    ADD_BOARD_REQUEST,
    ADD_BOARD_SUCCESS,
    ADD_BOARD_FAILURE,
    REMOVE_BOARD_REQUEST,
    REMOVE_BOARD_SUCCESS,
    REMOVE_BOARD_FAILURE,
} from "../reducers/board";

function loadBoardsAPI() {
    return axios.get("/board/");
}

function* loadBoards(action) {
    try {
        const result = yield call(loadBoardsAPI);
        let {data : {data}} = result
        yield put({
            type: LOAD_BOARD_SUCCESS,
            data: data,
        });
    } catch (error) {
        console.log(error);
        yield put({
            type: LOAD_BOARD_FAILURE,
            error: error.response.data,
        });
    }
}

function loadDetailBoardsAPI(data) {
    return axios.get(`/board/${data}`);
}

function* loadDetailBoards(action) {
    try {
        const result = yield call(loadDetailBoardsAPI,action.data);
        let {
            data: { data },
        } = result;
        yield put({
            type: LOAD_DETAIL_BOARD_SUCCESS,
            data: data,
        });
    } catch (error) {
        console.log(error);
        yield put({
            type: LOAD_DETAIL_BOARD_FAILURE,
            error: error.response.data,
        });
    }
}


function addBoardAPI(data) {
    return axios.post("/board/", data, {
        headers: {
            Authorization: `${localStorage.getItem("token")}`,
        },
    });
}

function* addBoard(action) {
    try {
        const result = yield call(addBoardAPI, action.data);
        alert(result);
        yield put({
            type: ADD_BOARD_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: ADD_BOARD_FAILURE,
            error: err.response.data,
        });
    }
}

function removeBoardAPI(data) {
    console.log("board data : " , data);
    alert(data);
    return axios.delete("/board/", data, {
        headers: {
            Authorization: `${localStorage.getItem("token")}`,
        },
    });
}

function* removeBoard(action) {
    console.log("action : " , action);
    try {
        const result = yield call(removeBoardAPI, action.data);
        console.log("board delete result : " , result);
        alert(result);
        yield put({
            type: REMOVE_BOARD_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: REMOVE_BOARD_FAILURE,
            error: err.response.data,
        });
    }
}

function* watchLoadBoard() {
    yield throttle(5000,LOAD_BOARD_REQUEST, loadBoards);
}

function* watchLoadDetailBoard() {
    yield throttle(5000,LOAD_DETAIL_BOARD_REQUEST, loadDetailBoards);
}

function* watchAddBoard() {
    yield takeLatest(ADD_BOARD_REQUEST, addBoard);
}

function* watchRemoveBoard() {
    yield takeLatest(REMOVE_BOARD_REQUEST, removeBoard);
}

export default function* boardSaga() {
    yield all([
        fork(watchLoadBoard),
        fork(watchLoadDetailBoard),
        fork(watchAddBoard),
        fork(watchRemoveBoard),
    ]);
}
