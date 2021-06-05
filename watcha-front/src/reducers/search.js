import { handleActions } from "redux-actions";
const SEARCH_ADD = "search/SEARCH_DATA";

export const searchAdd = (search) => ({
    type: SEARCH_ADD,
    search: search,
});

const initState = "";

export default handleActions(
    {
        [SEARCH_ADD]: (state, action) => {
            console.log("action : " , action);
            const { search } = action;
            state = "";
            return state.concat(search);
        },
    },
    initState
);
