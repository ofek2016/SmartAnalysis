import React from "react";
import { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import Moment from "moment";
import LineChart from "./LineChart";
import { COLORS, FONTS, SIZES, icons } from "../constants";
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";

const LineSelect = (props) => {
  const options = props.data[1];
  const [selectedItems, setSelectedTeams] = useState([]);
  const [dataTosand, setdataTosand] = useState(null);
  const [data, setdatad] = useState(props.data[0]);
  const [viwe, setViwe] = useState(props.data[0][0].name);
  const [selectedCategory, setSelectedCategory] = useState(data);

  const newlist = options.map((obj) => {
    return {
      item: obj,
      id: obj,
    };
  });
  useEffect(() => {
    if (selectedCategory[0] !== "undefined" && selectedCategory[0] != null) {
      let dateArr = selectedCategory[0].problems
        .filter((r) => {
          return selectedItems.includes(r.x);
        })
        .map((i) => {
          return {
            x: i.x,
            y: i.twitte,
          };
        });
      const ArrCoun = {};
      dateArr.map((i) => {
        i.y.forEach((element) => {
          const d = new Date(element.date);
          let format = Moment(d).format("YYYY/MM");
          ArrCoun[format] = (ArrCoun[format] || 0) + 1;
        });
      });
      let x = Object.keys(ArrCoun).map((element) => {
        return {
          x: element,
          y: ArrCoun[element],
        };
      });

      setdataTosand(x);
    }
  }, [selectedItems]);

  const onSelectedNewChange = (selectedItems) => {
    let maxItems = 1;
    if (selectedItems.length > maxItems) {
      return;
    }
    setSelectedTeams(selectedItems);
  };
  function addBTN() {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        onPress={() => {
          setSelectedCategory([item]);
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
          data={data}
          renderItem={renderItem}
          keyExtractor={(item) => `${item.id}`}
          numColumns={2}
        />
      </View>
    );
  }

  return (
    <View>
      {addBTN()}

      {
        <View>
          <SectionedMultiSelect
            items={newlist}
            displayKey="item"
            uniqueKey="item"
            showDropDowns={true}
            readOnlyHeadings={false}
            IconRenderer={Icon}
            selectText="Select Feature"
            onSelectedItemsChange={onSelectedNewChange}
            selectedItems={selectedItems}
            showChips={true}
          />
          {dataTosand !== "undefined" && dataTosand != null && (
            <View>
              <LineChart data={dataTosand} />
            </View>
          )}
        </View>
      }
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
export default LineSelect;
