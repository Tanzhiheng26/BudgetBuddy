import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import EZGroupItem from './EZGroupItem'
import { getGroups } from '../../firestore';
import { auth } from '../../firebase'

const EZGroupList = ({ groupList }) => {


    return (
        <View style={styles.container}>
            {groupList.map(item => <EZGroupItem key={item.groupID} groupName={item.groupName} groupID={item.groupID} />)}
        </View>
    )
}

export default EZGroupList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonText: {
        color: 'black',
        fontSize: 20
    },
}
)
