import axios from "axios";
import { all, fork, put, takeLatest, throttle, call } from "redux-saga/effects";

import {
    LOAD_BOARD_REQUEST,
    LOAD_BOARD_SUCCESS,
    LOAD_BOARD_FAILURE,
} from "../reducers/board";

function loadProductsAPI() {
    return axios.get("dummy/board_body.json");
}

function* loadProducts(action) {
    try {
        const result = yield call(loadProductsAPI);
        // yield delay(1000);
        console.log("result :" , result);
        const {
            data: { board_content },
        } = result;
        yield put({
            type: LOAD_BOARD_SUCCESS,
            data: board_content,
        });
    } catch (error) {
        console.log(error);
        yield put({
            type: LOAD_BOARD_FAILURE,
            error: error.response.data,
        });
    }
}

function* watchLoadProducts() {
    yield takeLatest(LOAD_BOARD_REQUEST, loadProducts);
}

export default function* boardSaga() {
    yield all([
         fork(watchLoadProducts),
        ]);
}
