import produce from "../utils/produce";

export const initialState = {
  thismonth: null,
  year: null,
  schedules: [],

  loadScheduleLoading: false,
  loadScheduleDone: false,
  loadScheduleError: null,

  addScheduleLoading: false,
  addScheduleDone: false,
  addScheduleError: null,
};

//Action
export const LOAD_SCHEDULE_REQUEST = "LOAD_SCHEDULE_REQUEST";
export const LOAD_SCHEDULE_SUCCESS = "LOAD_SCHEDULE_SUCCESS";
export const LOAD_SCHEDULE_FAILURE = "LOAD_SCHEDULE_FAILURE";

export const ADD_SCHEDULE_REQUEST = "ADD_SCHEDULE_REQUEST";
export const ADD_SCHEDULE_SUCCESS = "ADD_SCHEDULE_SUCCESS";
export const ADD_SCHEDULE_FAILURE = "ADD_SCHEDULE_FAILURE";

export const PREV_MONTH = "PREV_MONTH";
export const NEXT_MONTH = "NEXT_MONTH";

// Action Creators
export const loadDate = (date) => {
  return { type: LOAD_SCHEDULE_REQUEST, date };
};
export const prevMonth = (thismonth) => {
  return { type: PREV_MONTH, thismonth };
};
export const nextMonth = (thismonth) => {
  return { type: NEXT_MONTH, thismonth };
};
export const addSchedule = (genre, title, date) => {
  console.log("calendar redux : ", genre, title, date);
  return { type: ADD_SCHEDULE_REQUEST, genre, title, date };
};

//Reducer
const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOAD_SCHEDULE_REQUEST:
        draft.loadScheduleLoading = true;
        draft.loadScheduleDone = false;
        draft.loadScheduleError = null;
        break;
      case LOAD_SCHEDULE_SUCCESS:
        draft.loadScheduleLoading = false;
        draft.loadScheduleDone = true;
        draft.schedules = action.data;
        break;
      case LOAD_SCHEDULE_FAILURE:
        draft.loadScheduleLoading = false;
        draft.loadScheduleError = action.error;
        break;
      case ADD_SCHEDULE_REQUEST:
        draft.addScheduleLoading = true;
        draft.addScheduleDone = false;
        draft.addScheduleError = null;
        break;
      case ADD_SCHEDULE_SUCCESS:
        draft.addScheduleLoading = false;
        draft.addScheduleDone = true;
        draft.schedules.unshift(action.data.data[0]);
        break;
      case ADD_SCHEDULE_FAILURE:
        draft.addScheduleLoading = false;
        draft.addScheduleError = action.error;
        break;
      case PREV_MONTH:
        if (draft.thismonth === 1) {
          draft.thismonth += 11
          draft.thisyear -= 1
          break;
        }
        draft.thismonth -= 1
        break;
        break;
      case NEXT_MONTH:
        if (draft.thismonth === 12) {
          draft.thismonth -= 11
          draft.thisyear += 1
          break;
        } 
        draft.thismonth += 1
        break;
      default:
        break;
    }
  });

export default reducer;