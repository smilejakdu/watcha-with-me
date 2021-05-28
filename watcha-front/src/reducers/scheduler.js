import produce from "../utils/produce";

export const initialState = {
    mainScheduler: [],
    hasMorePosts: true,

    loadSchedulerLoading: false,
    loadSchedulerDone: false,
    loadSchedulerError: null,

    addSchedulerLoading: false,
    addSchedulerDone: false,
    addSchedulerError: null,

    removeSchedulerLoading: false,
    removeSchedulerDone: false,
    removeSchedulerError: null,

    updateSchedulerLoading: false,
    updateSchedulerDone: false,
    updateSchedulerError: null,
};
export const LOAD_SCHEDULER_REQUEST = "LOAD_SCHEDULER_REQUEST";
export const LOAD_SCHEDULER_SUCCESS = "LOAD_SCHEDULER_SUCCESS";
export const LOAD_SCHEDULER_FAILURE = "LOAD_SCHEDULER_FAILURE";

export const ADD_SCHEDULER_REQUEST = "ADD_COMMENT_REQUEST";
export const ADD_SCHEDULER_SUCCESS = "ADD_COMMENT_SUCCESS";
export const ADD_SCHEDULER_FAILURE = "ADD_COMMENT_FAILURE";

export const REMOVE_SCHEDULER_REQUEST = "REMOVE_SCHEDULER_REQUEST";
export const REMOVE_SCHEDULER_SUCCESS = "REMOVE_SCHEDULER_SUCCESS";
export const REMOVE_SCHEDULER_FAILURE = "REMOVE_SCHEDULER_FAILURE";

export const UPDATE_SCHEDULER_REQUEST = "UPDATE_SCHEDULER_REQUEST";
export const UPDATE_SCHEDULER_SUCCESS = "UPDATE_SCHEDULER_SUCCESS";
export const UPDATE_SCHEDULER_FAILURE = "UPDATE_SCHEDULER_FAILURE";

export const addScheduler = (data) => ({ type: ADD_SCHEDULER_REQUEST, data });

const reducer = (state = initialState, action) =>
    produce(state, (draft) => {
        switch (action.type) {
            case LOAD_SCHEDULER_REQUEST:
                draft.loadSchedulerLoading = true;
                draft.loadSchedulerDone = false;
                draft.loadSchedulerError = null;
                break;
            case LOAD_SCHEDULER_SUCCESS:
                draft.loadSchedulerLoading = false;
                draft.loadSchedulerDone = true;
                draft.mainScheduler = draft.mainScheduler.concat(action.data);
                break;
            case LOAD_SCHEDULER_FAILURE:
                draft.loadSchedulerLoading = false;
                draft.loadSchedulerError = action.error;
                break;
            case ADD_SCHEDULER_REQUEST:
                draft.addSchedulerLoading = true;
                draft.addSchedulerDone = false;
                draft.addSchedulerError = null;
                break;
            case ADD_SCHEDULER_SUCCESS: {
                const post = draft.mainScheduler.find(
                    (v) => v.id === action.data.PostId
                );
                post.Comments.unshift(action.data);
                draft.addSchedulerLoading = false;
                draft.addSchedulerDone = true;
                break;
            }
            case ADD_SCHEDULER_FAILURE:
                draft.addSchedulerLoading = false;
                draft.addSchedulerError = action.error;
                break;
            case REMOVE_SCHEDULER_REQUEST:
                draft.removeSchedulerLoading = true;
                draft.removePostDone = false;
                draft.removeSchedulerError = null;
                break;
            case REMOVE_SCHEDULER_SUCCESS:
                draft.removeSchedulerLoading = false;
                draft.removePostDone = true;
                draft.mainScheduler = draft.mainScheduler.filter(
                    (v) => v.id !== action.data.PostId
                );
                break;
            case REMOVE_SCHEDULER_FAILURE:
                draft.removeSchedulerLoading = false;
                draft.removeSchedulerError = action.error;
                break;
            default:
                break;
        }
    });

export default reducer;
