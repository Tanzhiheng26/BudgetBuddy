import { StyleSheet, View } from 'react-native'
import React from 'react'
import EZGroupItem from './EZGroupItem'

const EZGroupList = ({ groupList }) => {
    return (
        <View style={styles.container}>
            {groupList.map(item => <EZGroupItem key={item.groupID} groupName={item.groupName} groupID={item.groupID} />)}
        </View>
    )
}

export default EZGroupList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    buttonText: {
        color: 'black',
        fontSize: 20
    },
}
)
