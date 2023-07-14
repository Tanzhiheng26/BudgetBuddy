import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { getAllGroupMembers, addGroupExpense } from '../../firestore';
import DateTimePicker from '@react-native-community/datetimepicker';
import { auth } from '../../firebase';
import uuid from 'react-native-uuid';

function createInputList(groupMembersList, handleDataChange, handleDataValue) {
    let list = [];
    for (let i = 0; i < groupMembersList.length; i++) {
        list.push(<InputItem key={groupMembersList[i].uid}
            memberUsername={groupMembersList[i].username}
            memberUID={groupMembersList[i].uid}
            handleDataChange={handleDataChange}
            handleDataValue={handleDataValue}
        />)
    }
    return list;
}

const InputItem = ({ memberUID, memberUsername, handleDataChange, handleDataValue }) => {
    return (
        < View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flex: 0.70, paddingLeft: 80 }}>
                <Text style={{ fontSize: 18 }}>{memberUsername}: </Text>
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>$: </Text>
                <TextInput
                    style={styles.input}
                    onChangeText={(cost) => handleDataChange(cost, memberUID)}
                    value={handleDataValue(memberUID)}
                    placeholder="0.00"
                    keyboardType="numeric"
                /></View>
        </View >)
}

const EZAddGroupExpense = ({ groupID }) => {
    const [name, setName] = useState('');
    const [cost, setCost] = useState('');
    const [date, setDate] = useState(new Date());
    const [deadline, setDeadline] = useState(new Date());
    const [show, setShow] = useState(false);
    const [showDeadline, setShowDeadline] = useState(false);
    const [groupMembersList, setGroupMembersList] = useState([]);
    const [splitData, setSplitData] = useState([])

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
        const totalCost = parseFloat(cost)
        if (isNaN(totalCost) || cost === '' || totalCost < 0) {
            alert('Please enter a valid cost');
        } else if (name === '') {
            alert('Please enter an expense name');
        } else if (splitData.map(ele => parseFloat(ele.memberCost)).filter(ele => isNaN(ele)).length !== 0) {
            alert('Please enter a valid individual cost \n(enter 0 if input is meant to be empty)');
        } else if (parseFloat(splitData.reduce((total, mem) => total + parseFloat(mem.memberCost), 0).toFixed(2)) !== totalCost) {
            const sum = parseFloat(splitData.reduce((total, mem) => total + parseFloat(mem.memberCost), 0).toFixed(2))
            alert(`Sum of individual costs ($${sum}) ≠ total cost ($${totalCost})`);
        } else {
            const expenseID = uuid.v4()
            const username = groupMembersList.filter((ele) => auth.currentUser.uid === ele.uid)[0].username
            addGroupExpense(groupID, auth.currentUser.uid, expenseID, name, username, totalCost, date, deadline, splitData)
            setName('')
            setCost('')
            setDate(new Date())
        }
    }

    const onSplitEqually = () => {
        const totalCost = parseFloat(cost)
        if (isNaN(totalCost) || cost === '' || totalCost < 0) {
            alert('Please enter a valid cost');
        } else {
            const splitCost = (totalCost / groupMembersList.length).toFixed(2);
            setSplitData(splitData.map(obj => { return { ...obj, memberCost: splitCost } }));
        }
    }

    const onCalculateTotalCost = () => {
        function getCost(obj) {
            if (obj.memberCost === '') {
                return 0;
            }
            else {
                return parseFloat(obj.memberCost);
            }
        }
        setCost(String(splitData.reduce((accumulator, currentValue) => accumulator + getCost(currentValue),
            0,).toFixed(2)));
    }

    useEffect(() => {
        function createInitialStateData(memberList) {
            let list = []
            for (let i = 0; i < memberList.length; i++) {
                list.push({ memberUID: memberList[i].uid, memberUsername: memberList[i].username, memberCost: '' })
            }
            return list;
        }
        async function fetchGroupInfo() {
            try {
                const list = await getAllGroupMembers(groupID);
                setGroupMembersList(list.sort((a, b) => b.role.localeCompare(a.role)))
                setSplitData(createInitialStateData(list))
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        }
        fetchGroupInfo();
    }, [])


    function handleDataChange(cost, memberUID) {
        setSplitData(splitData.map(obj => (obj.memberUID === memberUID) ? { ...obj, memberCost: cost } : obj));
    }

    function handleDataValue(memberUID) {
        if (splitData.length === 0) { return '' } else {
            return splitData.filter(obj => (obj.memberUID === memberUID))[0].memberCost
        }
    }

    return (
        <ScrollView>
            <View style={styles.container}>
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
                        placeholder="Total Cost"
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
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', padding: 10, flexDirection: 'row' }}>
                <TouchableOpacity
                    style={styles.splitEquallybutton}
                    onPress={onSplitEqually}
                >
                    <Text style={styles.splitEquallybuttonText}>Split Equally</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.calculateTotalCostbutton}
                    onPress={onCalculateTotalCost}
                >
                    <Text style={styles.splitEquallybuttonText}>Calculate Total Cost</Text>
                </TouchableOpacity>
            </View>
            <View style={{ paddingTop: 10 }}>
                {createInputList(groupMembersList, handleDataChange, handleDataValue)}
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={onSubmit}
                >
                    <Text style={styles.buttonText}>Add Expense</Text>
                </TouchableOpacity>
            </View>
        </ScrollView >
    )
}

export default EZAddGroupExpense;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 50
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
    buttonContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 100
    },
    button: {
        backgroundColor: '#0782F9',
        width: '40%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 20
    },
    splitEquallybutton: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        width: 100,
        height: 30,
        marginLeft: 10,
        borderRadius: 10,
        marginTop: 10
    },
    calculateTotalCostbutton: {
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2,
        width: 100,
        height: 50,
        marginLeft: 10,
        borderRadius: 10,
        marginTop: 10
    },
    splitEquallybuttonText: {
        fontWeight: '500',
        fontSize: 16
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
})