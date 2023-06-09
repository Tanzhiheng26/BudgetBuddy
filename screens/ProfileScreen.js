import { KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { getUserInfo } from '../firestore';

const ProfileScreen = () => {
    const navigation = useNavigation();

    const [userInfo, setUserInfo] = useState(new Map());

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace("Login")
            })
            .catch(error => alert(error.message))
    }

    useEffect(() => {
        async function fetchUserInfo() {
            try {
                const info = await getUserInfo(auth.currentUser.uid);
                setUserInfo(info);

            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        }
        fetchUserInfo();

    }, [])




    return (
        <View style={styles.container}>

            <Text>username: {userInfo.username}</Text>
            <Text>email: {userInfo.email}</Text>
            <View style={styles.buttonContainer}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSignOut}>
                    <Text style={styles.buttonText}>Sign out</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',

    },
    buttonContainer: {
        width: '60%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,

    },
    button: {
        backgroundColor: '#0782F9',
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center'
    },

    buttonText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },

})