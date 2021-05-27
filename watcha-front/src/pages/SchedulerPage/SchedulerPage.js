import React , {useState , useEffect} from "react";
import { Body, BodyCenter, SchedulerContainer } from "./SchedulerPage.style";
import Scheduler from "../../components/Scheduler/Scheduler"
import axios from "axios";
import { backUrl } from "../../config/config";
 
const WithmePage = () => {
    const [data , setData] = useState([]);

    useEffect(() =>{
        console.log("start withmepage");
        axios.get(`${backUrl}/scheduler`)
        .then((res) =>{
            console.log("res : " , res);
            let {
                data : {data} 
            } = res;
            setData(data);
        })
        .catch((error) =>{
            console.log("error :" , error);
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

export default WithmePage;
