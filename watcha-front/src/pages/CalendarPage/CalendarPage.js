/*eslint-disable*/
import React, { useState, useEffect , useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import CalendarModal from "../../components/CalendarModal/CalendarModal"
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

import CalendarAddModal from "../../components/CalendarAddModal/CalendarAddModal"

const Calendar = ({today , history}) => {
  const [calendarAdd , setCalendarAdd] = useState(false);
  // console.log("리덕스에서 가져온 스케쥴",schedules)
  const schedules = useSelector((state) => state.calendar.schedules);

  // console.log("리덕스에서 가져온 스케쥴",schedules)
  var thisyear = today.getFullYear();
  var thismonth = today.getMonth()-1;
  var thisday = today.getDate();
  var toDay = `${thisyear}-${thismonth < 9 ? "0"+(thismonth+1):thismonth+1}-${thisday<10?"0"+thisday : thisday}`;
  // 여기서 데이터를 가져오면 된다.
  useEffect(() => {});

  const monList = [
    "JANUARY",
    "FEBRUARY",
    "MARCH",
    "APRIL",
    "MAY",
    "JUNE",
    "JULY",
    "AUGUST",
    "SEPTEMBER",
    "OCTOBER",
    "NOVEMBER",
    "DECEMBER",
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
            return (
              <div key={dateKey}>
                {dateKey === toDay ? (
                  <span>{day}(today)</span>
                ) : (
                  <span
                    style={{
                      color:
                        idx == 0 ? "#CE879F" : idx == 6 ? "#CE879F" : "#444078",
                      float:"right",
                    }}
                  >
                    {day} 
                  </span>
                )}
                {schedules
                  .filter((schedule) => schedule.date.substr(0, 10) === dateKey)
                  .sort()
                  .map((schedule) => {
                    return (
                      <ScheduleStyle
                        key={schedule.desc}
                      >
                        <p>
                          {schedule.movie_title}({schedule.genre})
                        </p>
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

  const [month, changeMonth] = useState(thismonth+1);
  const [year, changeYear] = useState(thisyear);

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


  const ModalShowOpen = useCallback(() => {
    console.log("modalshow");
    setCalendarAdd(true);
  }, []);

  const ModalShowClose = useCallback(() => {
    setCalendarAdd(false);
  }, []);


  return (
    <Container>
      {calendarAdd && (
        <CalendarAddModal isOpen={ModalShowOpen} close={ModalShowClose} />
      )}
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

      <FloatBtn2 onClick={ModalShowOpen}>Register</FloatBtn2>
    </Container>
  );
};



export default Calendar;
