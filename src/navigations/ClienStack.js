import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home, Cart, Profile, Order } from '../screens/client/index';
import Icon from '../components/Icon';
const Tab = createBottomTabNavigator()
const options = ({ route }) => ({
    headerShown: false,
    tabBarIcon: ({focused, color, size}) => {
        return (
            <Icon name={route.name === "Home" ? "store" :
                (route.name === "Cart" ? "cart" :
                (route.name === "Profile" ? "account-circle" :
                (route.name === "Order" ? "cube": "")))}
                size={25}
                color={focused ? '#4D96FF' : "#6e6c65"}
            />
        )
    }
})

const TabClient = () => {
    return (<Tab.Navigator
        screenOptions={options}
        initialRouteName='Home'
    >
        <Tab.Screen name='Home' component={Home}
            options={{
                tabBarLabel: "Trang chủ"
            }} />
        <Tab.Screen name='Cart' component={Cart}
            options={{
                tabBarLabel: "Giỏ hàng"
            }} />
        <Tab.Screen name='Order' component={Order}
            options={{
                tabBarLabel: "Đơn hàng"
            }} />
        <Tab.Screen name='Profile' component={Profile}
            options={{
                tabBarLabel: "Tài khoản"
            }} />
    </Tab.Navigator>)
}

export default TabClient

