import React , {useState , useEffect , useCallback} from "react";
import { Body, BodyCenter, SchedulerContainer } from "./SchedulerPage.style";
import Scheduler from "../../components/Scheduler/Scheduler"
import axios from "axios";
import { backUrl } from "../../config/config";
import { useSelector, useDispatch } from "react-redux";
import {LOAD_SCHEDULER_REQUEST} from "../../reducers/scheduler"

const WithmePage = () => {
    const dispatch  = useDispatch();
    const { mainScheduler } = useSelector((state) => state.scheduler);
    const [data , setData] = useState([]);

    useEffect(() =>{
        dispatch({
            type:LOAD_SCHEDULER_REQUEST,
        });
    },[])
    useEffect(()=>{
        console.log(mainScheduler);
    })

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

export default WithmePage;
