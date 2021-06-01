import React,{useState , useEffect , useCallback} from 'react'
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { LOAD_DETAIL_BOARD_REQUEST } from "../../reducers/board";
import {CardContainer} from "./BoardInfo.style"
import {useHistory} from "react-router-dom"
import { LOAD_BOARD_REQUEST } from "../../reducers/board";
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
        dispatch({
            type: LOAD_DETAIL_BOARD_REQUEST,
            data: id,
        });
        history.push("/detailboard");
    }

    return (
        <CardContainer>
            {mainBoards.length > 0 &&
                mainBoards.map((board) => (
                <Card style={{ width: "18rem" , margin:"20px" ,cursor:"pointer" }} onClick={()=>detailBoardClick(board.id)}>
                    <Card.Body>
                        <Card.Subtitle className="mb-2 text-muted">{board.email}</Card.Subtitle>
                        <Card.Title>{board.title}</Card.Title>
                        <Card.Text>
                            {board.content}
                        </Card.Text>
                    </Card.Body>
                </Card>
            ))}
        </CardContainer>
    );
};

export default BoardInfo;
