
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AddScreen from './AddScreen';
import ExpenseScreen from './ExpenseScreen';
import { AppProvider } from '../context/AppContext';
import { Icon } from '@rneui/themed';

const Tab = createBottomTabNavigator();

export default function HomeTabs() {
  return (
    <AppProvider>
        <Tab.Navigator>
            <Tab.Screen name="Expenses" component={ExpenseScreen} 
                options={{tabBarIcon: () => <Icon name='attach-money' />}} />
            <Tab.Screen name="Add Expense" component={AddScreen} 
                options={{tabBarIcon: () => <Icon name='add-box' />}}/>
        </Tab.Navigator>
    </AppProvider>
  );
}