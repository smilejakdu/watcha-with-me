import React from "react";
import { Body, BodyCenter } from "./BoardPage.style";
import BoardForm from "../../components/BoardForm/BoardForm";
import BoardInfo from "../../components/BoardInfo/BoardInfo";

const BoardPage = () => {
    return (
        <Body>
            <BodyCenter>
                <BoardForm />
            </BodyCenter>
            <BodyCenter>
                <BoardInfo />
            </BodyCenter>
        </Body>
    );
};

export default BoardPage;
