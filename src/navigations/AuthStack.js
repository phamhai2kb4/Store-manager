import React, {useState} from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import {
    GettingStart, 
    Login, 
    ProductScreen, 
    FormProductScreen, 
    OrderDetail, 
    Register,
    UpdateProduct
} from '../screens/index'
import UiTab from './UiTab'
import TabClient from './ClienStack'
import {ProductDetail, CheckOrder, Categories} from '../screens/client/index'

const Stack = createNativeStackNavigator()
const AuthStack = () => {
    return (
        <Stack.Navigator initialRouteName='GettingStart' screenOptions={{ headerShown: false, gestureEnabled: false }} >
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="UiTab" component={UiTab}/>
            <Stack.Screen name="TabClient" component={TabClient} /> 
            <Stack.Screen name="ProductScreen" component={ProductScreen} />
            <Stack.Screen name="FormProductScreen" component={FormProductScreen} />
            <Stack.Screen name= "OrderDetail" component={OrderDetail}/>
            <Stack.Screen name='Register' component={Register} />
            <Stack.Screen name='GettingStart' component={GettingStart}/>
            <Stack.Screen name='UpdateProduct' component={UpdateProduct}/>
            <Stack.Screen name='ProductDetail' component={ProductDetail}/>
            <Stack.Screen name='CheckOrder' component={CheckOrder}/>
            <Stack.Screen name='Categories' component={Categories}/>
            {/* <Stack.Screen name='Cart' component={Cart}/> */}
        </Stack.Navigator>

    )
}

export default AuthStack