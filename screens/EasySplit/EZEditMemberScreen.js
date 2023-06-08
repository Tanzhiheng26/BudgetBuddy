import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';

import { emailToID, addGroupMember, getGroupInfo } from '../../firestore'


const EZEditMemberScreen = ({ groupID }) => {
    [groupName, setGroupName] = useState('');
    [groupMemberEmail, setGroupMemberEmail] = useState('');
    [groupMemberUID, setGroupMemberUID] = useState('');


    useEffect(() => {
        async function fetchGroupInfo() {
            try {
                const info = await getGroupInfo(groupID);
                setGroupName(info.groupName);

            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        }
        fetchGroupInfo();
    }, [])

    async function fetchUIDFromEmail() {
        try {
            const uid = await emailToID(groupMemberEmail);
            setGroupMemberUID(uid)
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }
    fetchUIDFromEmail();


    const onSubmit = async () => {
        if (groupMemberEmail === '') {
            return;
        }
        addGroupMember(groupMemberUID, groupID, groupName, groupMemberEmail)
        setGroupMemberEmail('')
    }


    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.inputContainer}>


                <TextInput
                    style={styles.input}
                    onChangeText={setGroupMemberEmail}
                    value={groupMemberEmail}
                    placeholder="Group Member Email"
                />
            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={onSubmit}
            >
                <Text style={styles.buttonText}>Add Member</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>

    )
}

export default EZEditMemberScreen;

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
})