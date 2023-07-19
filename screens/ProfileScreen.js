import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { auth } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { getUserInfo } from '../firestore';
import { updatePassword, EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";

const ProfileScreen = () => {
    const navigation = useNavigation();
    const [userInfo, setUserInfo] = useState(new Map());
    const [oldPassword, setoldPassword] = useState('');
    const [newPassword, setnewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSignOut = () => {
        auth
            .signOut()
            .then(() => {
                navigation.replace("Login")
            })
            .catch(error => alert(error.message))
    }

    const changePassword = async () => {
        const user = auth.currentUser;
        const cred = EmailAuthProvider.credential(
            user.email, oldPassword);
        await reauthenticateWithCredential(user, cred).then(() => {
            if (newPassword !== confirmPassword) {
                alert("Passwords do not match");
                return;
            }
            updatePassword(user, newPassword)
                .then(() => {
                    alert("Password updated")
                    setnewPassword('')
                    setoldPassword('')
                    setConfirmPassword('')
                })
                .catch(error => alert(error.message))
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
            <View style={{ flex: 0.9 }}>
                <View style={{ alignItems: 'center' }}>
                    <Text style={styles.title}>User Info</Text>
                    <Text style={styles.text}>Username: {userInfo.username}</Text>
                    <Text style={styles.text}>Email: {userInfo.email}</Text>
                    <Text style={styles.title}>Change Password</Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        placeholder='Current Password'
                        value={oldPassword}
                        onChangeText={text => setoldPassword(text)}
                        style={styles.input}
                        secureTextEntry={true}
                    />
                    <TextInput
                        placeholder='New Password'
                        value={newPassword}
                        onChangeText={text => setnewPassword(text)}
                        style={styles.input}
                        secureTextEntry={true}
                    />
                    <TextInput
                        placeholder='Confirm New Password'
                        value={confirmPassword}
                        onChangeText={text => setConfirmPassword(text)}
                        style={styles.input}
                        secureTextEntry={true}
                    />
                    <View style={{ alignItems: 'center' }}>
                        <TouchableOpacity
                            style={styles.updateButton}
                            onPress={changePassword}
                        >
                            <Text style={styles.updateText}>Update</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={{ flex: 0.1 }}>
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSignOut}>
                    <Text style={styles.buttonText}>Logout</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default ProfileScreen

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        marginTop: 10
    },
    inputContainer: {
        marginLeft: 10,
        width: '95%'
    },
    updateButton: {
        backgroundColor: '#0782F9',
        marginTop: 20,
        padding: 10,
        borderRadius: 10,
        width: "30%",
        alignItems: 'center'
    },
    updateText: {
        color: 'white',
        fontWeight: '700',
        fontSize: 16
    },
    button: {
        backgroundColor: 'white',
        padding: 15,
        alignItems: 'center'
    },
    buttonText: {
        fontWeight: '700',
        fontSize: 16
    },
    text: {
        fontSize: 20
    },
    title: {
        marginTop: 10,
        marginBottom: 10,
        fontSize: 25,
        fontWeight: '700'
    },
    input: {
        backgroundColor: 'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 10,
    },
})