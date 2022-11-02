import React from "react";
import { useState, useEffect } from "react";
import Icon from "react-native-vector-icons/MaterialIcons";
import SectionedMultiSelect from "react-native-sectioned-multi-select";
import RendProbBar from "./RendProbBar";
import { View } from "react-native";

const MultiSelect = (props) => {
  const options = props.data[1];
  const [selectedItems, setSelectedTeams] = useState([]);
  const [dataTosand, setdataTosand] = useState([]);
  const [data, setdatad] = useState([]);
  const x = props.data[0];

  const newlist = options.map((obj) => {
    return {
      item: obj,
      id: obj,
    };
  });

  useEffect(() => {
    setdatad([]);
    if (x[0]) {
      x.map((item) => {
        setdatad((oldArray) => [
          ...oldArray,
          {
            id: item.id,
            name: item.name,
            twitte: item.twitte,
            problems: item.problems,
          },
        ]);
        console.log("s[problemsproblemsproblemsproblems.s]", item);
      });
    }
  }, [x]);

  const onSelectedNewChange = (selectedItems) => {
    let maxItems = 3;
    if (selectedItems.length > maxItems) {
      return;
    }
    setSelectedTeams(selectedItems);
  };

  useEffect(() => {
    setdataTosand([]);
    if (data[0] !== "undefined" && data[0] != null) {
      data.map((item) => {
        let total = 0;
        item.problems.map((t) => {
          total += Number(t.y);
        });
        total = total / 100;
        let d = 0;
        let x = item.problems
          .filter((r) => {
            return selectedItems.includes(r.x);
          })
          .map((i) => {
            return {
              x: item.name,
              y: Number(i.y),
              z: Number((i.y / total).toFixed(0)),
              item: selectedItems[d++],
            };
          });
        setdataTosand((oldArray) => [...oldArray, x]);
      });
    } else {
      console.log("else]", dataTosand);
    }
  }, [selectedItems]);

  return (
    <View>
      <SectionedMultiSelect
        items={newlist}
        displayKey="item"
        uniqueKey="item"
        showDropDowns={true}
        readOnlyHeadings={false}
        IconRenderer={Icon}
        selectText="Select up to 3 Features"
        onSelectedItemsChange={onSelectedNewChange}
        selectedItems={selectedItems}
        showChips={true}
      />
      {dataTosand !== "undefined" && dataTosand != null && (
        <View>
          <RendProbBar data={dataTosand} />
        </View>
      )}
    </View>
  );
};

export default MultiSelect;
