import React , {useState , useEffect , useCallback} from "react";
import { Body, BodyCenter, SchedulerContainer } from "./SchedulerPage.style";
import Scheduler from "../../components/Scheduler/Scheduler"
import axios from "axios";
import { backUrl } from "../../config/config";
import { useSelector, useDispatch } from "react-redux";
import {LOAD_SCHEDULER_REQUEST} from "../../reducers/scheduler"

const SchedulerPage = () => {
    const [data , setData] = useState([]);

    useEffect(() => {
        axios.get("/scheduler")
        .then((res) =>{
            setData(res.data)
        })
        .catch((error) =>{
            console.log("error : " , error);
        })
    },[])

    return (
        <Body>
            <BodyCenter>
                <SchedulerContainer>
                    <Scheduler events={data} />
                </SchedulerContainer>
            </BodyCenter>
        </Body>
    );
};

export default SchedulerPage;
