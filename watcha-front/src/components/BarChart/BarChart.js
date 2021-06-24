import React , { useState , useEffect , useCallback}from 'react'
import { Bar } from "react-chartjs-2";

const BarChart = ({data})=> {

  const movie_data = {
    labels: ["로멘스", "코믹", "공포", "액션", "드라마", "코믹 로멘스"],
    datasets: [
      {
        label: "Genre",
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
          data["romance"],
          data["comic"],
          data["fear"],
          data["action"],
          data["drama"],
          data["comic_romance"],
        ],
      },
    ],
  };

  return (
    <div style={{width:700 , margin:'0 auto'}}>
      <Bar data={movie_data} />
    </div>
  );
}

export default BarChart
