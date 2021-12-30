import React, {Component, useEffect, useRef, useState} from 'react';
import {
    View,
    Text,
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
    Animated,
    SafeAreaView,
    Platform
} from 'react-native'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Entypo, FontAwesome, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {connect} from "react-redux";
import Book from "../modals/Book";
import HomeStackScreen from "./HomeStackScreen";
import SavedStackScreen from "./SavedStackScreen";
import InboxStackScreen from "./InboxStackScreen";
import ProfilStackScreen from "./ProfilStackScreen";
import LoginScreen from "../screens/authScreens/LoginScreen";
import RegisterScreen from "../screens/authScreens/RegisterScreen";
import ResetPasswordScreen from "../screens/authScreens/ResetPasswordScreen";
import {BottomSheet, ListItem, Overlay, SpeedDial, Button} from "react-native-elements";
import {firebaseLoginFailure, firebaseLoginSuccess, sendPushToken, setLoaded} from "../reducers/appSlice";
import FirebaseInstance from "../config/firebase";
import AddABib from "../modals/AddABib";
import * as PropTypes from "prop-types";
import Constants from 'expo-constants';
import * as Notifications from "expo-notifications";
import ProcessScreen from "../screens/mainScreens/inbox/ProcessScreen";
import AddABook from "../modals/AddABook";

const AppTabs = createBottomTabNavigator();

const CustomBottomTabBarButton = ({ children, onPress,navigation}) => {

    const [visible, setVisible] = useState(false);

    function sendToAddABookToUserBibModal() {
        navigation.navigate('add a book to user bib');
        setVisible(false)
    }
    function sendToAddABookToSavedModal() {
        navigation.navigate('add a book to saved');
        setVisible(false)
    }

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    return (
        // <TouchableOpacity onPress={onPress} style={{top: -20, justifyContent: "center", alignItems: "center", shadowColor: "grey", shadowOpacity: 0.25, shadowRadius: 3.5, shadowOffset: {width: 0, height:5}}}>
        //     <View style={{width: 65, height: 65, borderRadius: 35, backgroundColor: "#fdd560"}}>
        //         {children}
        //     </View>
        // </TouchableOpacity>
        <TouchableOpacity onPress={toggleOverlay} style={{ top: -20, justifyContent: "center", alignItems: "center", shadowColor: "grey", shadowOpacity: 0.25, shadowRadius: 3.5, shadowOffset: {width: 0, height:5}}}>
            <View style={{width: 65, height: 65, borderRadius: 35, backgroundColor: "#fdd560"}}>
                {children}
            </View>
            <BottomSheet
                isVisible={visible}
                containerStyle={{ backgroundColor: "transparent" }}
            >
                <View style={{width: "100%"}}>
                    <TouchableOpacity style={{width:"100%", height:500}} onPress={toggleOverlay} />
                    <Button containerStyle={{backgroundColor: "#fdd560", borderTopRightRadius:15, borderTopLeftRadius:15, borderBottomLeftRadius:0, borderBottomRightRadius:0}} titleStyle={{ color: '#2b2e32', fontWeight: "bold"}} buttonStyle={{backgroundColor: '#fdd560', height:50, borderWidth: 0, borderColor: '#565a63'}} title="Buch zum Nutzer-Bücherregal hinzufügen" onPress={sendToAddABookToUserBibModal}/>
                    <Button containerStyle={{backgroundColor: "#fdd560", borderRadius:0}} titleStyle={{ color: '#2b2e32', fontWeight: "bold"}} buttonStyle={{backgroundColor: '#fdd560', height:50, borderTopWidth: 1,borderWidth: 0, borderColor: '#565a63'}} title="Buch zur Leseliste hinzufügen" onPress={sendToAddABookToSavedModal}/>
                    <Button containerStyle={{backgroundColor: "#2b2e32", borderRadius:0}} titleStyle={{ color: '#fdd560', fontWeight: "bold"}} buttonStyle={{backgroundColor: '#2b2e32', height:50}} title="abbrechen" onPress={() => setVisible(false)}/>
                </View>
            </BottomSheet>
        </TouchableOpacity>
    )
}
const AppTabsScreen = (props) => {

    const [open, setOpen] = useState(false);
    const [openAddABib, setOpenAddABib] = useState(true);

    const fadeAnim = useRef(new Animated.Value(0)).current;

    const fadeIn = () => {
        setOpen(true)
        Animated.timing(fadeAnim, {
            toValue: 1,
            duration: 200,
            useNativeDriver: true
        }).start()
    };

    const fadeOut = () => {
        Animated.timing(fadeAnim, {
            toValue: 0,
            duration: 1,
            useNativeDriver: true
        }).start(()=>{setOpen(false)});
    };

    return (

        <AppTabs.Navigator
            style={{borderWidth: 0}}
            screenOptions={{
                headerShown: false,
                headerShadowVisible:false,
                headerStyle: {
                    elevation: 0,
                    shadowOpacity: 0,
                    borderBottomWidth: 0,
                },
                headerTitleStyle: {
                    fontWeight: "bold",
                },
                tabBarStyle: {backgroundColor: '#2b2e32', borderColor: "#fdd560", borderTopWidth:0},
                tabBarShowLabel: false,
            }}>
            <AppTabs.Screen
                name="home"
                component={HomeStackScreen}
                options={({ navigation }) => ({
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="library" size={30} color="#fdd560"/>
                    )})}
            />
            <AppTabs.Screen
                name="saved"
                component={SavedStackScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <FontAwesome name="bookmark" size={30} color="#fdd560" />
                    )}}
            />
            <AppTabs.Screen
                name="addBook"
                component={AddBookToUserBibModalScreen}
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                        e.preventDefault();
                        navigation.navigate('add a book to user bib');
                    }})}
                options={({ navigation }) => ({
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons style={{left: 1.8, bottom: -0.2}} name="add-sharp" size={48} color="#2b2e32" />
                    ),
                    tabBarButton: (props) => (<CustomBottomTabBarButton navigation={navigation} {...props}/>)
                })}
            />
            <AppTabs.Screen
                name="inbox"
                component={InboxStackScreen}
                options={({ route }) => ({
                    tabBarIcon: ({ color, size }) => (
                        <MaterialIcons name="pending-actions" size={30} color="#fdd560" />
                    )
                })}
            />
            <AppTabs.Screen
                name="profil"
                component={ProfilStackScreen}
                options={({ route }) => ({
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={30} color="#fdd560" />
                    )
                })}
            />
        </AppTabs.Navigator>
    )
}


