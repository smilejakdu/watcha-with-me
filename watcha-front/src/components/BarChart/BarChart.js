import React , { useState , useEffect , useCallback}from 'react'
import { Bar } from "react-chartjs-2";

const BarChart = ({data})=> {

  const movie_data =  {
    labels: ["로멘스", "코믹", "공포", "액션"],
    datasets: [
      {
        label: "Genre",
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
        ],
        borderWidth: 2,
        data: [data['romance'], data['comic'], data['fear'], data['action']],
      },
    ],
  };

  return (
    <div>
      <Bar data={movie_data} />
    </div>
  );
}

export default BarChart
