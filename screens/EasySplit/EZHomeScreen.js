import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native'
import EZGroupList from '../../components/EasySplit/EZGroupsList';
import { getGroups } from '../../firestore';
import { Icon } from '@rneui/base';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { auth } from '../../firebase';


const EZHomeScreen = () => {
    const isFocused = useIsFocused()
    const navigation = useNavigation();
    const [groupList, setGroupList] = useState([])

    useEffect(() => {
        if (isFocused) {
            async function fetchUserGroups() {
                try {
                    const groups = await getGroups(auth.currentUser.uid);
                    setGroupList(groups);
                } catch (error) {
                    console.error('Failed to fetch data:', error);
                }
            }
            fetchUserGroups();
        }
    }, [isFocused])

    return (
        <ScrollView>
            <View style={{ alignItems: 'center', marginTop: 20, flex: 1 }}>
                <Text style={{ fontSize: 25 }}>My Groups</Text>
                <EZGroupList groupList={groupList} />
                <View>
                    <TouchableOpacity
                        style={styles.addGroupButton}
                        onPress={() => navigation.navigate("Add New Group")}>
                        <Icon name='add' size={50} />
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default EZHomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    addGroupButton: {
        backgroundColor: '#white',
        borderWidth: 5,
        height: 80,
        width: 270,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 30,
        marginBottom: 150,
        borderStyle: 'dotted'
    }
})