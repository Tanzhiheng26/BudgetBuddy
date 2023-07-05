import { StyleSheet, Text, View, Animated } from 'react-native'
import React, { useContext, useState, useRef, useEffect } from 'react'
import Budget from '../components/Budget'
import RemainingBudget from '../components/RemainingBudget'
import ExpenseTotal from '../components/ExpenseTotal'
import Constants from 'expo-constants';
import { AppContext } from '../context/AppContext'
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldShowAlert: true,
      shouldPlaySound: false,
      shouldSetBadge: false,
    }),
});

const BudgetScreen = () => {
    // Notifications
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        registerForPushNotificationsAsync().then(token => setExpoPushToken(token));
    
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
          setNotification(notification);
        });
    
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
          console.log(response);
        });
    
        return () => {
          Notifications.removeNotificationSubscription(notificationListener.current);
          Notifications.removeNotificationSubscription(responseListener.current);
        };
    }, []);

    const { budget, expenses } = useContext(AppContext);
    const [percentage, setPercentage] = useState(0);
    useEffect(() => {
        // Update the percentage whenever the expenses or budget change
        const updatedPercentage = getPercentage(budget, expenses);
        setPercentage(updatedPercentage);
        if (updatedPercentage > 100) {
            schedulePushNotification().catch(error => {
                console.error("Error scheduling push notification:", error);
            });
        }
    }, [budget, expenses])
    const width = percentage > 100 ? "100%" : percentage + "%";
    const backgroundColor =  barColor(percentage)

    return (
    <View>
        <View style={styles.budgetcontainer}>
            <Text style={styles.title}>{getMonthYear()}</Text>
            <View style={styles.components}>
                <Budget />
            </View>
            <View style={styles.components}>
                <ExpenseTotal />
            </View>
            <View style={styles.components}>
                <RemainingBudget />
            </View>
        </View>

        <View style={styles.barContainer}>
            <View style={styles.progressBar}>
                <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor, width }]}/>
            </View> 
            <Text style={styles.text}>{percentage}% of budget spent</Text>
        </View>
    </View>
  )
}

export default BudgetScreen

function getMonthYear() {
    const date = new Date();
    const month = date.toLocaleString([], {
      month: 'short',
      year
    });
    const year = date.getFullYear();
    return month + " " + year;
}

function getPercentage(budget, expenses) {
    // const { budget, expenses } = useContext(AppContext);
    if (budget == 0) return 0;
    currDate = new Date();
    const totalExpenses = expenses
        .filter(e => e.date.getFullYear() == currDate.getFullYear() && e.date.getMonth() == currDate.getMonth())
        .reduce((total, item) => { return total + item.cost }, 0);
    return Math.round((totalExpenses / budget) * 100);
}

function barColor(percentage) {
    if (percentage >= 100) {
        return "#E74C3C"
    } else if (percentage >= 75) {
        return "#FFA500" 
    } else if (percentage >= 50) {
        return "#FFFF00"
    } else {
        return "#8BED4F"
    }
}

async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Warning",
        body: 'You have exceeded your budget',
      },
      trigger: null,
    });
}

async function registerForPushNotificationsAsync() {
    let token;
  
    if (Platform.OS === 'android') {
      await Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync()
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    return token;
}

const styles = StyleSheet.create({
    title: {
        fontSize: 24,
        textAlign: 'center'
    },
    budgetcontainer: {
        marginTop: 10
    },
    components: {
        marginTop: 5,
    },
    barContainer: {
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: Constants.statusBarHeight,
        backgroundColor: '#ecf0f1',
        padding: 8,
        marginTop: 20,
    },
    progressBar: {
        height: 30,
        width: '100%',
        backgroundColor: 'white',
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 5
    },
    text: {
        fontSize: 20,
        fontWeight: 500,
        marginTop: 10
    }
})