import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { HomeScreen, OrderScreen, ChatScreen, AccountStack, ProductScreen } from '../screens/index';
import Icon from '../components/Icon';

const Tab = createBottomTabNavigator()
const options = ({ route }) => ({
  headerShown: false,
  tabBarIcon: ({focused, color, size}) => {
    return (
      <Icon name={route.name === "HomeScreen" ? "store" :
        (route.name === "ProductScreen" ? "cube" :
          (route.name === "OrderScreen" ? "receipt" :
            (route.name === "ChatScreen" ? "chat" :
              (route.name === "AccountStack" ? "account-circle" : ""))))}
        size={25}
        color={focused ? '#4D96FF' : "#6e6c65"}
      />
    )
  }
})

const UiTab = () => {
  return (
    <Tab.Navigator
      screenOptions={options}
      initialRouteName='HomeScreen'
      >      
      <Tab.Screen name='HomeScreen' component={HomeScreen}
        options={{
          tabBarLabel: "Tổng quan"
        }} />
      <Tab.Screen name='ProductScreen' component={ProductScreen}
        options={{
          tabBarLabel: "Sản phẩm"
        }} />
      <Tab.Screen name='OrderScreen' component={OrderScreen}
        options={{
          tabBarLabel: "Đơn hàng"
        }} />
      <Tab.Screen name='ChatScreen' component={ChatScreen}
        options={{
          tabBarLabel: "Chat"
        }} />
      <Tab.Screen name='AccountStack' component={AccountStack}
        options={{
          tabBarLabel: "Hệ thống"
        }} />
    </Tab.Navigator>
  );
}

export default UiTab