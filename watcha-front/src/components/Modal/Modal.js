import React ,{useState , useEffect , useCallback } from "react";
import {
    ModalBody,
    ModalOverlay,
    ModalButtonWrap,
    KaKaoBtn,
    KaKaoDiv,
    WhachaLogoImg,
} from "./Modal.style";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { backUrl, KakaoJsKey } from "../../config/config";
import logo from "../../utils/images/watchalogo.png";

const Modal = ({ isOpen, close, text }) => {
    const history = useHistory();

    const kakaoLogin = ()=> {
        window.Kakao.Auth.login({
            scope:'profile , account_email',
            success:function(authObj){
                console.log("authObj : " , authObj);
                window.Kakao.API.request({
                    url:'/v2/user/me',
                    success:res =>{
                        const kakao_account = res.kakao_account;
                        console.log("kakao_account.email :",kakao_account.email);
                        axios.post(`${backUrl}/users/signin`,{
                            email : kakao_account.email
                        })
                        .then(res=>{
                            console.log("res :",res.data.token);
                            if(res.data.token){
                                localStorage.setItem("token",res.data.token)
                                close();
                                history.push("/");
                            }
                        }).catch(error=>{
                            console.log("error :" , error);
                        })
                    }
                });
            },
            fail:function(error){
                console.log("error : " , error);
            }
        });
    }

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
                            <p>{text}</p>
                            <KaKaoDiv>
                                <KaKaoBtn onClick={kakaoLogin}>
                                    kakao login
                                </KaKaoBtn>
                            </KaKaoDiv>
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
