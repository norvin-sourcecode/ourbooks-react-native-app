import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, VirtualizedList} from 'react-native';
import {Card, ListItem, Overlay} from "react-native-elements";
import {Ionicons, MaterialIcons} from "@expo/vector-icons";
import {getBibs, getUserBibBooks, setShownBib, setShownBook} from "../reducers/appSlice";
import {connect} from "react-redux";

const UserBibCard = (props) => {

    const [userBibBooksList, setUserBibBooksList] = useState([])

    useEffect(() => {
        if (!props.userBib.loaded) {
            props.getUserBibBooksDispatch()
        }
    }, [props.userBib])

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
    }, [props.userBib]);

    function handleBookPress(book) {
        props.setShownBookDispatch(book)
        props.navigation.navigate("book")
    }

    function handleUserBibPress() {
        props.navigation.navigate("homeStackScreen2")
    }

    function getItem (data, index) {
        return data[index]
    }

    function getItemCount (data) {
        return data.length
    }

    const UserBibBook = ({ book, index}) => (
        <ListItem key={index+"list-item-home-userBib-booksList"}>
            <Card key={index+"list-item-card-home-userBib-booksList"} containerStyle={{margin: 0, padding: 1}}>
                {book.titel === "NOBOOKS" &&
                <TouchableOpacity key={index+"touch-flaeche-home-userBib-booksList"} onPress={() => {
                    props.navigation.navigate("add a book to user bib")
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
                        {book.pictureUrl.length == 0 &&
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

    return (
        <View>
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
        </View>
    )
};


const mapStateToProps = state => {
    return {
        userBib: state.appReducer.userBib,
    }
}

const mapDispatchToProps = dispatch => ({
    setShownBookDispatch(book) {
        dispatch(setShownBook(book))
    },
    getUserBibBooksDispatch() {
        dispatch(getUserBibBooks())
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(UserBibCard)