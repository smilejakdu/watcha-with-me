import React,{useCallback , useState , useEffect} from "react";
import { withRouter } from "react-router-dom";
import { CategoryLinkItem, CategoryLink, HeaderBody } from "./Navigation.style";
import logo from "../../utils/images/watchalogo.png"
import { Button, Navbar, Nav, Form, FormControl } from "react-bootstrap";
import Axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import Modal from "../../components/Modal/Modal"
import { useHistory } from "react-router-dom";

const Navigation = () => {
  const [modalShow, setModalShow] = useState(false);
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
      console.log("login btn click");
      setModalShow(true);
  }, []);

  const logoutBtn = useCallback(() => {
      localStorage.removeItem("token");
      history.push("/")
  }, []);

  const ModalShowOpen = () => {
    setModalShow(true);
  };

  const ModalShowClose = () => {
    setModalShow(false);
  };

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
             <Navbar.Brand
                 href="/scheduler"
                 id = "watcha_main_logo"
             >
                 Watcha
             </Navbar.Brand>
             <Nav className="mr-auto">
                 <Nav.Link href="/scheduler">Scheduler</Nav.Link>
                 <Nav.Link href="/board">Board</Nav.Link>
                 {localStorage.getItem("token") ? (
                     <>
                         {/* <Nav.Link href="/mypage">Mypage</Nav.Link> */}
                         <Nav.Link onClick={logoutBtn}>SignOut</Nav.Link>
                     </>
                 ) : (
                     <Nav.Link onClick={loginBtn}>SignIn</Nav.Link>
                 )}
             </Nav>
             <Form inline>
                 <FormControl
                     type="text"
                     placeholder="Search"
                     className="mr-sm-2"
                 />
                 <Button variant="outline-danger">Search</Button>
             </Form>
         </Navbar>
     </>
 );
};

export default withRouter(Navigation);
