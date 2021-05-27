import React , {useState , useEffect} from "react";
import { Body, BodyCenter, SchedulerContainer } from "./SchedulerPage.style";
import Scheduler from "../../components/Scheduler/Scheduler"
import axios from "axios";
import { backUrl } from "../../config/config";
// const data = [
//     { start_date: '2020-06-10 6:00',end_date: '2020-06-10 8:00',
//         text: 'Event 1',
//         id: 1,
//     },
//     {
//         start_date: '2020-06-13 10:00',
//         end_date: '2020-06-13 18:00',
//         text: 'Event 2',
//         id: 2,
//     },
// ];
 
const WithmePage = () => {
    const [data , setData ] = useState([]);

    useEffect(() =>{
        console.log("start withmepage");
        axios.get(`${backUrl}/scheduler`)
        .then((res) =>{
            console.log("res : " , res);
            let {
                data : {data} 
            } = res;
            console.log("data  : " , data);
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
