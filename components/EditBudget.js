import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { Icon } from '@rneui/themed'

const EditBudget = ({ budget, handleSave }) => {
  const [value, setValue] = useState(budget);
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Budget: $</Text>
      <TextInput
        style={styles.input}
        onChangeText={setValue}
        value={value.toString()}
        placeholder="New Budget"
        keyboardType="numeric"
      />
      <Icon name='check' onPress={() => handleSave(value)}  size={24} style={styles.icon} />
    </View>
  )
}

export default EditBudget

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  input: {
    backgroundColor: 'white'
  },
  icon: {
    marginLeft: 5
  },
  text: {
    fontSize: 20,
  }
})