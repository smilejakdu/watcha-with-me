import styled from "styled-components";
import palette from "../../utils/palette";

const AddContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const InputBox = styled.div`
  width: 70%;
  height: 75%;
  margin-top: 3%;
  background-color: #fff;
  border-radius: 7px;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
  & h2 {
    margin: 0;
  }
  & input {
    width: 80%;
    border-radius: 5px;
    border: 1px solid #888;
    &:focus {
      border: 1px solid #a673ff;
    }
  }
`;
const BtnBox = styled.div`
  margin-top: 3%;
  box-sizing: border-box;
  display: flex;
  width: 70%;
  height: 13%;
  justify-content: space-evenly;
  align-items: center;

  & button {
    box-shadow: 0 1px 2px 0 ${palette.green[1]};
    width: 35%;
    min-width: 90px;
    max-width: 150px;
    height: 30px;
    margin: auto 0px;
    background-color: #fff;
    border: none;
    border-radius: 20px;
    font-weight: 600;
    color: ${palette.green[15]};
    cursor: pointer;
    outline: none;
  }
`;

// modal 내용

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


export {
  AddContainer,
  InputBox,
  BtnBox,
  ModalOverlay,
  ModalBody,
  ModalButtonWrap,
  Input,
};
