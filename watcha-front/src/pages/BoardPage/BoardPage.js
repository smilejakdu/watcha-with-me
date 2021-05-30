import React from "react";
import { Body, BodyCenter } from "./BoardPage.style";
import BoardComponent from "../../components/Board/Board"
import BoardForm from "../../components/BoardForm/BoardForm";

const BoardPage = () => {
    return (
        <Body>
            <BodyCenter>
                <BoardForm/>
                <BoardComponent/>
            </BodyCenter>
        </Body>
    );
};

export default BoardPage;
