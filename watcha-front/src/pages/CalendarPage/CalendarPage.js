/*eslint-disable*/
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../../components/Modal/Modal"
import {
  Container,
  Header,
  Days,
  Day,
  Row,
  FloatBtn1,
  FloatBtn2,
  ScheduleStyle,
} from "./CalendarPage.style";

const Calendar = (props) => {

  // console.log("리덕스에서 가져온 스케쥴",schedules)
  const schedules = useSelector((state) => state.calendar.schedules);

  // console.log("리덕스에서 가져온 스케쥴",schedules)
  var thisyear = props.today.getFullYear();
  var thismonth = props.today.getMonth();

  // 여기서 데이터를 가져오면 된다.
  useEffect(() => {});

  const monList = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let calendarDays = [];
  let new_month = [];

  const makeCalendar = (year, month) => {
    let firstDayOfMonth = new Date(year, month, 1).getDay();
    let endDateOfMonth = new Date(year, month + 1, 0).getDate();
    calendarDays = [];
    new_month = [];
    let cnt = 1;

    for (let i = 0; i < 6; i++) {
      var _days = [];
      for (let j = 0; j < 7; j++) {
        if (cnt > endDateOfMonth) {
          _days.push("");
        } else if (firstDayOfMonth > j && i === 0) {
          _days.push("");
        } else {
          _days.push(cnt);
          cnt++;
        }
      }
      calendarDays.push(_days);
    }
    new_month = calendarDays.map((week) => {
      return (
        <Row key={week}>
          {week.map((day, idx) => {
            let dateKey =
              year +
              "-" +
              (month < 9 ? "0" + (month + 1) : month + 1) +
              "-" +
              (day < 10 ? "0" + day : day);
            // console.log(thisyear+"-"+(thismonth<9? "0"+(thismonth+1):(thismonth+1))+"-"+day);
            return (
              <div key={dateKey}>
                <span
                  style={{
                    color:
                      idx == 0 ? "#CE879F" : idx == 6 ? "#CE879F" : "#444078",
                  }} 
                >
                  {day}
                </span>
                {schedules
                  .filter((schedule) => schedule.date.substr(0, 10) === dateKey)
                  .sort()
                  .map((schedule) => {
                    return (
                      <ScheduleStyle
                        className={schedule.completed}
                        key={schedule.desc}
                        onClick={openModal}
                      >
                        {schedule.desc}
                        <Modal isOpen={isModalOpen} close={closeModal}/>
                      </ScheduleStyle>
                    );
                  })}
              </div>
            );
          })}
        </Row>
      );
    });
    return new_month;
  };

  window.addEventListener(
    "DOMContentLoaded",
    () => {
      if (calendarDays.length === 0) {
        makeCalendar(thisyear, thismonth);
      }
      console.log("첫 로딩 시 현재 월 출력", thisyear, thismonth);
    },
    { once: true }
  );

  const [month, changeMonth] = React.useState(thismonth);
  const [year, changeYear] = React.useState(thisyear);
  const [isModalOpen, setModalState] = React.useState(false);

  const nextMonth = () => {
    if (month != 11) {
      changeMonth((month) => month + 1);
    } else {
      changeMonth((month) => month - 11);
      changeYear((year) => year + 1);
    }
    makeCalendar(year, month);
    console.log("next!", year, month, new_month);
  };
  const prevMonth = () => {
    if (month != 0) {
      changeMonth((month) => month - 1);
    } else {
      changeMonth((month) => month + 11);
      changeYear((year) => year - 1);
    }
    makeCalendar(year, month);
  };

  const openModal = () => {
    setModalState({ isModalOpen: true });
  };

  const closeModal = () => {
    setModalState({ isModalOpen: false });
  };

  return (
    <Container>
      <Header>
        <button onClick={prevMonth}>◀</button>
        <span>
          {monList[month]} {year}
        </span>
        <button onClick={nextMonth}>▶</button>
      </Header>
      <Days>
        <Day>
          <div>Sun</div>
          <div>Mon</div>
          <div>Tue</div>
          <div>Wed</div>
          <div>Thu</div>
          <div>Fri</div>
          <div>Sat</div>
        </Day>

        {makeCalendar(year, month)}
      </Days>

      {/* <FloatBtn1>My Calendar</FloatBtn1>
      <FloatBtn2
        onClick={() => {
          props.history.push("/add");
        }}
      >
        Add
      </FloatBtn2> */}
    </Container>
  );
};



export default Calendar;
