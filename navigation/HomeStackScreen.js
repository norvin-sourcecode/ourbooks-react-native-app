import React, {useEffect, useRef, useState} from "react";
import {Text, View, TouchableOpacity, Animated, SafeAreaView} from "react-native";
import {createNativeStackNavigator} from "react-native-screens/native-stack";
import {AntDesign, Ionicons, MaterialIcons} from "@expo/vector-icons";
import HomeScreen from "../screens/mainScreens/home/HomeScreen";
import {Badge, Button, Overlay} from "react-native-elements";
import BibScreen from "../screens/mainScreens/home/BibScreen";
import DropDownPicker from "react-native-dropdown-picker";
import AddABib from "../modals/AddABib";
import FriendsScreen from "../screens/mainScreens/profil/FriendsScreen";

const HomeStackScreen1 = (props) => {

    return (
        <View>
            <HomeScreen navigation={props.navigation}/>
        </View>
    );
}

const HomeStackScreen2 = (props) => {
    return (
        <View>
            <FriendsScreen navigation={props.navigation}/>
        </View>
    );
}

const HomeStackScreen3 = (props) => {
    return (
        <View>
            <BibScreen navigation={props.navigation} />
        </View>
    );
}

const HomeStackScreen4 = (props) => {
    return (
        <View>
            <Text navigation={props.navigation}>bibsettings</Text>
        </View>
    );
}

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {

    return (
        <HomeStack.Navigator screenOptions={{
            headerShown: false,
            headerShadowVisible:false,
            title: "Home",
            headerStyle: {
                backgroundColor: '#2b2e32',
            },
            headerTintColor: '#fdd560',
            headerTitleStyle: {
                fontWeight: "bold",
            },
        }}>
            <HomeStack.Screen name="homeStackScreen1" component={HomeStackScreen1} options={({ navigation }) => ({
                title: "Home",
            })} />
            <HomeStack.Screen name="homeStackScreen2" component={HomeStackScreen2} options={{ title: "Nutzer-Bibliothek" }} />
            <HomeStack.Screen name="homeStackScreen3" component={HomeStackScreen3} options={({ navigation }) => ({
                title: " ",
                headerRight: ({}) => (
                    <AntDesign name="setting" size={25} color="white" onPress={() => navigation.navigate('homeStackScreen4')}/>
                ),
            })} />
            <HomeStack.Screen name="homeStackScreen4" component={HomeStackScreen4} options={{ title: "Einstellungen" }} />
        </HomeStack.Navigator>
    );
}

export default HomeStackScreen