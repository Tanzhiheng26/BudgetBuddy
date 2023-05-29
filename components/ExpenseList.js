import { StyleSheet, View, Text } from 'react-native'
import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import ExpenseItem from './ExpenseItem';



const ExpenseList = () => {
  const { expenses } = useContext(AppContext);

  expenses.sort((a, b) => new Date(b.date) - new Date(a.date))

  return (
    <View>
      {expenses.map((expense) =>
        < ExpenseItem key={expense.id}
          id={expense.id}
          name={expense.name}
          cost={expense.cost}
          date={new Date(expense.date).toLocaleDateString()}
          category={expense.category} />
      )}

    </View>
  )
}

export default ExpenseList

const styles = StyleSheet.create({})