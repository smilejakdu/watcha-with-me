import styled from "styled-components";
import palette from "../../utils/palette";
import TextareaAutosize from "react-textarea-autosize";

const BoardBox = styled.div`
    position: relative;
    margin: 30px;
`;

const BoardTextArea = styled(TextareaAutosize)`
    font-size: 25px;
    border: none;
    resize: none;
    outline: none;
`;

export { BoardBox, BoardTextArea };
