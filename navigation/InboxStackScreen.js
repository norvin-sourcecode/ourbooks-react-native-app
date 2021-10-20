import React from "react";
import {Text, View} from "react-native";
import {createNativeStackNavigator} from "react-native-screens/native-stack";
import InboxScreen from "../screens/mainScreens/inbox/InboxScreen";
import {Ionicons} from "@expo/vector-icons";
import {Badge} from "react-native-elements";

const InboxScreen1 = (props) => {
    return (
        <InboxScreen/>
    );
}

const InboxScreen2 = (props) => {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <Text navigation={props.navigation}>InboxScreen2</Text>
        </View>
    );
}

const InboxStack = createNativeStackNavigator();

function InboxStackScreen() {
    return (
        <InboxStack.Navigator screenOptions={{
            title: "Inbox",
            headerStyle: {
                backgroundColor: '#2b2e32',
            },
            headerTintColor: '#fdd560',
            headerTitleStyle: {
                fontWeight: "bold",
            },
            headerRight: ({}) => (
                <View>
                    <Ionicons name="notifications" size={25} color="#fdd560"/>
                    <Badge
                        value={1}
                        status="success"
                        containerStyle={{ position: 'absolute', top: -4, right: -7 }}
                    />
                </View>
            ),
        }}>
            <InboxStack.Screen name="ProcessScreen1" component={InboxScreen1} />
            <InboxStack.Screen name="ProcessScreen2" component={InboxScreen2} />
        </InboxStack.Navigator>
    );
}

export default InboxStackScreen