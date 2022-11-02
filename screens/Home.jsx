import React from "react";
import { useState, useEffect } from "react";
import { COLORS, FONTS, SIZES, icons } from "../constants";
import RendBar from "./RendBar";
import RendPie from "./RendPie";
import Multiselec from "./Multiselect";
import LineSelect from "./LineSelect";

import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
} from "react-native";

const Home = () => {
  const apiUr = "http://twitter-smart-server.herokuapp.com/api/model/list";
  const apiUrl = "http://twitter-smart-server.herokuapp.com/api/tweet/sentiment/";
  const apiUr2 = "http://twitter-smart-server.herokuapp.com/api/tweet/problem/";

  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [data3, setData3] = useState([]);
  const type = {
    neutral: COLORS.darkgray,
    positive: COLORS.gray,
    negative: COLORS.red,
  };

  useEffect(() => {
    fetch(apiUr, {
      method: "GET",
    })
      .then((res) => {
        return res.json();
      })
      .then(
        (result) => {
          setData(result);
        },
        (error) => {
          console.log("err post=", error);
        }
      );
  }, []);

  useEffect(() => {
    setData2([]);
    data.map((i) => {
      fetch(apiUrl + i, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json; charset=UTF-8",
        }),
      })
        .then((res) => {
          console.log("res.ok2", res.ok);
          return res.json();
        })
        .then(
          (re) => {
            setData2((oldArray) => [
              ...oldArray,
              {
                name: i,
                problems: Object.keys(re).map((obj) => {
                  return {
                    x: obj,
                    y: re[obj].length,
                    color: type[obj],
                  };
                }),
              },
            ]);
          },
          (error) => {
            console.log("err post=", error);
          }
        );
    });
  }, [data]);

  useEffect(() => {
    setData3([]);
    let num = 1;
    data.map((i) => {
      fetch(apiUr2 + i, {
        method: "GET",
        headers: new Headers({
          "Content-Type": "application/json; charset=UTF-8",
          Accept: "application/json; charset=UTF-8",
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then(
          (re) => {
            const data = Object.keys(re).map((obj) => {
              return {
                x: obj,
                y: re[obj].length,
                twitte: re[obj].sort(
                  (a, b) => new Date(a.date) - new Date(b.date)
                ),
              };
            });
            setSelectedTeam(Object.keys(re));
            setData3((oldArray) => [
              ...oldArray,
              {
                id: num++,
                twitte: re,
                name: i,
                problems: data,
              },
            ]);
            setCompanies(data3);
          },
          (error) => {
            console.log("err post=", error);
          }
        );
    });
  }, [data]);

  const [viewMode, setViewMode] = React.useState("list");

  function renderHeader() {
    return (
      <View
        style={{
          paddingHorizontal: SIZES.padding,
          paddingVertical: SIZES.padding,
          backgroundColor: COLORS.white,
        }}
      >
        <View style={{ justifyContent: "center", alignItems: "center" }}>
          <Image
            source={icons.SmaertAnalysis}
            style={{
              width: 120,
              height: 60,
              tintColor: COLORS.black,
            }}
          />
        </View>
      </View>
    );
  }
  //הכותרת של החברות וגם הכפתורים של התרשים והרשימה של החברות
  function renderCompanyHeaderSection() {
    return (
      <View
        style={{
          flexDirection: "row-reverse",
          padding: SIZES.padding,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Title   */}
        <View>
          <Text style={{ color: COLORS.primary, ...FONTS.h3 }}>COMPANIES</Text>
          <Text style={{ color: COLORS.darkgray, ...FONTS.body4 }}> 2 </Text>
          {/* מספר החברות */}
        </View>

        {/* Buttons */}
        <View style={{ flexDirection: "row-reverse" }}>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 50,
              width: 50,
              backgroundColor: viewMode == "chart" ? COLORS.secondary : null,
              borderRadius: 25,
            }}
            onPress={() => setViewMode("chart")}
          >
            <Image
              source={icons.chart_icon}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                tintColor: viewMode == "chart" ? COLORS.white : COLORS.darkgray,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 50,
              width: 50,
              backgroundColor:
                viewMode == "lineChart" ? COLORS.secondary : null,
              borderRadius: 25,
            }}
            onPress={() => setViewMode("lineChart")}
          >
            <Image
              source={icons.calendar_icon}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                tintColor:
                  viewMode == "lineChart" ? COLORS.white : COLORS.darkgray,
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              alignItems: "center",
              justifyContent: "center",
              height: 50,
              width: 50,
              backgroundColor: viewMode == "list" ? COLORS.secondary : null,
              borderRadius: 25,
            }}
            onPress={() => setViewMode("list")}
          >
            <Image
              source={icons.menu_icon}
              resizeMode="contain"
              style={{
                width: 20,
                height: 20,
                tintColor: viewMode == "list" ? COLORS.white : COLORS.darkgray,
              }}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  // Smartphonesהכותרת של
  function renderProductsTitle() {
    return (
      <View
        style={{
          height: 80,
          backgroundColor: COLORS.lightGray2,
          padding: SIZES.padding,
        }}
      >
        {/* Title */}
        <Text style={{ ...FONTS.h3, color: COLORS.primary }}>SMARTPHONES</Text>
        <Text style={{ ...FONTS.body4, color: COLORS.darkgray }}>
          {" "}
          {/*{companies.products.length}*/} 4 Total
        </Text>
      </View>
    );
  }

  return (
    <View>
      {/* header section */}
      {renderHeader()}
      {/* Company header sectio */}
      {renderCompanyHeaderSection()}
      {/*באנדרואיד, ScrollView היא קבוצת תצוגות המשמשת ליצירת תצוגות שניתנות לגלילה אנכית. */}
      <SafeAreaView>
        <ScrollView
          contentContainerStyle={{ paddingBottom: 450 }}
          prop
          nestedScrollEnabled={true}
        >
          {viewMode == "list" && (
            <View>
              {data3[1] && (
                <View>
                  <RendPie data={data3} />
                </View>
              )}
            </View>
          )}
          {viewMode == "chart" && (
            <View>
              {data2 && (
                <View>
                  {/* VictoryBar POSITIVE */}
                  {/* VictoryBar NEGATIVE */}
                  <RendBar data={data2} />
                </View>
              )}
            </View>
          )}

          {viewMode == "lineChart" && (
            <View>
              {data3[1] && (
                <View>
                  <LineSelect data={[data3, selectedTeam]} />
                </View>
              )}
            </View>
          )}

          {viewMode == "chart" && (
            <View>
              {data3[1] && (
                <View>
                  <Multiselec data={[data3, selectedTeam]} />
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default Home;
