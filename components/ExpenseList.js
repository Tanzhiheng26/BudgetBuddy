import { StyleSheet, View } from 'react-native'
import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import ExpenseItem from './ExpenseItem';

const ExpenseList = () => {
  const { expenses } = useContext(AppContext);
  return (
    <View>
        {expenses.map((expense) => 
            <ExpenseItem key={expense.id} id={expense.id} name={expense.name} cost={expense.cost}/>
        )}
    </View>
  )
}

export default ExpenseList

const styles = StyleSheet.create({})