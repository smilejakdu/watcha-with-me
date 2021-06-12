import React,{useCallback} from 'react'
import {
  AddContainer,
  InputBox,
  BtnBox,
  ModalOverlay,
  ModalBody,
  ModalButtonWrap,
  Input,
} from "./CalendarModal.style";
import {useDispatch} from "react-redux";
import {addSchedule} from "../../reducers/calendar";
import useInput from "../../hooks/useInput"

const CalendarModal=(props)=> {
  const dispatch = useDispatch();
  const [title, onChangeTitle, setTitle] = useInput("");
  const [genre, onChangeGenre, setGenre] = useInput("");

	const checkSchedule = () => {
		var schedule = document.getElementById("scheduleInput").value;
		var date = document.getElementById("scheduleDate").value;

		if (schedule != 0 && date != 0) {
			dispatch(addSchedule(date, schedule));
      console.log(date, schedule);
      dispatch({
        type:"",
        data:""
      })
			alert("success");
		} else {
			alert("정보를 입력해주세요");
		}
	};

	return (
    <AddContainer>
      <InputBox>
        <h2>새로운 일정</h2>
        <input
          type="text"
          id="scheduleInput"
          max="9999-12-31"
          style={{ height: 30 + "%" }}
        />
        <input type="datetime-local" id="scheduleDate" />
      </InputBox>
      <BtnBox>
        {/* <button onClick={props.history.goBack}>뒤로</button> */}
        <button onClick={checkSchedule}>저장</button>
      </BtnBox>
    </AddContainer>
  );
}

export default CalendarModal
