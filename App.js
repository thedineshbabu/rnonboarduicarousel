// import React, { useState, useEffect } from "react";
// import { ActivityIndicator, StyleSheet, View } from "react-native";
// import Onboarding from "./components/Onboarding";
// // import HomeScreen from "./components/HomeScreen";
// import AsyncStorage from "@react-native-async-storage/async-storage";
// import RootNavigation from "./Navigation";
// // import HomeScreen from "./components/HomeScreen";

// const Loading = () => (
//   <View>
//       <ActivityIndicator size="large" color="#0000ff" />
//   </View>
// );

// export default function App() {

//   const [isLoading, setIsLoading] = useState(true);
//   const [viewedOnboarding, setviewedOnboarding] = useState(false);

//   const checkOnBoarding = async () => {
//     try {
//       const value = await AsyncStorage.getItem("@viewedOnboarding");
//       if (value !== null) {
//         setviewedOnboarding(true);
//       } 
//     } catch (e) {
//       console.log(e);
//     }
//     finally {
//       setIsLoading(false);
//     } 
//   };

//   useEffect(() => {
//     checkOnBoarding();
//   },[]);

//   return (
//     <View style={styles.container}>      
//       {/* { isLoading ? <Loading /> : viewedOnboarding ? <RootNavigation /> : <Onboarding /> } */}
//       { viewedOnboarding ? <RootNavigation /> : <Onboarding /> }
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//     alignItems: "center",
//     justifyContent: "center",
//     width: "100%",
//   }
// });
import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import RootNavigation from './Navigation';

const App = () => {
  return (
    <RootNavigation/>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
  }
})
