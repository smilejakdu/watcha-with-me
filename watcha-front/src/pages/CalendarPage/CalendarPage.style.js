import styled from "styled-components";
import palette from "../../utils/palette"

const ScheduleStyle = styled.div`
  &:hover {
    cursor: pointer;
    color: ${palette.green[11]}
  }
`;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  align-items: center;
  /* justify-content:center; */
  flex-direction: column;
  display: flex;
  font-size: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0;
  padding: 5px 20px;
  box-sizing: border-box;
  font-weight: 600;
  width: 100%;
  height: 14%;
  font-size: 1em;

  span {
    color: ${palette.green[13]};
    font-size: 40px;
    background: ${palette.gray[2]};
    padding: 20px;
    box-shadow: 0 1px 2px 0 ${palette.green[13]};
    border-radius: 20px;
  }

  & button {
    margin: 0 25px;
    cursor: pointer;
    outline: none;
    display: inline-flex;
    background: transparent;
    border: none;
    color: ${palette.gray[3]};
    font-size: 1.2em;
    padding: 4px;

    &:hover {
      color: ${palette.gray[8]};
    }
  }
`;

const Days = styled.div`
  background: #fff;
  width: 93%;
  height: 81%;
  padding: 8px 10px;
  box-sizing: border-box;
  color: ${palette.calendar_base_clor[3]};
  margin: 0;
  border-radius: 5px;
  font-size: 0.8em;
`;

const Day = styled.div`
  width: 100%;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  background: ${palette.gray[4]};

  & div {
    min-width: 13%;
    max-height: 5%;
    text-align: right;
    font-weight: 600;
    box-sizing: border-box;
  }
`;

const Row = styled.div`
  width: 100%;
  height: 16%;
  display: flex;
  justify-content: space-between;

  & div {
    width: 15%;
    height: 100%;
    font-weight: 600;
    text-align: right;
    border:1px solid ${palette.gray[4]};
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
  }

  & span {
    margin: 3px 0 0 3px;
    font-size: 0.8em;
  }
`;

const FloatBtn1 = styled.button`
  box-shadow: 0 1px 2px 0 ${palette.orange[4]};
  position: fixed;
  z-index: 999;
  right: 6%;
  bottom: 18%;
  width: 18%;
  min-width: 80px;
  max-width: 130px;
  height: 30px;
  margin: auto 0px;
  background-color: #fff;
  border: none;
  border-radius: 20px;
  font-weight: 600;
  font-size: 0.7em;
  color: ${palette.orange[5]};
  cursor: pointer;
  outline: none;

  &:hover {
    background-color: ${palette.orange[2]};
  }
`;

const FloatBtn2 = styled.button`
  box-shadow: 0 1px 2px 0 ${palette.orange[4]};
  position: fixed;
  z-index: 999;
  right: 6%;
  bottom: 10%;
  width: 18%;
  min-width: 80px;
  max-width: 130px;
  height: 30px;
  margin: auto 0px;
  background: #fff;
  border: none;
  border-radius: 20px;
  font-weight: 600;
  color: ${palette.orange[5]};
  font-size: 0.7em;
  cursor: pointer;
  outline: none;

  & img {
    margin-top: 2px;
    max-height: 70%;
    width: auto;
    color: #bebddb;
  }

	&:hover{
		background-color:${palette.orange[2]} ;
	}
`;

export { 
	Container,
	Header,
	Days,
	Day,
	Row,
	FloatBtn1,
	FloatBtn2,
  ScheduleStyle,
};