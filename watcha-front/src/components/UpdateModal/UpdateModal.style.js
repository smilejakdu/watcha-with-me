import styled from "styled-components";
import palette from "../../utils/palette";
import TextareaAutosize from "react-textarea-autosize";

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

const ModalButtonWrap = styled.div`
    margin: 0;
    margin-top: 8px;
    display:flex;

    button {
        width: 100%;
        padding: 12px 0;
        background-color: ${palette.gray[7]};
        font-size: 13pt;
        color: white;
        border: 1px solid white;
        cursor: pointer;

        &:hover {
            background: ${palette.gray[4]};
        }

        &:active {
            background-color: ${palette.gray[7]};
        }
    }

    p {
        cursor: pointer;
        &:hover {
            color: black;
        }
    }
`;

const Input = styled.input`
    font-size: 1rem;
    display: flex;
    border: none;
    outline: none;
    border-bottom: 1px solid black;
    width: 80%;
    margin: 30px;
    &:hover {
        cursor: pointer;
        border-bottom: 1px solid ${palette.gray[4]};
    }
`;

const BoardTextArea = styled(TextareaAutosize)`
    font-size: 25px;
    border: none;
    resize: none;
    outline: none;
`;

export { ModalButtonWrap, ModalBody, ModalOverlay, Input, BoardTextArea };
