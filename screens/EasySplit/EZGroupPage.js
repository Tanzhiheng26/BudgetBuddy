import React, { useState, useEffect, useReducer, useContext } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { getGroupInfo, getAllGroupMembers, getAllGroupExpenses } from '../../firestore';
import { auth } from '../../firebase';
import EZGroupExpenseList from '../../components/EasySplit/EZGroupExpenseList';



const EZGroupPage = ({ groupID }) => {


    const [groupInfo, setGroupInfo] = useState({})
    const [groupExpenses, setGroupExpenses] = useState([])

    useEffect(() => {
        async function fetchGroupInfo() {
            try {
                const info = await getGroupInfo(groupID);
                setGroupInfo(info);
                const expenses = await getAllGroupExpenses(groupID);

                setGroupExpenses(expenses)

            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        }
        fetchGroupInfo();
    }, [])

    // function isOwner() {
    //     return (groupInfo.ownerUID == auth.currentUser.uid)
    // }

    return (
        <View>
            <ScrollView>
                <View style={{ alignItems: 'center', marginTop: 20, flex: 1 }}>
                    <Text style={{ fontSize: 20, fontWeight: 600 }}>{groupInfo.groupName}</Text>
                    {/* {(isOwner()) ? <Text style={{ fontSize: 20 }}>Role: Owner</Text> :
                        <Text style={{ fontSize: 20 }}>Role: Member</Text>} */}
                </View>
                <EZGroupExpenseList groupExpenses={groupExpenses} />
            </ScrollView>
        </View>
    )
}

export default EZGroupPage;

const styles = StyleSheet.create({})