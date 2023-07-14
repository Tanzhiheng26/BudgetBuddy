import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import ExpenseList from '../components/ExpenseList'
import DatePicker from 'react-native-modern-datepicker';
import { useNavigation } from '@react-navigation/native';

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

    const navigation = useNavigation();

    const onAdd = () => {
        navigation.navigate("Add Expense");
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

    return (
        <SafeAreaView>
            <ScrollView>
                <View style={styles.addContainer}>
                    <TouchableOpacity
                      style={styles.addButton}
                      onPress={onAdd}>
                        <Text style={styles.addText}>Add Expense</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    style={styles.monthButton}
                    onPress={showDatepicker}>
                    <Text style={styles.buttonText}>{getMonth(month) + " " + year}</Text>
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
                        <Text style={styles.buttonText}>Sorted by: {displayExpensesList}</Text>
                    </TouchableOpacity>
                </View>      

                {displayExpensesList=='Date' 
                    ? <ExpenseList orderBy="Date" year={year} month ={month}/> 
                    : <ExpenseList orderBy="Category" year={year} month ={month}/>}
            </ScrollView>
        </SafeAreaView >
    )
}

export default Expenses

const styles = StyleSheet.create({
    addContainer: {
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15,
    },
    groupByContainer: {
        alignItems: 'flex-end',
        marginRight: 10,
    },
    groupByButton: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2, // Android
        width: 160,  
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
    buttonText: {
        fontWeight: '500',
        fontSize: 16
    },
    addText: {
        fontWeight: '500',
        fontSize: 16,
        color: 'white'
    },
    addButton: {
        backgroundColor: '#0782F9',
        width: '30%',
        padding: 5,
        borderRadius: 10,
        alignItems: 'center',
    },
})