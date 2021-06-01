import React,{ useState, useEffect, useCallback} from 'react'
import {
    Body,
    BodyCenter,
    DetailBoardContainer,
    SpinnerBorder
} from "./DetailBoardPage.style";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card,InputGroup , FormControl , Spinner } from "react-bootstrap";
import useInput from "../../hooks/useInput"

const DetailBoardPage=()=> {
    const dispatch = useDispatch();
     const [spinner, setSpinner] = useState(true);
    const { detailBoards } = useSelector((state) => state.board);
    const [text, onChangeText, setText] = useInput("");

    useEffect(() => {
        console.log("detail useEffect : ", detailBoards);
        setSpinner(false);
    }, [detailBoards]);

    const ReviewOnClick =()=>{
        alert("click")
        console.log("text : " , text);
        setText("")
    }

    const onKeyPress = (e)=>{
        if(e.key =="Enter"){
            ReviewOnClick();
        }
    }

    return (
        <Body>
            <BodyCenter>
                {spinner ? (
                    <SpinnerBorder style={{ margin: "auto auto" }}>
                        <Spinner animation="border" role="status">
                            <span className="sr-only">Loading...</span>
                        </Spinner>
                    </SpinnerBorder>
                ) : (
                    <div>
                        <Card>
                            <Card.Header>{detailBoards.title}</Card.Header>
                            <Card.Body>
                                <blockquote className="blockquote mb-0">
                                    <p> {detailBoards.content} </p>
                                    <footer className="blockquote-footer">
                                        {detailBoards.email}
                                    </footer>
                                </blockquote>
                            </Card.Body>
                        </Card>
                        <InputGroup
                            className="mb-3"
                            style={{ marginTop: "30px" }}
                        >
                            <FormControl
                                placeholder="write content"
                                aria-label="Recipient's username"
                                aria-describedby="basic-addon2"
                                value={text}
                                onChange={onChangeText}
                                onKeyPress={onKeyPress}
                            />
                            <InputGroup.Append>
                                <Button
                                    variant="outline-secondary"
                                    onClick={ReviewOnClick}
                                >
                                    Button
                                </Button>
                            </InputGroup.Append>
                        </InputGroup>
                    </div>
                )}
            </BodyCenter>
        </Body>
    );
}

export default DetailBoardPage
