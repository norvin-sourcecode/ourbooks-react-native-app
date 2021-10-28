import React, {useState} from "react";
import {useEffect} from "react";
import {SafeAreaView, Text, View} from "react-native";
import { connect } from "react-redux";
import {Button, Input} from "react-native-elements";
import {AntDesign} from "@expo/vector-icons";

const ResetPasswordScreen = (props) => {

    const [username, setUsername] = useState("")

    useEffect(() => {
    }, [])

    return (
        <SafeAreaView style={{backgroundColor: "#2b2e32"}}>
            <View style={{paddingRight: 10,paddingTop:20, flexDirection: 'row', justifyContent: 'center', width: "100%"}}>
                <AntDesign style={{alignSelf: 'center'}} name="doubleleft" size={15} color="#fdd560" onPress={() => props.navigation.navigate('login')}/>
                <Text style={{textDecorationLine: 'underline', paddingLeft: 5, color: "#fdd560"}}  onPress={() => props.navigation.navigate("login")}>zurück zum Login</Text>
            </View>
            <View style={{paddingTop: 70, height: '100%'}}>
                <Input placeholder="username" value={username} onChangeText={value => setUsername(value)} />
                <Button buttonStyle={{ backgroundColor: '#fdd560'}} titleStyle={{color: "#2b2e32"}} title="Passwort zurücksetzen" style={{paddingLeft: 10, paddingRight: 10}} onPress={() => props.navigation.navigate("LoginScreen")}/>
            </View>
        </SafeAreaView>
    );
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordScreen)