import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native'
import React, { useContext } from 'react'
import Budget from '../components/Budget'
import RemainingBudget from '../components/RemainingBudget'
import ExpenseTotal from '../components/ExpenseTotal'
import { useNavigation } from '@react-navigation/native';
import Constants from 'expo-constants';
import { AppContext } from '../context/AppContext'

const BudgetScreen = () => {
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
        if (budget == 0) return 0;
        currDate = new Date();
        const totalExpenses = expenses
            .filter(e => e.date.getFullYear() == currDate.getFullYear() && e.date.getMonth() == currDate.getMonth())
            .reduce((total, item) => { return total + item.cost }, 0);
        return Math.round((totalExpenses / budget) * 100);
    }

    function barColor(percentage) {
        if (percentage >= 100) {
            return "#E74C3C"
        } else if (percentage >= 75) {
            return "#FFA500" 
        } else if (percentage >= 50) {
            return "#FFFF00"
        } else {
            return "#8BED4F"
        }
    }

    const width = getPercentage() > 100 ? "100%" : getPercentage() + "%";
    const backgroundColor =  barColor(getPercentage())
    return (
    <View>
        <View style={styles.budgetcontainer}>
            <Text style={styles.title}>{getMonthYear()}</Text>
            <View style={styles.components}>
                <Budget />
            </View>
            <View style={styles.components}>
                <ExpenseTotal />
            </View>
            <View style={styles.components}>
                <RemainingBudget />
            </View>
        </View>

        <View style={styles.barContainer}>
            <View style={styles.progressBar}>
                <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor, width }]}/>
            </View> 
            <Text style={styles.text}>{getPercentage()}% of budget spent</Text>
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
        marginTop: 20,
    },
    progressBar: {
        height: 30,
        width: '100%',
        backgroundColor: 'white',
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 5
    },
    text: {
        fontSize: 20,
        fontWeight: 500,
        marginTop: 10
    }
})