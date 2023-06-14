import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'

import { Icon } from '@rneui/themed';
import { auth } from '../../firebase'


const EZGroupExpenseItem = ({ id, uid, name, username, cost, date, deadline, splitData }) => {

    function getCostDisplay() {
        let total = 0;
        if (auth.currentUser.uid === uid) {

            for (const indivCost of splitData.filter((ele) => ele.memberUID !== uid)) {
                total += parseFloat(indivCost.memberCost)
            }
            return total;
        } else {
            return parseFloat(splitData.filter((ele) => ele.memberUID === uid)[0].memberCost)
        }

    }
    const CostDisplay = () => {
        return (auth.currentUser.uid === uid) ? (
            <Text style={styles.text}>You lent ${getCostDisplay()}</Text>
        ) : (
            <Text style={styles.text}>You borrowed ${getCostDisplay()}</Text>
        )
    }



    return (
        <View>
            <View style={styles.row}>
                <View style={{ flex: 0.5, marginLeft: 20 }}>
                    <Text style={styles.text}>{name} </Text>
                    <Text style={styles.text}>{username} paid ${cost}</Text>
                </View>

                <View style={{ flex: 0.5 }}>
                    <Text style={styles.text}>{deadline}</Text>
                    <CostDisplay />
                </View>

            </View>



        </View>
    )
}

export default EZGroupExpenseItem

const styles = StyleSheet.create({
    row: {
        flex: 1,
        flexDirection: 'row',
        marginBottom: 10
    },
    text: {
        fontSize: 18,
    },
})