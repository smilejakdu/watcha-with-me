import React,{useCallback , useState , useEffect} from "react";
import { withRouter } from "react-router-dom";
import { CategoryLinkItem, CategoryLink, HeaderBody } from "./Navigation.style";
import logo from "../../utils/images/watchalogo.png"
import { Button, Navbar, Nav, Form, FormControl } from "react-bootstrap";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
// import { SEARCH_ADD } from "../../reducers/search";
import Modal from "../../components/Modal/Modal"
import JokeModal from "../../components/JokeModal/JokeModal"

import { useHistory } from "react-router-dom";
import SearchBox from "../../components/SearchBox/SearchBox"

const Navigation = () => {
  const [modalShow, setModalShow] = useState(false);
  const [jokeModalShow , setJokeModalShow] = useState(false);

  const history = useHistory();

  useEffect(()=>{
    const bg = document.getElementById("watcha_main_logo");

    setInterval(function () {
        let color = Math.random() * 0xffffff;
        color = parseInt(color);
        color = color.toString(16);

        bg.style.transition = "all 2s ease-out";
        bg.style.color = "#" + color;
    }, 3000);
  },[])

  const loginBtn = useCallback(() => {
      setModalShow(true);
  }, []);

  const logoutBtn = useCallback(() => {
      localStorage.removeItem("token");
      localStorage.removeItem("nickname");
      history.push("/")
  }, []);

  const ModalShowOpen = () => {
    setModalShow(true);
  };

  const ModalShowClose = () => {
    setModalShow(false);
  };

  const JokeModalShowOpen = ()=>{
    setJokeModalShow(true)
  }

  const JokeModalClose = () =>{
    setJokeModalShow(false)
  }

 return (
     <>
         <Navbar style={{ borderBottom: "1px solid #666666" }}>
             {modalShow && (
                 <Modal
                     isOpen={ModalShowOpen}
                     close={ModalShowClose}
                     textData="login"
                 />
             )}

             {jokeModalShow && (
                 <JokeModal close={JokeModalClose} textData="까꿍 >_<" />
             )}
             <Navbar.Brand href="https://watcha.com/" id="watcha_main_logo">
                 Watcha
             </Navbar.Brand>
             <Nav className="mr-auto">
                 <Nav.Link href="/scheduler">Scheduler</Nav.Link>
                 <Nav.Link href="/board">Board</Nav.Link>
                 {localStorage.getItem("token") ? (
                     <>
                         <Nav.Link onClick={logoutBtn}>SignOut</Nav.Link>
                         <Nav.Link onClick={JokeModalShowOpen}>
                             {localStorage.getItem("nickname")}
                         </Nav.Link>
                     </>
                 ) : (
                     <Nav.Link onClick={loginBtn}>SignIn</Nav.Link>
                 )}
             </Nav>
             <SearchBox />
         </Navbar>
     </>
 );
};

export default withRouter(Navigation);