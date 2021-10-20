import React from "react";
import { Text, View} from "react-native";
import {createNativeStackNavigator} from "react-native-screens/native-stack";
import {ListItem, SearchBar, Button, Divider} from "react-native-elements";
import {AntDesign} from "@expo/vector-icons";
import TouchableScale from "react-native-touchable-scale";
import {LinearGradient} from "expo-linear-gradient";
import ProfilScreen from "../screens/mainScreens/profil/ProfileScreen";

const ProfilScreen1 = (props) => {
    return (
        <ProfilScreen navigation={props.navigation}/>
    );
}

const ProfilScreen2 = (props) => {
    return (
        <View>
            <Text navigation={props.navigation}>ProfilScreen2</Text>
        </View>
    );
}

const ProfilStack = createNativeStackNavigator();

function ProfilStackScreen() {
    return (
        <ProfilStack.Navigator screenOptions={{
            title: "Profil",
            headerStyle: {
                backgroundColor: '#2b2e32',
            },
            headerTintColor: '#fdd560',
            headerTitleStyle: {
                fontWeight: "bold",
            },
        }}>
            <ProfilStack.Screen name="Profil" component={ProfilScreen1} options={({ navigation }) => ({
                headerRight: ({}) => (
                    <AntDesign name="setting" size={25} color="#fdd560" onPress={() => navigation.navigate('profilSettings')}/>
                ),
            })} />
            <ProfilStack.Screen name="profilSettings" component={ProfilScreen2}/>
        </ProfilStack.Navigator>
    );
}

export default ProfilStackScreen