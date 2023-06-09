import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'

import { Icon } from '@rneui/themed';
import { auth } from '../../firebase'


const EZGroupExpenseItem = ({ id, uid, name, cost, date, deadline }) => {


    function dataManager() {

        list = []
        for (let [key, value] of splitData) {
            list.push(() => {
                return (
                    <View>
                        <Text>
                            {key} owe ${value}
                        </Text>
                    </View>)
            }
            )
        } return list
    }


    return (
        <View>
            <View style={styles.row}>
                <View style={{ flex: 5, marginLeft: 20 }}>
                    <Text style={styles.text}>{name} </Text>


                    <Text style={styles.text}>{uid} paid ${cost}</Text>
                </View>

                <View style={{ flex: 3, justifyContent: 'center' }}>
                    <Text style={styles.text}>{deadline}</Text>
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