import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';



const EZAddGroupExpense = ({ groupID }) => {


    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [date, setDate] = useState(new Date());
    const [deadline, setDeadline] = useState(new Date());
    const [show, setShow] = useState(false);
    const [showDeadline, setShowDeadline] = useState(false);

    //Date
    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate;
        setShow(false);
        setDate(currentDate);

    };
    //deadline
    const onChangeDeadline = (event, selectedDeadline) => {
        const currentDeadline = selectedDeadline;
        setShowDeadline(false);
        setDeadline(currentDeadline);

    };

    const showDatepicker = () => {
        setShow(true);
    };
    const showDatepickerDeadline = () => {
        setShowDeadline(true);
    };



    const onSubmit = async () => {
        setName('')
        setCost('')
        setDate(new Date())
    }


    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={setName}
                    value={name}
                    placeholder="Name"
                />
                <TextInput
                    style={styles.input}
                    onChangeText={setCost}
                    value={cost}
                    placeholder="Cost"
                    keyboardType="numeric"
                />
                <TouchableOpacity
                    style={styles.input}
                    onPress={showDatepicker}>
                    <Text>{'Date: ' + date.toLocaleDateString()}</Text>
                </TouchableOpacity>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode='date'
                        onChange={onChange}
                    />
                )}

                <TouchableOpacity
                    style={styles.input}
                    onPress={showDatepickerDeadline}>
                    <Text>{'Deadline: ' + deadline.toLocaleDateString()}</Text>
                </TouchableOpacity>
                {showDeadline && (
                    <DateTimePicker
                        testID="dateTimePickerDeadline"
                        value={deadline}
                        mode='date'
                        onChange={onChangeDeadline}
                    />
                )}
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={onSubmit}
            >
                <Text style={styles.buttonText}>Add Expense</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView >

    )
}

export default EZAddGroupExpense;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '60%',
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    button: {
        backgroundColor: '#0782F9',
        width: '40%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
})