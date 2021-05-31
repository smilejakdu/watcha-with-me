import React,{ useState, useEffect, useCallback} from 'react'
import {
    Body,
    BodyCenter,
    DetailBoardContainer,
    SpinnerBorder
} from "./DetailBoardPage.style";
import { useSelector, useDispatch } from "react-redux";
import {LOAD_DETAIL_BOARD_REQUEST} from "../../reducers/board"
import { Button, Card,Form , Spinner } from "react-bootstrap";

const DetailBoardPage=()=> {
    const dispatch = useDispatch();
    const [spinner ,setSpinner] = useState(false);
    const { detailBoards } = useSelector((state) => state.board);

    useEffect(() => {
        console.log("detailBoards : ", detailBoards);
        setSpinner()
    }, [detailBoards]);

    return (
        <Body>
            <BodyCenter>
                {detailBoards.length > 0 
                   ? detailBoards.map((board) => (
                        <Card>
                            <Card.Header>{board.title}</Card.Header>
                            <Card.Body>
                                <blockquote className="blockquote mb-0">
                                    <p> {board.content} </p>
                                    <footer className="blockquote-footer">
                                        {board.email}
                                    </footer>
                                </blockquote>
                            </Card.Body>
                        </Card>
                    ))
                    :<SpinnerBorder style={{margin:"auto auto"}}>
                      <Spinner animation="border" role="status">
                         <span className="sr-only">Loading...</span>
                      </Spinner>
                    </SpinnerBorder>
                }
                {detailBoards.length > 0 && (
                    <Form style={{ margin: "20px" }}>
                        <Form.Group controlId="formGroupEmail">
                            <Form.Label>Write</Form.Label>
                            <Form.Control type="email" placeholder="Content" />
                        </Form.Group>
                    </Form>
                )}
            </BodyCenter>
        </Body>
    );
}

export default DetailBoardPage
