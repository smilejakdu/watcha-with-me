import React from 'react'
import {
    Button,
    Card,
    InputGroup,
    FormControl,
    Spinner,
} from "react-bootstrap";
import useInput from "../../hooks/useInput"
import {ADD_REVIEW_REQUEST} from "../../reducers/board"
import { useSelector, useDispatch } from "react-redux";

const ReviewForm=()=> {
    const dispatch = useDispatch();
    const { loadDetailBoardLoading, detailBoards } = useSelector(
        (state) => state.board
    );
    const [text, onChangeText, setText] = useInput("");

    const ReviewOnClick = () => {
         dispatch({
             type: ADD_REVIEW_REQUEST,
             data: { content: text, board_id: detailBoards.id },
         });
         setText("");
    };

    const onKeyPress = (e) => {
         if (e.key == "Enter") {
             ReviewOnClick();
         }
    };

    return (
        <div>
            <InputGroup className="mb-3" style={{ marginTop: "30px" }}>
                <FormControl
                    placeholder="write content"
                    aria-label="Recipient's username"
                    aria-describedby="basic-addon2"
                    value={text}
                    onChange={onChangeText}
                    onKeyPress={onKeyPress}
                />
                <InputGroup.Append>
                    <Button variant="outline-secondary" onClick={ReviewOnClick}>
                        Button
                    </Button>
                </InputGroup.Append>
            </InputGroup>
        </div>
    );
}

export default ReviewForm
