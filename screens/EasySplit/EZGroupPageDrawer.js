import { createDrawerNavigator } from '@react-navigation/drawer';
import EZGroupPage from './EZGroupPage';
import EZEditMemberScreen from './EZEditMemberScreen';
import EZViewMembersScreen from './EZViewMembersScreen';
import EZAddGroupExpense from './EZAddGroupExpense';

const Drawer = createDrawerNavigator();

export default function EZGroupPageDrawer({ route }) {
    const groupID = route.params.groupID;

    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Group Page " options={{ unmountOnBlur: true }}>
                {() => <EZGroupPage groupID={groupID} />}
            </Drawer.Screen>

            <Drawer.Screen name="Add Group Expense " options={{ unmountOnBlur: true }}>
                {() => <EZAddGroupExpense groupID={groupID} />}
            </Drawer.Screen>

            <Drawer.Screen name="Edit Group Member " options={{ unmountOnBlur: true }}>
                {() => <EZEditMemberScreen groupID={groupID} />}
            </Drawer.Screen>

            <Drawer.Screen name="View Group Members " options={{ unmountOnBlur: true }}>
                {() => <EZViewMembersScreen groupID={groupID} />}
            </Drawer.Screen>





        </Drawer.Navigator>)
}