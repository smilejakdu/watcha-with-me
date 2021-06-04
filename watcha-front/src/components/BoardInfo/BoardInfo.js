import React,{useState , useEffect , useCallback} from 'react'
import axios from "axios";
import { Button, Card, Badge } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { LOAD_DETAIL_BOARD_REQUEST } from "../../reducers/board";
import { CardContainer, UpdateRemoveBtnBorder } from "./BoardInfo.style";
import {useHistory} from "react-router-dom"
import {
    LOAD_BOARD_REQUEST,
    REMOVE_BOARD_REQUEST,
    UPDATE_BOARD_REQUEST,
} from "../../reducers/board";

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

    const BoardUpdateOnClick = (id) => {
        dispatch({
            type: UPDATE_BOARD_REQUEST,
            data: { id: id },
        });
    };

    const color_list = [
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "light",
    ];

    const text_color_list = [
        "#ff6600",
        "#ffe500",
        "#99ff00",
        "#001AFF",
        "#8C00FF",
        "#000",
        "#008444",
        "#CC00FF",
    ]

 ;
    return (
        <CardContainer>
            {mainBoards.length > 0 &&
                mainBoards.map((board) => (
                    <Card style={{ margin: "20px", border: "none" }}>
                        <Card.Header
                            style={{
                                color: `${
                                    text_color_list[
                                        board.id % text_color_list.length
                                    ]
                                }`,
                                border: "none",
                            }}
                        >
                            {board.nickname}
                        </Card.Header>
                        <Card.Body
                            style={{
                                margin: "20px",
                                cursor: "pointer",
                            }}
                            onClick={() => detailBoardClick(board.id)}
                        >
                            <Card.Title>{board.title}</Card.Title>
                            <Card.Text>{board.content}</Card.Text>
                            <Button variant="light" text="dark">
                                review <Badge bg="secondary">{board.review_count}</Badge>
                            </Button>
                        </Card.Body>
                        {localStorage.getItem("nickname") ===
                            board.nickname && (
                            <UpdateRemoveBtnBorder>
                                <Button
                                    style={{
                                        border: "none",
                                        marginRight: "10px",
                                        background: `${
                                            text_color_list[
                                                board.id %
                                                    text_color_list.length
                                            ]
                                        }`,
                                    }}
                                    onClick={() => BoardUpdateOnClick(board.id)}
                                >
                                    update
                                </Button>
                                <Button
                                    style={{
                                        border: "none",
                                        background: `${
                                            text_color_list[
                                                board.id %
                                                    text_color_list.length
                                            ]
                                        }`,
                                    }}
                                    onClick={() => BoardRemoveOnClick(board.id)}
                                >
                                    remove
                                </Button>
                            </UpdateRemoveBtnBorder>
                        )}
                    </Card>
                ))}
        </CardContainer>
    );
};

export default BoardInfo;
