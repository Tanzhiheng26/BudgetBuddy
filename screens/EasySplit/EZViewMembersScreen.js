import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView } from 'react-native'


import EZGroupMembersList from '../../components/EasySplit/EZGroupMembersList';


const EZViewMembersScreen = ({ groupID }) => {

    return (
        <ScrollView>

            <View style={styles.container}>
                <EZGroupMembersList groupID={groupID} />
            </View>
        </ScrollView>
    )
}

export default EZViewMembersScreen;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',

    }
}
)