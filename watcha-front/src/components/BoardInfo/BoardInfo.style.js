import styled from "styled-components";
import palette from "../../utils/palette";
import { Button, Card } from "react-bootstrap";

const CardContainer = styled.div`

    @media (max-width: 1500px) {
        grid-template-columns: 1fr 1fr;
        grid-auto-rows: var(--row_increment);
    }

    @media (max-width: 1000px) {
        grid-template-columns: repeat(auto-fill, var(--card_width));
        grid-auto-rows: var(--row_increment);
    }
`;

export { CardContainer };
