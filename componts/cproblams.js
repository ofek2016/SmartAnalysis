import React from "react";
import { COLORS, FONTS, SIZES, icons } from '../constants';
import { View, Text } from 'react-native';
import { VictoryPie, VictoryBar,VictoryGroup , VictoryChart, VictoryTheme, VictoryAxis } from 'victory-native';

function cproblams() {
    const data = [
        {
            id: 1,
            name: "Apple",
            icon: icons.Apple,
            color: COLORS.black,
            products: [
                {
                    id: 1,
                    title: "iPhone 13",//לחשוב אם להוסיף תמונה של הטלפון 
                    positive: 60,
                    negative: 40,
                    camera: 59,
                    network: 10,
                    price: 23,
                    battery: 8

                },
            ],
        },
        {
            id: 2,
            name: "Samsung",
            icon: icons.samsung,
            color: COLORS.blue,
            products: [
                {
                    id: 2,
                    title: "galaxy s21",//לחשוב אם להוסיף תמונה של הטלפון 
                    positive: 40,
                    negative: 50,
                    camera: 65,
                    network: 15,
                    price: 7,
                    battery: 13


                },
            ],
        },
        {
            id: 3,
            name: "Oneplus",
            icon: icons.oneplus,
            color: COLORS.red,
            products: [
                {
                    id: 3,
                    title: "OnePlus 9",//לחשוב אם להוסיף תמונה של הטלפון 
                    positive: 30,
                    negative: 60,
                    camera: 40,
                    network: 15,
                    price: 10,
                    battery: 35


                },
            ],

        },

        {
            id: 4,
            name: "Xiaomi",
            icon: icons.Xiaomi,
            color: COLORS.yellow,
            products: [
                {
                    id: 4,
                    title: "Redmi note 11",//לחשוב אם להוסיף תמונה של הטלפון 
                    positive: 20,
                    negative: 70,
                    camera: 35,
                    network: 25,
                    price: 10,
                    battery: 30


                },
            ],

        },

    ]

    const [viewMode, setViewMode] = React.useState("chart");
    const [companie, setCompanies] = React.useState(data);
    const [selectedCompany, setSelectedCompany] = React.useState(null)

     
        const charData = companie.map((item) => {
        let num = item.products.map((x) => (x.camera))
        return {
            x: item.name,
            y: Number(num),
        }
        });
     
    
 

return (
    <View>
                 <Text style={{ color: "#447DF0", ...FONTS.body4 }}> Percentage of tweets with positive, negative </Text>

       <VictoryChart  padding={{ top: 20, bottom: 30, left: 40, right: 20 }}
  theme={VictoryTheme.material}
  height={220} 
  domainPadding={{ x: 38 }}>
       <VictoryAxis
    style={{
      tickLabels: {
        fontSize:8
      }
    }}
  />
  <VictoryAxis
    dependentAxis
    orientation="left"
    style={{ tickLabels: { fontSize: 8 } }}
  />
 <VictoryBar  
      barRatio={1}
      cornerRadius={0}
      alignment='middle'
      labels={({ datum }) => `${datum.y}%`}
      data={charData}
       />
        <VictoryBar  
      barRatio={1}
      cornerRadius={0}
      alignment='middle'
      labels={({ datum }) => `${datum.y}%`}
      data={charData}
       />
<VictoryGroup offset={20}
colorScale={["#f94144","#90be6d","yellow"]}
animate={{
duration: 1000,
onLoad: { duration: 1000 }
}}

>

</VictoryGroup>
        </VictoryChart>
                <Text style={{ color: "#f94144", ...FONTS.body3 }}>battery </Text>
                <Text style={{ color: "#90be6d", ...FONTS.body3 }}> price </Text>
                <Text style={{ color: "#90be64", ...FONTS.body3 }}> camera </Text>
    </View>

)
   
}
export default cproblams;