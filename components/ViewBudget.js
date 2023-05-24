import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/themed';

const ViewBudget = ({budget, handleEdit}) => {
  return (
    <View style={styles.container}>
        <Text>Budget: ${budget}</Text>
        <Icon name='edit' onPress={ handleEdit } style={styles.icon}/>
    </View>
  )
}

export default ViewBudget

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
    }, 
    icon: {
        marginLeft: 5
    }
})