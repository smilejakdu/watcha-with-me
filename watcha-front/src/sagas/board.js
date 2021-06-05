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
    REMOVE_REVIEW_REQUEST,
    REMOVE_REVIEW_SUCCESS,
    REMOVE_REVIEW_FAILURE,
    UPDATE_REVIEW_REQUEST,
    UPDATE_REVIEW_SUCCESS,
    UPDATE_REVIEW_FAILURE,
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
    console.log("detail board data : " , data);
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

function addReviewAPI(data) {
    return axios.post("/review", data, {
        headers: {
            Authorization: `${localStorage.getItem("token")}`,
        },
    });
}

function* addReview(action) {
    try {
        const result = yield call(addReviewAPI, action.data);
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
    return axios.delete("/board/", {
        headers: {
            Authorization: `${localStorage.getItem("token")}`,
        },
        data,
    });
}

function* removeBoard(action) {
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


function removeReviewAPI(data) {
    return axios.delete("/review", {
        headers: {
            Authorization: `${localStorage.getItem("token")}`,
        },
        data,
    });
}

function* removeReview(action) {
    try {
        const result = yield call(removeReviewAPI, action.data);
        alert(result);
        yield put({
            type: REMOVE_REVIEW_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: REMOVE_REVIEW_FAILURE,
            error: err.response.data,
        });
    }
}

function updateReviewAPI(data) {
    console.log("review update data:",data);
    return axios.put("/review",data, {
        headers: {
            Authorization: `${localStorage.getItem("token")}`,
        },
    });
}

function* updateReview(action) {
    try {
        const result = yield call(updateReviewAPI, action.data);
        yield put({
            type: UPDATE_REVIEW_SUCCESS,
            data: result.data,
        });
    } catch (err) {
        console.error(err);
        yield put({
            type: UPDATE_REVIEW_FAILURE,
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

function* watchRemoveReview() {
    yield takeLatest(REMOVE_REVIEW_REQUEST, removeReview);
}

function* watchUpdateReview() {
    yield takeLatest(UPDATE_REVIEW_REQUEST, updateReview);
}


export default function* boardSaga() {
    yield all([
        fork(watchLoadBoard),
        fork(watchLoadDetailBoard),
        fork(watchAddBoard),
        fork(watchAddReview),
        fork(watchRemoveBoard),
        fork(watchRemoveReview),
        fork(watchUpdateReview),
    ]);
}
