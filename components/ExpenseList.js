import { StyleSheet, View, Text } from 'react-native'
import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import ExpenseItem from './ExpenseItem';


const ViewGroupHeader = ({ title }) => {
  return (
    <View style={styles.headerRow}>
      <Text style={styles.headerText}>{title}</Text>
    </View >)
}

const NoExpenseView = () => {
  return (
    <View style={styles.noExpenseViewContainer}>
      <Text>--No Expense Item Added--</Text>
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

const ExpenseList = ({ orderBy }) => {
  const { expenses } = useContext(AppContext);

  function createExpenseItem(id, name, cost, dateISO, category, orderBy) {
    return <ExpenseItem key={id}
      id={id}
      name={name}
      cost={cost}
      date={new Date(dateISO).toLocaleDateString()}
      category={category}
      orderBy={orderBy} />
  }

  function changeISOToLocale(dateISO) {
    return new Date(dateISO).toLocaleDateString()
  }

  function groupByCategory() {
    expenses.sort((a, b) => a.category.localeCompare(b.category))
    let exLength = expenses.length;
    let list = [];
    let firstExpense = expenses[0]
    if (exLength != 0) {
      //first category and expense
      list.push(<ViewGroupHeader key={firstExpense.category} title={firstExpense.category} />)
      list.push(createExpenseItem(firstExpense.id, firstExpense.name, firstExpense.cost, firstExpense.date, firstExpense.category, "category"))

      for (let i = 1; i < exLength; i++) {
        let expense = expenses[i]
        //check if the category is the same as previous
        if (expense.category == expenses[i - 1].category) {
          list.push(createExpenseItem(expense.id, expense.name, expense.cost, expense.date, expense.category, "category"))
        } else {
          list.push(<ViewGroupHeader key={expense.category} title={expense.category} />)
          list.push(createExpenseItem(expense.id, expense.name, expense.cost, expense.date, expense.category, "category"))
        }
      }
    } else (
      list.push(<NoExpenseView key="1" />)
    )
    return list;
  }


  function groupByDate() {
    expenses.sort((a, b) => new Date(b.date) - new Date(a.date))
    let exLength = expenses.length;
    let list = [];
    let firstExpense = expenses[0]
    if (exLength != 0) {
      //first date and expense
      list.push(<ViewGroupHeader key={changeISOToLocale(firstExpense.date)} title={changeISOToLocale(firstExpense.date)} />)
      list.push(createExpenseItem(firstExpense.id, firstExpense.name, firstExpense.cost, firstExpense.date, firstExpense.category, "Date"))

      for (let i = 1; i < exLength; i++) {
        let expense = expenses[i]
        //check if the date is the same as previous
        if (changeISOToLocale(expense.date) == changeISOToLocale(expenses[i - 1].date)) {
          list.push(createExpenseItem(expense.id, expense.name, expense.cost, expense.date, expense.category, "Date"))
        } else {
          list.push(<ViewGroupHeader key={changeISOToLocale(expense.date)} title={changeISOToLocale(expense.date)} />)
          list.push(createExpenseItem(expense.id, expense.name, expense.cost, expense.date, expense.category, "Date"))
        }
      }
    } else (
      list.push(<NoExpenseView key="1" />)
    )
    return list;
  }



  return orderBy == "Date" ? (
    <View>
      <ListTitle title1="Name" title2="Category" title3="Cost" />
      {groupByDate().map((element) => element)}
    </View>
  ) :
    (<View>
      <ListTitle title1="Name" title2="Date" title3="Cost" />
      {groupByCategory().map((element) => element)}
    </View>
    )
}

export default ExpenseList

const styles = StyleSheet.create({
  headerRow: {
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    marginTop: 30,
    borderBottomWidth: 2
  },
  headerText: {
    fontSize: 18
  },
  noExpenseViewContainer: {
    alignItems: 'center',
    marginTop: 20
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    flex: 1,
    marginTop: 20,


  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
  },

}
)