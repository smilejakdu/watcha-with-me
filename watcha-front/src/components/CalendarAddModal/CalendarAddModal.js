import React , {useState} from "react";
import {useDispatch} from "react-redux";
import {addSchedule} from "../../reducers/calendar";
import {
  ModalOverlay,
  ModalBody,
  AddContainer,
  InputBox,
  BtnBox,
} from "./CalendarAddModal.style";
import useInput from "../../hooks/useInput"
import { Dropdown } from "react-bootstrap";

const CalendarAddModal = ({ isOpen, close }) => {
  const [text, onChangeText, setText] = useInput("");

  const dispatch = useDispatch();
  const checkSchedule = () => {
    var schedule = document.getElementById("scheduleInput").value;
    var date = document.getElementById("scheduleDate").value;

    if (schedule != 0 && date != 0) {
      alert(text)
      dispatch(addSchedule(date, schedule));
      console.log(date, schedule);
      close()
    } else {
      alert("어?? 뭐 잊은거 없어 ??");
    }
  };

  return (
    <ModalOverlay>
      <ModalBody>
        <InputBox>
          <h2>일정</h2>
          <Dropdown>
            <Dropdown.Toggle variant="outline-warning" id="dropdown-basic">
              장르를 선택하시오
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">멜로</Dropdown.Item>
              <Dropdown.Item href="#/action-2">공포</Dropdown.Item>
              <Dropdown.Item href="#/action-3">코믹</Dropdown.Item>
              <Dropdown.Item href="#/action-1">액션</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <input
            type="text"
            id="scheduleInput"
            placeholder="movie title"
            max="9999-12-31"
            onChange={onChangeText}
          />
          <input type="datetime-local" id="scheduleDate" />
        </InputBox>
        <BtnBox>
          <button onClick={close}>cancel</button>
          <button onClick={checkSchedule}>Register</button>
        </BtnBox>
      </ModalBody>
    </ModalOverlay>
  );
};

export default CalendarAddModal;