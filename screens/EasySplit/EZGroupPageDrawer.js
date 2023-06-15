import { createDrawerNavigator } from '@react-navigation/drawer';
import EZGroupPage from './EZGroupPage';
import EZManageMembersScreen from './EZManageMembersScreen';
import EZAddGroupExpense from './EZAddGroupExpense';
import CustomDrawer from '../../components/EasySplit/CustomDrawer';


export default function EZGroupPageDrawer({ route }) {
    const Drawer = createDrawerNavigator();
    const groupID = route.params.groupID;

    return (
        <Drawer.Navigator drawerContent={props => <CustomDrawer {...props} />} >
            <Drawer.Screen name="Group Page " options={{ unmountOnBlur: true }}>
                {() => <EZGroupPage groupID={groupID} />}
            </Drawer.Screen>

            <Drawer.Screen name="Add Group Expense " options={{ unmountOnBlur: true }}>
                {() => <EZAddGroupExpense groupID={groupID} />}
            </Drawer.Screen>

            <Drawer.Screen name="Group Members ">
                {() => <EZManageMembersScreen groupID={groupID} />}
            </Drawer.Screen>


        </Drawer.Navigator >)
}