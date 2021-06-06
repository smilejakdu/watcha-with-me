# 📌 Watcha-with-me

http://15.164.218.183:8080/

### 진행기간 :2021.5.28 ~ 2021.6.6

<img src="https://github.com/smilejakdu/watcha-with-me/blob/main/screen_page.png" width="1000" height="500">

## 📌프로젝트 소개

> 왓챠 를 사용해서 영화를 보다가 , 함께보기가 있더라구요 . 
> 그래서 같이 왓챠 단톡방이 있는데 거기 사람들이랑 같이 사용할수있는
> 웹 페이지가 있었으면 좋겠다 생각이 들어서 만들었습니다.

-------------------

## 📌 프로젝트 참가자 ( Front & Back )

## 👉FrontEnd

안승현

## 👉BackEnd

안승현

----------------
# 📌 기술스택

## FrontEnd
HTML(JSX) / JavaScript(ES6) / React (CRA) / Style-Component

Redux / Redux-Saga 

## BackEnd

Python 3.7 / Django 3.2 / Mysql 8.0

-----------------
# 📌 구현한기능

## 👉FrontEnd

### 회원가입 (SignUp & SignIn)

- 회원가입 & 로그인 
- 카카오 소셜 로그인 ( 같이사용하는 분들이 빼자고 해서 뺐음...아무래도 단톡방이라서.. 개인정보 누출이 될까봐 그러신것 같음 )
- 로그인시  `Token` response  

### 게시글
- Board (Create , Remove) Update 안하는게 육안상 더 이뻐보여서
- Review (CRUD) 게시판에 댓글 구현 
- `LocalStorage.nickname` 유무에 따라 `BoardForm` 이 보입니다.
- `LocalStorage.nickname` 유무에 따라 `Remove Btn` , `Update Btn` 이 보입니다.

### 스케쥴
- 스케쥴 등록 , 수정 , 삭제기능 ( 라이브러리 사용 https://dhtmlx.com/ )

### 검색

- `Board Title` 로 검색  


## 👉BackEnd

### 회원가입 (SignUp & SignIn)

- `bcrypt` 사용한 암호화
- JWT login & Decorater
- Kakao Login

### 게시글

- Board (CRUD)
- Search ( query 를 받아서 해당 Board title 를 검색)
- Review (CRUD 게시글 과 유저를 외래키 참조를 해서 게시글에 대한 댓글 구현 ) 

### DATABASE 

- 처음엔 RDS 를 사용하다가 , 크게 많은 사람들 사용하지 않을것같아서 
추후에 필요하다면 붙일 생각입니다.
- AWS EC2 mysql 설치

