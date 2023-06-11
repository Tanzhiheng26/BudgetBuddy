import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import EZGroupMembersList from '../../components/EasySplit/EZGroupMembersList';
import { deleteGroup } from '../../firestore';


const EZViewMembersScreen = ({ groupID }) => {


    const navigation = useNavigation();

    const onDelete = async () => {
        await deleteGroup(groupID)
        navigation.replace('EZHomeScreen')
    }

    return (
        <View>
            <ScrollView >
                <View style={styles.container}>
                    <EZGroupMembersList groupID={groupID} />
                </View>
                <View style={{ alignItems: 'center' }} >
                    <TouchableOpacity
                        style={styles.button}
                        onPress={onDelete}
                    >
                        <Text style={styles.buttonText}>Delete Group</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView >
        </View>


    )
}

export default EZViewMembersScreen;

const styles = StyleSheet.create({
    container: {
    },
    button: {
        backgroundColor: '#0782F9',
        width: '60%',
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
}
)