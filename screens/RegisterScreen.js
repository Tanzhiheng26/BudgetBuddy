import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const RegisterScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const navigation = useNavigation();

    useEffect(() => {
      const unsubsribe = onAuthStateChanged(auth, user => {
        if (user) {
          navigation.replace("Home")
        }
      })
      return unsubsribe;
    }, [])

    const handleSignUp = () => {
        if (password !== confirmpassword) {
            alert("Passwords do not match");
            return;
        }
        createUserWithEmailAndPassword(auth, email, password)
        .then(userCredential => {
            const user = userCredential.user;
            console.log("Registered with: ", user.email);
        })
        .catch(error => alert(error.message))
    }
  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}> 
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
          <View style={styles.inputContainer}>
            <TextInput 
              placeholder='Email'
              value={email}
              onChangeText={text => setEmail(text)}
              style={styles.input}
            />
            <TextInput 
              placeholder='Password'
              value={password}
              onChangeText={text => setPassword(text)}
              style={styles.input}
              secureTextEntry={true}
            />
            <TextInput 
              placeholder='Confirm Password'
              value={confirmpassword}
              onChangeText={text => setConfirmPassword(text)}
              style={styles.input}
              secureTextEntry={true}
            />               
          </View>
          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              onPress={handleSignUp}
              style={[styles.button, styles.buttonOutline]}
            >
              <Text style={styles.buttonOutLineText}>Register</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
      </SafeAreaProvider>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    inputContainer: {
        width: '80%',
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },
    buttonOutline: {
        backgroundColor: 'white',
        marginTop: 40,
        borderColor: '#0782F9',
        borderWidth: 2
    },
    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    }, 
    buttonOutLineText: {
        color: '#0782F9',
        fontWeight: '700',
        fontSize: 16
    }
})