import styled from "styled-components";
import palette from "../../utils/palette"
import { NavLink } from "react-router-dom";

const HeaderBody = styled.div`
  width:100%;
`;

const CategoryLink = styled.div`
    width: 60%;
    display: flex;
    margin: 0 auto;
    z-index: 1;
    justify-content: space-between;
    background-color: rgb(3, 7, 8);
    overflow-x: hidden;
    a:hover {
        text-decoration: none;
    }
`;

const CategoryLinkItem = styled(NavLink)`
  padding: 6px 8px 6px 16px;
  margin-right: 3px;
  text-decoration: none;
  font-size: 30px;
  color: white;
  display: block;
  margin: auto 0;
  display : space-between;

  &.hover{
    border-bottom: 3px solid white;
  }

  &.active {
    color:white;
    font-weight: bold;
  }

  @media (max-width: 850px) {
    font-size: 18px;
  }
`;

export { CategoryLinkItem, CategoryLink, HeaderBody };
