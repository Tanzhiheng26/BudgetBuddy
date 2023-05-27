import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React from 'react'
import Budget from '../components/Budget'
import RemainingBudget from '../components/RemainingBudget'
import ExpenseTotal from '../components/ExpenseTotal'
import ExpenseList from '../components/ExpenseList'
import { auth } from '../firebase'
import { useNavigation } from '@react-navigation/native';

const Expenses = () => {
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
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.scrollView}>
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


                <View style={styles.row}>

                    <View style={{ flex: 3, marginLeft: 20 }}>
                        <Text style={styles.text}>Name </Text>
                    </View>
                    <View style={{ flex: 3 }}>
                        <Text style={styles.text}>Category </Text>
                    </View>
                    <View style={{ flex: 2 }}>
                        <Text style={styles.text}>Cost</Text>
                    </View>

                </View>

                <ExpenseList />

                <View style={styles.buttoncontainer}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={handleSignOut}>
                        <Text style={styles.buttonText}>Sign out</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Expenses

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        flex: 1,
        marginTop: 20
    },
    title: {
        fontSize: 24,
        textAlign: 'center'
    },
    budgetcontainer: {
        marginTop: 20
    },
    components: {
        marginTop: 5,
    },
    expensescontainer: {
        marginTop: 20,
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
})