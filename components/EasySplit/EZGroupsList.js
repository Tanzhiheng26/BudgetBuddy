import { StyleSheet, Text, View, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import React, { useState, useEffect } from 'react'
import EZGroupItem from './EZGroupItem'
import { getGroups } from '../../firestore';
import { auth } from '../../firebase'

const EZGroupList = () => {
    const [groupList, setGroupList] = useState([])

    useEffect(() => {
        async function fetchUserGroups() {
            try {
                const groups = await getGroups(auth.currentUser.uid);
                setGroupList(groups);

            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        }
        fetchUserGroups();
    }, [])

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
