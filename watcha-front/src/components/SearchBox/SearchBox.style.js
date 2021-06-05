import styled from "styled-components";
import palette from "../../utils/palette"

const SearchBorder = styled.div`
    div {
        width: 12rem;
        border: 1px solid ${palette.gray[4]};
        border-radius: 5px;
        overflow-y: scroll;
        height: 500px;
        padding: 5px;
        z-index: 3;
        background: white;
        position: absolute;
    }
    h6 {
        font-size: 1rem;
        padding: 8px;
        &:hover {
            cursor: pointer;
            color: coral;
        }
    }
`;

export { SearchBorder };
