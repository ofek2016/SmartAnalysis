import React from "react";
import { useState, useEffect } from "react";
import { COLORS, SIZES, icons } from "../constants";

import { StyleSheet, View, Text } from "react-native";

import {
  VictoryBar,
  VictoryGroup,
  VictoryChart,
  VictoryTheme,
  VictoryAxis,
} from "victory-native";
const RendBar = (props) => {
  const data = props.data;
  const [brData, setBrData] = useState([]);
  const type = [COLORS.darkgray, COLORS.gray, COLORS.red];

  useEffect(() => {
    setBrData([]);
    if (data.length > 0) {
      for (let i = 0; i < data[0].problems.length; i++) {
        const y = data.map((item) => {
          let total = 0;
          item.problems.map((t) => {
            total += Number(t.y);
          });
          total = total / 100;
          return {
            x: item.name,
            y: Number(item.problems[i].y),
            z: (item.problems[i].y / total).toFixed(0),
            color: item.problems[i].color,
          };
        });
        setBrData((oldArray) => [...oldArray, y]);
      }
    }
  }, [data]);

  return (
    <View
      style={{
        flex: 1,
        margin: 5,
        paddingVertical: SIZES.radius,
        paddingHorizontal: SIZES.padding,
        borderRadius: 15,
        backgroundColor: COLORS.white,
        ...style.shadow,
        paddingTop: 20,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <VictoryChart
        padding={{ top: 20, bottom: 30, left: 40, right: 10 }}
        colorScale={"qualitative"}
        theme={VictoryTheme.material}
        height={220}
        domainPadding={{ x: 45 }}
      >
        <VictoryAxis
          style={{
            tickLabels: {
              fontSize: 10,
            },
          }}
        />
        <VictoryAxis dependentAxis style={{ tickLabels: { fontSize: 10 } }} />
        <VictoryGroup
          offset={25}
          colorScale={type}
          animate={{
            duration: 1000,
            onLoad: { duration: 1000 },
          }}
          style={{
            data: {
              fillOpacity: 0.7,
            },
          }}
        >
          {brData.map((s) => {
            return (
              <VictoryBar
                barRatio={1}
                cornerRadius={2}
                alignment="middle"
                labels={({ datum }) => ` ${datum.z}%`}
                data={s}
              />
            );
          })}
        </VictoryGroup>
      </VictoryChart>
      {data[0] && (
        <Text>
          {data[0].problems.map((s) => {
            return <Text style={{ color: s.color }}> {s.x} </Text>;
          })}
        </Text>
      )}
    </View>
  );
};

const style = StyleSheet.create({
  shadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 3,
  },
});

export default RendBar;
