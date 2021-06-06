import React,{useState , useEffect , useCallback} from 'react'
import {
    ModalButtonWrap,
    ModalBody,
    ModalOverlay,
    Input,
    BoardTextArea,
} from "./UpdateModal.style";
import { useSelector, useDispatch } from "react-redux";
import {UPDATE_REVIEW_REQUEST} from "../../reducers/board"
import useInput from "../../hooks/useInput"
import { Button } from "react-bootstrap";

const UpdateModal = ({close, review_id,review_content }) => {
    const [content, onChangeContent, setContent] = useInput(review_content);
    const dispatch = useDispatch();

    const ReviewUpdateModal = useCallback(() => {
        dispatch({
            type: UPDATE_REVIEW_REQUEST,
            data: { id:review_id , content:content },
        });
        close();
        window.location.reload();
    }, [content]);

    return (
        <div>
            <ModalOverlay onClick={close} />
            <ModalBody>
                <p className="title">
                    W<p className="ai">at</p>cha
                </p>
                <div className="content">
                    <BoardTextArea
                        minRows={2}
                        type="text"
                        name="content"
                        onChange={onChangeContent}
                        value={content}
                        required
                        placeholder="CONTENT"
                    />
                </div>
                <ModalButtonWrap>
                    <button onClick={ReviewUpdateModal}>update</button>
                    <button onClick={close}>cancel</button>
                </ModalButtonWrap>
            </ModalBody>
        </div>
    );
};

export default UpdateModal
