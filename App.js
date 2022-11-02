import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React ,{useState} from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { Home } from "./screens/";
 import * as Font from 'expo-font';
import { AppLoading } from 'expo';

 
 
// const fetchFonts = () => {  לא עובד הפרונטים
//   return Font.loadAsync({
//   '-Black': require('./assets/fonts/-Bold.ttf'),
//   '-BlackItalic': require('./assets/fonts/-BlackItalic.ttf'),
//   '-Bold': require('./assets/fonts/-Bold.ttf'),
//   '-BoldItalic': require('./assets/fonts/-BoldItalic.ttf'),
//   '-Italic': require('./assets/fonts/-Italic.ttf'),
//   '-Light': require('./assets/fonts/-Light.ttf'),
//   '-LightItalic': require('./assets/fonts/-LightItalic.ttf'),
//   '-Medium': require('./assets/fonts/-Medium.ttf'),
//   '-MediumItalic': require('./assets/fonts/-MediumItalic.ttf'),
//   '-Regular': require('./assets/fonts/-Regular.ttf'),
//   '-Thin': require('./assets/fonts/-Thin.ttf'),
//   '-ThinItalic': require('./assets/fonts/-ThinItalic.ttf'),
//   'RobotoCondensed-Bold': require('./assets/fonts/RobotoCondensed-Bold.ttf'),
//   'RobotoCondensed-BoldItalic': require('./assets/fonts/RobotoCondensed-BoldItalic.ttf'),
//   'RobotoCondensed-Italic': require('./assets/fonts/RobotoCondensed-Italic.ttf'),
//   'RobotoCondensed-Light': require('./assets/fonts/RobotoCondensed-Light.ttf'),
//   'RobotoCondensed-LightItalic': require('./assets/fonts/RobotoCondensed-LightItalic.ttf'),
//   'RobotoCondensed-Regular': require('./assets/fonts/RobotoCondensed-Regular.ttf'),
//   });
//   };

const theme = {
  ...DefaultTheme,
  colors: {
      ...DefaultTheme.colors,
      border: "transparent",
  },
};

const Stack = createStackNavigator();

const App = ()=> {
 

  // קשור לפרונטים
  // const [dataLoaded, setDataLoaded] = useState(false);  
  
  // if (!dataLoaded) {
  //   return (
  //     <AppLoading
  //       startAsync={fetchFonts}
  //       onFinish={() => setDataLoaded(true)}
  //     />
  //   );
  // }

  return(
    <NavigationContainer theme={theme}>
    <Stack.Navigator
        screenOptions={{
            headerShown: false
        }}
        initialRouteName={'Home'}
    >
        <Stack.Screen name="Home" component={Home} />
         
    </Stack.Navigator>
  </NavigationContainer>
  )
}

export default App;



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
