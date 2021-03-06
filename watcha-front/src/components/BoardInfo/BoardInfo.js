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

const BoardInfo = ({boards}) => {
    const history = useHistory();
    const dispatch = useDispatch();
    
    const detailBoardClick = (id)=>{
        history.push({
            pathname: "/detailboard",
            state: id,
        });
    }

    const BoardRemoveOnClick = (id)=>{
        return dispatch({
            type: REMOVE_BOARD_REQUEST,
            data: {id:id},
        }); 
    }

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
            {boards.length > 0 &&
                boards.map((board) => (
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
                            <p style={{fontSize:"14px", float:"right" , margin:"10px" }}>
                                {board.created_at}
                            </p>
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
                            <Button variant="light">
                                review{" "}
                                <Badge variant="secondary">
                                    {board.review_count}
                                </Badge>
                            </Button>
                        </Card.Body>
                        {localStorage.getItem("nickname") ===
                            board.nickname && (
                            <UpdateRemoveBtnBorder>
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
