import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native'
import { getGroupInfo, getAllGroupExpenses } from '../../firestore';
import EZGroupExpenseList from '../../components/EasySplit/EZGroupExpenseList';

const EZGroupPage = ({ groupID }) => {
    const [groupInfo, setGroupInfo] = useState({})
    const [groupExpenses, setGroupExpenses] = useState([])
    const [refresh, setRefresh] = useState(false)

    const onRefresh = () => {
        setRefresh(!refresh)
    }

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
    }, [refresh])

    return (
        <View>
            <ScrollView >
                <View style={{ alignItems: 'center', marginTop: 20, flex: 1 }}>
                    <Text style={{ fontSize: 23, fontWeight: 600 }}>{groupInfo.groupName}</Text>
                </View>
                <EZGroupExpenseList groupExpenses={groupExpenses} groupID={groupID} onRefresh={onRefresh} />
            </ScrollView>
        </View>
    )
}

export default EZGroupPage;

const styles = StyleSheet.create({})