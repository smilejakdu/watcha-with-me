import React,{ useState, useEffect, useCallback} from 'react'
import {
    Body,
    BodyCenter,
} from "./DetailBoardPage.style";
import { useSelector , useDispatch} from "react-redux";
import { Card, Spinner , Button } from "react-bootstrap";
import ReviewForm from "../../components/ReviewForm/ReviewForm"
import ReviewInfo from "../../components/ReviewInfo/ReviewInfo"
import {
    REMOVE_BOARD_REQUEST,
    REMOVE_REVIEW_REQUEST,
} from "../../reducers/board";
import {useHistory} from 'react-router-dom'

const DetailBoardPage=()=> {
    const dispatch = useDispatch();
    const history = useHistory();
    const [reviewData , setReviewData] = useState();
    const [detailId , setDetailId] = useState();
    const { detailBoards } = useSelector((state) => state.board);

    useEffect(() => {
        setReviewData(detailBoards.reviews);
        setDetailId(detailBoards.id);
        console.log("detailBoards : ", detailBoards);
    }, [detailBoards]);

    useEffect(() => {
        console.log("id : ", detailId);
    }, [detailBoards]);

    const ReviewRemoveOnClick = (id) =>{
        dispatch({
            type: REMOVE_REVIEW_REQUEST,
            data: id,
        });
    }

    return (
        <Body>
            {reviewData ? (
                <BodyCenter>
                    <Card>
                        <Card.Header>{detailBoards.title}</Card.Header>
                        <Card.Body>
                            <blockquote className="blockquote mb-0">
                                <p> {detailBoards.content} </p>
                                <footer className="blockquote-footer">
                                    {detailBoards.email}
                                </footer>
                            </blockquote>
                        </Card.Body>
                    </Card>
                    <ReviewForm />
                    <ReviewInfo review_data={reviewData} />
                </BodyCenter>
            ) : (
                <center>
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden"></span>
                    </Spinner>
                </center>
            )}
        </Body>
    );
}

export default DetailBoardPage
