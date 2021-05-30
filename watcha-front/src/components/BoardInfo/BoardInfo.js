import React,{useState , useEffect , useCallback} from 'react'
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {LOAD_BOARD_REQUEST} from "../../reducers/board"
import {CardContainer} from "./BoardInfo.style"

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
        console.log("mainBoards :", mainBoards);
    }, [mainBoards]);

    // useEffect(() => {
    //     function onScroll() {
    //         if (
    //             window.pageYOffset + document.documentElement.clientHeight >
    //             document.documentElement.scrollHeight - 300
    //         ) {
    //             if (loadBoardLoading) {
    //                 const lastId = mainBoards[mainBoards.length - 1]?.id;
    //                 dispatch({ type: LOAD_BOARD_REQUEST, lastId });
    //             }
    //         }
    //     }
    //     window.addEventListener("scroll", onScroll);
    //     return () => {
    //         window.removeEventListener("scroll", onScroll);
    //     };
    // }, [loadBoardLoading, mainBoards]);

    return (
        <CardContainer>
            {mainBoards.map((board) => (
              <Card style={{ width: "18rem" , margin:"20px" }}>
                  <Card.Body>
                      <Card.Title>{board.title}</Card.Title>
                      {/* <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle> */}
                      <Card.Text>
                        {board.content}
                      </Card.Text>
                      <Button variant="dark">Button</Button>
                  </Card.Body>
              </Card>
            ))}
        </CardContainer>
    );
};



export default BoardInfo;
