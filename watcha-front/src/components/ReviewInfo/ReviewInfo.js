import React,{ useState, useEffect, useCallback} from 'react'
import {
    Button,
    Card,
    InputGroup,
    FormControl,
    Spinner,
} from "react-bootstrap";

const ReviewInfo = ({ review_data }) => {
    return (
        <>
            {review_data &&
                review_data.map((review) => (
                    <Card style={{marginTop:"20px"}}>
                        {/* <Card.Header>{review}</Card.Header> */}
                        <Card.Body>
                            <blockquote className="blockquote mb-0">
                                <p> {review.content}</p>
                                <footer className="blockquote-footer">
                                    {review.email}
                                </footer>
                            </blockquote>
                        </Card.Body>
                    </Card>
                ))}
        </>
    );
};

export default ReviewInfo
