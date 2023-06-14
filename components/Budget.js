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
    if (value  === "") {
      alert("Please enter a budget.")
      return;
    }
    let newBudget = parseFloat(value)
    if (newBudget < 0) {
      alert("Budget cannot be negative.")
      return;
    }
    dispatch({
      type: 'SET_BUDGET',
      payload: newBudget,
    });
    setIsEditing(false);
    editBudget(auth.currentUser?.uid, newBudget);
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
        backgroundColor: '#F9E79F',
        width: '100%',
        padding: 15,
        alignItems: 'center'
    },
})