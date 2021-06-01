import React from 'react'
import {
    Button,
    Card,
    InputGroup,
    FormControl,
    Spinner,
} from "react-bootstrap";
import useInput from "../../hooks/useInput"

const ReviewForm=()=> {
    const [text, onChangeText, setText] = useInput("");

    const ReviewOnClick = () => {
         alert("click");
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
