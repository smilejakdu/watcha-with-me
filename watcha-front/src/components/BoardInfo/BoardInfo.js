import React,{useState , useEffect , useCallback} from 'react'
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { LOAD_DETAIL_BOARD_REQUEST } from "../../reducers/board";
import {CardContainer} from "./BoardInfo.style"
import {useHistory} from "react-router-dom"
import { LOAD_BOARD_REQUEST, REMOVE_BOARD_REQUEST } from "../../reducers/board";

const BoardInfo = ({board}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { mainBoards, loadBoardLoading } = useSelector((state) => state.board);
    
    useEffect(() => {
        dispatch({
            type: LOAD_BOARD_REQUEST,
        });
    }, []);

    const detailBoardClick = (id)=>{
        history.push({
            pathname: "/detailboard",
            state: id,
        });
    }

    const BoardRemoveOnClick = (id)=>{
        dispatch({
            type: REMOVE_BOARD_REQUEST,
            data: {id:id},
        }); 
    }
    const color_list = [
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "light",
        "dark",
    ];
    return (
        <CardContainer>
            {mainBoards.length > 0 &&
                mainBoards.map((board) => (
                    <Card
                        style={{ margin: "20px" }}
                        bg={color_list[Math.floor(Math.random() *color_list.length)]}
                        // text={variant=== "light" ? "dark" : "white"}
                        style={{ width: "18rem" }}
                        className="mb-2"
                    >
                        <Card.Header>{board.nickname}</Card.Header>
                        <Card.Body
                            style={{
                                width: "18rem",
                                margin: "20px",
                                cursor: "pointer",
                            }}
                            onClick={() => detailBoardClick(board.id)}
                        >
                            <Card.Title>{board.title}</Card.Title>
                            <Card.Text>{board.content}</Card.Text>
                        </Card.Body>
                        <Button
                            variant="dark"
                            style={{
                                position: "absolute",
                                right: 0,
                                bottom: 0,
                                marginRight: "10px",
                                marginBottom: "10px",
                            }}
                            onClick={() => BoardRemoveOnClick(board.id)}
                        >
                            remove
                        </Button>
                    </Card>
                ))}
        </CardContainer>
    );
};

export default BoardInfo;
