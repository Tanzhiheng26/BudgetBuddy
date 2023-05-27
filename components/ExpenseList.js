import { StyleSheet, View, Text } from 'react-native'
import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import ExpenseItem from './ExpenseItem';


const ViewDate = ({ date }) => {
  return (
    <View style={styles.dateRow}>

      <Text style={styles.dateText}>{date}</Text>
    </View >)
}

const NoExpenseView = () => {
  return (
    <View style={styles.noExpenseViewContainer}>
      <Text>--No Expense Item Added--</Text>
    </View >
  )
}


const ExpenseList = () => {
  const { expenses } = useContext(AppContext);

  expenses.sort((a, b) => new Date(b.date) - new Date(a.date))

  function createExpenseItem(id, name, cost, dateISO, category) {
    return <ExpenseItem key={id}
      id={id}
      name={name}
      cost={cost}
      date={new Date(dateISO).toLocaleDateString()}
      category={category} />
  }

  function changeISOToLocale(dateISO) {
    return new Date(dateISO).toLocaleDateString()
  }

  function test() {
    let exLength = expenses.length;
    let list = [];
    let firstExpense = expenses[0]
    if (exLength != 0) {
      //first date and expense
      list.push(<ViewDate date={changeISOToLocale(firstExpense.date)} />)
      list.push(createExpenseItem(firstExpense.id, firstExpense.name, firstExpense.cost, firstExpense.date, firstExpense.category))

      for (let i = 1; i < exLength; i++) {
        let expense = expenses[i]
        //check if the date is the same as previous
        if (changeISOToLocale(expense.date) == changeISOToLocale(expenses[i - 1].date)) {
          list.push(createExpenseItem(expense.id, expense.name, expense.cost, expense.date, expense.category))
        } else {
          list.push(<ViewDate date={changeISOToLocale(expense.date)} />)
          list.push(createExpenseItem(expense.id, expense.name, expense.cost, expense.date, expense.category))
        }
      }
    } else (
      list.push(<NoExpenseView />)
    )
    return list;
  }


  return (
    <View>
      {test().map((element) => element)}
    </View>
  )
}

export default ExpenseList

const styles = StyleSheet.create({
  dateRow: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    marginTop: 30,
    borderBottomWidth: 2
  },
  dateText: {
    fontSize: 18
  },
  noExpenseViewContainer: {
    alignItems: 'center',
    marginTop: 20
  }
})