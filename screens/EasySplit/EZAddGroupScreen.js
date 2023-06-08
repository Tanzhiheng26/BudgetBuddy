import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createGroup } from '../../firestore';
import { auth } from '../../firebase';
import uuid from 'react-native-uuid';



const EZAddGroupScreen = () => {
    [groupName, setGroupName] = useState('');


    const navigation = useNavigation();


    const onSubmit = async () => {
        if (groupName === '') {
            return;
        }
        groupID = uuid.v4()
        createGroup(auth.currentUser?.uid, groupID, groupName, auth.currentUser.email);




        setGroupName('')
        navigation.replace('EZHomeScreen')


    }


    return (
        <KeyboardAvoidingView style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={setGroupName}
                    value={groupName}
                    placeholder="Group Name"
                />


            </View>

            <TouchableOpacity
                style={styles.button}
                onPress={onSubmit}
            >
                <Text style={styles.buttonText}>Add Group</Text>
            </TouchableOpacity>
        </KeyboardAvoidingView>

    )
}

export default EZAddGroupScreen;

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