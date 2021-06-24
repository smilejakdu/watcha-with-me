import React , {useState , useEffect , useCallback} from 'react'
import { PolarArea } from "react-chartjs-2";
import axios from "axios";
const PolarChart = () => {
  const [polarData, setPolarData] = useState({});
  useEffect(() => {
    axios
      .get("scheduler/polar", {
        headers: {
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        const {
          data: { data },
        } = res;
        setPolarData(data);
      })
      .catch((error) => {
        console.log("error : ", error);
      });
  }, []);

  const data = {
    labels: ["로멘스", "코믹", "공포", "액션", "드라마", "코믹 로멘스"],
    datasets: [
      {
        label: "My First Dataset",
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132)",
          "rgba(54, 162, 235)",
          "rgba(255, 206, 86)",
          "rgba(75, 192, 192)",
          "rgba(153, 102, 255)",
          "rgba(255, 159, 64)",
        ],
        borderWidth: 2,
        data: [
          polarData["romance"],
          polarData["comic"],
          polarData["fear"],
          polarData["action"],
          polarData["drama"],
          polarData["comic_romance"],
        ],
      },
    ],
  };

  return (
    <div style={{ width: 600, margin: "0 auto" }}>
      <PolarArea data={data} />
    </div>
  );
};

export default PolarChart