function AddBookToUserBibModalScreen({ navigation }) {
    return (
        <AddABook navigation={navigation} addTarget={1} />
    );
}

function AddBookToSavedModalScreen({ navigation }) {
    return (
        <AddABook navigation={navigation} addTarget={2}  />
    );
}

function BookModalScreen({ navigation }) {
    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
            <Book navigation={navigation} />
        </View>
    )
}

function AddBibModalScreen({ navigation }) {
    return (
        <AddABib navigation={navigation} />
    )
}

const AuthStack = createNativeStackNavigator()

const RootStack = createNativeStackNavigator();

const auth = FirebaseInstance.auth()

const InboxScreen2Test = (props) => {
    return (
        <ProcessScreen navigation={props.navigation}/>
    );
}

function SaveAreaView(props) {
    return null;
}

SaveAreaView.propTypes = {
    style: PropTypes.shape({width: PropTypes.string, height: PropTypes.string}),
    children: PropTypes.node
};
const RootNavigation = (props) =>{

    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        props.setLoadedDispatch(true)
    }, [props.loading, props.loaded, props.ourbookLoggedIn, props.firebaseLoggedIn])

    useEffect(() => {
        if (props.ourbookLoggedIn) {
            auth.signInWithCustomToken(props.communication.token)
                .then((credentials) =>  {
                    props.firebaseLoginSuccessDispatch(credentials)
                })
                .catch((err) => {
                    props.firebaseLoginFailureDispatch()
                    console.log(err)
                })
            registerForPushNotificationsAsync().then(token => {
                setExpoPushToken(token)
                props.sendPushTokenDispatch(token)
            });

            notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
                setNotification(notification);
            });

            responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
                console.log(response);
            });

            return () => {
                Notifications.removeNotificationSubscription(notificationListener.current);
                Notifications.removeNotificationSubscription(responseListener.current);
            };
        }
    }, [props.ourbookLoggedIn])

    const [open, setOpen] = useState(false)

    return (
        <View style={{height: '100%', width: '100%'}}>
            {!props.loaded &&
            <View style={{flex: 1, justifyContent: 'center', alignItems: "center" }}>
                <ActivityIndicator size='large' />
            </View>
            }
            {props.loaded && !props.ourbookLoggedIn &&
            <NavigationContainer>
                <AuthStack.Navigator initialRouteName="login">
                    <AuthStack.Screen
                        name="login"
                        component={LoginScreen}
                        options={{headerShown: false}}
                        navigation={props.navigation}
                    />
                    <AuthStack.Screen
                        name="register"
                        component={RegisterScreen}
                        options={{headerShown: false,}}
                        navigation={props.navigation}
                    />
                    <AuthStack.Screen
                        name="resetRassword"
                        component={ResetPasswordScreen}
                        options={{headerShown: false}}
                        navigation={props.navigation}
                    />
                </AuthStack.Navigator>
            </NavigationContainer>
            }
            { props.loaded && props.ourbookLoggedIn && props.firebaseLoggedIn &&
            <NavigationContainer>
                <RootStack.Navigator screenOptions={{headerShown: false, gestureEnabled: true}}>
                    <RootStack.Group initialRouteName="main" screenOptions={{headerShown: false}}>
                        <RootStack.Screen
                            name="main"
                            component={AppTabsScreen}
                            options={{ headerMode: 'none' }}
                            navigation={(navigation)=> navigation}
                        />
                    </RootStack.Group>
                    <RootStack.Group>
                        <RootStack.Screen
                            name="processScreenTest"
                            component={InboxScreen2Test}
                            navigation={(navigation)=> navigation}
                        />
                    </RootStack.Group>
                    <RootStack.Group screenOptions={{ presentation: 'modal', gestureEnabled: true}}>
                        <RootStack.Screen
                            name="add a book to user bib"
                            component={AddBookToUserBibModalScreen}
                        />
                        <RootStack.Screen
                            name="add a book to saved"
                            component={AddBookToSavedModalScreen}
                        />
                        <RootStack.Screen
                            name="book"
                            component={BookModalScreen}
                        />
                        <RootStack.Screen
                            name="add a bib"
                            component={AddBibModalScreen}
                        />
                    </RootStack.Group>
                </RootStack.Navigator>
            </NavigationContainer>
            }
            <Overlay isVisible={props.loading}>
                <ActivityIndicator size='large' />
            </Overlay>
        </View>
    )
}

