import React,{ useState, useEffect, useCallback} from 'react'
import {
    Body,
    BodyCenter,
} from "./DetailBoardPage.style";
import { useSelector , useDispatch} from "react-redux";
import { Card, Spinner , Button , InputGroup , FormControl } from "react-bootstrap";
import ReviewInfo from "../../components/ReviewInfo/ReviewInfo"
import {
    LOAD_DETAIL_BOARD_REQUEST,
    ADD_REVIEW_REQUEST,
    REMOVE_BOARD_REQUEST,
    REMOVE_REVIEW_REQUEST,
} from "../../reducers/board";
import { useHistory, useLocation } from "react-router-dom";
import useInput from "../../hooks/useInput"

const DetailBoardPage=()=> {
    const dispatch = useDispatch();
    const history = useHistory();
    const location = useLocation();
    const [text, onChangeText, setText] = useInput("");
    const [reviewData , setReviewData] = useState();
    const [detailId , setDetailId] = useState();
    const { detailBoards, addReviewLoading } = useSelector(
        (state) => state.board
    );

    useEffect(() => {
        dispatch({
            type: LOAD_DETAIL_BOARD_REQUEST,
            data: location.state,
        });
        setText("")
    }, [addReviewLoading]);

    useEffect(() => {
        setReviewData(detailBoards.reviews);
        setDetailId(detailBoards.id);
    }, [detailBoards]);

    const ReviewOnClick = () => {
        return dispatch({
            type: ADD_REVIEW_REQUEST,
            data: { content: text, board_id: detailId },
        });
        // window.location.reload(); // 별로 좋아보이진 않는다 강제로 새로고침해서 데이터 받아옴
    };

    const onKeyPress = (e) => {
         if (e.key == "Enter") {
             ReviewOnClick();
         }
    };

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
        <Body>
            {reviewData ? (
                <BodyCenter>
                    <Card style={{border:"none"}}>
                        <Card.Header
                            style={{
                                color: `${
                                    text_color_list[
                                        Math.floor(
                                            Math.random() *
                                                text_color_list.length
                                        )
                                    ]
                                }`,
                                border: "none",
                            }}
                        >
                            {detailBoards.nickname}
                        </Card.Header>
                        <Card.Body>
                            <blockquote className="blockquote mb-0">
                                <p> - {detailBoards.title} - </p>
                                <footer>{detailBoards.content}</footer>
                            </blockquote>
                        </Card.Body>
                    </Card>
                    <InputGroup className="mb-3" style={{ marginTop: "30px" }}>
                        <FormControl
                            placeholder="write content"
                            aria-label="Recipient's username"
                            aria-describedby="basic-addon2"
                            value={text}
                            onChange={onChangeText}
                            onKeyPress={onKeyPress}
                        />
                        <InputGroup.Append>
                            <Button
                                variant="outline-secondary"
                                onClick={ReviewOnClick}
                                style={{zIndex:0}}
                            >
                                Button
                            </Button>
                        </InputGroup.Append>
                    </InputGroup>
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
