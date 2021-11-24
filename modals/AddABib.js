import {ActivityIndicator, Alert, Text, View, StyleSheet, TouchableOpacity} from "react-native";
import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import {ButtonGroup, Card, Input, Overlay, Button} from "react-native-elements";
import {AntDesign, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {BarCodeScanner} from "expo-barcode-scanner";
import {sendFriendRequest} from "../reducers/appSlice";

const AddABib = (props) => {

    const [bIndex, setBIndex] = useState(0);
    const tabs = ['mit einem/er Freund*in', 'mit einer Gruppe']
    const [scannerDa, setScannerDa] = useState(false)

    const [scanned, setScanned] = useState(false);

    const [visible, setVisible] = useState(false);

    const [scannedData, setScannedData] = useState(false);


    const [valid, setValid] = useState(false)

    const [newFriendUsername, setNewFriendUsername] = useState("")

    const [newGBibName, setNewGBibName] = useState("")
    const [newGBibMemberName, setNewGBibMemberName] = useState("")
    const [newGBibMemberNameList, setnewGBibMemberNameList] = useState([])

    useEffect(()=>{

    },[])

    function handelAnfageSchickenButtonOnPress() {
        if (bIndex === 0) {
            props.sendFriendRequestDispatch(newFriendUsername)
            setNewFriendUsername("")
            setVisible(false)
        }
        if (bIndex === 1) {
            console.log("GBib create ")
        }
    }

    const handlQRCodeScanned = ({ type, data }) => {
        setScanned(true)
        setScannedData(data)
        if (data.split(";")[0] === "OURBOOK") {
            setVisible(true)
            setNewFriendUsername(data.split(";")[1])
        } else {
            Alert.alert(
                "Dies ist kein OURBOOK-Nutzer...",
                "Probiere es nochmal indem du den QR-Code aus dem Profil der Person mit der du ein geteiltes Bücherregal eröffnen möchtest einscannst!",
                [
                    {
                        text: "OK",
                        onPress: () => setScanned(false)
                    },
                ],
                { cancelable: false }
            );
        }
        //props.getBookByIsbnFromServerDispatchAusloeser(props.Communication.urlBase,props.Communication.conf, data)
        //props.navigation.navigate("book")
        // alert(`type: ${type} & data: ${data} gescannt`);
    };



    return (
        <View style={{flex: 1, alignItems: "center", width: "100%", height:"100%"}}>
            <Overlay isVisible={visible} onBackdropPress={()=> {
                setVisible(false)
                setScanned(false)
            }} >
                <Text>{scannedData}</Text>
                <Button title="Freund*in hinzufügen" onPress={handelAnfageSchickenButtonOnPress} buttonStyle={{backgroundColor: "black"}} />
            </Overlay>
            <View style={{width: "100%", height:"85%"}}>
                <View style={{paddingLeft: 10,paddingTop: 10,paddingRight: 10,width:"100%" ,flexDirection: "row", justifyContent: "space-between"}}>
                    <View>
                        <Text onPress={() => props.navigation.navigate('main')} style={{color: "#565a63", fontSize:15,left: 6,top:4, textDecorationLine: 'underline', fontWeight: "bold"}}>schließen</Text>
                    </View>
                </View>
                <View style={{paddingLeft: 10,paddingTop: 30,paddingRight: 10}}>
                    <Text style={{fontWeight:"bold", fontSize:23}}>geteiltes Bücherregal erstellen...</Text>
                </View>
                <View style={{width: "100%", paddingTop:10}}>
                    <ButtonGroup disabled={true} containerStyle={{borderWidth:2, borderColor:"#2b2e32", backgroundColor:"transparent"}} buttonStyle={{backgroundColor:"transparent"}} textStyle={{color: "#2b2e32"}} selectedTextStyle={{color:"#2b2e32"}} selectedButtonStyle={{backgroundColor: '#fdd560'}} onPress={setBIndex} selectedIndex={bIndex} buttons={tabs} />
                </View>
                <View style={{width: "100%"}}>
                    { bIndex === 0 &&
                    <View>
                        <Text style={{paddingLeft: 10, paddingTop:20}}>QR-Code scannen:</Text>
                        { scannerDa &&
                            <View style={{alignSelf:"center", marginTop:10,height:250, width: 250, borderWidth:2, borderColor: "#2b2e32"}}>
                                <BarCodeScanner
                                    onBarCodeScanned={scanned ? undefined : handlQRCodeScanned}
                                    style={StyleSheet.absoluteFillObject}
                                />
                            </View>
                        }
                        { !scannerDa &&
                        <Button title="jetzt scannen" onPress={()=>{setScannerDa(!scannerDa)}} containerStyle={{alignSelf:"center", marginTop:10}} buttonStyle={{height:250, width: 250}}/>
                        }
                        <Text style={{paddingLeft: 10, paddingTop:30}}>über den Nutzernamen:</Text>
                        <Input placeholder="username" value={newFriendUsername} onChangeText={value => setNewFriendUsername(value)} />
                    </View>
                    }
                    { bIndex === 1 &&
                    <View>
                        <Text style={{paddingLeft: 10, paddingTop:20, textDecorationLine:"underline", fontWeight:"bold"}}>erstellen:</Text>
                        <Input containerStyle={{paddingTop:10}} placeholder="name" value={newGBibName} onChangeText={value => setNewGBibName(value)} />
                        <View style={{flexDirection:"row", width: "100%"}}>
                            <View style={{flexDirection:"column", width:"50%"}}>
                                <Text style={{paddingLeft: 10}}>Mitglieder:</Text>
                                {newGBibMemberNameList.map((name)=><Text key={name+"key"}>{name}</Text>)}
                            </View>
                            <View style={{flexDirection:"column", width: "50%"}}>
                                <Input style={{width: "50%"}} placeholder="username" value={newGBibMemberName} onChangeText={value => setNewGBibMemberName(value)} />
                                <Button title="+" onPress={()=>{
                                    if (newGBibMemberName.length === 0) {
                                        Alert.alert(
                                            "kein Nutzername",
                                            "bitte gib einen Nutzernamen ein!"
                                        )
                                    }
                                    const tmp = newGBibMemberNameList
                                    tmp.push(newGBibMemberName)
                                    setnewGBibMemberNameList(tmp)
                                    setNewGBibMemberName("")
                                }}/>
                            </View>
                        </View>
                        <Text style={{paddingLeft: 10, paddingTop:30}}>beitreten:</Text>
                    </View>
                    }
                </View>
            </View>
            <View style={{width: "100%", height:"15%", justifyContent: "flex-end"}}>
                <View style={{width: "100%", padding: 10, paddingTop:5, paddingBottom:12.5}}>
                    <Button
                        disabled={!valid}
                        onPress={()=>{handelAnfageSchickenButtonOnPress()}}
                        titleStyle={{color: "#fdd560", fontWeight: "bold"}}
                        disabledStyle={{backgroundColor:"#c0c0c0"}}
                        disabledTitleStyle={{color:"white"}}
                        buttonStyle={{height: 50,width: "100%", alignSelf: "center", backgroundColor: "#2b2e32"}}
                        title="los!" />
                </View>
            </View>
        </View>
    );
}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => ({
    sendFriendRequestDispatch(username) {
        dispatch(sendFriendRequest({username: username}))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(AddABib)