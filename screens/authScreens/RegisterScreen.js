import React, {useState} from "react";
import {useEffect} from "react";
import {ActivityIndicator, Alert, SafeAreaView, Text, View} from "react-native";
import {connect} from "react-redux";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {AntDesign} from "@expo/vector-icons";
import {Button, Input, Overlay} from "react-native-elements";
import {register} from "../../reducers/appSlice";

const RegisterScreen = (props) => {
    //feed
    const [username, setUsername] = useState("")
    const [firstname, setFirstname] = useState("")
    const [lastname, setLastname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [visible, setVisible] = useState(false);

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (props.registerProcess.loading) {
            setLoading(true)
        }
        if (!props.registerProcess.loading) {
            setLoading(false)
        }
        if (props.registerProcess.success) {
            props.navigation.navigate("login")
        }
        if (props.registerProcess.error !== null) {
            setVisible(true)
        }
    }, [props.registerProcess])

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    function usernameIsValid(toTest) {
        // min. 4 Zeichen
        // max 12 Zeichen
        // nur Buchstaben und Zahlen
        return /^[a-zA-Z0-9]{4,12}$/.test(toTest);
    }

    function nameIsValid(toTest) {
        // nur Buchstaben
        return /[a-zA-Z]$/.test(toTest);
    }

    function passwordIsValid(toTest) {
        // min. eine Zahl
        // min. eine kleingeschriebener Buchstabe
        // min. ein großgeschriebener Buchstabe
        // min. 6 Zeichen
        return /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/.test(toTest);
    }

    function emailIsValid(toTest) {
        // string@string.string
        return /\S+@\S+\.\S+/.test(toTest);
    }

    function handelRegisterPressed() {
        if (usernameIsValid(username)) {
            if (password === confirmPassword) {
                if (passwordIsValid(password)) {
                    if (nameIsValid(firstname)) {
                        if (nameIsValid(lastname)) {
                            if (emailIsValid(email)) {
                                props.registerDispatch(email,firstname,lastname,username,password)
                                Alert.alert(
                                    "Email bestätigen",
                                    "Bitte überprüfen Sie Ihr Postfach und bestätigen Sie die angegebene Email-Adresse",
                                    [
                                        {
                                            text: "OK",
                                        },
                                    ],
                                    { cancelable: false }
                                );
                            } else {
                                alert("Eingabe überprüfen");
                            }
                        } else {
                            alert("Eingabe überprüfen");
                        }
                    } else {
                        alert("Eingabe überprüfen");
                    }
                } else {
                    alert("Eingabe überprüfen");
                }
            } else {
                alert("Eingabe überprüfen");
            }
        } else {
            alert("Eingabe überprüfen");
        }
    }

    return (
        <SafeAreaView style={{backgroundColor: "white"}}>
            <Overlay isVisible={visible} style={{backgroundColor: "green"}} onBackdropPress={toggleOverlay}>
                <Text>{props.registerProcess.error !== null && props.registerProcess.error.message}</Text>
            </Overlay>
            { loading &&
            <View style={{ flex: 1, alignItems: 'center', justifyContent: "center" }}>
                <ActivityIndicator />
            </View>
            }
            {!loading &&
            <View>
                <View style={{
                    paddingRight: 10,
                    paddingTop: 20,
                    flexDirection: 'row',
                    justifyContent: 'center',
                    width: "100%"
                }}>
                    <AntDesign style={{alignSelf: 'center'}} name="doubleleft" size={15} color="#2b2e32"
                               onPress={() => props.navigation.navigate('login')}/>
                    <Text style={{textDecorationLine: 'underline', paddingLeft: 5, color: "#2b2e32"}}
                          onPress={() => props.navigation.navigate("login")}>zurück zum Login</Text>
                </View>
                <KeyboardAwareScrollView
                    extraHeight={140}
                    resetScrollToCoords={{x: 0, y: 0}}
                    scrollEnabled={false}
                    contentContainerStyle={{height: "100%"}}
                >
                    <View style={{flex: 1, height: '100%', paddingTop: 75}}>
                        <View>
                            <Input
                                inputStyle={{color: "#2b2e32"}}
                                type="username"
                                placeholder="username"
                                value={username}
                                onChangeText={value => setUsername(value)}
                                errorMessage={!usernameIsValid(username) && username.length >= 1 && "4-12 Buchstaben und Zahlen"}/>
                            <Input
                                inputStyle={{color: "#2b2e32"}}
                                placeholder="firstname"
                                value={firstname}
                                onChangeText={value => setFirstname(value)}
                                errorMessage={!nameIsValid(firstname) && firstname.length >= 1 && "Vorname ungültig"}/>
                            <Input
                                inputStyle={{color: "#2b2e32"}}
                                placeholder="lastname"
                                value={lastname}
                                onChangeText={value => setLastname(value)}
                                errorMessage={!nameIsValid(lastname) && lastname.length >= 1 && "Nachname ungültig"}/>
                            <Input
                                inputStyle={{color: "#2b2e32"}}
                                placeholder="email"
                                value={email}
                                onChangeText={value => setEmail(value)}
                                errorMessage={!emailIsValid(email) && email.length >= 1 && "Email ungültig"}/>
                            <Input
                                inputStyle={{color: "#2b2e32"}}
                                secureTextEntry={true}
                                placeholder="password"
                                value={password}
                                onChangeText={value => setPassword(value)}
                                errorMessage={!passwordIsValid(password) && password.length >= 1 && "min. 6 Zeichen mit Zahlen und gemischter Groß- und Kleinschreibung"}/>
                            <Input
                                inputStyle={{color: "#2b2e32"}}
                                secureTextEntry={true}
                                placeholder="confirm password"
                                value={confirmPassword}
                                onChangeText={value => setConfirmPassword(value)}
                                errorMessage={password !== confirmPassword && confirmPassword.length >= 1 && "Passwörter stimmen nicht überein"}/>
                            <Button
                                buttonStyle={{backgroundColor: '#2b2e32'}}
                                title="Account erstellen"
                                style={{paddingLeft: 10, paddingRight: 10}}
                                titleStyle={{color: "white"}}
                                onPress={handelRegisterPressed}/>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </View>
            }
        </SafeAreaView>
    );
};

const mapStateToProps = state => {
    return {
        registerProcess: state.appReducer.registerProcess,
    }
}

const mapDispatchToProps = dispatch => ({
    registerDispatch(email,firstname,lastname,username,password) {
        dispatch(register({userData:{
                email: email,
                firstname: firstname,
                id: 0,
                lastname: lastname,
                username: username
            }, password: password}))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen)