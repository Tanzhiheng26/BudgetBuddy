import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native'
import { getGroupInfo } from '../../firestore';
import { auth } from '../../firebase';
import EZGroupExpenseList from '../../components/EasySplit/EZGroupExpenseList';


const EZGroupPage = ({ groupID }) => {


    const [groupInfo, setGroupInfo] = useState(new Map())

    useEffect(() => {
        async function fetchGroupInfo() {
            try {
                const info = await getGroupInfo(groupID);
                setGroupInfo(info);

            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        }
        fetchGroupInfo();
    }, [])

    function isOwner() {
        return (groupInfo.ownerUID == auth.currentUser.uid)
    }

    return (
        <ScrollView>
            <View style={{ alignItems: 'center', marginTop: 20, flex: 1 }}>
                <Text style={{ fontSize: 20 }}>Group ID: {groupID}</Text>
                <Text style={{ fontSize: 20 }}>Group Name: {groupInfo.groupName}</Text>
                {(isOwner()) ? <Text style={{ fontSize: 20 }}>Role: Owner</Text> :
                    <Text style={{ fontSize: 20 }}>Role: Member</Text>}


            </View>

            <View>
                <EZGroupExpenseList groupID={groupID} />
            </View>
        </ScrollView>



    )
}

export default EZGroupPage;

const styles = StyleSheet.create({

}
)