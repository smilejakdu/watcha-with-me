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

const CalendarAddModal = ({ isOpen, close }) => {
  const [text, onChangeText, setText] = useInput("");

  const dispatch = useDispatch();
  const checkSchedule = () => {
    var schedule = document.getElementById("scheduleInput").value;
    var date = document.getElementById("scheduleDate").value;

    if (schedule != 0 && date != 0) {
      dispatch(addSchedule(date, schedule));
      console.log(date, schedule);
      alert("저장되었습니다 😊");
    } else {
      alert("정보를 입력해주세요 ☺");
    }
  };

  return (
    <ModalOverlay onClick={close}>
      <ModalBody>
        <InputBox>
          <h2>새로운 일정</h2>
          <input
            type="text"
            id="scheduleInput"
            max="9999-12-31"
            // style={{ height: 30 + "%" }}
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