import produce from "../utils/produce";

export const initialState = {
  thismonth: 6,
  year: 2021,
  schedules: [
    { date: "2021-06-25T22:05", desc: "ice", completed: false },
    { date: "2021-06-25T19:17", desc: "ice2", completed: false },
    { date: "2021-06-26T02:17", desc: "ice3", completed: false },
  ],
};

//Action
export const LOAD_DATE_REQUEST = "LOAD_DATE_REQUEST";
export const LOAD_DATE_SUCCESS = "LOAD_DATE_SUCCESS";
export const LOAD_DATE_FAILURE = "LOAD_DATE_FAILURE";

export const ADD_SCHEDULE_REQUEST = "ADD_SCHEDULE_REQUEST";
export const ADD_SCHEDULE_SUCCESS = "ADD_SCHEDULE_SUCCESS";
export const ADD_SCHEDULE_FAILURE = "ADD_SCHEDULE_FAILURE";

export const PREV_MONTH = "PREV_MONTH"
export const NEXT_MONTH = "NEXT_MONTH"

// Action Creators
export const loadDate = (date) =>{
    return {type:LOAD_DATE, date};
};
export const prevMonth = (thismonth) =>{
    return {type:PREV_MONTH, thismonth};
};
export const nextMonth = (thismonth) =>{
    return {type:NEXT_MONTH, thismonth};
};
export const addSchedule = (genre, title , date) =>{
    console.log("calendar redux : " , genre , title , date);
    return {type:ADD_SCHEDULE, genre, title, date};
};
//Reducer
export default function reducer(state = initialState, action){
    switch (action.type){
        case "calendar/LOAD_DATE":{
            return state;
        }
        case "calendar/PREV_MONTH":{
            if(state.thismonth === 1){
                return {...state, thismonth: state.thismonth+11, year:state.year-1}
            } return {...state, thismonth:state.thismonth-1}
            
        }
        case "calendar/NEXT_MONTH":{
            if(state.thismonth===12){
                return {...state, thismonth: state.thismonth-11, year:state.year+1};
            } return {...state, thismonth:state.thismonth+1};

        }
        case "calendar/ADD_SCHEDULE":{
            const new_schedules = [...state.schedules,{date:action.date, desc:action.desc, completed:false}];
            return {schedules:new_schedules};
        }
        default:
            return state;
    }
}