import React , { useCallback } from "react";
import {useDispatch , useSelector} from "react-redux";
import {
  ADD_SCHEDULE_REQUEST,
  UPDATE_SCHEDULE_REQUEST,
  REMOVE_SCHEDULE_REQUEST,
  LOAD_SCHEDULE_REQUEST,
} from "../../reducers/calendar";
import {
  ModalOverlay,
  ModalBody,
  AddContainer,
  InputBox,
  BtnBox,
} from "./CalendarUpdateModal.style";
import useInput from "../../hooks/useInput"
import { Dropdown } from "react-bootstrap";

const CalendarUpdateModal = ({
  update_id,
  update_genre,
  update_title,
  update_date,
  update_nickname,
  isOpen,
  close,
}) => {
  const dispatch = useDispatch();

  const [genre, onChangeGenre, setGenre] = useInput(update_genre);
  const [title, onChangeTitle, setTitle] = useInput(update_title);
  const [date, onChangeDate, setDate] = useInput(update_date);

  const SchedulerUpdateOnClick = useCallback(()=>{
    dispatch({
      type:UPDATE_SCHEDULE_REQUEST,
      data:{id :update_id , genre:genre , title: title , date:date},
    })
    close();
  })

  const SchedulerRemoveOnClick = useCallback(() => {
    dispatch({
      type:REMOVE_SCHEDULE_REQUEST,
      data: {id:update_id}
    })
    close();
  });

  return (
    <>
      {isOpen ? (
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
                    코믹로멘스
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <input
                type="text"
                placeholder="movie title"
                max="9999-12-31"
                value={title}
                onChange={onChangeTitle}
              />
              <input
                type="datetime-local"
                id="scheduleDate"
                value={date}
                onChange={onChangeDate}
              />
            </InputBox>
            <BtnBox>
              {localStorage.getItem("nickname") === update_nickname ? (
                <>
                  <button onClick={close}>취소</button>
                  <button onClick={() => SchedulerUpdateOnClick()}>수정</button>
                  <button onClick={() => SchedulerRemoveOnClick()}>삭제</button>
                </>
              ) : (
                <button onClick={close}>확인</button>
              )}
            </BtnBox>
          </ModalBody>
        </ModalOverlay>
      ) : null}
    </>
  );
};

export default CalendarUpdateModal;