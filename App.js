import React from "react"
import { NavigationContainer } from "@react-navigation/native"
import { SafeAreaView } from "react-native-safe-area-context"
import 'react-native-gesture-handler';
import AppStack from "./src/navigations/AppStack";
import AuthStack from "./src/navigations/AuthStack";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";

const App = () => {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor:"black"}}>
      <Provider store={store}>
        <NavigationContainer>
          <AuthStack />
        </NavigationContainer>
      </Provider>
    </SafeAreaView>
  )
}
export default App
