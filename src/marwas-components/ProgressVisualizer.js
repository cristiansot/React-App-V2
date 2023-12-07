import React from 'react';
import { Chart } from 'react-google-charts';


 const data = [
  ["Activity", "Value"],
  ["Running", 10],
  ["Biking", 10],
  ["Climbing", 10],
  ["Hiking", 10],
  ["Swimming", 10],
];

 const options = {
  title: "Progress Visualizer",
  is3D: true,
};

function ProgressVisualizer() {

  return (
    <Chart
      chartType="PieChart"
      data={data}
      options={options}
      width={"100%"}
      height={"400px"}
    />
  );
}

export default ProgressVisualizer