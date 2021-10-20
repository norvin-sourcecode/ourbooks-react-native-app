import React from "react";
import {Text, View, Button} from "react-native";
import {createNativeStackNavigator} from "react-native-screens/native-stack";
import {AntDesign, Ionicons} from "@expo/vector-icons";
import HomeScreen from "../screens/mainScreens/home/HomeScreen";
import {Badge} from "react-native-elements";

const HomeStackScreen1 = (props) => {
    return (
        <View>
            <HomeScreen navigation={props.navigation} />
        </View>
    );
}

const HomeStackScreen2 = (props) => {
    return (
        <View>
            <Text navigation={props.navigation}>userbib</Text>
        </View>
    );
}

const HomeStackScreen3 = (props) => {
    return (
        <View>
            <Text navigation={props.navigation}>bib</Text>
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
            title: "Home",
            headerStyle: {
                backgroundColor: '#2b2e32',
            },
            headerTintColor: '#fdd560',
            headerTitleStyle: {
                fontWeight: "bold",
            },
        }}>
            <HomeStack.Screen name="homeStackScreen1" component={HomeStackScreen1} options={({ navigation, route }) => ({
                title: "Home",
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
            })} />
            <HomeStack.Screen name="homeStackScreen2" component={HomeStackScreen2} options={{ title: "Nutzer-Bibliothek" }} />
            <HomeStack.Screen name="homeStackScreen3" component={HomeStackScreen3} options={({ navigation }) => ({
                title: " ",
                headerRight: ({}) => (
                    <AntDesign name="setting" size={25} color="white" onPress={() => navigation.navigate('HomeStackScreen3')}/>
                ),
            })} />
            <HomeStack.Screen name="homeStackScreen4" component={HomeStackScreen4} options={{ title: "Einstellungen" }} />
        </HomeStack.Navigator>
    );
}

export default HomeStackScreen