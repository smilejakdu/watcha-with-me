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

const UpdateModal = ({ isOpen, close, textData }) => {
    const [content, onChangeContent, setContent] = useInput("");
    const dispatch = useDispatch();

    const ReviewUpdateModal = useCallback((id) => {
        dispatch({
            type:UPDATE_REVIEW_REQUEST,
            data:{id:id}
        })
    },[])

    return (
        <div>
            <ModalOverlay onClick={close} />
            <ModalBody>
                <p className="title">
                    W<p className="ai">at</p>cha
                </p>
                <div className="content">
                    <BoardTextArea
                        placeholder="content"
                        minRows={2}
                        type="text"
                        name="content"
                    />
                </div>
                <ModalButtonWrap>
                    <button onClick={close}>update</button>
                    <button onClick={close}>cancel</button>
                </ModalButtonWrap>
            </ModalBody>
        </div>
    );
};

export default UpdateModal
