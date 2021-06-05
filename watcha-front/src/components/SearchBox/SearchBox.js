import React,{useState , useEffect , useCallback} from 'react'
import axios from 'axios';
import { FormControl } from "react-bootstrap";
import { SearchBorder } from "./SearchBox.style"; 
import {useHistory} from "react-router-dom"

const SearchBox = ({ searchData }) => {
    const [query, setQuery] = useState("");
    const [result, setResult] = useState([]);
    const [boardInfo, setBoardinfo] = useState("");

    const history = useHistory();

    // 데이터 요청 후 받은 데이터 리스트 중에 하나를 클릭했을때 실행하는 함수
    const searchDataClick = useCallback((id)=>{
        setResult([]);
        history.push({
            pathname: "/detailboard",
            state: id,
        });
        window.location.reload();
    },[result])

    // input 에 입력한것을 받는다
    const handleOnInputChange = (event) => {
        const query = event.target.value;
        if (!query) {
            setQuery(query);
            setResult([]);
        } else {
            setQuery(query);
            fetchSearchResults(query);
        }
    };

    // 데이터 요청후 받은 데이터를 화면에 보여주는 함수
    const renderSearchResults = () => {
        if (Object.keys(result).length && result.length) {
            return (
                <div style={{zIndex: 1}}>
                    {result.map((res, i) => {
                        console.log("res : " , res);
                        return (
                            <h6 key={i} onClick={()=>searchDataClick(res.id)}>
                                {res.title}
                            </h6>
                        );
                    })}
                </div>
            );
        }
    };

    // input 에 전달받은 데이터를 서버에 요청
    const fetchSearchResults = (query) => {
        const searchUrl = `/board/search?query=${query}`;
        axios.get(searchUrl)
            .then((res) => {
                let {
                    data: { data },
                } = res;
                setResult(data);
            })
            .catch((error) => {
                if (axios.isCancel(error) || error) {
                    console.log("error : ", error);
                }
            });
    };

    return (
        <SearchBorder>
            <FormControl
                type="text"
                placeholder="search"
                className="mr-sm-2"
                value={query}
                onChange={handleOnInputChange}
            />
            {renderSearchResults()}
        </SearchBorder>
    );
};

export default SearchBox;
