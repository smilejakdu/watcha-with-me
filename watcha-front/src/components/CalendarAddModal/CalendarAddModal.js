import React , {useState} from "react";
import {useDispatch} from "react-redux";
import {
  ADD_SCHEDULE_REQUEST,
  LOAD_SCHEDULE_REQUEST,
} from "../../reducers/calendar";
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
  const [title, onChangeTitle, setTitle] = useInput("");
  const [genre, onChangeGenre, setGenre] = useInput("genre");

  const dispatch = useDispatch();

  const registerSchedule = () => {
    const date = document.getElementById("scheduleDate").value;

    if (title != 0 && date != 0) {
      dispatch({
        type: ADD_SCHEDULE_REQUEST,
        data : {genre:genre , title: title , date:date},
      });
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
              {genre}
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setGenre("romance")}>
                로멘스
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setGenre("fear")}>
                공포
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setGenre("comic")}>
                코믹
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setGenre("action")}>
                액션
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setGenre("drama")}>
                드라마
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setGenre("comic_romance")}>
                코믹로맨스
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <input
            type="text"
            placeholder="movie title"
            max="9999-12-31"
            onChange={onChangeTitle}
          />
          <input type="datetime-local" id="scheduleDate" />
        </InputBox>
        <BtnBox>
          <button onClick={close}>cancel</button>
          <button onClick={registerSchedule}>Register</button>
        </BtnBox>
      </ModalBody>
    </ModalOverlay>
  );
};

export default CalendarAddModal;