import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext';
import { deleteExpense } from '../firestore';
import { Icon } from '@rneui/themed';
import { auth } from '../firebase'


const ExpenseItem = ({ id, name, cost }) => {
    const { dispatch } = useContext(AppContext);
    const handleDeleteExpense = () => {
        dispatch({
            type: 'DELETE_EXPENSE',
            payload: id,
        })
        deleteExpense(auth.currentUser?.uid, id);
    }
    return (
        <View style={styles.row}>
            <Text style={styles.text}>{name}: </Text>
            <Text style={styles.text}>${cost}</Text>
            <Icon name='delete' onPress={handleDeleteExpense} />
        </View>
    );
}

export default ExpenseItem

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    text: {
        fontSize: 18,
    },
})