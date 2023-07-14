import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, {useEffect, useState} from 'react'
import { onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();
  
    useEffect(() => {
      const unsubsribe = onAuthStateChanged(auth, user => {
        if (user) {
          navigation.replace("Home")
        }
      })
      return unsubsribe;
    }, [])

    const onRegister = () => {
      navigation.navigate("Register");
    }

    const handleLogin = () => {
      signInWithEmailAndPassword(auth, email, password)
      .then(userCredential => {
          const user = userCredential.user;
          console.log("Logged in with: ", user.email);
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
          <Image source={{uri: 'https://cdn-icons-png.flaticon.com/512/4604/4604286.png'}}
           style={{width: 150, height: 150}} />
          <Text style={styles.name}>BudgetBuddy</Text>
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
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              onPress={handleLogin}
              style={styles.button}
            >
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={onRegister}
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

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    name: {
        fontSize: 30,
        marginBottom: 40,
        fontFamily: 'Roboto'
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