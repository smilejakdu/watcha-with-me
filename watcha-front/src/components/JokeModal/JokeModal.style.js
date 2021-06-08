import styled from "styled-components";
import palette from "../../utils/palette";


const ModalOverlay = styled.div`
    position: fixed;
    z-index: 2;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.16);
`;

const ModalBody = styled.div`
    position: fixed;
    z-index: 3;
    margin: 5rem auto;
    left: 0;
    right: 0;
    width: 320px;
    background: white;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    & > * {
        &:first-child {
            margin-top: 16px;
        }
        margin-left: 16px;
        margin-right: 16px;
    }

    p.title {
        font-size: 16pt;
        font-weight: bold;
        justify-content: center;
        color: #212529;
        display: flex;
        .ai {
            color: red;
        }
    }

    .content {
        margin-top: 16px;
        display: flex;
        p {
            padding: 8px;
            font-size: 15px;
            margin: 0 auto;
            justify-content: center;
            color: #999;
            display: flex;
        }
    }
`;

const JokeBorder = styled.div`
    margin:20px;
    display: flex;
    justify-content: center;
`;


export { ModalBody, ModalOverlay, JokeBorder};
