import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';

const ExpenseTotal = () => {
  const { expenses } = useContext(AppContext);
  const totalExpenses = expenses.reduce((total, item) => { return total + item.cost }, 0)
  return (
    <View style={styles.container}>
      <Text style={styles.text} >Spent so far: ${totalExpenses}</Text>
    </View>
  )
}

export default ExpenseTotal

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#5DADE2',
    width: '100%',
    padding: 15,
    alignItems: 'center'
  },
  text: {
    fontSize: 15,
    fontWeight: 600
  }
})