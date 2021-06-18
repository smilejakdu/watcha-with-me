import React from 'react'
import { PolarArea } from "react-chartjs-2";

const PolarChart = ({ polarData }) => {
  const data = {
    labels: ["로멘스", "코믹", "공포", "액션"],
    datasets: [
      {
        label: "My First Dataset",
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(75, 192, 192)",
          "rgb(255, 205, 86)",
          "rgb(201, 203, 207)",
        ],
        borderWidth: 1,
        data: [
          polarData["romance"],
          polarData["comic"],
          polarData["fear"],
          polarData["action"],
        ],
      },
    ],
  };

  return (
    <div style={{ width: 500, margin: "0 auto" }}>
      <PolarArea data={data} />
    </div>
  );
};

export default PolarChart
