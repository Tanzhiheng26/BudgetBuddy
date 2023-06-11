import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native'
import { Icon } from '@rneui/themed';
import { getAllGroupMembers, emailToID, emailToUserName, getGroupInfo, addGroupMember, deleteMember } from '../../firestore';

const EZGroupMembersList = ({ groupID }) => {
    const [groupMembersList, setGroupMembersList] = useState([]);

    const [refresh, setRefresh] = useState(false)
    const [groupName, setGroupName] = useState('');
    const [groupMemberEmail, setGroupMemberEmail] = useState('');
    const [groupMemberUID, setGroupMemberUID] = useState('');
    const [groupMemberUsername, setGroupMemberUsername] = useState('');

    const handleDeleteMember = (uid, groupID) => {
        deleteMember(uid, groupID);
        setRefresh(!refresh)
    }

    const GroupOwner = ({ groupMembersList }) => {
        const groupOwnerEmail = groupMembersList.filter(member => member.role === "owner").map(owner => owner.email);
        const groupOwnerUsername = groupMembersList.filter(member => member.role === "owner").map(owner => owner.username);
        return (
            <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
                <View style={{ flex: 0.4, alignItems: 'center' }}>
                    <Text style={styles.emailText}>{groupOwnerUsername[0]}</Text>
                </View>
                <View style={{ flex: 0.6, alignItems: 'center' }}>
                    <Text style={styles.emailText}>{groupOwnerEmail[0]}</Text>
                </View>
            </View>
        )
    }

    const Header = ({ role }) => {

        return (role === 'owner') ? (
            <View style={{ flexDirection: 'row', padding: 10 }}>
                <View style={{ flex: 0.4, alignItems: 'center' }}>
                    <Text style={{ fontSize: 20 }}>Username</Text>
                </View>
                <View style={{ flex: 0.6, alignItems: 'center' }}>
                    <Text style={{ fontSize: 20 }}>Email</Text>
                </View>
            </View>
        ) : (
            <View style={{ flexDirection: 'row', padding: 10 }}>
                <View style={{ flex: 0.3, alignItems: 'center' }}>
                    <Text style={{ fontSize: 20 }}>Username</Text>
                </View>
                <View style={{ flex: 0.5, alignItems: 'center' }}>
                    <Text style={{ fontSize: 20 }}>Email</Text>
                </View>
            </View>
        )
    }

    const EmailItem = ({ member, groupID }) => {
        return (
            <View style={{ flexDirection: 'row' }}>

                <View style={{ flex: 0.4, alignItems: 'center' }}>
                    <Text style={styles.emailText}>{member.username}</Text>
                </View>
                <View style={{ flex: 0.6, alignItems: 'center', justifyContent: 'center' }}>
                    <Text style={styles.emailText}>{member.email}</Text>
                </View>
                <View style={{ flex: 0.3, alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Icon type='antdesign' name='deleteuser' onPress={() => handleDeleteMember(member.uid, groupID)} />
                </View>
            </View>
        )
    }

    const NoMemberAdded = () => {
        return (
            <View style={{ alignItems: 'center', paddingTop: 10 }}>
                <Text style={styles.emailText}>--- No Group Members Added ---</Text>
            </View>
        )
    }

    function emailList({ groupMembers }, { groupID }) {
        let list = [];
        if (groupMembers.length === 0) {
            list.push(<NoMemberAdded key={'0'} />)
        } else {
            list.push(<Header key={'0'} role='member' />)
            for (let i = 0; i < groupMembers.length; i++) {
                list.push(<EmailItem key={groupMembers[i].email} member={groupMembers[i]} groupID={groupID} />)
            }
        }
        return list;
    }

    const GroupMembers = ({ groupMembersList, groupID }) => {

        const groupMembers = groupMembersList.filter(member => member.role === "member");

        return (
            <View>
                {emailList({ groupMembers }, { groupID })}
            </View>
        )
    }


    useEffect(() => {
        async function fetchGroupInfo() {
            try {
                const info = await getGroupInfo(groupID);
                setGroupName(info.groupName);
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        }

        async function fetchGroupMembersList() {
            try {
                const list = await getAllGroupMembers(groupID);

                setGroupMembersList(list)
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        }
        fetchGroupInfo();
        fetchGroupMembersList();
    }, [refresh])

    async function fetchUIDAndUsernameFromEmail() {
        try {
            const uid = await emailToID(groupMemberEmail);
            const username = await emailToUserName(groupMemberEmail);
            setGroupMemberUID(uid)
            setGroupMemberUsername(username)
        } catch (error) {
            console.error('Failed to fetch data:', error);
        }
    }
    fetchUIDAndUsernameFromEmail();


    const onSubmit = async () => {
        if (groupMemberEmail === '') {
            return;
        }
        addGroupMember(groupMemberUID, groupID, groupName, groupMemberEmail, groupMemberUsername)
        setGroupMemberEmail('')
        setRefresh(!refresh)
    }




    return (
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
                    placeholder="Add Group Member's Email"
                />
                <View style={{ padding: 10 }}>
                    <Icon type='antdesign' name='adduser' onPress={onSubmit} />
                </View>
            </View>
            <GroupMembers groupMembersList={groupMembersList} groupID={groupID} />
        </View >


    )
}

export default EZGroupMembersList;

const styles = StyleSheet.create({
    headerRow: {
        marginLeft: 20,
        marginRight: 20,
        marginBottom: 10,
        marginTop: 10,
        borderBottomWidth: 2
    },
    headerText: {
        fontSize: 25,
        marginTop: 20
    },

    row: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,
    },
    emailText: {
        fontSize: 20,
        marginTop: 10

    },
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