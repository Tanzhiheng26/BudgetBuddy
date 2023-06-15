import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { useNavigation } from "@react-navigation/native";

const CustomDrawer = (props) => {
    const navigation = useNavigation();
    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <View style={{ padding: 10, borderTopWidth: 1, borderTopColor: '#ccc' }}>
                <TouchableOpacity
                    style={{ padding: 10 }}
                    onPress={() => navigation.navigate("EZHomeScreen")}>
                    <Text>Back to My Groups</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
export default CustomDrawer;