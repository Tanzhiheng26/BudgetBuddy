import { StyleSheet, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import ViewBudget from './ViewBudget'
import EditBudget from './EditBudget'
import { editBudget } from '../firestore'
import { auth } from '../firebase'

const Budget = () => {
  const { budget, dispatch } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = () => {
		setIsEditing(true);
	};
  const handleSave = (value) => {
    dispatch({
      type: 'SET_BUDGET',
      payload: value,
    });
    setIsEditing(false);
    editBudget(auth.currentUser?.uid, value);
	};
  return (
    <View style={styles.container}>
      {isEditing ? <EditBudget budget={budget} handleSave={handleSave}/> 
      : <ViewBudget budget={budget} handleEdit={handleEdit}/>}
    </View>
  )
}

export default Budget

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ABB2B9',
        width: '100%',
        padding: 15,
        alignItems: 'center'
    },
})