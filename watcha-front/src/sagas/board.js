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
    ADD_REVIEW_REQUEST,
    ADD_REVIEW_SUCCESS,
    ADD_REVIEW_FAILURE,
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
    console.log("detail data : ",data);
    return axios.get(`/board/${data}`);
}

function* loadDetailBoards(action) {
    console.log("action detail data : ",action);
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
    console.log("board data : ", data);
    alert(data);
    return axios.post("/board/", data, {
        headers: {
            Authorization: `${localStorage.getItem("token")}`,
        },
    });
}

function* addBoard(action) {
    console.log("board action : " , action);
    alert(action.data)
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

function addReviewAPI(data) {
    console.log("review data : " , data);
    return axios.post("/review", data, {
        headers: {
            Authorization: `${localStorage.getItem("token")}`,
        },
    });
}

function* addReview(action) {
    console.log("add review action : " , action);
    try {
        const result = yield call(addReviewAPI, action.data);
        alert(result);
        yield put({
            type: ADD_REVIEW_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: ADD_REVIEW_FAILURE,
            error: err.response.data,
        });
    }
}

function removeBoardAPI(data) {
    console.log("board data : ", data); // 여기까지는 정확하게 찍힌다.
    // axios.delete 에서 back 에 전달이 안된다. 이유가 뭘까 ??
    return axios.delete("/board/", {
        headers: {
            Authorization: `${localStorage.getItem("token")}`,
        },
        data,
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

function* watchAddReview() {
    yield takeLatest(ADD_REVIEW_REQUEST, addReview);
}

function* watchRemoveBoard() {
    yield takeLatest(REMOVE_BOARD_REQUEST, removeBoard);
}

export default function* boardSaga() {
    yield all([
        fork(watchLoadBoard),
        fork(watchLoadDetailBoard),
        fork(watchAddBoard),
        fork(watchAddReview),
        fork(watchRemoveBoard),
    ]);
}
