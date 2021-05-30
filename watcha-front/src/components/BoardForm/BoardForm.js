import React, { useState, useEffect, useCallback } from "react";
import { BoardBox, BoardTextArea } from "./BoardForm.style";
import { Button } from "react-bootstrap";
import useInput from "../../hooks/useInput"
import {addBoard} from "../../reducers/board"
import { useDispatch, useSelector } from "react-redux";

const BoardForm = () => {
    const dispatch = useDispatch();
    const [title, onChangeTitle] = useInput("");
    const [content, onChangeContent] = useInput("");

    const handleClick = useCallback(() => {
        console.log(title , content);
        dispatch(addBoard({title , content}));
    },[title, content]);

    return (
        <BoardBox>
            {localStorage.getItem("token") ? (
                <form>
                    <div>
                        <BoardTextArea
                            type="text"
                            name="title"
                            value={title}
                            minRows={2}
                            onChange={onChangeTitle}
                            placeholder="TITLE"
                            required
                        />
                    </div>
                    <div>
                        <BoardTextArea
                            type="text"
                            name="content"
                            value={content}
                            onChange={onChangeContent}
                            required
                            placeholder="CONTENT"
                        />
                    </div>
                    <div>
                        <Button
                            type="submit"
                            variant="dark"
                            onClick={handleClick}
                        >
                            Button
                        </Button>
                    </div>
                </form>
            ) : (
                <div></div>
            )}
        </BoardBox>
    );
};

export default BoardForm;
