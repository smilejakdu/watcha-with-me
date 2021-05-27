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

    button {
        width: 100%;
        padding: 12px 0;
        background-color: ${palette.gray[7]};
        font-size: 13pt;
        color: white;
        border: 0;
        cursor: pointer;

        &:hover {
            background: ${palette.gray[4]};
        }

        &:active {
            background-color: ${palette.gray[7]};
        }
    }
`;

const KaKaoBtn = styled.button`
    padding: 0;
    width: 300px;
    height: 45px;
    line-height: 44px;
    color: #783c00;
    background-color: #ffeb00;
    border: none;
    border-radius: 3px;
    font-size: 14px;
    font-weight: bold;
    text-align: center;
    cursor: pointer;
    &:hover {
        box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2);
    }
`;

const KaKaoDiv = styled.div`
  margin : 0 auto;
  display: flex;
  justify-content: center;
  padding:20px;
`;

const WhachaLogoImg = styled.img`
    border-radius: 20px;
    margin: 0 auto;
    display: flex;
`

export {
    ModalButtonWrap,
    ModalBody,
    ModalOverlay,
    KaKaoBtn,
    KaKaoDiv,
    WhachaLogoImg,
};
