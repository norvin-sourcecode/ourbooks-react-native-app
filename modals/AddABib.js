import {ActivityIndicator, Alert, Text, View, StyleSheet, TouchableOpacity, VirtualizedList} from "react-native";
import React, {useEffect, useState} from "react";
import { connect } from "react-redux";
import {ButtonGroup, Card, Input, Overlay, Button, ListItem, SearchBar} from "react-native-elements";
import {AntDesign, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {BarCodeScanner} from "expo-barcode-scanner";
import {getFriends, sendFriendRequest} from "../reducers/appSlice";

const AddABib = (props) => {
    //testcommit gitmigiration
    const [bIndex, setBIndex] = useState(0);
    const tabs = ['mit einem/er Freund*in', 'mit einer Gruppe']
    const [scannerDa, setScannerDa] = useState(false)
    const [refreshing, setRefreshing] = useState(false);

    const [scanned, setScanned] = useState(false);

    const [visible, setVisible] = useState(false);

    const [scannedData, setScannedData] = useState(false);

    const [friendsList, setFriendsList] = useState([])
    const [valid, setValid] = useState(false)

    const [search, setSearch] = useState("")

    const [newFriendUsername, setNewFriendUsername] = useState("")

    const [newGBibName, setNewGBibName] = useState("")
    const [newGBibMemberName, setNewGBibMemberName] = useState("")
    const [newGBibMemberNameList, setnewGBibMemberNameList] = useState([])

    const [newGBibMemberIdList, setNewGBibMemberIdList] = useState([])

    const [newGBibMemberId, setNewGBibMemberId] = useState("")

    useEffect(()=>{

    },[newGBibMemberIdList])

    useEffect(() => {
        const tmp = []
        props.friends.friendsList.map((friend) => {
            tmp.push(friend)
        })
        if (tmp.length === 0) {
            setFriendsList([{
                username: "NOFRIENDS99999999999999999999999",
            }])
        } else {
            setFriendsList(tmp)
        }
    }, [props.friends]);

    const wait = (timeout) => {
        return new Promise(resolve => setTimeout(resolve, timeout));
    }

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        props.getFriendsDispatch()
        wait(2000).then(() => setRefreshing(false));
    }, []);

    function handelAnfageSchickenButtonOnPress() {
        console.log("GBib create ")
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

    function getItem (data, index) {
        return data[index]
    }

    function getItemCount (data) {
        return data.length
    }

    const Item = ({ friend, index}) => (
        <View key={index + "rerererreererste"}>
            {friend.username === "NOFRIENDS99999999999999999999999" &&
                <View style={{height: 450, justifyContent: "center"}}>
                    <Text style={{alignSelf:"center"}}>keine Freund*innen</Text>
                </View>
            }
            {friend.username !== "NOFRIENDS99999999999999999999999" &&
                <ListItem key={index + "list-item-freuftfdrdrdddndesliste"} bottomDivider>
                    <ListItem.Content>
                        <ListItem.Title>{friend.username}</ListItem.Title>
                        { !newGBibMemberIdList.includes(friend.id) &&
                            <Button title="+" onPress={()=>{
                                setNewGBibMemberIdList([...newGBibMemberIdList, friend.id])
                            }}
                            />
                        }
                    </ListItem.Content>
                </ListItem>
            }
        </View>
    );

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
                <View style={{width: "100%"}}>
                    <SearchBar
                        containerStyle={{alignSelf: "center",paddingRight:3, paddingLeft:3, height:50, backgroundColor: "transparent",paddingTop:24, paddingBottom:20}}
                        inputStyle={{height:35, color: "white"}}
                        style={{height:35}}
                        leftIconContainerStyle={{color: "white"}}
                        inputContainerStyle={{height:35, backgroundColor:"#565a63"}}
                        placeholder="suche..."
                        onChangeText={value => setSearch(value)}
                        value={search}
                        platform={"ios"}
                        cancelButtonTitle="abbrechen"
                        cancelButtonProps={{color: "#fdd560"}}
                    />
                    <View style={{flexDirection:"column", width:"50%"}}>
                        <Text style={{paddingLeft: 10}}>Mitglieder:</Text>
                        {newGBibMemberIdList.map((name)=><Text key={name+"key"}>{name}</Text>)}
                    </View>
                    <View>
                        { bIndex === 0 &&
                            <View>
                                <VirtualizedList
                                    data={friendsList}
                                    initialNumToRender={5}
                                    renderItem={({item, index}) => <Item friend={item} index={index} />}
                                    keyExtractor={(item, index)=> 'key'+index+item.username+Math.random()}
                                    getItemCount={getItemCount}
                                    getItem={getItem}
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />
                            </View>
                        }
                        { bIndex === 1 &&
                            <View>
                                <Input containerStyle={{paddingTop:10}} placeholder="name" value={newGBibName} onChangeText={value => setNewGBibName(value)} />
                            </View>
                        }
                    </View>
                </View>
            </View>
            <View style={{width: "100%", height:"15%", justifyContent: "flex-end"}}>
                <View style={{width: "100%", padding: 10, paddingTop:5, paddingBottom:12.5}}>
                    <Button
                        onPress={()=>{
                            if (bIndex ===0 ) {
                                setBIndex(1)
                            }
                            if (bIndex === 1) {
                                handelAnfageSchickenButtonOnPress()
                            }
                        }}
                        titleStyle={{color: "#fdd560", fontWeight: "bold"}}
                        disabledStyle={{backgroundColor:"#c0c0c0"}}
                        disabledTitleStyle={{color:"white"}}
                        buttonStyle={{height: 50,width: "100%", alignSelf: "center", backgroundColor: "#2b2e32"}}
                        title={bIndex === 0 ? "weiter" : "los!"}
                        />
                </View>
            </View>
        </View>
    );
}

const mapStateToProps = state => {
    return {
        friends: state.appReducer.friends,
    }
}

const mapDispatchToProps = dispatch => ({
    getFriendsDispatch() {
        dispatch(getFriends())
    },
    sendFriendRequestDispatch(username) {
        dispatch(sendFriendRequest({username: username}))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(AddABib)