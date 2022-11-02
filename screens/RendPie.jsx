import React from "react";
import { COLORS, FONTS, SIZES, icons } from "../constants";
import { useState, useEffect } from "react";

import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Platform,
} from "react-native";

import { VictoryPie } from "victory-native";
import { Svg } from "react-native-svg";

const RendPie = (props) => {
  const data3 = props.data;
  const [selectedProblam, setselectedProblam] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(data3[0]);
  const colorScales = [
    COLORS.red,
    COLORS.darkgreen,
    COLORS.purple,
    COLORS.yellow,
  ];
  const [viwe, setViwe] = useState(null);
  const [twitte, settwitte] = useState([]);

  function x() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        onPress={() => {
          setSelectedCategory(item);
          setViwe(item.name);
        }}
        style={{
          flex: 1,
          flexDirection: "row",
          margin: 5,
          borderRadius: 5,
          paddingVertical: SIZES.radius,
          paddingHorizontal: SIZES.padding,
          backgroundColor: viwe == item.name ? COLORS.secondary : COLORS.white,
          ...style.shadow,
        }}
      >
        <Image
          source={item.icon}
          style={{
            width: 20,
            height: 20,
          }}
        />
        <Text
          style={{ marginLeft: SIZES.base, color: COLORS.primary, ...FONTS.h4 }}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    );

    return (
      <View style={{ paddingHorizontal: SIZES.padding - 5 }}>
        <FlatList
          data={data3}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
          numColumns={2}
        />
      </View>
    );
  }

  function processCategoryDataToDisplay() {
    var a = [];
    let total = 0;
    let problems = selectedCategory.problems;
    problems.map((t) => {
      total += Number(t.y);
    });
    total = total / 100;
    a = problems.map((t) => {
      return {
        color: COLORS.lightBlue,
        name: t.x,
        label: `${(t.y / total).toFixed(0)}%`,
        y: Number(t.y),
        twitte: selectedCategory.twitte[t.x],
      };
    });
    return { a };
  }

  function renderTwitte() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          paddingHorizontal: SIZES.radius,
          borderRadius: 1,
          ...style.shadow,
        }}
      >
        {/* Name/Category */}
        <View style={{ padding: 10, justifyContent: "center" }}>
          <Text style={{ marginTop: 5 }}> * {item.text} </Text>
        </View>
      </TouchableOpacity>
    );
    return (
      <View>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ margin: 5, color: COLORS.primary, ...FONTS.h1 }}>
            Twittes
          </Text>
        </View>

        <FlatList
          data={twitte}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
        />
      </View>
    );
  }

  function renderExpenseSummary() {
    let data1 = processCategoryDataToDisplay();
    data1 = data1.a;
    let graphicColor = colorScales;
    const renderItem = ({ item }) => (
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          backgroundColor:
            selectedCategory && selectedProblam == item.name
              ? item.color
              : COLORS.white,

          paddingHorizontal: 15,
          paddingBottom: 1,
          borderRadius: 5,
        }}
        onPress={() => {
          setselectedProblam(item.name);
          settwitte(item.twitte);
        }}
      >
        {/* Name/Category */}
        <View>
          <Text
            style={{
              color:
                selectedProblam == item.name ? COLORS.white : COLORS.primary,
              ...FONTS.h3,
            }}
          >
            {item.y} - {item.label}
          </Text>
        </View>
        <View>
          <Text
            style={{
              marginLeft: SIZES.base,
              color:
                selectedProblam == item.name ? COLORS.white : COLORS.primary,
              ...FONTS.h3,
            }}
          >
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
    return (
      <View>
        <FlatList
          data={data1}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
        />
      </View>
    );
  }

  function renderChart() {
    let chartData = processCategoryDataToDisplay();
    chartData = chartData.a;
    if (Platform.OS == "ios") {
      return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <VictoryPie
            data={chartData}
            radius={({ datum }) =>
              selectedProblam == datum.name
                ? SIZES.width * 0.45
                : SIZES.width * 0.4 - 50
            }
            innerRadius={40}
            style={{
              labels: { fill: 0 },
              parent: {},
            }}
            width={SIZES.width * 0.8}
            height={SIZES.width * 0.8}
            colorScale="qualitative"
            events={[
              {
                target: "data",
                eventHandlers: {
                  onPress: () => {
                    return [
                      {
                        target: "labels",
                        mutation: (props) => {
                          let categoryName = chartData[props.index].name;
                          let X = chartData[props.index].twitte;
                          setselectedProblam(categoryName);
                          settwitte(X);
                        },
                      },
                    ];
                  },
                },
              },
            ]}
          />

          <View style={{ position: "absolute", top: "42%", left: "42%" }}>
            <Text style={{ ...FONTS.body3, textAlign: "center" }}>
              Expenses
            </Text>
          </View>
        </View>
      );
    } else {
      // Android workaround by wrapping VictoryPie with SVG
      return (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
        >
          <Svg
            width={SIZES.width}
            height={SIZES.width}
            style={{ width: "100%", height: "auto" }}
          >
            <VictoryPie
              standalone={false} // Android workaround
              data={chartData}
              radius={({ datum }) =>
                selectedProblam == datum.name
                  ? SIZES.width * 0.4
                  : SIZES.width * 0.45 - 40
              }
              innerRadius={40}
              style={{
                labels: { fill: 0 },
                data: {
                  fillOpacity: 0.7,
                },
              }}
              width={SIZES.width}
              height={SIZES.width}
              colorScale="qualitative"
              events={[
                {
                  target: "data",
                  eventHandlers: {
                    onPress: () => {
                      return [
                        {
                          target: "labels",
                          mutation: (props) => {
                            let categoryName = chartData[props.index].name;
                            setselectedProblam(categoryName);
                            let X = chartData[props.index].twitte;
                            settwitte(X);
                          },
                        },
                      ];
                    },
                  },
                },
              ]}
            />
          </Svg>
        </View>
      );
    }
  }

  return (
    <View>
      <View>{x()}</View>
      <View>{renderChart()}</View>

      <View>
        {renderExpenseSummary()}
        {renderTwitte()}
      </View>
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

export default RendPie;
