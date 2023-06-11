import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Header, GroupMembers, GroupOwner } from '../../components/EasySplit/EZGroupMembersList';

import { Icon } from '@rneui/themed';
import { getAllGroupMembers, emailToID, emailToUserName, getGroupInfo, addGroupMember, deleteMember, deleteGroup } from '../../firestore';


const EZViewMembersScreen = ({ groupID }) => {
    const navigation = useNavigation();

    const [groupMembersList, setGroupMembersList] = useState([]);
    const [refresh, setRefresh] = useState(false)
    const [groupName, setGroupName] = useState('');
    const [groupMemberEmail, setGroupMemberEmail] = useState('');
    const [placeholder, setPlaceholder] = useState("Add Group Member's Email")

    const handleDeleteMember = (uid, groupID) => {
        deleteMember(uid, groupID);
        setRefresh(!refresh)
    }

    const onDeleteGroup = async () => {
        //need await so that screen replace only after groupdeleted
        await deleteGroup(groupID)
        navigation.replace('EZHomeScreen')
    }

    useEffect(() => {
        async function fetchGroupInfo() {
            try {
                const info = await getGroupInfo(groupID);
                setGroupName(info.groupName);
                const list = await getAllGroupMembers(groupID);
                setGroupMembersList(list)
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        }
        fetchGroupInfo();
    }, [refresh])

    async function fetchUIDAndUsernameFromEmail() {
        try {
            const uid = await emailToID(groupMemberEmail);
            const username = await emailToUserName(groupMemberEmail);
            return { uid: uid, username: username }
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }

    const onSubmit = async () => {
        if (groupMemberEmail === '') {
            return;
        }
        try {
            const result = await fetchUIDAndUsernameFromEmail();
            await addGroupMember(result.uid, groupID, groupName, groupMemberEmail, result.username)
            setGroupMemberEmail('')
        } catch (error) {
            console.log(error)
            setGroupMemberEmail('')
            setPlaceholder('Please enter a valid email')
        } finally {
            setRefresh(!refresh)
        }
    }

    return (
        <View>
            <ScrollView >

                <View style={{ marginTop: 20, marginBottom: 30, flex: 1 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.headerText}>Owner</Text>
                    </View>
                    <Header role='owner' />

                    <GroupOwner groupMembersList={groupMembersList} />
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.headerText}>Members</Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <TextInput
                            style={styles.input}
                            onChangeText={setGroupMemberEmail}
                            value={groupMemberEmail}
                            placeholder={placeholder}
                        />
                        <View style={{ padding: 10 }}>
                            <Icon type='antdesign' name='adduser' onPress={onSubmit} />
                        </View>
                    </View>
                    <GroupMembers groupMembersList={groupMembersList} groupID={groupID} handleDeleteMember={handleDeleteMember} />
                </View >

                <View style={{ alignItems: 'center' }} >
                    <TouchableOpacity
                        style={styles.button}
                        onPress={onDeleteGroup}
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
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },

    headerText: {
        fontSize: 25,
        marginTop: 20
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