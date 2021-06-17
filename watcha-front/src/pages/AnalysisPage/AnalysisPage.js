import React ,{useState , useEffect , useCallback} from 'react'
import BarChart from '../../components/BarChart/BarChart'
import axios from "axios"
import { Body, BodyCenter } from "./AnalysisPage.style";

const AnalysisPage = () => {
	const [data , setData] = useState({});

	useEffect(() => {
		axios
      .get("scheduler/analysis")
      .then((res) => {
				const { 
					data : {data}
				} = res;
				setData(data)
      })
      .catch((error) => {
        console.log("error : ", error);
      });
	},[])

	return (
    <Body>
      <BodyCenter>
				<BarChart data={data}/>
      </BodyCenter>
    </Body>
  );
};

export default AnalysisPage
