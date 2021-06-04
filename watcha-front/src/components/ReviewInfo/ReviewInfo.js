import React, { useState, useEffect, useCallback } from "react";
import {
    Button,
    Card,
    InputGroup,
    FormControl,
    Spinner,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { REMOVE_REVIEW_REQUEST } from "../../reducers/board";

const ReviewInfo = ({ review_data }) => {
    const dispatch = useDispatch();
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

    const ReviewRemoveOnClick = (id)=>{
        dispatch({
            type: REMOVE_REVIEW_REQUEST,
            data: {id:id},
        });
        alert(123);
        window.location.reload();
    }

    return (
        <>
            {review_data &&
                review_data.map((review) => (
                    <Card style={{ marginTop: "20px" }}>
                        {/* <Card.Header>{review}</Card.Header> */}
                        <Card.Body>
                            <blockquote className="blockquote mb-0">
                                <p> {review.content}</p>
                                <footer className="blockquote-footer">
                                    {review.nickname}
                                </footer>
                            </blockquote>
                            {localStorage.getItem("nickname") ===
                                review.nickname && (
                                <Button
                                    style={{
                                        position: "absolute",
                                        right: 0,
                                        bottom: 0,
                                        border: "none",
                                        marginRight: "10px",
                                        marginBottom: "10px",
                                        background: `${text_color_list[review.id %
                                                    text_color_list.length]
                                        }`,
                                    }}
                                    onClick={() => ReviewRemoveOnClick(review.id)}
                                >
                                    remove
                                </Button>
                            )}
                        </Card.Body>
                    </Card>
                ))}
        </>
    );
};

export default ReviewInfo;
