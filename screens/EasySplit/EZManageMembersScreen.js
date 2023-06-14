import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { Header, GroupMembers, GroupOwner } from '../../components/EasySplit/EZGroupMembersList';
import { auth } from '../../firebase';
import { Icon } from '@rneui/themed';
import { getAllGroupMembers, emailToID, emailToUserName, getGroupInfo, addGroupMember, deleteMember, deleteGroup } from '../../firestore';


const EZManageMembersScreen = ({ groupID }) => {
    const navigation = useNavigation();

    const [groupMembersList, setGroupMembersList] = useState([]);
    const [refresh, setRefresh] = useState(false)
    const [groupName, setGroupName] = useState('');
    const [groupMemberEmail, setGroupMemberEmail] = useState('');
    const [groupOwner, setGroupOwner] = useState('');

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
                setGroupOwner(info.ownerUID);
                const list = await getAllGroupMembers(groupID);
                setGroupMembersList(list)
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        }
        fetchGroupInfo();
    }, [refresh])

    function isOwner() {
        return (groupOwner === auth.currentUser.uid)
    }

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
        // Prevent the owner from changing into a member
        if (groupMemberEmail === auth.currentUser.email) {
            alert('You cannot enter your own email');
            setGroupMemberEmail('')
            return;
        }
        try {
            const result = await fetchUIDAndUsernameFromEmail();
            if (result.uid === undefined) {

            } else {
                await addGroupMember(result.uid, groupID, groupName, groupMemberEmail, result.username);
                setRefresh(!refresh);
            }
            setGroupMemberEmail('')
        } catch (error) {
            console.error(error)
            alert('Please enter a valid email')
        }
    }

    return (
        <View>
            <ScrollView >

                <View style={{ marginTop: 20, marginBottom: 30, flex: 1 }}>
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.headerText}>Owner</Text>
                    </View>
                    <Header role='owner' numberOfHeaders={'2'} />

                    <GroupOwner groupMembersList={groupMembersList} />
                    <View style={{ alignItems: 'center' }}>
                        <Text style={styles.headerText}>Members</Text>
                    </View>
                    {isOwner()
                        ?
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                            <TextInput
                                style={styles.input}
                                onChangeText={setGroupMemberEmail}
                                value={groupMemberEmail}
                                placeholder={"Add Group Member's Email"}
                            />
                            <View style={{ padding: 10 }}>
                                <Icon type='antdesign' name='adduser' onPress={onSubmit} />
                            </View>
                        </View>
                        : <></>
                    }
                    <GroupMembers groupMembersList={groupMembersList} groupID={groupID} isOwner={isOwner()} handleDeleteMember={handleDeleteMember} />
                </View >

                <View style={{ alignItems: 'center' }} >
                    {isOwner() ?
                        <TouchableOpacity
                            style={styles.button}
                            onPress={onDeleteGroup}
                        >
                            <Text style={styles.buttonText}>Delete Group</Text>
                        </TouchableOpacity>
                        :
                        //can add leave group button for members here
                        <></>
                    }
                </View>
            </ScrollView >
        </View>
    )
}

export default EZManageMembersScreen;

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