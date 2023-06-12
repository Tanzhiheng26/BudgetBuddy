import { createDrawerNavigator } from '@react-navigation/drawer';
import EZGroupPage from './EZGroupPage';
import EZManageMembersScreen from './EZManageMembersScreen';
import EZAddGroupExpense from './EZAddGroupExpense';

const Drawer = createDrawerNavigator();

export default function EZGroupPageDrawer({ route }) {
    const groupID = route.params.groupID;

    return (
        <Drawer.Navigator>
            <Drawer.Screen name="Group Page "  /*options={{ unmountOnBlur: true }}*/>
                {() => <EZGroupPage groupID={groupID} />}
            </Drawer.Screen>

            <Drawer.Screen name="Add Group Expense " /*options={{ unmountOnBlur: true }}*/>
                {() => <EZAddGroupExpense groupID={groupID} />}
            </Drawer.Screen>

            <Drawer.Screen name="Group Members ">
                {() => <EZManageMembersScreen groupID={groupID} />}
            </Drawer.Screen>
        </Drawer.Navigator>)
}