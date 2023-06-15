import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';

const ExpenseTotal = () => {
  const { expenses } = useContext(AppContext);
  currDate = new Date();
  const totalExpenses = expenses
      .filter(e => e.date.getFullYear() == currDate.getFullYear() && e.date.getMonth() == currDate.getMonth())
      .reduce((total, item) => { return total + item.cost }, 0)
  return (
    <View style={styles.container}>
      <Text style={styles.text} >Spent so far: ${totalExpenses.toFixed(2)}</Text>
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
    fontSize: 20,
  }
})