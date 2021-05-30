import React, { useState, useEffect, useCallback } from "react";
import { BoardBox, BoardTextArea } from "./BoardForm.style";
import { Button } from "react-bootstrap";

const BoardForm = ({ onPost }) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");

    const handleClick = useCallback(
        (e) => {
            e.preventDefault();
            onPost(title, content);
            setTitle("");
            setContent("");
        },
        [title, content]
    );

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
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="TITLE"
                            required
                        />
                    </div>
                    <div>
                        <BoardTextArea
                            type="text"
                            name="content"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
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
