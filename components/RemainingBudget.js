import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'

const RemainingBudget = () => {
  const { budget, expenses } = useContext(AppContext);
  currDate = new Date();
  const totalExpenses = expenses
      .filter(e => e.date.getFullYear() == currDate.getFullYear() && e.date.getMonth() == currDate.getMonth())
      .reduce((total, item) => { return total + item.cost }, 0)
  return (
    <View style={(totalExpenses > budget) ? styles.redcontainer : styles.greencontainer}>
      <Text style={styles.text}>Remaining: ${budget - totalExpenses}</Text>
    </View>
  )
}

export default RemainingBudget

const styles = StyleSheet.create({
  greencontainer: {
    backgroundColor: '#ABEBC6',
    width: '100%',
    padding: 15,
    alignItems: 'center'
  },
  redcontainer: {
    backgroundColor: '#F5B7B1',
    width: '100%',
    padding: 15,
    alignItems: 'center'
  },
  text: {
    fontSize: 15,
    fontWeight: 600
  }
})