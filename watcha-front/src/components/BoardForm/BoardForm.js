import React, { useState, useEffect, useCallback } from "react";
import { BoardBox, BoardTextArea } from "./BoardForm.style";
import { Button } from "react-bootstrap";
import useInput from "../../hooks/useInput";
import { ADD_BOARD_REQUEST , LOAD_BOARD_REQUEST } from "../../reducers/board";
import { useDispatch, useSelector } from "react-redux";

const BoardForm = () => {
    const dispatch = useDispatch();
    const { addBoardDone } = useSelector((state) => state.board);
    const [title, onChangeTitle, setTitle] = useInput("");
    const [content, onChangeContent, setContent] = useInput("");

    useEffect(() => {
        if (addBoardDone) {
            setTitle("");
            setContent("");
        }
    }, [addBoardDone]);

    const onSubmit = useCallback(() => {
        if (!title || !title.trim()) {
            return alert("제목을 작성하세요.");
        }
        if (!content || !content.trim()) {
            return alert("내용을 작성하세요.");
        }
        dispatch({
            type: ADD_BOARD_REQUEST,
            data: { title: title, content: content },
        });
    }, [title, content]);

    return (
        <BoardBox>
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
                <Button type="submit" variant="dark" onClick={onSubmit}>
                    Button
                </Button>
              </div>
            </form>
        </BoardBox>
    );
};

export default BoardForm;
