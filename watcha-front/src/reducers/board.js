import produce from "../utils/produce";

export const initialState = {
    mainBoards: [],
    // board
    loadBoardLoading: false,
    loadBoardDone: false,
    loadBoardError: null,

    addBoardLoading: false,
    addBoardDone: false,
    addBoardError: null,

    removeBoardLoading: false,
    removeBoardDone: false,
    removeBoardError: null,

    updateBoardLoading: false,
    updateBoardDone: false,
    updateBoardError: null,

    // review
    addReviewLoading: false,
    addReviewDone: false,
    addReviewError: null,

    removeReviewLoading: false,
    removeReviewDone: false,
    removeReviewError: null,

    updateReviewLoading: false,
    updateReviewDone: false,
    updateReviewError: null,
};

// board
export const LOAD_BOARD_REQUEST = "LOAD_BOARD_REQUEST";
export const LOAD_BOARD_SUCCESS = "LOAD_BOARD_SUCCESS";
export const LOAD_BOARD_FAILURE = "LOAD_BOARD_FAILURE";

export const ADD_BOARD_REQUEST = "ADD_BOARD_REQUEST";
export const ADD_BOARD_SUCCESS = "ADD_BOARD_SUCCESS";
export const ADD_BOARD_FAILURE = "ADD_REVIEW_FAILURE";

export const REMOVE_BOARD_REQUEST = "REMOVE_BOARD_REQUEST";
export const REMOVE_BOARD_SUCCESS = "REMOVE_BOARD_SUCCESS";
export const REMOVE_BOARD_FAILURE = "REMOVE_BOARD_FAILURE";

export const UPDATE_BOARD_REQUEST = "UPDATE_BOARD_REQUEST";
export const UPDATE_BOARD_SUCCESS = "UPDATE_BOARD_SUCCESS";
export const UPDATE_BOARD_FAILURE = "UPDATE_BOARD_FAILURE";

// review
export const ADD_REVIEW_REQUEST = "ADD_REVIEW_REQUEST";
export const ADD_REVIEW_SUCCESS = "ADD_REVIEW_SUCCESS";
export const ADD_REVIEW_FAILURE = "ADD_REVIEW_FAILURE";

export const REMOVE_REVIEW_REQUEST = "REMOVE_REVIEW_REQUEST";
export const REMOVE_REVIEW_SUCCESS = "REMOVE_REVIEW_SUCCESS";
export const REMOVE_REVIEW_FAILURE = "REMOVE_REVIEW_FAILURE";

export const UPDATE_REVIEW_REQUEST = "UPDATE_REVIEW_REQUEST";
export const UPDATE_REVIEW_SUCCESS = "UPDATE_REVIEW_SUCCESS";
export const UPDATE_REVIEW_FAILURE = "UPDATE_REVIEW_FAILURE";

export const addBoard = (data) => ({ type: ADD_BOARD_REQUEST, data });
export const addReview = (data) => ({ type: ADD_REVIEW_REQUEST, data });

const reducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case LOAD_BOARD_REQUEST:
                draft.loadBoardLoading = true;
                draft.loadBoardDone = false;
                draft.loadBoardError = null;
                break;
            case LOAD_BOARD_SUCCESS:
                draft.loadBoardLoading = false;
                draft.loadBoardDone = true;
                draft.mainBoards = draft.mainBoards.concat(action.data);
                break;
            case LOAD_BOARD_FAILURE:
                draft.loadBoardLoading = false;
                draft.loadBoardError = action.error;
                break;
            case ADD_REVIEW_REQUEST:
                draft.addReviewLoading = true;
                draft.addReviewDone = false;
                draft.addReviewError = null;
                break;
            case ADD_REVIEW_SUCCESS: {
                const board = draft.mainBoards.find(
                    (v) => v.id === action.data.BoardId
                );
                board.Reviews.unshift(action.data);
                draft.addReviewLoading = false;
                draft.addReviewDone = true;
                break;
            }
            case ADD_REVIEW_FAILURE:
                draft.addReviewLoading = false;
                draft.addReviewError = action.error;
                break;
            default:
                break;
        }
    });

export default reducer;
