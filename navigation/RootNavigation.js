import React, {Component, useEffect, useRef, useState} from 'react';
import {View, Text, ActivityIndicator, StyleSheet, TouchableOpacity} from 'react-native'
import { Provider } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator} from "@react-navigation/native-stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import {Entypo, FontAwesome, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {connect} from "react-redux";
import AddABook from "../modals/AddABook";
import Book from "../modals/Book";
import HomeStackScreen from "./HomeStackScreen";
import SavedStackScreen from "./SavedStackScreen";
import InboxStackScreen from "./InboxStackScreen";
import ProfilStackScreen from "./ProfilStackScreen";
import LoginScreen from "../screens/authScreens/LoginScreen";
import RegisterScreen from "../screens/authScreens/RegisterScreen";
import ResetPasswordScreen from "../screens/authScreens/ResetPasswordScreen";
import {BottomSheet, ListItem, Overlay, SpeedDial, Button} from "react-native-elements";
import {firebaseLoginFailure, firebaseLoginSuccess, setLoaded} from "../reducers/appSlice";
import FirebaseInstance from "../config/firebase";
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';

// const ThemeScreen = props => {
//     const ref = useRef();
//
//     const _renderIcon = (routeName, selectTab) => {
//         let icon = '';
//
//         switch (routeName) {
//             case 'home':
//                 return (
//                     <Ionicons name='library' size={25} color={routeName === selectTab ? '#ec4508' : 'white'} />
//                 );
//             case 'saved':
//                 return (
//                     <Entypo name='unread' size={25} color={routeName === selectTab ? '#ec4508' : 'white'} />
//                 );
//             case 'inbox':
//                 return (
//                     <MaterialIcons name='pending-actions' size={25} color={routeName === selectTab ? '#ec4508' : 'white'} />
//                 );
//             case 'profil':
//                 return (
//                     <Ionicons name='person' size={25} color={routeName === selectTab ? '#ec4508' : 'white'} />
//                 );
//         }
//     };
//
//     return (
//         <View style={{flex: 1,}}>
//             <CurvedBottomBar.Navigator
//                 ref={ref}
//                 type="down"
//                 height={60}
//                 circleWidth={55}
//                 bgColor="black"
//                 borderTopLeftRight={false}
//                 initialRouteName="home"
//                 renderCircle={({ selectTab, navigate }) => (
//                     <TouchableOpacity
//                         style={ {
//                             width: 60,
//                             height: 60,
//                             borderRadius: 30,
//                             alignItems: 'center',
//                             justifyContent: 'center',
//                             backgroundColor: 'black',
//                             shadowColor: "#000",
//                             shadowOffset: {
//                                 width: 0,
//                                 height: 1,
//                             },
//                             shadowOpacity: 0.20,
//                             shadowRadius: 1.41,
//                             elevation: 1,
//                             bottom: 28
//                         }} onPress={()=>{console.log("test")}}
//                     >
//                         <Ionicons style={{left: 2, bottom: -0.5}} name="add-sharp" size={47} color="white" />
//                     </TouchableOpacity>
//                 )}
//                 tabBar={({ routeName, selectTab, navigate }) => {
//                     return (
//                         <TouchableOpacity
//                             onPress={() => navigate(routeName)}
//                             style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
//                         >
//                             {_renderIcon(routeName, selectTab)}
//                         </TouchableOpacity>
//                     );
//                 }}>
//                 <CurvedBottomBar.Screen
//                     name="home"
//                     position="left"
//                     component={HomeStackScreen}
//                 />
//                 <CurvedBottomBar.Screen
//                     name="saved"
//                     component={({ navigate }) => <View style={{ backgroundColor: '#BFEFFF', flex: 1 }} />}
//                     position="left"
//                 />
//                 <CurvedBottomBar.Screen
//                     name="inbox"
//                     component={({ navigate }) => <View style={{ backgroundColor: '#BFEFFF', flex: 1 }} />}
//                     position="right"
//                 />
//                 <CurvedBottomBar.Screen
//                     name="profil"
//                     component={({ navigate }) => <View style={{ backgroundColor: '#FFEBCD', flex: 1 }} />}
//                     position="right"
//                 />
//             </CurvedBottomBar.Navigator>
//         </View>
//     );
// };

const AppTabs = createBottomTabNavigator();

