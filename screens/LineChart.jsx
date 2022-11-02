import React from "react";

import { StyleSheet } from "react-native";

import { VictoryLine, VictoryChart, VictoryTheme } from "victory-native";

const LineChart = (props) => {
  const data = props.data;

  return (
    <VictoryChart theme={VictoryTheme.material}>
      <VictoryLine
        style={{
          data: { stroke: "#c43a31" },
          parent: { border: "1px solid #ccc" },
        }}
        data={data}
      />
    </VictoryChart>
  );
};
 

export default LineChart;
