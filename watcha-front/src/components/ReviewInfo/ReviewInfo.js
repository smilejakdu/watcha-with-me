import React, { useState, useEffect, useCallback } from "react";
import {
    Button,
    Card,
    InputGroup,
    FormControl,
    Spinner,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
    REMOVE_REVIEW_REQUEST,
    UPDATE_REVIEW_REQUEST,
} from "../../reducers/board";

import{UpdateRemoveBtnBorder} from "./ReviewInfo.style"
import UpdateModal from "../UpdateModal/UpdateModal"

const ReviewInfo = ({ review_data }) => {
    const [updateModal, setUpdateModal] = useState(false);
    const dispatch = useDispatch();

    const ReviewUpdateOnClick = useCallback(() => {
        // dispatch({
        //     type: UPDATE_REVIEW_REQUEST,
        //     data: { id: id },
        // });
        // window.location.reload();
        ModalShowOpen();
    },[])

    const ReviewRemoveOnClick = (id)=>{
        dispatch({
            type: REMOVE_REVIEW_REQUEST,
            data: {id:id},
        });
        window.location.reload();
    }
    const ModalShowOpen = useCallback(() => {
        setUpdateModal(true);
    },[])

    const ModalShowClose = useCallback(() => {
        setUpdateModal(false);
    },[])


    const text_color_list = [
        "#ff6600",
        "#ffe500",
        "#99ff00",
        "#001AFF",
        "#8C00FF",
        "#000",
        "#008444",
        "#CC00FF",
    ];

    return (
        <>
            {updateModal && (
                <UpdateModal
                    isOpen={ModalShowOpen}
                    close={ModalShowClose}
                    textData="login"
                />
            )}
            {review_data &&
                review_data.map((review) => (
                    <Card style={{ marginTop: "20px" }}>
                        <Card.Body>
                            <blockquote className="blockquote mb-0">
                                <p> {review.content}</p>
                                <footer className="blockquote-footer">
                                    {review.nickname}
                                </footer>
                            </blockquote>
                            {localStorage.getItem("nickname") ===
                                review.nickname && (
                                <UpdateRemoveBtnBorder>
                                    <Button
                                        style={{
                                            border: "none",
                                            marginRight: "10px",
                                            background: `${
                                                text_color_list[
                                                    (review.id + 3) %
                                                        text_color_list.length
                                                ]
                                            }`,
                                        }}
                                        onClick={() =>
                                            ReviewUpdateOnClick(review.id)
                                        }
                                    >
                                        update
                                    </Button>
                                    <Button
                                        style={{
                                            border: "none",
                                            background: `${
                                                text_color_list[
                                                    review.id %
                                                        text_color_list.length
                                                ]
                                            }`,
                                        }}
                                        onClick={() =>
                                            ReviewRemoveOnClick(review.id)
                                        }
                                    >
                                        remove
                                    </Button>
                                </UpdateRemoveBtnBorder>
                            )}
                        </Card.Body>
                    </Card>
                ))}
        </>
    );
};

export default ReviewInfo;
