import React,{ useState, useEffect, useCallback} from 'react'
import {
    Body,
    BodyCenter,
    DetailBoardContainer,
    SpinnerBorder
} from "./DetailBoardPage.style";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card,InputGroup , FormControl , Spinner } from "react-bootstrap";
import useInput from "../../hooks/useInput"
import ReviewForm from "../../components/ReviewForm/ReviewForm"
import ReviewInfo from "../../components/ReviewInfo/ReviewInfo"

const DetailBoardPage=()=> {
    const dispatch = useDispatch();
    const [spinner, setSpinner] = useState(true);
    const [reviewData , setReviewData] = useState();
    const { detailBoards } = useSelector((state) => state.board);

    useEffect(() => {
        console.log("detail useEffect : ", detailBoards);
        console.log("detail useEffect : ", detailBoards.title);
        console.log("detail useEffect3 : ", detailBoards.reviews);

        setReviewData(detailBoards.reviews);
        setSpinner(false);
    }, [detailBoards]);

    useEffect(() => {
        console.log("detailBoards29 : " , reviewData);
    },[detailBoards])

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
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                    <h2>재밌지..?? ㅋㅋㅋㅋㅋ</h2>
                </center>
            )}
        </Body>
    );
}

export default DetailBoardPage
