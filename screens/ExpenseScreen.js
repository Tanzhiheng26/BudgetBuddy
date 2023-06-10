import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AddScreen from './AddScreen';
import ListScreen from './ListScreen'

const Stack = createNativeStackNavigator();

const ExpenseScreen = () => {
    return (
      <Stack.Navigator>
        <Stack.Screen name="Expenses List" component={ListScreen} />
        <Stack.Screen name="Add Expense" component={AddScreen} />
      </Stack.Navigator>
  )
}

export default ExpenseScreen

const styles = StyleSheet.create({})

