import { StyleSheet, View, Text } from 'react-native'
import React, { useContext } from 'react'

import EZGroupExpenseItem from './EZGroupExpenseItem'


const ViewGroupHeader = ({ title }) => {
    return (
        <View style={styles.headerRow}>
            <Text style={styles.headerText}>{title}</Text>
        </View >
    )
}

const NoGroupExpenseView = () => {
    return (
        <View style={styles.noExpenseViewContainer}>
            <Text style={{ fontSize: 18 }}>--No Group Expense Item Added--</Text>
        </View >
    )
}

const ListTitle = ({ title1, title2 }) => {
    return (
        <View style={styles.row} >
            <View style={{ flex: 5, marginLeft: 20 }}>
                <Text style={styles.text}>{title1} </Text>
            </View>

            <View style={{ flex: 3 }}>
                <Text style={styles.text}>{title2}</Text>
            </View>
        </View>

    )
}

const EZGroupExpenseList = () => {

    const groupExpenseList = [{
        id: 'expenseid123', uid: 'payerid123', name: 'food', cost: 100,
        date: new Date("2022-03-25"), deadline: new Date("2022-03-25"), splitData: { 'uid123': 50, 'uid321': 50 }
    }]

    function createGroupExpenseItem(id, uid, name, cost, date, deadline) {

        return <EZGroupExpenseItem key={id}
            id={id}
            uid={uid}
            name={name}
            cost={cost}
            date={date.toLocaleDateString()}
            deadline={deadline.toLocaleDateString()}

        />
    }



    function groupByDate() {

        groupExpenseList.sort((a, b) => b.date - a.date)
        let groupExLength = groupExpenseList.length;
        let list = [];
        if (groupExLength != 0) {
            for (let i = 0; i < groupExLength; i++) {
                let expense = groupExpenseList[i]
                //check if the date is the same as previous
                if (i == 0 || expense.date.toLocaleDateString() != groupExpenseList[i - 1].date.toLocaleDateString()) {
                    list.push(<ViewGroupHeader key={expense.date.toLocaleDateString()} title={expense.date.toLocaleDateString()} />)
                }

                list.push(createGroupExpenseItem(expense.id, expense.uid, expense.name, expense.cost, expense.date, expense.deadline
                ))
            }
        } else (
            list.push(<NoGroupExpenseView key="0" />)
        )
        return list;
    }

    return (
        <View>
            <ListTitle title1="Name/PaidBy" title2="Deadline" />
            {groupByDate()}
        </View>
    )

}

export default EZGroupExpenseList

const styles = StyleSheet.create({
    headerRow: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        marginTop: 10,
        borderBottomWidth: 2
    },
    headerText: {
        fontSize: 18
    },
    noExpenseViewContainer: {
        alignItems: 'center',
        marginTop: 20
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    text: {
        fontSize: 20,
        fontWeight: 'bold',
    },
})