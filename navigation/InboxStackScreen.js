import React from "react";
import {Text, TouchableOpacity, View} from "react-native";
import {createNativeStackNavigator} from "react-native-screens/native-stack";
import InboxScreen from "../screens/mainScreens/inbox/InboxScreen";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import {Badge} from "react-native-elements";
import ProcessScreen from "../screens/mainScreens/inbox/ProcessScreen";
import AnfragenScreen from "../screens/mainScreens/inbox/AnfragenScreen";

const InboxScreen1 = (props) => {
    return (
        <InboxScreen navigation={props.navigation}/>
    );
}

const InboxScreen2 = (props) => {
    return (
        <ProcessScreen navigation={props.navigation}/>
    );
}

const InboxScreen3 = (props) => {
    return (
        <AnfragenScreen navigation={props.navigation}/>
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
        }}>
            <InboxStack.Screen name="ProcessScreen1" component={InboxScreen1} options={({ navigation }) => ({
                title: "Inbox",
                headerRight: ({}) => (
                    <TouchableOpacity onPress={() => navigation.navigate('ProcessScreen3')}>
                        <Ionicons name="notifications" size={25} color="#fdd560"/>
                        <Badge
                            value={1}
                            status="success"
                            containerStyle={{ position: 'absolute', top: -4, right: -7 }}
                        />
                    </TouchableOpacity>
                ),
            })} />
            <InboxStack.Screen name="ProcessScreen2" component={InboxScreen2} />
            <InboxStack.Screen name="ProcessScreen3" component={InboxScreen3} />
        </InboxStack.Navigator>
    );
}

export default InboxStackScreen