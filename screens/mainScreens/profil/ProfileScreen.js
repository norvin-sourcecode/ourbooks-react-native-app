import React, {useRef, useState} from "react";
import {useEffect} from "react";
import { DraxProvider, DraxView } from 'react-native-drax';
import {
    FlatList, Image,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View,
    VirtualizedList
} from "react-native";
import SvgQRCode from 'react-native-qrcode-svg';
import { connect } from "react-redux";
import {
    Badge,
    Divider,
    ListItem,
    Button,
    Card,
    Avatar,
    Accessory,
    Input,
    Icon,
    Overlay,
    Header
} from "react-native-elements";
import {AntDesign, Entypo, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {KeyboardAwareScrollView} from "react-native-keyboard-aware-scroll-view";
import {
    deleteFriend,
    getFriends,
    getUser,
    getUserBibBooks,
    sendFriendRequest,
    setFavoriteBookByNum,
    setShownBook
} from "../../../reducers/appSlice";
import UserBibCard from "../../../components/UserBibCard";
import BookCover from "../../../components/BookCover";
import CustomFrienRequestButton from "../../../components/CustomFrienRequestButton";

const ProfilScreen = (props) => {

    const [fBook1, setfBook1] = useState({})
    const [fBook2, setfBook2] = useState({})
    const [fBook3, setfBook3] = useState({})

    const [userBibBooksList, setUserBibBooksList] = useState([])

    const [draggable, setDraggable] = useState(false)

    const [fBookChooserOverlay, setfBookChooserOverlay] = useState(false)
    const [qrCodeOverlayVisible, setQrCodeOverlayVisible] = useState(false)

    const [addFBList1, setAddFBList1] = useState([])
    const [addFBList2, setAddFBList2] = useState([])
    const [addFBList3, setAddFBList3] = useState([])

    const [whichFBook, setWhichFBook] = useState(1)

    useEffect(() => {
        if (!props.userBib.loaded) {
            props.getUserBibBooksDispatch()
        }
    }, [props.userBib])


    useEffect(() => {
        setUserBibBooksList(props.userBib.booksList)
        const tmp1 = []
        if (props.userBib.booksList.length > 0) {
            tmp1.push(props.userBib.booksList[0])
            if (props.userBib.booksList.length > 1) {
                tmp1.push(props.userBib.booksList[1])
                if (props.userBib.booksList.length > 2) {
                    tmp1.push(props.userBib.booksList[2])
                }
            }
        }
        setAddFBList1(tmp1)
        const tmp2 = []
        if (props.userBib.booksList.length > 3) {
            tmp2.push(props.userBib.booksList[3])
            if (props.userBib.booksList.length > 4) {
                tmp2.push(props.userBib.booksList[4])
                if (props.userBib.booksList.length > 5) {
                    tmp2.push(props.userBib.booksList[5])
                }
            }
        }
        setAddFBList2(tmp2)
        const tmp3 = []
        if (props.userBib.booksList.length > 6) {
            tmp3.push(props.userBib.booksList[6])
            if (props.userBib.booksList.length > 7) {
                tmp3.push(props.userBib.booksList[7])
                if (props.userBib.booksList.length > 8) {
                    tmp3.push(props.userBib.booksList[8])
                }
            }
        }
        setAddFBList3(tmp3)
    }, [props.userBib]);

    useEffect(() => {
        setfBook1(props.userBib.favoriteBooks.fBook1)
        console.log(fBook1)
        setfBook2(props.userBib.favoriteBooks.fBook2)
        setfBook3(props.userBib.favoriteBooks.fBook3)
    }, [props.userBib.favoriteBooks])

    const toggleQrCodeOverlay = () => {
        setQrCodeOverlayVisible(!qrCodeOverlayVisible);
    };

    const toggleDraggable = () => {
        setDraggable(!draggable)
    }

    const togglefBookChooserOverlay = (num) => {
        setWhichFBook(num)
        setfBookChooserOverlay(!fBookChooserOverlay)
    }

    function UserQR() {
        return <SvgQRCode value={"OURBOOK;"+props.user.username+";"+props.user.id} />;
    }

    function handleBookPress(book) {
        console.log("test")
        props.setShownBookDispatch(book)
        props.navigation.navigate("book")
    }

    const BibBook = ({ fBook, index}) => (
        <DraxView
            onDragEnd={toggleDraggable}
            draggable={draggable}
            hoverDraggingStyle={{borderWidth:2, borderColor:"red"}}
            onDragDrop={toggleDraggable}
            onDragStart={() => {
                console.log('book start drag');
            }}
            payload={fBook}
        >
            <ListItem key={index + "list-item-profil-booksList"} containerStyle={{backgroundColor: "transparent"}}>
                <Card key={index + "list-item-profil-booksList"} containerStyle={{margin: 0, padding: 0}}>
                    <TouchableOpacity key={index + "touch-flaeche-home-userBib-booksList"} onPress={() => {
                        handleBookPress(fBook)
                    }} onLongPress={()=>{
                        toggleDraggable()
                    }}>
                        <View>
                            { fBook.pictureUrl.length === 0 &&
                                <View style={{justifyContent: "center", width: 75, height: 110}}>
                                    <Text style={{alignSelf: "center"}}>Titel:</Text>
                                    <Text> </Text>
                                    <Text style={{alignSelf: "center"}}>{fBook.titel}</Text>
                                </View>
                            }
                            {fBook.pictureUrl.length !== 0 &&
                                <BookCover url={fBook.pictureUrl} ratio={fBook.ratio}/>
                                // <Card.Image style={{width: 75, height:110}} resizeMode="contain" source={{url:book.pictureUrl}}>
                                // </Card.Image>
                            }
                        </View>
                    </TouchableOpacity>
                </Card>
            </ListItem>
        </DraxView>
    );

    const BibBook2 = ({ fBook, index}) => (
            <ListItem key={index + "list-item-profil-booksList"} containerStyle={{backgroundColor: "transparent"}}>
                <Card key={index + "list-item-profil-booksList"} containerStyle={{margin: 0, padding: 0}}>
                    <TouchableOpacity key={index + "touch-flaeche-home-userBib-booksList"} onPress={() => {
                        props.setFavoriteBookByNumDispatch(whichFBook,fBook)
                    }}>
                        <View>
                            { fBook.pictureUrl.length === 0 &&
                                <View style={{justifyContent: "center", width: 75, height: 110}}>
                                    <Text style={{alignSelf: "center"}}>Titel:</Text>
                                    <Text> </Text>
                                    <Text style={{alignSelf: "center"}}>{fBook.titel}</Text>
                                </View>
                            }
                            {fBook.pictureUrl.length !== 0 &&
                                <BookCover url={fBook.pictureUrl} ratio={fBook.ratio}/>
                                // <Card.Image style={{width: 75, height:110}} resizeMode="contain" source={{url:book.pictureUrl}}>
                                // </Card.Image>
                            }
                        </View>
                    </TouchableOpacity>
                </Card>
            </ListItem>
    );

    function getItem (d, index) {
        return d[index]
    }

    function getItemCount (d) {
        return d.length
    }

    return (
        <View style={{backgroundColor: "#2b2e32", height:"100%"}}>
            <DraxProvider>
                <Header
                    centerComponent={<TouchableOpacity style={{flexDirection:"row"}} onPress={() => props.navigation.navigate('profilSettings')}><Text style={{color: 'white', fontWeight: "bold", fontSize: 20}} >{props.user.username}    </Text><Entypo style={{bottom:1}} name="dots-three-horizontal" size={26} color="white" /></TouchableOpacity>}
                    containerStyle={{    backgroundColor:"#2b2e32",    justifyContent: 'center', borderBottomWidth:0 }}
                    leftComponent={<TouchableOpacity onPress={() => props.navigation.navigate('profilFriends')}><AntDesign style={{position:"absolute", top: -1.5, left:0}} name="adduser" size={30} color="white"/></TouchableOpacity>}
                    rightComponent={<TouchableOpacity onPress={() => toggleQrCodeOverlay()}><AntDesign style={{position:"absolute", top: -1.5, right:0}} name="qrcode" size={30} color="white"/></TouchableOpacity>}
                />
                <View style={{flexDirection:"row",paddingLeft:"4%", paddingBottom:"4%",paddingRight:"4%", paddingTop:"5%"}}>
                    <Avatar
                        rounded
                        size="large"
                        source={require("./avatar-placeholder.png")}
                    />
                    <View style={{flexDirection:"row", justifyContent:"space-evenly", width:"75%"}}>
                        <View style={{alignSelf:"center"}}>
                            <Text style={{alignSelf: "center",fontWeight: "bold", paddingBottom: 10, color:"white"}}>Bücher:</Text>
                            <Text style={{alignSelf: "center",fontWeight: "bold", paddingBottom: 10, color:"white"}}>{props.userBib.booksList.length}</Text>
                        </View>
                        <View style={{alignSelf:"center"}}>
                            <Text style={{alignSelf: "center",fontWeight: "bold", paddingBottom: 10, color:"white"}}>dabei seit:</Text>
                            <Text style={{alignSelf: "center",fontWeight: "bold", paddingBottom: 10, color:"white"}}>8.3.1917</Text>
                        </View>
                    </View>
                </View>
                <View style={{ paddingLeft:"4%", paddingBottom:"0.5%",paddingRight:"4%",justifyContent:"center", paddingTop:"3%"}}>
                    <View style={{paddingBottom: "1%",flexDirection: "row", justifyContent: "space-between"}}>
                        <Text style={{alignSelf: "center",fontWeight: "bold", paddingBottom: "2.5%", color:"white"}}>geliehene Bücher:</Text>
                        <Text style={{alignSelf: "center",fontWeight: "bold", paddingBottom: "2.5%", color:"white"}}>3</Text>
                    </View>
                    <View style={{paddingBottom: "1%",flexDirection: "row", justifyContent: "space-between"}}>
                        <Text style={{alignSelf: "center",fontWeight: "bold", paddingBottom: "2.5%", color:"white"}}>davon zurückgegeben Bücher:</Text>
                        <Text style={{alignSelf: "center",fontWeight: "bold", paddingBottom: "2.5%", color:"white"}}>3</Text>
                    </View>
                </View>
                <Divider style={{width:"95%", alignSelf:"center"}} color={"white"}/>
                <Text style={{alignSelf: "center",fontWeight: "bold", paddingBottom: "1%", paddingTop:"4%", color:"white"}}>Lieblingsbücher:</Text>
                <View style={{flexDirection: "row", alignItems:"center", justifyContent: "space-evenly", width:"100%"}}>
                    <TouchableOpacity onPress={()=>{togglefBookChooserOverlay(1)}}>
                        <DraxView
                            onReceiveDragDrop={({ dragged: { payload } }) => {
                                console.log(`1 received ${payload}`);
                                props.setFavoriteBookByNumDispatch(1,payload)
                            }}
                        >
                            <Text style={{alignSelf: "center",fontWeight: "bold", paddingBottom: "1%", color:"white"}}>1</Text>
                            { fBook1 === null &&
                                <View style={{backgroundColor:"white",width:75, height:110, justifyContent:"center", alignItems:"center"}}>
                                    <Ionicons style={{left:"2.5%"}} name="add-circle-sharp" size={45} color="#2b2e32" />
                                </View>
                            }
                            { fBook1 !== null &&
                                <BookCover url={fBook1.pictureUrl} ratio={fBook1.ratio}/>
                            }
                        </DraxView>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{togglefBookChooserOverlay(2)}}>
                        <DraxView
                            onReceiveDragDrop={({ dragged: { payload } }) => {
                                console.log(`2 received ${payload}`);
                                props.setFavoriteBookByNumDispatch(2,payload)
                            }}
                        >
                            <Text style={{alignSelf: "center",fontWeight: "bold", paddingBottom: "1%", color:"white"}}>2</Text>
                            { fBook2 === null &&
                                <View style={{backgroundColor:"white",width:75, height:110, justifyContent:"center", alignItems:"center"}}>
                                    <Ionicons style={{left:"2.5%"}} name="add-circle-sharp" size={45} color="#2b2e32" />
                                </View>
                            }
                            { fBook2 !== null &&
                                <BookCover url={fBook2.pictureUrl} ratio={fBook2.ratio}/>
                            }
                        </DraxView>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>{togglefBookChooserOverlay(3)}}>
                        <DraxView
                            onReceiveDragDrop={({ dragged: { payload } }) => {
                                console.log(`3 received ${payload}`);
                                props.setFavoriteBookByNumDispatch(3,payload)
                            }}
                        >
                            <Text style={{alignSelf: "center",fontWeight: "bold", paddingBottom: "1%", color:"white"}}>3</Text>
                            { fBook3 === null &&
                                <View style={{backgroundColor:"white",width:75, height:110, justifyContent:"center", alignItems:"center"}}>
                                    <Ionicons style={{left:"2.5%"}} name="add-circle-sharp" size={45} color="#2b2e32" />
                                </View>
                            }
                            { fBook3 !== null &&
                                <BookCover url={fBook3.pictureUrl} ratio={fBook3.ratio}/>
                            }
                        </DraxView>
                    </TouchableOpacity>
                </View>
                <Divider style={{width:"95%", alignSelf:"center", paddingTop:"4%"}} color={"white"}/>
                <TouchableOpacity onPress={()=>{
                    props.navigation.navigate("profilUserBib")
                }}>
                    <Text style={{alignSelf: "center",fontWeight: "bold", paddingTop:"3%", color:"white"}}>Alle Bücher:</Text>
                    <Entypo name="chevron-right" style={{position:"absolute", right:"2%", bottom:"82%"}} size={20} color="white" />
                    <View>
                        <VirtualizedList
                            style={{alignSelf: "center"}}
                            horizontal={true}
                            scrollEnabled={userBibBooksList.length > 3}
                            data={userBibBooksList}
                            initialNumToRender={3}
                            renderItem={({item, index}) => <BibBook fBook={item} index={index} />}
                            keyExtractor={(item, index)=> 'key'+index+item.id}
                            getItemCount={getItemCount}
                            getItem={getItem}
                            ListEmptyComponent={
                            <View>
                                <View style={{height:"8%"}}>
                                </View>
                                <TouchableOpacity key={"key"+Math.random()} onPress={() => {
                                    props.navigation.navigate("add a book to user bib")
                                }}>
                                    <View>
                                        <View style={{backgroundColor:"white",width:75, height:110, justifyContent:"center", alignItems:"center"}}>
                                            <Ionicons style={{left:"2.5%"}} name="add-circle-sharp" size={45} color="#2b2e32" />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </View>
                            }
                        />
                    </View>
                </TouchableOpacity>
                <Overlay isVisible={fBookChooserOverlay} onBackdropPress={togglefBookChooserOverlay} >
                    <View style={{flexDirection:"row"}}>
                        <VirtualizedList
                            data={addFBList1}
                            scrollEnabled={false}
                            initialNumToRender={3}
                            renderItem={({item, index}) => <BibBook2 fBook={item} index={index} />}
                            keyExtractor={(item, index)=> 'key'+index+item.id}
                            getItemCount={getItemCount}
                            getItem={getItem}
                        />
                        <VirtualizedList
                            data={addFBList2}
                            scrollEnabled={false}
                            initialNumToRender={3}
                            renderItem={({item, index}) => <BibBook2 fBook={item} index={index} />}
                            keyExtractor={(item, index)=> 'key'+index+item.id}
                            getItemCount={getItemCount}
                            getItem={getItem}
                        />
                        <VirtualizedList
                            data={addFBList3}
                            scrollEnabled={false}
                            initialNumToRender={3}
                            renderItem={({item, index}) => <BibBook2 fBook={item} index={index} />}
                            keyExtractor={(item, index)=> 'key'+index+item.id}
                            getItemCount={getItemCount}
                            getItem={getItem}
                        />
                    </View>
                </Overlay>
                <Overlay isVisible={qrCodeOverlayVisible} onBackdropPress={toggleQrCodeOverlay} >
                    <View style={{borderColor: "white", borderWidth:3,alignSelf: "center",transform: [{scale: 2.5}]}}>
                        <UserQR/>
                    </View>
                </Overlay>
            </DraxProvider>
        </View>
)
}

const mapStateToProps = state => {
    return {
        user: state.appReducer.user,
        friends: state.appReducer.friends,
        userBib: state.appReducer.userBib,
    }
}

const mapDispatchToProps = dispatch => ({
    sendFriendRequestDispatch(username) {
        dispatch(sendFriendRequest({username: username}))
    },
    setFavoriteBookByNumDispatch(num, book) {
        dispatch(setFavoriteBookByNum({number: num, book:book}))
    },
    getFriendsDispatch() {
        dispatch(getFriends())
    },
    deleteFriendDispatch(id) {
        dispatch(deleteFriend({id: id}))
    },
    setShownBookDispatch(book) {
        dispatch(setShownBook(book))
    },
    getUserBibBooksDispatch() {
        dispatch(getUserBibBooks())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(ProfilScreen)