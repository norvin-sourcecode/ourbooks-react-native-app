import React, {useState} from "react";
import {useEffect} from "react";
import {FlatList, Text, TouchableOpacity, View, VirtualizedList} from "react-native";
import { connect } from "react-redux";
import {Badge, Divider, ListItem, Button, Card,SearchBar} from "react-native-elements";
import {AntDesign, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {getBibs, getUserBibBooks, setShownBib, setShownBook} from "../../../reducers/appSlice";

const HomeScreen = (props) => {

    const [bibsBibsList, setbibsBibsList] = useState([])
    const [userBibBooksList, setUserBibBooksList] = useState([])

    useEffect(() => {
        // if (!props.userBib.loaded) {
        //     props.getUserBibBooksDispatch()
        // }
        if (!props.bibs.loaded) {
            props.getBibsDispatch()
        }
    }, [props.userBib, props.bibs])

    useEffect(() => {
        if (props.userBib.booksList.length === 0) {
            setUserBibBooksList([{
                auflage: "NOBOOKS",
                authorName: "NOBOOKS",
                erscheinungsDatum: "NOBOOKS",
                id: 0,
                isbn: "NOBOOKS",
                sprache: "NOBOOKS",
                status: 0,
                timeCreated: "NOBOOKS",
                titel: "NOBOOKS",
                pictureUrl: "",
            }])
        } else {
            setUserBibBooksList(props.userBib.booksList)
        }
        setbibsBibsList(props.bibs.bibsList)
    }, [props.bibs, props.userBib])

    // useEffect(() => {
    //     const interval = setInterval(async () => {
    //         props.getUserBibBooksDispatch()
    //     }, 5000);
    //
    //     return () => {
    //         clearInterval(interval);
    //     };
    // }, [])

    function getItem (data, index) {
        return data[index]
    }

    function getItemCount (data) {
        return data.length
    }

    const Bib = ({ bib, index}) => (
        <View>
            <TouchableOpacity key={index+"touch-flaeche-home-bibs-bibslist"} onPress={() => {
                handleBibPress(bib)
            }}>
                <ListItem key={index+"list-item-home-bibs-bibslist"} bottomDivider>
                    <ListItem.Content>
                        <Card.Title>{bib.name}</Card.Title>
                        <View style={{flexDirection: "row"}}>
                            <Text>Mitglieder: </Text>
                            {bib.bookclubMembers.map((value, i) => (
                                <Text key={index+i+"mapped-members"+value}>{value},</Text>
                            ))}
                        </View>
                        <Badge
                            value={1}
                            status="success"
                            containerStyle={{ position: 'absolute', right: -4 }}
                        />
                    </ListItem.Content>
                    <ListItem.Chevron />
                </ListItem>
            </TouchableOpacity>
        </View>
    );

    const UserBibBook = ({ book, index}) => (
        <ListItem key={index+"list-item-home-userBib-booksList"}>
            <Card key={index+"list-item-card-home-userBib-booksList"} containerStyle={{margin: 0, padding: 1}}>
                {book.titel === "NOBOOKS" &&
                <TouchableOpacity key={index+"touch-flaeche-home-userBib-booksList"} onPress={() => {
                    props.navigation.navigate("add a book")
                }}>
                    <View>
                        <View style={{justifyContent: "center",width: 75, height: 110}}>
                            <Ionicons style={{alignSelf:"center"}} name="add" size={35} color="black" />
                        </View>
                    </View>
                </TouchableOpacity>
                }
                {book.titel !== "NOBOOKS" &&
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
                        <Card.Image style={{width: 75, height:110}} resizeMode="contain" source={{url:book.pictureUrl}}>
                        </Card.Image>
                        }
                    </View>
                </TouchableOpacity>
                }
            </Card>
        </ListItem>
    );

    function handleBookPress(book) {
        props.setShownBookDispatch(book)
        props.navigation.navigate("book")
    }

    function handleBibPress(bib) {
        props.setShownBibDispatch(bib)
        props.navigation.navigate("homeStackScreen3")
    }

    function handleUserBibPress() {
        props.navigation.navigate("homeStackScreen2")
    }

    function handleAddABibPress() {
        props.navigation.navigate("add a bib")

    }

    return (
        <View style={{height: "100%"}}>
            <Card containerStyle={{padding: 15}}>
                <View style={{flexDirection: "row",width:"100%", justifyContent: "space-between"}}>
                    <Card.Title>Nutzer-Bibliothek</Card.Title>
                    <MaterialIcons style={{position: "absolute", right: 0, top: -8}} name="more-horiz" size={35} color="black" onPress={handleUserBibPress}/>
                </View>
                <Card.Divider/>
                <VirtualizedList
                    style={{alignSelf: "center"}}
                    horizontal={true}
                    data={userBibBooksList}
                    initialNumToRender={3}
                    renderItem={({item, index}) => <UserBibBook book={item} index={index} />}
                    keyExtractor={(item, index)=> 'key'+index+item.id}
                    getItemCount={getItemCount}
                    getItem={getItem}
                />
            </Card>
            <View style={{paddingRight: 15, paddingLeft: 15,paddingTop: 5,paddingBottom:5,alignSelf: "center", width: "100%",flexDirection: "row", justifyContent: "space-between"}}>
                <Text style={{alignSelf: "center", fontWeight: "bold", fontSize: 13}}>Gruppen-Bibliotheken:</Text>
                <View style={{justifyContent: "center"}}>
                    <Ionicons name="add" size={35} color="black" onPress={handleAddABibPress}/>
                </View>
            </View>
            <Divider/>
            <VirtualizedList
                style={{height: "60%"}}
                data={bibsBibsList}
                initialNumToRender={4}
                renderItem={({item, index}) => <Bib bib={item} index={index} />}
                keyExtractor={(item, index)=> 'key'+index+item.id}
                getItemCount={getItemCount}
                getItem={getItem}
            />
            <Divider/>
        </View>
    )
}

const mapStateToProps = state => {
    return {
        bibs: state.appReducer.bibs,
        userBib: state.appReducer.userBib,
    }
}

const mapDispatchToProps = dispatch => ({
    setShownBibDispatch(bib) {
        dispatch(setShownBib(bib))
    },
    setShownBookDispatch(book) {
        dispatch(setShownBook(book))
    },
    getUserBibBooksDispatch() {
        dispatch(getUserBibBooks())
    },
    getBibsDispatch() {
        dispatch(getBibs())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)