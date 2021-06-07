import produce from "../utils/produce";

export const initialState = {
    mainBoards: [],
    detailBoards: [],
    loadingModal : false,
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

    // detail board
    loadDetailBoardLoading: false,
    loadDetailBoardDone: false,
    loadDetailBoardError: null,

    addDetailBoardLoading: false,
    addDetailBoardDone: false,
    addDetailBoardError: null,

    removeDetailBoardLoading: false,
    removeDetailBoardDone: false,
    removeDetailBoardError: null,

    updateDetailBoardLoading: false,
    updateDetailBoardDone: false,
    updateDetailBoardError: null,

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

    // loadingModal

    loadModalLoading: false,
    loadModalDone: false,
    loadModalError: null,
};

// board
export const LOAD_BOARD_REQUEST = "LOAD_BOARD_REQUEST";
export const LOAD_BOARD_SUCCESS = "LOAD_BOARD_SUCCESS";
export const LOAD_BOARD_FAILURE = "LOAD_BOARD_FAILURE";

export const LOAD_DETAIL_BOARD_REQUEST = "LOAD_DETAIL_BOARD_REQUEST";
export const LOAD_DETAIL_BOARD_SUCCESS = "LOAD_DETAIL_BOARD_SUCCESS";
export const LOAD_DETAIL_BOARD_FAILURE = "LOAD_DETAIL_BOARD_FAILURE";

export const ADD_BOARD_REQUEST = "ADD_BOARD_REQUEST";
export const ADD_BOARD_SUCCESS = "ADD_BOARD_SUCCESS";
export const ADD_BOARD_FAILURE = "ADD_REVIEW_FAILURE";

export const REMOVE_BOARD_REQUEST = "REMOVE_BOARD_REQUEST";
export const REMOVE_BOARD_SUCCESS = "REMOVE_BOARD_SUCCESS";
export const REMOVE_BOARD_FAILURE = "REMOVE_BOARD_FAILURE";

export const UPDATE_BOARD_REQUEST = "UPDATE_BOARD_REQUEST";
export const UPDATE_BOARD_SUCCESS = "UPDATE_BOARD_SUCCESS";
export const UPDATE_BOARD_FAILURE = "UPDATE_BOARD_FAILURE";

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
                draft.detailBoards = [];
                break;
            case LOAD_BOARD_SUCCESS:
                draft.loadBoardLoading = false;
                draft.loadBoardDone = true;
                draft.mainBoards = action.data;
                break;
            case LOAD_BOARD_FAILURE:
                draft.loadBoardLoading = false;
                draft.loadBoardError = action.error;
                break;
            case LOAD_DETAIL_BOARD_REQUEST:
                console.log("detail board");
                draft.loadDetailBoardLoading = true;
                draft.loadDetailBoardDone = false;
                draft.loadDetailBoardError = null;
                break;
            case LOAD_DETAIL_BOARD_SUCCESS:
                draft.loadDetailBoardLoading = false;
                draft.loadDetailBoardDone = true;
                console.log("detail board success: ", action.data);
                draft.detailBoards = action.data;
                break;
            case LOAD_DETAIL_BOARD_FAILURE:
                draft.loadDetailBoardLoading = false;
                draft.loadDetailBoardError = action.error;
                break;
            case ADD_BOARD_REQUEST:
                draft.addBoardLoading = true;
                draft.addBoardDone = false;
                draft.addBoardError = null;
                break;
            case ADD_BOARD_SUCCESS:
                draft.addBoardLoading = false;
                draft.addBoardDone = true;
                console.log("action data : " , action.data);
                draft.mainBoards.unshift(action.data);
                // draft.imagePaths = [];
                break;
            case ADD_BOARD_FAILURE:
                draft.addBoardLoading = false;
                draft.addBoardError = action.error;
                break;
            case UPDATE_BOARD_REQUEST:
                draft.updateBoardLoading = true;
                draft.updateBoardDone = false;
                draft.updateBoardError = null;
                break;
            case UPDATE_BOARD_SUCCESS:
                draft.updateBoardLoading = false;
                draft.updateBoardDone = true;
                draft.mainBoards.find(
                    (v) => v.id === action.data.BoardId
                ).content = action.data.content;
                draft.mainBoards.find(
                    (v) => v.id === action.data.BoardId
                ).title = action.data.title;
                break;
            case UPDATE_BOARD_FAILURE:
                draft.updateBoardLoading = false;
                draft.updateBoardError = action.error;
                break;
            case REMOVE_BOARD_REQUEST:
                draft.removeBoardLoading = true;
                draft.removeBoardDone = false;
                draft.removeBoardError = null;
                break;
            case REMOVE_BOARD_SUCCESS:
                draft.removeBoardLoading = false;
                draft.removeBoardDone = true;
                draft.mainBoards = draft.mainBoards.filter(
                    (v) => v.id !== action.data.data
                );
                break;
            case REMOVE_BOARD_FAILURE:
                draft.removeBoardLoading = false;
                draft.removeBoardError = action.error;
                break;
            case ADD_REVIEW_REQUEST:
                draft.addReviewLoading = true;
                draft.addReviewDone = false;
                draft.addReviewError = null;
                break;
            case ADD_REVIEW_SUCCESS: {
                draft.detailBoards.reviews.unshift(action.data.data);
                draft.addReviewLoading = false;
                draft.addReviewDone = true;
                break;
            }
            case ADD_REVIEW_FAILURE:
                draft.addReviewLoading = false;
                draft.addReviewError = action.error;
                break;
            case UPDATE_REVIEW_REQUEST:
                draft.updateReviewLoading = true;
                draft.updateReviewDone = false;
                draft.updateReviewError = null;
                break;
            case UPDATE_REVIEW_SUCCESS:
                draft.updateReviewLoading = false;
                draft.updateReviewDone = true;
                draft.detailBoards.reviews.find((v) => v.id === action.data.data.id
                ).content = action.data.data.content;
                break;
            case UPDATE_REVIEW_FAILURE:
                draft.updateReviewLoading = false;
                draft.updateReviewError = action.error;
                break;
            case REMOVE_REVIEW_REQUEST:
                draft.removeDetailBoardLoading = true;
                draft.removeDetailBoardDone = false;
                draft.removeDetailBoardError = null;
                break;
            case REMOVE_REVIEW_SUCCESS:
                draft.removeDetailBoardLoading = false;
                draft.removeDetailBoardDone = true;
                draft.detailBoards = draft.detailBoards.reviews.filter(
                    (v) => v.id !== action.data.data
                );
                break;
            case REMOVE_REVIEW_FAILURE:
                draft.removeDetailBoardLoading = false;
                draft.removeDetailBoardError = action.error;
                break;
            default:
                break;
        }
    });

export default reducer;
