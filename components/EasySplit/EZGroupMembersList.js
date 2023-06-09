import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { Icon } from '@rneui/themed';
import { getAllGroupMembers, deleteMember } from '../../firestore';


const GroupOwnerEmail = ({ groupMembersList }) => {

    const groupOwnerEmail = groupMembersList.filter(member => member.role === "owner").map(owner => owner.email);

    return (
        <View>
            <Text style={styles.emailText}>{groupOwnerEmail[0]}</Text>
        </View>
    )
}

function removeMember(uid, groupID) {
    deleteMember(uid, groupID)
}

const EmailItem = ({ member, groupID }) => {

    return (
        <View style={{ flexDirection: 'row' }}>
            <Text style={styles.emailText}>{member.email}</Text>

        </View>
    )
}

const NoMemberAdded = () => {
    return (
        <View>
            <Text style={styles.emailText}>--- No Group Members Added ---</Text>
        </View>
    )
}

function emailList({ groupMembers }, { groupID }) {

    let list = [];
    if (groupMembers.length === 0) {
        list.push(<NoMemberAdded key={'0'} />)
    } else {
        for (let i = 0; i < groupMembers.length; i++) {
            list.push(<EmailItem key={groupMembers[i].email} member={groupMembers[i]} groupID={groupID} />)
        }
    }
    return list;
}

const GroupMembersEmail = ({ groupMembersList, groupID }) => {

    const groupMembers = groupMembersList.filter(member => member.role === "member");

    return (
        <View>
            {emailList({ groupMembers }, { groupID })}
        </View>
    )
}


const EZGroupMembersList = ({ groupID }) => {
    const [groupMembersList, setGroupMembersList] = useState([]);

    useEffect(() => {
        async function fetchGroupMembersList() {
            try {
                const list = await getAllGroupMembers(groupID);

                setGroupMembersList(list)
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        }
        fetchGroupMembersList();
    }, [])


    return (
        <ScrollView>
            <View style={{ alignItems: 'center', marginTop: 20 }}>
                <Text style={styles.headerText}>Owner</Text>

                <GroupOwnerEmail groupMembersList={groupMembersList} />

                <Text style={styles.headerText}>Members</Text>
                <GroupMembersEmail groupMembersList={groupMembersList} groupID={groupID} />

            </View>
        </ScrollView>
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
})