const mapStateToProps = state => {
    return {
        loaded: state.appReducer.loaded,
        loading: state.appReducer.loading,
        ourbookLoggedIn: state.appReducer.ourbookLoggedIn,
        firebaseLoggedIn: state.appReducer.firebaseLoggedIn,
        communication: state.appReducer.communication,
        user: state.appReducer.user,
    }
}

async function schedulePushNotification() {
    await Notifications.scheduleNotificationAsync({
        content: {
            title: "You've got mail! 📬",
            body: 'Here is the notification body',
            data: { data: 'goes here' },
        },
        trigger: { seconds: 2 },
    });
}

async function registerForPushNotificationsAsync() {
    let token;
    if (Constants.isDevice) {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Notifications.requestPermissionsAsync();
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            alert('Failed to get push token for push notification!');
            return;
        }
        token = (await Notifications.getExpoPushTokenAsync()).data;
        console.log(token);
    } else {
        alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
        await Notifications.setNotificationChannelAsync('default', {
            name: 'default',
            importance: Notifications.AndroidImportance.MAX,
            vibrationPattern: [0, 250, 250, 250],
            lightColor: '#FF231F7C',
        });
    }

    return token;
}

const mapDispatchToProps = dispatch => ({
    sendPushTokenDispatch(pushToken) {
        dispatch(sendPushToken({pushToken:pushToken}))
    },
    setLoadedDispatch(value) {
        dispatch(setLoaded(value))
    },
    firebaseLoginSuccessDispatch() {
        dispatch(firebaseLoginSuccess())
    },
    firebaseLoginFailureDispatch() {
        dispatch(firebaseLoginFailure())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(RootNavigation)