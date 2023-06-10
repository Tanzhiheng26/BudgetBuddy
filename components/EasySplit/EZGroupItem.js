
import { StyleSheet, Text, View, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';

const EZGroupItem = ({ groupName, groupID }) => {
    const navigation = useNavigation();


    return (
        <View style={{ alignItems: 'center', marginTop: 20 }}>
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Group Page Drawer', { groupID })}>

                <Text style={styles.buttonText}>{groupName} </Text>

            </TouchableOpacity>
        </View >
    )
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: '#white',
        borderWidth: 5,
        height: 80,
        width: 270,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
        marginBottom: 10,

    },
    buttonText: {
        color: 'black',

        fontSize: 20
    },
}
)

export default EZGroupItem;










