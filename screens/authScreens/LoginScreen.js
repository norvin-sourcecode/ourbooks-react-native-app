import React, {useEffect, useState} from "react";
import {ActivityIndicator, Animated, ImageBackground, SafeAreaView, Text, View} from "react-native";
import {connect} from "react-redux";
import {Button, Image, Input, Overlay} from "react-native-elements";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {firebaseLoginFailure, firebaseLoginSuccess, getUser, setConf} from "../../reducers/appSlice";
import logo from "./ourbooklogo512x512.png"
import {current} from "@reduxjs/toolkit";
import FirebaseInstance from "../../config/firebase";

const auth = FirebaseInstance.auth()

const LoginScreen = (props) => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [firebaseUser, setFirebaseUser] = useState({})

    const scale = React.useRef(new Animated.Value(1)).current;

    const [visible, setVisible] = useState(false);
    const [logoVisible, setLogoVisible] = useState(true)

    useEffect(() => {
        setFirebaseUser(props.firebaseUser)
        if (props.user.error != null) {
            setVisible(true);
        }
        if (props.user.error == null) {
            setVisible(false);
        }
        if (props.ourbookLoggedIn) {
            // console.log('test')
            // auth.signInWithCustomToken(props.communication.token)
            //     .then((credentials) =>  {
            //         props.firebaseLoginSuccessDispatch(credentials)
            //     })
            //     .catch((err) => {
            //         props.firebaseLoginFailureDispatch()
            //         console.log(err)
            //     })
            // props.navigation.navigate("main")
        }
    }, [props.user, props.ourbookLoggedIn, props.firebaseUser])

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    const toggleLogo = (value) => {
        setLogoVisible(value)
    }

    function rechnen(a, b, c) {
        const x = 1, y = a * b / c;
        return x - y
    }

    const ani = (value) => {
        rechnen(1, value, 200)
        Animated.timing(scale, {
                toValue: value,
                duration: 100,
                useNativeDriver: true
            }
        ).start();
    }

    function handelLoginPressed() {
        props.setConfDispatch(username, password)
        props.getUserDispatch()
        console.log("halalsdsagjb")
        // props.getUserDispatch(props.Communication.urlBase, {auth: {
        //         username: username,
        //         password: password
        //     }})
    }

    return (
        <SafeAreaView>
            <KeyboardAwareScrollView
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={false}
                contentContainerStyle={{height: "100%"}}
                onKeyboardWillShow={() => {setLogoVisible(false)}}
                onKeyboardWillHide={() => {setLogoVisible(true)}}
                //onMomentumScrollEnd={event => ani(rechnen(1, event.nativeEvent.contentOffset.y, 200))}
            >
                <View style={{flex:1, justifyContent:'flex-start', height:'100%'}}>
                    { logoVisible &&
                        <View style={{paddingTop: 30, alignItems:"center"}}>
                            <Image
                                PlaceholderContent={<ActivityIndicator size='large'/>}
                                placeholderStyle={{backgroundColor: "transparent"}}
                                source={logo}
                                style={{height: 200, width: 200}}
                            />
                        </View>
                    }
                    <Text style={{alignSelf: "center", paddingTop: 20, paddingBottom: 20,fontSize: 20}}>OURBOOK</Text>
                    <View>
                        <Input placeholder="username" value={username} onChangeText={value => setUsername(value)} />
                        <Input secureTextEntry={true} placeholder="password" value={password} onChangeText={value => setPassword(value)} />
                        <Text style={{textDecorationLine: 'underline', paddingLeft: 10, paddingBottom: 20}}  onPress={() => props.navigation.navigate("resetRassword")}>Passwort vergessen?</Text>
                        <Button title="Login" style={{paddingLeft: 10, paddingRight: 10}} buttonStyle={{ backgroundColor: 'black'}} onPress={() => {
                            handelLoginPressed()
                        }}/>
                        <Text style={{textDecorationLine: 'underline',alignSelf: "center", paddingTop: 20}}  onPress={() => props.navigation.navigate("register")}>neuen Account erstellen</Text>
                    </View>
                </View>
            </KeyboardAwareScrollView>
            <Overlay isVisible={visible} style={{backgroundColor: "green"}} onBackdropPress={toggleOverlay}>
                <Text>{props.user.error}</Text>
            </Overlay>
        </SafeAreaView>
    )
}

const mapStateToProps = state => {
    return {
        user: state.appReducer.user,
        loggedIn: state.appReducer.loggedIn,
        communication: state.appReducer.communication,
        firebaseUser: state.appReducer.firebaseUser,
    }
}

const mapDispatchToProps = dispatch => ({
    setConfDispatch(username, password) {
        dispatch(setConf({username: username, password: password}))
    },
    getUserDispatch() {
        dispatch(getUser())
    },
    firebaseLoginSuccessDispatch() {
        dispatch(firebaseLoginSuccess())
    },
    firebaseLoginFailureDispatch() {
        dispatch(firebaseLoginFailure())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen)