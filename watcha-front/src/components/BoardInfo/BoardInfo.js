import React,{useState , useEffect , useCallback} from 'react'
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {LOAD_BOARD_REQUEST} from "../../reducers/board"

const BoardInfo = () => {
    const dispatch = useDispatch();
    const { mainBoards, loadBoardLoading } = useSelector(
        (state) => state.board
    );

    useEffect(() => {
        dispatch({
            type: LOAD_BOARD_REQUEST,
        });
    }, []);

    useEffect(() => {
        console.log("board : ", mainBoards);
    }, [mainBoards]);

    useEffect(() => {
        function onScroll() {
            if (
                window.pageYOffset + document.documentElement.clientHeight >
                document.documentElement.scrollHeight - 300
            ) {
                if (loadBoardLoading) {
                    const lastId = mainBoards[mainBoards.length - 1]?.id;
                    dispatch({ type: LOAD_BOARD_REQUEST, lastId });
                }
            }
        }
        window.addEventListener("scroll", onScroll);
        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, [loadBoardLoading, mainBoards]);

    return (
        <>
            {mainBoards.map((board) => (
              <Card style={{ width: "18rem" }}>
                  <Card.Body>
                      <Card.Title>{board.title}</Card.Title>
                      <Card.Text>{board.content}</Card.Text>
                      <Button variant="dark">Go somewhere</Button>
                  </Card.Body>
              </Card>
            ))}
        </>
    );
};

export default BoardInfo;
