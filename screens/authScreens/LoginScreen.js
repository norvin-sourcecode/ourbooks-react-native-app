import React, {useEffect, useState} from "react";
import {
    ActivityIndicator,
    Animated, Dimensions,
    ImageBackground,
    Keyboard,
    KeyboardAvoidingView,
    SafeAreaView,
    Text, useWindowDimensions,
    View
} from "react-native";
import {connect} from "react-redux";
import {Button, Image, Input, Overlay} from "react-native-elements";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {firebaseLoginFailure, firebaseLoginSuccess, getUser, setConf} from "../../reducers/appSlice";
import logo from "./ourbooklogo512x512.png"
import newLogo from "./newlogo.png"
import {current} from "@reduxjs/toolkit";
import FirebaseInstance from "../../config/firebase";
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import {styles} from "react-native-curved-bottom-bar/src/components/CurvedBottomBar/components/navigator/styles";

const auth = FirebaseInstance.auth()

const LoginScreen = (props) => {

    const deviceWidth = Dimensions.get('window').width
    const deviceHeight = Dimensions.get('window').height

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const [firebaseUser, setFirebaseUser] = useState({})

    const [visible, setVisible] = useState(false);
    const [visibleRegister, setVisibleRegister] = useState(false);


    const [keyboardStatus, setKeyboardStatus] = useState(undefined);
    const scale = React.useRef(new Animated.Value(1)).current;
    const scale2 = React.useRef(new Animated.Value(0)).current;


    useEffect(() => {
        const willShowSubscription = Keyboard.addListener("keyboardWillShow", () => {
            Animated.parallel([
                Animated.timing(scale, {
                    duration: 250,
                    toValue: 0,
                    useNativeDriver: true
                }),
            ]).start();
            setKeyboardStatus("keyboard will show");
        });
        const showSubscription = Keyboard.addListener("keyboardDidShow", () => {
            setKeyboardStatus("keyboard shown");
        });
        const willHideSubscription = Keyboard.addListener("keyboardWillHide", () => {
            Animated.parallel([
                Animated.timing(scale, {
                    duration: 250,
                    toValue: 1,
                    useNativeDriver: true
                }),
            ]).start();
            setKeyboardStatus("keyboard will hide");
        });
        const hideSubscription = Keyboard.addListener("keyboardDidHide", () => {
            setKeyboardStatus("keyboard hidden");
        });

        return () => {
            willShowSubscription.remove();
            showSubscription.remove();
            willHideSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    useEffect(() => {
        setFirebaseUser(props.firebaseUser)
        if (props.user.error != null) {
            setVisible(true);
        }
        if (props.user.error == null) {
            setVisible(false);
        }
        if (props.ourbookLoggedIn) {
            // auth.signInWithCustomToken(props.communication.token)
            //     .then((credentials) =>  {
            //         props.firebaseLoginSuccessDispatch(credentials)
            //     })
            //     .catch((err) => {
            //         props.firebaseLoginFailureDispatch()
            //     })
            // props.navigation.navigate("main")
        }
    }, [props.user, props.ourbookLoggedIn, props.firebaseUser])

    function handelLoginPressed() {
        props.setConfDispatch(username, password)
        props.getUserDispatch()
    }

    function handleRegisterPressed() {
        setVisibleRegister(true)
        Animated.parallel([
            Animated.timing(scale2, {
                duration: 150,
                toValue: 1,
                useNativeDriver: true
            }),
        ]).start(()=>{
            props.navigation.navigate("register")
            wait(400).then(() =>  setVisibleRegister(false));
        });
    }

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const toggleOverlay = () => {
        setVisible(!visible)
    }

    return (
        <SafeAreaView style={{backgroundColor: "white"}}>
            <Animated.View style={{alignItems: "center", right: "2%", paddingBottom: "4%", transform: [{scale}]}}>
                <Animated.Image
                    PlaceholderContent={<ActivityIndicator size='large'/>}
                    placeholderStyle={{backgroundColor: "transparent"}}
                    source={newLogo}
                    style={{height: ((deviceHeight/100)*30), width: ((deviceHeight/100)*30)}}
                />
            </Animated.View>
            <Animated.View style={{transform: [
                    {
                        translateX: scale.interpolate({
                            inputRange: [0, 1],
                            outputRange: [0, 0]
                        })
                    },
                    {
                        translateY: scale.interpolate({
                            inputRange: [0, 1],
                            outputRange: [-((deviceHeight/100)*30), 0]
                        })
                    },
                    {
                        scaleX: scale.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 1]
                        })
                    },
                    {
                        scaleY: scale.interpolate({
                            inputRange: [0, 1],
                            outputRange: [1, 1]
                        })
                    }
                ]
                }}>
                <View style={{backgroundColor:"#2b2e32", width: "100%",height: '100%', borderTopLeftRadius:"75%"}}>
                    <View>
                        {!visibleRegister &&
                            <View>
                                <View style={{paddingTop: "10%", paddingLeft: "10%", paddingBottom: "2.5%", paddingRight: "10%"}}>
                                    <Text numberOfLines={1} adjustsFontSizeToFit={true} style={{color: "white", fontSize: 40, fontWeight: "bold"}}>Willkommen bei OURBOOKS!</Text>
                                </View>
                                <View style={{padding: "2.5%", justifyContent: "center", paddingTop: "15%"}}>
                                    <Input inputStyle={{color: "black"}} placeholder="username" value={username} onChangeText={value => setUsername(value)}/>
                                    <Input inputStyle={{color: "black"}} secureTextEntry={true} placeholder="password" value={password} onChangeText={value => setPassword(value)}/>
                                    <Button
                                        title="login"
                                        titleStyle={{color: "#2b2e32", fontWeight: "bold"}}
                                        style={{paddingLeft: 10, paddingRight: 10}}
                                        buttonStyle={{backgroundColor: 'white'}}
                                        onPress={() => {
                                            handelLoginPressed()
                                        }}
                                    />
                                    <Text style={{textDecorationLine: 'underline', alignSelf: "center", paddingTop: 20, color: "white"}} onPress={() => {
                                        //props.navigation.navigate("register")
                                        handleRegisterPressed()
                                    }}>neuen Account erstellen</Text>
                                </View>
                            </View>
                        }
                    </View>
                </View>
            </Animated.View>
            <Overlay visible={visibleRegister}>
                <Animated.View style={[{backgroundColor:"white"},{transform: [
                        {
                            translateX: scale2.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 0]
                            })
                        },
                        {
                            translateY: scale2.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, 0]
                            })
                        },
                        {
                            scaleX: scale2.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, ((deviceHeight/100)*100)]
                            })
                        },
                        {
                            scaleY: scale2.interpolate({
                                inputRange: [0, 1],
                                outputRange: [0, ((deviceHeight/100)*100)]
                            })
                        }
                    ]
                }]}>
                    <View style={{width: 1, height: 1}}>
                    </View>
                </Animated.View>
            </Overlay>
            <Overlay isVisible={visible} style={{backgroundColor: "green"}} onBackdropPress={toggleOverlay}>
                <Text>{props.user.error}</Text>
            </Overlay>
        </SafeAreaView>
        /*<SafeAreaView style={{backgroundColor: "#2b2e32"}}>
            <KeyboardAwareScrollView
                extraHeight={130}
                resetScrollToCoords={{ x: 0, y: 0 }}
                scrollEnabled={false}
                contentContainerStyle={{height: "100%"}}
                onKeyboardWillShow={hideLogo}
                //onScrollAnimationEnd={() => {toggleLogo(false)}}
                //onMomentumScrollEnd={() => {toggleLogo(false)}}
                //onKeyboardDidShow={() => {toggleLogo(false)}}
                onKeyboardWillHide={() => {
                    setLogoVisible(true)
                    showLogo()}}
                //onKeyboardDidHide={() => {toggleLogo(true)}}
                //onMomentumScrollEnd={event => ani(rechnen(1, event.nativeEvent.contentOffset.y, 200))}
            >

                { logoVisible &&
                <Animated.View style={{paddingTop: 30, alignItems:"center", transform: [{scale}]}}>
                    <Animated.Image
                        PlaceholderContent={<ActivityIndicator size='large'/>}
                        placeholderStyle={{backgroundColor: "transparent"}}
                        source={logo}
                        style={{height: 200, width: 200}}
                    />
                </Animated.View>
                }
                <View style={{flex:1, justifyContent:'flex-start', height:'100%'}}>
                    <Text style={{alignSelf: "center", paddingTop: 20, paddingBottom: 20,fontSize: 20, color:"#fdd560", fontWeight: "bold"}}>OURBOOK</Text>
                    <View>
                        <Input inputStyle={{color: "#fdd560"}} placeholder="username" value={username} onChangeText={value => setUsername(value)} />
                        <Input inputStyle={{color: "#fdd560"}} secureTextEntry={true} placeholder="password" value={password} onChangeText={value => setPassword(value)} />
                        <Text style={{color: "#fdd560",textDecorationLine: 'underline', paddingLeft: 10, paddingBottom: 20}}  onPress={() => props.navigation.navigate("resetRassword")}>Passwort vergessen?</Text>
                        <Button title="login" titleStyle={{color: "#2b2e32"}} style={{paddingLeft: 10, paddingRight: 10}} buttonStyle={{ backgroundColor: '#fdd560'}} onPress={() => {
                            handelLoginPressed()
                        }}/>
                        <Text style={{textDecorationLine: 'underline',alignSelf: "center", paddingTop: 20, color: "#fdd560"}}  onPress={() => props.navigation.navigate("register")}>neuen Account erstellen</Text>
                    </View>
                </View>
            </KeyboardAwareScrollView>
            <Overlay isVisible={visible} style={{backgroundColor: "green"}} onBackdropPress={toggleOverlay}>
                <Text>{props.user.error}</Text>
            </Overlay>
        </SafeAreaView>*/
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