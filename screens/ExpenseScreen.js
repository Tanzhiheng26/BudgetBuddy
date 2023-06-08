import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import Budget from '../components/Budget'
import RemainingBudget from '../components/RemainingBudget'
import ExpenseTotal from '../components/ExpenseTotal'
import ExpenseList from '../components/ExpenseList'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native';
import DatePicker from 'react-native-modern-datepicker';

const Expenses = () => {

    const [displayExpensesList, setDisplayExpensesList] = useState("Date");
    currDate = new Date();
    const [date, setDate] = useState(currDate.getFullYear() + " " + (currDate.getMonth() + 1));
    const [show, setShow] = useState(false);
    const [year, month] = date.split(" ");

    const setDisplay = () => {
        if (displayExpensesList == 'Category') setDisplayExpensesList('Date')
        else setDisplayExpensesList('Category')
    }

    // Month picker
    const onChange = (selectedDate) => {
        setShow(false);
        setDate(selectedDate);
    };

    const showDatepicker = () => {
        setShow(true);
    };

    function getMonth(monthNumber) {
        const date = new Date();
        date.setMonth(monthNumber - 1);
      
        return date.toLocaleString([], {
          month: 'short',
        });
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

                <TouchableOpacity
                    style={styles.monthButton}
                    onPress={showDatepicker}>
                    <Text style={styles.groupByButtonText}>{getMonth(month) + " " + year}</Text>
                </TouchableOpacity>
                {show && (
                    <DatePicker
                    mode="monthYear"
                    onMonthYearChange={onChange}
                    />
                )}

                <View style={styles.groupByContainer}>
                    <TouchableOpacity
                        style={styles.groupByButton}
                        onPress={setDisplay}>
                        <Text style={styles.groupByButtonText}>Sorted by: {displayExpensesList}</Text>
                    </TouchableOpacity>
                </View>
                

                {displayExpensesList=='Date' 
                    ? <ExpenseList orderBy="Date" year={year} month ={month}/> 
                    : <ExpenseList orderBy="Category" year={year} month ={month}/>}

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
        alignItems: 'flex-end',
        marginRight: 10,
    },
    groupByButton: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 3, // Android
        width: 150,  
        height: 30,
        borderRadius: 10,
    },
    monthButton: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2, // Android
        width: 100,  
        height: 30,
        marginLeft: 10,
        borderRadius: 10,
    },
    groupByButtonText: {
        fontSize: 15
    },
})