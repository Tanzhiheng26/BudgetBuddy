import { KeyboardAvoidingView, StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext';
import { addExpense } from '../firestore';
import { auth } from '../firebase'
import uuid from 'react-native-uuid';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SelectList } from 'react-native-dropdown-select-list'

const AddExpense = () => {
  const { dispatch } = useContext(AppContext);
  const [name, setName] = useState('');
  const [cost, setCost] = useState('');

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  //Date
  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setShow(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  //category
  const [category, setCategory] = useState('');
  const data = [
    { key: '1', value: 'Transport' },
    { key: '2', value: 'Food' },
  ]


  const onSubmit = async () => {
    if (name === '' || cost === '') {
      return;
    }

    const expense = {
      id: uuid.v4(),
      name: name,
      cost: parseInt(cost),
      date: date.toISOString("en-GB"),
      category: category
    }

    dispatch({
      type: "ADD_EXPENSE",
      payload: expense,
    })

    addExpense(auth.currentUser?.uid, expense.id, expense.name, expense.cost, expense.date, expense.category);

    setName('')
    setCost('')

  }

  return (
    <KeyboardAvoidingView style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={setName}
          value={name}
          placeholder="Name"
        />
        <TextInput
          style={styles.input}
          onChangeText={setCost}
          value={cost}
          placeholder="Cost"
          keyboardType="numeric"
        />
        <TouchableOpacity
          style={styles.input}
          onPress={showDatepicker}>
          <Text>{'Date: ' + date.toLocaleDateString()}</Text>
        </TouchableOpacity>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode='date'
            onChange={onChange}
          />
        )}


        <SelectList
          setSelected={setCategory}
          data={data}
          save='value'
          placeholder='--Select a Category--'
          search={false}
          defaultOption={{ key: '--No Category Selected--', value: '--No Category Selected--' }}
        />





      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={onSubmit}
      >
        <Text style={styles.buttonText}>Add Expense</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

export default AddExpense

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  inputContainer: {
    width: '60%',
  },
  input: {
    backgroundColor: 'white',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  button: {
    backgroundColor: '#0782F9',
    width: '60%',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 16
  },
})