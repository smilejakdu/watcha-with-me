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
  margin: 10rem auto;
  left: 0;
  right: 0;
  width: 320px;
  height: 400px;
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

const AddContainer = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const InputBox = styled.div`
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
    margin:20px;
    &:focus {
      border: 1px solid #a673ff;
    }
  }
`;
const BtnBox = styled.div`
  margin-top: 3%;
  box-sizing: border-box;
  display: flex;
  height: 13%;
  justify-content: space-evenly;
  align-items: center;
  margin:20px;

  & button {
    box-shadow: 0 1px 2px 0 ${palette.green[1]};
    width: 35%;
    min-width: 20px;
    max-width: 150px;
    height: 30px;
    background: #fff;
    border: 1px solid ${palette.orange[4]};
    border-radius: 20px;
    color: ${palette.orange[4]};
    box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2);
    margin:10px;
    cursor: pointer;
    outline: none;

    &:hover{
      background:${palette.orange[4]};
      color:#fff;
    }
  }
`;

export {
  ModalOverlay,
  ModalBody,
	AddContainer,
	InputBox,
	BtnBox 
};
