import styled from "styled-components";
import palette from "../../utils/palette";

const Body = styled.div`
    margin-top: 10px;
    font-size: 28px;
    width: 100%;
`;

const BodyCenter = styled.div`
    margin: 0 auto;
    font-size: 28px;
    width: 60%;
`;

const DetailBoardContainer = styled.div`
    height: 500px;
    width: 100%;
    margin: 0 auto;
`;

const SpinnerBorder = styled.div`
    display: flex;
    margin: auto auto;
    justify-content: center;
`

const UpdateRemoveBtnBorder = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    margin-right: 10px;
    margin-bottom: 10px;
`;

export {
    Body,
    BodyCenter,
    DetailBoardContainer,
    SpinnerBorder,
    UpdateRemoveBtnBorder,
};
