import { StyleSheet, View, Text } from 'react-native'
import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import ExpenseItem from './ExpenseItem';

const ViewGroupHeader = ({ title }) => {
  return (
    <View style={styles.headerRow}>
      <Text style={styles.headerText}>{title}</Text>
    </View >
  )
}

const NoExpenseView = () => {
  return (
    <View style={styles.noExpenseViewContainer}>
      <Text style={{fontSize: 18}}>--No Expense Item Added--</Text>
    </View >
  )
}

const ListTitle = ({ title1, title2, title3 }) => {
  return (
    <View style={styles.row} >
      <View style={{ flex: 3, marginLeft: 20 }}>
        <Text style={styles.text}>{title1} </Text>
      </View>
      <View style={{ flex: 3 }}>
        <Text style={styles.text}>{title2} </Text>
      </View>
      <View style={{ flex: 2 }}>
        <Text style={styles.text}>{title3}</Text>
      </View>
    </View>

  )
}

const ExpenseList = ({ orderBy, year, month }) => {
  const { expenses } = useContext(AppContext);
  const copy = expenses.filter(e => e.date.getFullYear() == year && e.date.getMonth() + 1 == month)

  function createExpenseItem(id, name, cost, date, category, orderBy) {
    return <ExpenseItem key={id}
      id={id}
      name={name}
      cost={cost}
      date={date.toLocaleDateString()}
      category={category}
      orderBy={orderBy} />
  }

  function groupByCategory() {
    copy.sort((a, b) => {
        return a.category.localeCompare(b.category) == 0 ? b.date - a.date : a.category.localeCompare(b.category)
    })
    let exLength = copy.length;
    let list = [];
    if (exLength != 0) {
      for (let i = 0; i < exLength; i++) {
        let expense = copy[i]
        //check if the category is the same as previous
        if (i == 0 || expense.category != copy[i - 1].category) {
          list.push(<ViewGroupHeader key={expense.category} title={expense.category} />)
        }
        list.push(createExpenseItem(expense.id, expense.name, expense.cost, expense.date, expense.category, "category"))
      }
    } else (
      list.push(<NoExpenseView key="0" />)
    )
    return list;
  }

  function groupByDate() {
    // Ignore the time for each date object
    copy.sort((a, b) => {
      a.date.setHours(0, 0, 0, 0)
      b.date.setHours(0, 0, 0, 0)
      return b.date - a.date == 0 ? a.category.localeCompare(b.category) : b.date - a.date;
    })
    let exLength = copy.length;
    let list = [];
    if (exLength != 0) {
      for (let i = 0; i < exLength; i++) {
        let expense = copy[i]
        //check if the date is the same as previous
        if (i == 0 || expense.date.toLocaleDateString() != copy[i - 1].date.toLocaleDateString()) {
          list.push(<ViewGroupHeader key={expense.date.toLocaleDateString()} title={expense.date.toLocaleDateString()} />)
        } 
        list.push(createExpenseItem(expense.id, expense.name, expense.cost, expense.date, expense.category, "Date"))
      }
    } else (
      list.push(<NoExpenseView key="0" />)
    )
    return list;
  }

  return orderBy == "Date" 
  ? (
    <View>
      <ListTitle title1="Name" title2="Category" title3="Cost" />
      {groupByDate()}
    </View>
  ) 
  : (
    <View>
      <ListTitle title1="Name" title2="Date" title3="Cost" />
      {groupByCategory()}
    </View>
  )
}

export default ExpenseList

const styles = StyleSheet.create({
  headerRow: {
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 10,
    marginTop: 10,
    borderBottomWidth: 2
  },
  headerText: {
    fontSize: 18,
  },
  noExpenseViewContainer: {
    alignItems: 'center',
    marginTop: 20
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },
})