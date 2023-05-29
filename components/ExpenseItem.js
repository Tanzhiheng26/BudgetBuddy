import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import { deleteExpense } from '../firestore';
import { Icon } from '@rneui/themed';
import { auth } from '../firebase'


const ExpenseItem = ({ id, name, cost, date, category, orderBy }) => {
    const { dispatch } = useContext(AppContext);
    const handleDeleteExpense = () => {
        dispatch({
            type: 'DELETE_EXPENSE',
            payload: id,
        })
        deleteExpense(auth.currentUser?.uid, id);
    }
    return (orderBy == "Date") ? (
        <View style={styles.row}>
            <View style={{ flex: 3, marginLeft: 20 }}>
                <Text style={styles.text}>{name} </Text>
            </View>
            <View style={{ flex: 3 }}>
                <Text style={styles.text}>{category} </Text>
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.text}>${cost}</Text>
            </View>
            <View style={{ flex: 1 }}>
                <Icon name='delete' onPress={handleDeleteExpense} />
            </View>
        </View>
    ) : (
        <View style={styles.row}>
            <View style={{ flex: 3, marginLeft: 20 }}>
                <Text style={styles.text}>{name} </Text>
            </View>
            <View style={{ flex: 3 }}>
                <Text style={styles.text}>{date} </Text>
            </View>
            <View style={{ flex: 1 }}>
                <Text style={styles.text}>${cost}</Text>
            </View>
            <View style={{ flex: 1 }}>
                <Icon name='delete' onPress={handleDeleteExpense} />
            </View>
        </View>);
}

export default ExpenseItem

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10

    },
    text: {
        fontSize: 18,
    },
})