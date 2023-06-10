import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native'
import React, { useContext } from 'react'
import Budget from '../components/Budget'
import RemainingBudget from '../components/RemainingBudget'
import ExpenseTotal from '../components/ExpenseTotal'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { AppContext } from '../context/AppContext'

const BudgetScreen = () => {
    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace("Login")
            })
            .catch(error => alert(error.message))
    }

    const navigation = useNavigation();

    function getMonthYear() {
        const date = new Date();
        const month = date.toLocaleString([], {
          month: 'short',
          year
        });
        const year = date.getFullYear();
        return month + " " + year;
    }

    function getPercentage() {
        const { budget, expenses } = useContext(AppContext);
        currDate = new Date();
        const totalExpenses = expenses
            .filter(e => e.date.getFullYear() == currDate.getFullYear() && e.date.getMonth() == currDate.getMonth())
            .reduce((total, item) => { return total + item.cost }, 0);
        return (totalExpenses / budget) * 100;
    }

    const width = getPercentage() > 100 ? "100%" : getPercentage() + "%";
    const backgroundColor =  getPercentage() > 100 ? "#E74C3C" :"#8BED4F";
    return (
    <View>
        <View style={styles.budgetcontainer}>
            <Text style={styles.title}>{getMonthYear()}</Text>
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

        <View style={styles.barContainer}>
            <View style={styles.progressBar}>
                <Animated.View style={[StyleSheet.absoluteFill, {backgroundColor, width }]}/>
            </View> 
            <Text>{getPercentage()}% of budget spent</Text>
        </View>

        <View style={styles.buttoncontainer}>
            <TouchableOpacity
                style={styles.button}
                onPress={handleSignOut}>
                <Text style={styles.buttonText}>Sign out</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default BudgetScreen

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
    barContainer: {
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        padding: 8,
    },
    progressBar: {
        height: 20,
        width: '100%',
        backgroundColor: 'white',
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 5
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
})