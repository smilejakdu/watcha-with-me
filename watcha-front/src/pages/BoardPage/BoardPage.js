import React,{useState , useEffect , useCallback} from "react";
import { Body, BodyCenter } from "./BoardPage.style";
import BoardForm from "../../components/BoardForm/BoardForm";
import BoardInfo from "../../components/BoardInfo/BoardInfo";

import {LOAD_BOARD_REQUEST} from "../../reducers/board"
import { useSelector, useDispatch } from "react-redux";


const BoardPage = () => {
    const dispatch = useDispatch();
    const {
        mainBoards,
        loadBoardLoading 
    } = useSelector((state) => state.board);

    useEffect(() => {
        dispatch({
            type: LOAD_BOARD_REQUEST,
        });
        console.log("2", mainBoards);
    }, []);

    return (
        <Body>
            <BodyCenter>
              {localStorage.getItem("token") && <BoardForm />}
            </BodyCenter>
            <BodyCenter>
                <BoardInfo boards={mainBoards} />
            </BodyCenter>
        </Body>
    );
};

export default BoardPage;
