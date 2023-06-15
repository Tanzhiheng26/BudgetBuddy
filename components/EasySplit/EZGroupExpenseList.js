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
            <View style={{ flex: 1, marginLeft: 20 }}>
                <Text style={styles.text}>{title1} </Text>
            </View>

            <View style={{ flex: 1 }}>
                <Text style={styles.text}>{title2}</Text>
            </View>
        </View>

    )
}

const EZGroupExpenseList = ({ groupExpenses }) => {


    function createGroupExpenseItem(expense) {

        return <EZGroupExpenseItem key={expense.expenseID}
            id={expense.expenseID}
            uid={expense.uid}
            name={expense.name}
            username={expense.username}
            cost={expense.cost}
            date={expense.date.toLocaleDateString()}
            deadline={expense.deadline.toLocaleDateString()}
            splitData={expense.splitData}

        />
    }



    function groupByDate() {
        groupExpenses.sort((a, b) => {
            a.date.setHours(0, 0, 0, 0)
            b.date.setHours(0, 0, 0, 0)
            return b.date - a.date == 0 ? a.deadline - b.deadline : b.date - a.date;
        })
        let groupExLength = groupExpenses.length;
        let list = [];
        if (groupExLength != 0) {
            for (let i = 0; i < groupExLength; i++) {
                let expense = groupExpenses[i]
                //check if the date is the same as previous
                if (i == 0 || expense.date.toLocaleDateString() != groupExpenses[i - 1].date.toLocaleDateString()) {
                    list.push(<ViewGroupHeader key={expense.date.toLocaleDateString()} title={expense.date.toLocaleDateString()} />)
                }

                list.push(createGroupExpenseItem(expense))
            }
        } else (
            list.push(<NoGroupExpenseView key="0" />)
        )
        return list;
    }

    return (
        <View>
            <ListTitle title1="Expense" title2="Deadline" />
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
        fontWeight: '600',
    },
})