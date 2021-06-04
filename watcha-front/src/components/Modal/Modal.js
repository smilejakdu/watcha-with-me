import React ,{useState , useEffect , useCallback } from "react";
import {
    ModalBody,
    ModalOverlay,
    ModalButtonWrap,
    WhachaLogoImg,
    Input,
    LoginRegisterBtn,
} from "./Modal.style";
import axios from "axios";
import { backUrl } from "../../config/config";
import logo from "../../utils/images/watchalogo.png";

const Modal = ({ isOpen, close, textData }) => {
    const [text, setText] = useState(textData);
    const [nickname, setNickname] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");

    const onClickBtn = useCallback(() => {
        console.log("일단버튼클릭");
        console.log("text : " , text);
        if (text === "login") {
            let data = {
                nickname: nickname,
                password: password,
            };
            axios.post("/users/signin", data)
                .then((res) => {
                    const {access , user} = res.data;
                    console.log("access :",access);
                    console.log("nickname :", user);

                    localStorage.setItem("nickname", user);
                    localStorage.setItem("token", access);
                    setNickname("");
                    setPassword("");
                    close();
                    window.location.reload();
                })
                .catch((error) => {
                    console.log(error);
                    alert("check your nickname and password");
                });
        } else if (text === "signup") {
            let data = {
                nickname: nickname,
                password: password,
                repassword: repassword,
            };
            axios.post("/users/signup", data)
                .then((res) => {
                    console.log(res);
                    setNickname("");
                    setPassword("");
                    setRePassword("");
                    setText("login");
                })
                .catch((error) => {
                    console.log(error);
                    if(error.response){
                        const {data} = error.response;
                        if(data.message ==='SHORT_PASSWORD'){
                            alert('your password short please more than 6')
                        }else if (data.message === "doesnot_nickname") {
                            alert("your nickname not found");
                        }

                    }
                });
        }
    });

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            onClickBtn();
        }
    };

    return (
        <>
            {isOpen ? (
                <div>
                    <ModalOverlay onClick={close} />
                    <ModalBody>
                        <p className="title">
                            W<p className="ai">at</p>cha
                        </p>
                        <WhachaLogoImg src={logo}></WhachaLogoImg>
                        <div className="content">
                            <p className="title">{text}</p>
                            <div className="content">
                                {text === "login" ? (
                                    <div>
                                        <div>
                                            <Input
                                                type="text"
                                                placeholder="nickname"
                                                onChange={(e) =>
                                                    setNickname(e.target.value)
                                                }
                                                value={nickname}
                                                onKeyPress={handleKeyPress}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Input
                                                type="password"
                                                placeholder="password"
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                                value={password}
                                                onKeyPress={handleKeyPress}
                                                required
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div>
                                            <Input
                                                type="text"
                                                placeholder="nickname"
                                                onChange={(e) =>
                                                    setNickname(e.target.value)
                                                }
                                                value={nickname}
                                                onKeyPress={handleKeyPress}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Input
                                                type="password"
                                                placeholder="password"
                                                onChange={(e) =>
                                                    setPassword(e.target.value)
                                                }
                                                value={password}
                                                onKeyPress={handleKeyPress}
                                                required
                                            />
                                        </div>
                                        <div>
                                            <Input
                                                type="password"
                                                placeholder="repassword"
                                                onChange={(e) =>
                                                    setRePassword(
                                                        e.target.value
                                                    )
                                                }
                                                value={repassword}
                                                onKeyPress={handleKeyPress}
                                                required
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div>
                                <LoginRegisterBtn onClick={onClickBtn}>
                                    button
                                </LoginRegisterBtn>
                            </div>
                            <ModalButtonWrap>
                                {text === "login" ? (
                                    <p onClick={() => setText("signup")}>
                                        계정이 필요하신가요? 지금 가입하기
                                    </p>
                                ) : (
                                    <p onClick={() => setText("login")}>
                                        로그인하기
                                    </p>
                                )}
                            </ModalButtonWrap>
                        </div>
                        <ModalButtonWrap>
                            <button onClick={close}>확인</button>
                        </ModalButtonWrap>
                    </ModalBody>
                </div>
            ) : null}
        </>
    );
};;
export default Modal;
