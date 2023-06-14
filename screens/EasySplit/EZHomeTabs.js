import 'react-native-gesture-handler';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EZHomeScreen from './EZHomeScreen';
import EZAddGroupScreen from './EZAddGroupScreen';
import EZGroupPageDrawer from './EZGroupPageDrawer';


const Stack = createNativeStackNavigator();

export default function EZHomeTabs() {
  return (

    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name="EZHomeScreen" component={EZHomeScreen} />
      <Stack.Screen name="Add New Group" component={EZAddGroupScreen} />
      <Stack.Screen options={{ headerShown: false }} name="Group Page Drawer" component={EZGroupPageDrawer} />
    </Stack.Navigator>

  );
}
