import React,{useState , useEffect , useCallback} from 'react'
import axios from "axios";
import { Button, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {LOAD_BOARD_REQUEST} from "../../reducers/board"

const Board = ()=> {
    const dispatch = useDispatch();
    const {} = useSelector((state)=>state.board)

    return (
        <>
            <Card style={{ width: "18rem" }}>
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Text>
                        Some quick example text to build on the card title and
                        make up the bulk of the card's content.
                    </Card.Text>
                    <Button variant="dark">Go somewhere</Button>
                </Card.Body>
            </Card>
        </>
    );
}

export default Board
