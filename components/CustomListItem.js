
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, VirtualizedList} from 'react-native';
import {Button, Card, Divider, ListItem, Overlay} from "react-native-elements";
import {AntDesign, Entypo, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {
    deleteFriend,
    getBibs,
    getBooksForBib, getBooksOfUser,
    getFriendById,
    getUserBibBooks,
    respondFriendRequest,
    setShownBib,
    setShownBook
} from "../reducers/appSlice";
import {connect} from "react-redux";
import BookCover from "./BookCover";

const CustomListItem = (props) => {

    const [bibBooksList, setBibBooksList] = useState([])
    const [friendsBooksList, setFriendsBooksList] = useState([])

    const [friendOverlayVisible, setFriendOverlayVisible] = useState(false);
    const [shownFriend, setShownFriend] = useState({})

    const [requestFriendName, setRequestFriendName] = useState("")

    useEffect(() => {
        if (props.i.kind === 2) {       //bibs
            setBibBooksList(props.i.inhalt.booksList)
        }
        if (props.i.kind === 3) {       //friends
            setFriendsBooksList(props.i.inhalt.booksList)
            setShownFriend(props.i.inhalt)
        }
        if (props.i.kind === 1) {       //friendrequests
            setBibBooksList([])
        }
        if (props.i.kind === 4) {       //bibRequests
            setBibBooksList([])
        }
    },[props.friends, props.bibs])

    useEffect(()=> {
        setShownFriend(props.i.inhalt)
        if (props.i.kind === 1 && props.friends.friend.id !== props.i.inhalt.id) {
            props.getFriendByIdDispatch(props.i.sender)
            setRequestFriendName(props.friends.friend.username)
        }
    },[props.friends])

    function handleBookPress(book) {
        props.setShownBookDispatch(book)
        props.navigation.navigate("book")
    }

    function handleBibPress(bib) {
        props.setShownBibDispatch(bib)
        props.navigation.navigate("homeStackScreen3")
    }

    const toggleFriendOverlay = () => {
        setFriendOverlayVisible(!friendOverlayVisible);
    };

    const handleAcceptBibRequestPress = (id) => {
        //props.respondeBibRequestDispatch(id, true)
    }

    const handleDeclineBibRequestPress = (id) => {
        //props.respondeBibRequestDispatch(id, false)
    }

    const handelAcceptFriendRequestPress = (id) => {
        props.respondFriendRequestDispatch(id, true)
    }

    const handelDeclineFriendRequestPress = (id) => {
        props.respondFriendRequestDispatch(id, false)
    }

    function getItem (d, index) {
        return d[index]
    }

    function getItemCount (d) {
        return d.length
    }

    const BibBook = ({ book, index}) => (
        <ListItem key={index+"list-item-home-userBib-booksList"} containerStyle={{backgroundColor: "transparent"}}>
            <Card key={index+"list-item-card-home-userBib-booksList"} containerStyle={{margin: 0, padding: 0}}>
                <TouchableOpacity key={index+"touch-flaeche-home-userBib-booksList"} onPress={() => {
                    handleBookPress(book)
                }}>
                    <View>
                        {book.pictureUrl.length === 0 &&
                        <View style={{justifyContent: "center",width: 75, height: 110}}>
                            <Text style={{alignSelf: "center"}}>Titel:</Text>
                            <Text> </Text>
                            <Text style={{alignSelf: "center"}}>{book.titel}</Text>
                        </View>
                        }
                        {book.pictureUrl.length !== 0 &&
                            <BookCover url={book.pictureUrl} ratio={book.ratio}/>
                        // <Card.Image style={{width: 75, height:110}} resizeMode="contain" source={{url:book.pictureUrl}}>
                        // </Card.Image>
                        }
                    </View>
                </TouchableOpacity>
            </Card>
        </ListItem>
    );

    return (
        <View key={props.index+"viewlistbibuws"} style={{ paddingLeft: 2, paddingRight: 2 }}>
            <Overlay isVisible={friendOverlayVisible} onBackdropPress={toggleFriendOverlay}>
                <View style={{width: 250}}>
                    <Text>{shownFriend.username}</Text>
                    <Text>{shownFriend.firstname} {shownFriend.lastname}</Text>
                    <Text>{shownFriend.email}</Text>
                    <Button style={{paddingTop:10}} buttonStyle={{ backgroundColor:"white"}} titleStyle={{color: "#2b2e32"}} title="Freund*in entfernen" onPress={()=> {props.deleteFriendDispatch(shownFriend.id)}}/>
                </View>
            </Overlay>
            <Card containerStyle={{padding: 0, paddingTop: 0, margin:8, marginBottom:0, borderWidth:0, backgroundColor: "white", borderRadius:10}}>
                { props.i.kind === 1 &&
                    <View>
                        <View>
                            <View style={{flexDirection: "row",width:"100%", justifyContent: "flex-start"}}>
                                <Ionicons style={{padding:10}} name="person" size={30} color="#2b2e32" />
                                <Text style={{paddingTop: 10, paddingBottom: 10,alignSelf:"center", fontWeight: "bold", color:"#2b2e32", fontSize: 20}}>{requestFriendName}</Text>
                            </View>
                            <Divider color="#2b2e32" style={{width: "95%", alignSelf: "center"}} width={1.2}/>
                            <View style={{height: 111}}></View>
                        </View>
                        <View style={{position:"absolute",backgroundColor:"black", opacity:0.6, height:"100%", width: "100%", borderRadius:10}}>
                        </View>
                        <View style={{position:"absolute", height:"100%", width: "100%", borderRadius:10}}>
                            <View style={{flexDirection: "row",width:"100%", height:"100%"}}>
                                <View style={{width: "50%",justifyContent: "center", alignSelf: "center"}}>
                                    <Text style={{paddingTop:45,alignSelf: "center",color: "white", fontWeight: "bold", fontSize: 20}}>{"Freundschafts-\nanfrage"}</Text>
                                </View>

                                <View style={{flexDirection: "row",width: "50%", justifyContent: "space-between",paddingLeft:15,paddingRight:15, paddingTop: 45, alignSelf: "center"}}>
                                    <TouchableOpacity onPress={()=>{handelAcceptFriendRequestPress(props.i.inhalt.id)}} style={{height:65, width: 65,borderRadius:35, backgroundColor: "white"}}>
                                        <AntDesign name="checkcircle" size={65} color="green" />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={()=>{handelDeclineFriendRequestPress(props.i.inhalt.id)}} style={{height:65, width: 65,borderRadius:35, backgroundColor: "white"}}>
                                        <AntDesign name="closecircle" size={65} color="red" />
                                    </TouchableOpacity></View>
                            </View>
                        </View>
                    </View>
                }
                { props.i.kind === 2 &&
                    <View>
                        { props.i.inhalt.id !== null &&
                        <TouchableOpacity onPress={()=> {
                            handleBibPress(props.i.inhalt)
                        }}>
                            <View style={{flexDirection: "row",width:"100%", justifyContent: "flex-start"}}>
                                <Ionicons style={{padding: 10}} name="library" size={30} color="#2b2e32"/>
                                <Text style={{paddingTop: 10, paddingBottom: 10,alignSelf:"center", fontWeight: "bold", color:"#2b2e32", fontSize: 20}}>{props.i.inhalt.name}</Text>
                            </View>
                            <Divider color="#2b2e32" style={{width: "95%", alignSelf: "center"}} width={1.2}/>
                            <VirtualizedList
                                style={{alignSelf: "flex-start"}}
                                horizontal={true}
                                data={bibBooksList}
                                scrollEnabled={bibBooksList.length > 3}
                                initialNumToRender={3}
                                renderItem={({item, index}) => <BibBook book={item} index={index} />}
                                keyExtractor={(item, index)=> 'key'+index+item.id}
                                getItemCount={getItemCount}
                                getItem={getItem}
                            />
                        </TouchableOpacity>
                        }
                    </View>
                }
                { props.i.kind === 3 &&
                    <View>
                        <TouchableOpacity onPress={()=> {
                            toggleFriendOverlay()
                        }}>
                            <View style={{flexDirection: "row",width:"100%", justifyContent: "flex-start"}}>
                                <Ionicons style={{padding:10}} name="person" size={30} color="#2b2e32" />
                                <Text style={{paddingTop: 10, paddingBottom: 10,alignSelf:"center", fontWeight: "bold", color:"#2b2e32", fontSize: 20}}>{props.i.inhalt.username}</Text>
                            </View>
                            <Divider color="#2b2e32" style={{width: "95%", alignSelf: "center"}} width={1.2}/>
                            <VirtualizedList
                                style={{alignSelf: "flex-start"}}
                                horizontal={true}
                                data={friendsBooksList}
                                scrollEnabled={friendsBooksList.length > 3}
                                initialNumToRender={3}
                                renderItem={({item, index}) => <BibBook book={item} index={index} />}
                                keyExtractor={(item, index)=> 'key'+index+item.id}
                                getItemCount={getItemCount}
                                getItem={getItem}
                            />
                        </TouchableOpacity>
                    </View>
                }
            </Card>
        </View>
    )
};


const mapStateToProps = state => {
    return {
        user: state.appReducer.user,
        friends: state.appReducer.friends,
        bibs: state.appReducer.bibs,
    }
}

const mapDispatchToProps = dispatch => ({
    setShownBibDispatch(bib) {
        dispatch(setShownBib(bib))
    },
    setShownBookDispatch(book) {
        dispatch(setShownBook(book))
    },
    getFriendByIdDispatch(id) {
        dispatch(getFriendById({id: id}))
    },
    getBooksForBibDispatch(id) {
        dispatch(getBooksForBib({id: id}))
    },
    respondFriendRequestDispatch(id, accept) {
        dispatch(respondFriendRequest({id: id, accept: accept}))
    },
    deleteFriendDispatch(id) {
        dispatch(deleteFriend({id: id}))
    },
    getBooksOfUserDispatch(id) {
        dispatch(getBooksOfUser({id: id}))
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(CustomListItem)