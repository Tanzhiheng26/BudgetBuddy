import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddScreen from './AddScreen';
import ExpenseScreen from './ExpenseScreen';
import EZHomeTabs from './EasySplit/EZHomeTabs';
import { AppProvider } from '../context/AppContext';
import { Icon } from '@rneui/themed';
import { auth } from '../firebase'
const Tab = createBottomTabNavigator();


export default function HomeTabs() {
  return (
    <AppProvider>
      <Tab.Navigator>
        <Tab.Screen name="Expenses" component={ExpenseScreen}
          options={{ tabBarIcon: () => <Icon name='attach-money' /> }} />
        <Tab.Screen name="Add Expense" component={AddScreen}
          options={{ tabBarIcon: () => <Icon name='add-box' /> }} />

        <Tab.Screen name="EasySplit" component={EZHomeTabs}
          options={{ tabBarIcon: () => <Icon name='money' /> }} />

      </Tab.Navigator>
    </AppProvider>
  );
}

