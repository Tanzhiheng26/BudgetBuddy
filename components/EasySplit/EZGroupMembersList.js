import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from 'react-native'
import { Icon } from '@rneui/themed';

export const GroupOwner = ({ groupMembersList }) => {
    const groupOwnerEmail = groupMembersList.filter(member => member.role === "owner").map(owner => owner.email);
    const groupOwnerUsername = groupMembersList.filter(member => member.role === "owner").map(owner => owner.username);
    return (
        <View style={{ flexDirection: 'row', paddingHorizontal: 10 }}>
            <View style={styles.usernameContainer}>
                <Text style={styles.emailText}>{groupOwnerUsername[0]}</Text>
            </View>
            <View style={styles.emailContainer}>
                <Text style={styles.emailText}>{groupOwnerEmail[0]}</Text>
            </View>
        </View>
    )
}

export const Header = ({ role }) => {
    return (role === 'owner') ? (
        <View style={{ flexDirection: 'row', padding: 10 }}>
            <View style={styles.usernameContainer}>
                <Text style={styles.userNameEmailTitle}>Username</Text>
            </View>
            <View style={styles.emailContainer}>
                <Text style={styles.userNameEmailTitle}>Email</Text>
            </View>
        </View>
    ) : (
        <View style={{ flexDirection: 'row', padding: 10 }}>
            <View style={{ flex: 0.4, alignItems: 'center' }}>
                <Text style={styles.userNameEmailTitle}>Username</Text>
            </View>
            <View style={{ flex: 0.5, alignItems: 'center' }}>
                <Text style={styles.userNameEmailTitle}>Email</Text>
            </View>
        </View>
    )
}

export const EmailItem = ({ member, groupID, handleDeleteMember }) => {
    return (
        <View style={{ flexDirection: 'row', paddingRight: 10 }}>

            <View style={{ flex: 0.4, alignItems: 'center' }}>
                <Text style={styles.emailText}>{member.username}</Text>
            </View>
            <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.emailText}>{member.email}</Text>
            </View>
            <View style={{ flex: 0.1, alignItems: 'center', justifyContent: 'flex-end' }}>
                <Icon type='antdesign' name='deleteuser' onPress={() => handleDeleteMember(member.uid, groupID)} />
            </View>
        </View>
    )
}

export const EmailItemNoDelete = ({ member }) => {
    return (
        <View style={{ flexDirection: 'row', paddingRight: 10 }}>
            <View style={{ flex: 0.4, alignItems: 'center' }}>
                <Text style={styles.emailText}>{member.username}</Text>
            </View>
            <View style={{ flex: 0.5, alignItems: 'center', justifyContent: 'center' }}>
                <Text style={styles.emailText}>{member.email}</Text>
            </View>
        </View>
    )
}

export const NoMemberAdded = () => {
    return (
        <View style={{ alignItems: 'center', paddingTop: 10 }}>
            <Text style={styles.emailText}>--- No Group Members Added ---</Text>
        </View>
    )
}

export function emailList({ groupMembers }, { groupID }, handleDeleteMember) {
    let list = [];
    if (groupMembers.length === 0) {
        list.push(<NoMemberAdded key={'0'} />)
    } else {
        list.push(<Header key={'0'} role='member' />)
        for (let i = 0; i < groupMembers.length; i++) {
            list.push(<EmailItem key={groupMembers[i].email} member={groupMembers[i]} groupID={groupID} handleDeleteMember={handleDeleteMember} />)
        }
    }
    return list;
}

export function emailListNoDelete({ groupMembers }) {
    let list = [];
    if (groupMembers.length === 0) {
        list.push(<NoMemberAdded key={'0'} />)
    } else {
        list.push(<Header key={'0'} role='member' />)
        for (let i = 0; i < groupMembers.length; i++) {
            list.push(<EmailItemNoDelete key={groupMembers[i].email} member={groupMembers[i]} />)
        }
    }
    return list;
}

export const GroupMembers = ({ groupMembersList, groupID, isOwner, handleDeleteMember }) => {
    const groupMembers = groupMembersList.filter(member => member.role === "member");
    return (
        <View>
            {isOwner
            ? emailList({ groupMembers }, { groupID }, handleDeleteMember)
            : emailListNoDelete({ groupMembers})}
        </View>
    )
}

const styles = StyleSheet.create({

    emailText: {
        fontSize: 20,
        marginTop: 10

    },
    userNameEmailTitle: {
        fontSize: 20
    },
    usernameContainer: {
        flex: 0.4,
        alignItems: 'center'
    },
    emailContainer: {
        flex: 0.6,
        alignItems: 'center'
    }

}
)



