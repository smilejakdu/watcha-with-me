import React,{ useState, useEffect, useCallback} from 'react'
import {
    Body,
    BodyCenter,
} from "./DetailBoardPage.style";
import { useSelector , useDispatch} from "react-redux";
import { Card, Spinner , Button } from "react-bootstrap";
import ReviewForm from "../../components/ReviewForm/ReviewForm"
import ReviewInfo from "../../components/ReviewInfo/ReviewInfo"
import {REMOVE_BOARD_REQUEST} from "../../reducers/board"
import {useHistory} from 'react-router-dom'

const DetailBoardPage=()=> {
    const dispatch = useDispatch();
    const history = useHistory();
    const [reviewData , setReviewData] = useState();
    const { detailBoards } = useSelector((state) => state.board);

    useEffect(() => {
        setReviewData(detailBoards.reviews);
    }, [detailBoards]);

    const BoardRemoveOnClick = (id) =>{
        dispatch({
            type : REMOVE_BOARD_REQUEST,
            data : id
        })
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
                                    <Button
                                        variant="dark"
                                        style={{
                                            position: "absolute",
                                            right: 0,
                                            marginRight: "10px",
                                        }}
                                        onClick={() =>BoardRemoveOnClick(detailBoards.id)}
                                    >
                                        remove
                                    </Button>
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
