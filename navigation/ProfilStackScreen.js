import React from "react";
import { Text, View} from "react-native";
import {createNativeStackNavigator} from "react-native-screens/native-stack";
import {ListItem, SearchBar, Button, Divider} from "react-native-elements";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import TouchableScale from "react-native-touchable-scale";
import {LinearGradient} from "expo-linear-gradient";
import ProfilScreen from "../screens/mainScreens/profil/ProfileScreen";
import FriendsScreen from "../screens/mainScreens/profil/FriendsScreen";
import BookTiles from "../components/BibGrid";

const ProfilScreen1 = (props) => {
    return (
        <View>
            <ProfilScreen navigation={props.navigation}/>
        </View>
    );
}

const ProfilScreen2 = (props) => {
    return (
        <View>
            <BookTiles navigation={props.navigation}/>
        </View>
    );
}

const ProfilScreen3 = (props) => {
    return (
        <View>
            <FriendsScreen navigation={props.navigation} />
        </View>
    );
}

const ProfilScreen4 = (props) => {
    return (
        <View>
            <Text navigation={props.navigation}>UserBib</Text>
        </View>
    );
}

const ProfilStack = createNativeStackNavigator();

function ProfilStackScreen() {
    return (
        <ProfilStack.Navigator screenOptions={{
            headerShown: false,
            headerShadowVisible:false,
            title: "Profil",
            headerStyle: {
                backgroundColor: '#2b2e32',
            },
            headerTintColor: '#fdd560',
            headerTitleStyle: {
                fontWeight: "bold",
            },
        }}>
            <ProfilStack.Screen name="Profil" component={ProfilScreen1}  />
            <ProfilStack.Screen name="profilSettings" component={ProfilScreen2} />
            <ProfilStack.Screen name="profilFriends" component={ProfilScreen3} options={({ navigation}) => ({
                title: "Freund*innen",
            })} />
            <ProfilStack.Screen name="profilUserBib" component={ProfilScreen4} />
        </ProfilStack.Navigator>
    );
}

export default ProfilStackScreen