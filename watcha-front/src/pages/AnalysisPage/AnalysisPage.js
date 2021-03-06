import React ,{useState , useEffect , useCallback} from 'react'
import BarChart from '../../components/BarChart/BarChart'
import axios from "axios"
import { Body, BodyCenter } from "./AnalysisPage.style";
import PolarChart from "../../components/PolarChart/PolarChart";

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
        <center>
          <h2 style={{ margin: "0 auto" }}>total chart</h2>
        </center>
        <BarChart data={data} />
        {localStorage.getItem("token") && (
        <>
          <center>
            <h2 style={{ margin: "0 auto" }}>my chart</h2>
          </center>
          <PolarChart/>
        </>
        )}
     </BodyCenter>
    </Body>
  );
};

export default AnalysisPage