const CustomBottomTabBarButton = ({ children, onPress}) => {

    const [visible, setVisible] = useState(false);

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
                    <Button containerStyle={{backgroundColor: "#fdd560"}} titleStyle={{ color: '#2b2e32', fontWeight: "bold"}} buttonStyle={{backgroundColor: '#fdd560', height:50, borderWidth: 1, borderColor: '#565a63'}} title="Buch zur Nutzer-Bibliothek hinzufügen" onPress={onPress}/>
                    <Button containerStyle={{backgroundColor: "#fdd560"}} titleStyle={{ color: '#2b2e32', fontWeight: "bold"}} buttonStyle={{backgroundColor: '#fdd560', height:50, borderTopWidth: 0,borderWidth: 1, borderColor: '#565a63'}} title="Buch zur Leseliste hinzufügen" onPress={()=>console.log("test")}/>
                    <Button containerStyle={{backgroundColor: "#2b2e32"}} titleStyle={{ color: '#fdd560', fontWeight: "bold"}} buttonStyle={{backgroundColor: '#2b2e32', height:50}} title="abbrechen" onPress={() => setVisible(false)}/>
                </View>
            </BottomSheet>
        </TouchableOpacity>
    )
}
const AppTabsScreen = (props) => (

    <AppTabs.Navigator
        screenOptions={{
            headerShown: false,
            headerStyle: {
                backgroundColor: "#2b2e32",
            },
            headerTintColor: 'black',
            headerTitleStyle: {
                fontWeight: "bold",
            },
            tabBarStyle: {backgroundColor: '#2b2e32'},
            tabBarShowLabel: false,
            tabBarActiveTintColor: "red"
        }}>
        <AppTabs.Screen
            name="saved"
            component={SavedStackScreen}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <FontAwesome name="bookmark" size={30} color="#fdd560" />
                )}}
        />
        <AppTabs.Screen
            name="home"
            component={HomeStackScreen}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="library" size={30} color="#fdd560"/>
                )}}
        />
        <AppTabs.Screen
            name="addBook"
            component={AddBookModalScreen}
            listeners={({ navigation }) => ({
                tabPress: (e) => {
                    e.preventDefault();
                    navigation.navigate('add a book');
                }})}
            options={({ navigation }) => ({
                tabBarIcon: ({ color, size }) => (
                    <Ionicons style={{left: 1.8, bottom: -0.2}} name="add-sharp" size={48} color="#2b2e32" />
                ),
                tabBarButton: (props) => (<CustomBottomTabBarButton {...props}/>)
            })}
        />
        <AppTabs.Screen
            name="inbox"
            component={InboxStackScreen}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <MaterialIcons name="pending-actions" size={30} color="#fdd560" />
                )}}
        />
        <AppTabs.Screen
            name="profil"
            component={ProfilStackScreen}
            options={{
                tabBarIcon: ({ color, size }) => (
                    <Ionicons name="person" size={30} color="#fdd560" />
                )}}
        />
    </AppTabs.Navigator>
)


function AddBookModalScreen({ navigation }) {
    return (
        <AddABook navigation={navigation} />
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
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }} >
            <Text style={{ fontSize: 30 }}>add a bib</Text>
            <Button onPress={() => navigation.navigate("main")} title="close" />
        </View>
    )
}

const AuthStack = createNativeStackNavigator()

const RootStack = createNativeStackNavigator();

const auth = FirebaseInstance.auth()

const RootNavigation = (props) =>{

    useEffect(() => {
        props.setLoadedDispatch(true)
    }, [props.loading, props.loaded, props.ourbookLoggedIn, props.firebaseLoggedIn])

    useEffect(() => {
        if (props.ourbookLoggedIn) {
            //props.firebaseLoginSuccessDispatch()
            console.log("trying with token: "+props.communication.token)
            auth.signInWithCustomToken(props.communication.token)
                .then((credentials) =>  {
                    props.firebaseLoginSuccessDispatch(credentials)
                    console.log("success with token: "+props.communication.token)
                })
                .catch((err) => {
                    props.firebaseLoginFailureDispatch()
                    console.log(err)
                })
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
                <AuthStack.Navigator initialRouteName="LoginScreen">
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
                            navigation={props.navigation}
                        />
                    </RootStack.Group>
                    <RootStack.Group screenOptions={{ presentation: 'modal', gestureEnabled: true}}>
                        <RootStack.Screen
                            name="add a book"
                            component={AddBookModalScreen}
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

const mapDispatchToProps = dispatch => ({
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