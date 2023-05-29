import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Budget from '../components/Budget'
import RemainingBudget from '../components/RemainingBudget'
import ExpenseTotal from '../components/ExpenseTotal'
import ExpenseList from '../components/ExpenseList'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native';


const Expenses = () => {

    const [displayExpensesList, setDisplayExpensesList] = useState("Date");

    const setDisplay = () => {
        if (displayExpensesList == 'Category') setDisplayExpensesList('Date')
        else setDisplayExpensesList('Category')
    }

    const navigation = useNavigation();
    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace("Login")
            })
            .catch(error => alert(error.message))
    }
    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.budgetcontainer}>
                    <Text style={styles.title}>My Budget Planner</Text>
                    <View style={styles.components}>
                        <Budget />
                    </View>
                    <View style={styles.components}>
                        <RemainingBudget />
                    </View>
                    <View style={styles.components}>
                        <ExpenseTotal />
                    </View>
                </View>

                <View style={styles.expensescontainer}>
                    <Text style={styles.title}>Expenses</Text>
                </View>

                <View style={styles.groupByContainer}>
                    <TouchableOpacity
                        style={styles.groupByButton}
                        onPress={setDisplay}>
                        <Text style={styles.groupByButtonText}>Group by: {displayExpensesList}</Text>
                    </TouchableOpacity>
                </View>
                {displayExpensesList=='Date' ? <ExpenseList orderBy="Date" /> : <ExpenseList orderBy="Category" />}

                <View style={styles.buttoncontainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSignOut}>
                        <Text style={styles.buttonText}>Sign out</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView >
    )
}

export default Expenses

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        textAlign: 'center'
    },
    budgetcontainer: {
        marginTop: 10
    },
    components: {
        marginTop: 5,
    },
    expensescontainer: {
        marginTop: 10,
    },
    buttoncontainer: {
        alignItems: 'center'
    },
    button: {
        backgroundColor: '#0782F9',
        width: '60%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 40,
        marginBottom: 30
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
    text: {
        fontSize: 20,
    },
    groupByContainer: {
        alignItems: 'center',
        marginTop: 10
    },
    groupByButton: {
        backgroundColor: '#F9E79F',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        width: 150,  
        height: 40,
        borderRadius: 10,
    },
    groupByButtonText: {
        color: 'black',
        fontSize: 15
    },
})