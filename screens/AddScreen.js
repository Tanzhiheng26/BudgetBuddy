import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AddExpense from '../components/AddExpense'

const AddScreen = () => {
  return (
    <View style={styles.container}>
        <Text style={styles.title}>Add Expense</Text>
        <View>
            <AddExpense />
        </View>
    </View>
  )
}

export default AddScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: 24, 
        textAlign: 'center'
    },
})