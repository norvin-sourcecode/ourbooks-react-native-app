import React from "react";
import {Text, View} from "react-native";
import {createNativeStackNavigator} from "react-native-screens/native-stack";
import SavedScreen from "../screens/mainScreens/saved/SavedScreen";

const SavedStackScreen1 = (props) => {
    return (
        <SavedScreen  navigation={props.navigation} />
    );
}

const SavedStackScreen2 = (props) => {
    return (
        <View>
            <Text navigation={props.navigation}>SavedStackScreen2</Text>
        </View>
    );
}

const SavedStack = createNativeStackNavigator();

function SavedStackScreen() {
    return (
        <SavedStack.Navigator screenOptions={{
            title: "Leseliste",
            headerStyle: {
                elevation: 0,
                shadowOpacity: 0,
                borderBottomWidth: 0,
                backgroundColor: '#2b2e32'
            },
            headerTintColor: '#fdd560',
            headerShown: false,
            headerShadowVisible: false,
            headerTitleStyle: {
                fontWeight: "bold",
            },
        }}>
            <SavedStack.Screen name="WishlistScreen1" component={SavedStackScreen1} />
            <SavedStack.Screen name="WishlistScreen2" component={SavedStackScreen2} />
        </SavedStack.Navigator>
    );
}

export default SavedStackScreen