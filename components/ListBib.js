
import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, TouchableOpacity, View, VirtualizedList} from 'react-native';
import {Card, Divider, ListItem, Overlay} from "react-native-elements";
import {Entypo, Ionicons, MaterialIcons} from "@expo/vector-icons";
import {getBibs, getUserBibBooks, setShownBib, setShownBook} from "../reducers/appSlice";
import {connect} from "react-redux";

const ListBib = (props) => {

    const [bibBooksList, setBibBooksList] = useState([])

    useEffect(() => {
        setBibBooksList(props.b.booksList)
    }, [props.userBib]);

    function handleBookPress(book) {
        props.setShownBookDispatch(book)
        props.navigation.navigate("book")
    }

    function handleBibPress(bib) {
        props.setShownBibDispatch(bib)
        props.navigation.navigate("homeStackScreen3")
    }

    function getItem (data, index) {
        return data[index]
    }

    function getItemCount (data) {
        return data.length
    }

    const BibBook = ({ book, index}) => (
        <ListItem key={index+"list-item-home-userBib-booksList"} containerStyle={{backgroundColor: "transparent"}}>
            <Card key={index+"list-item-card-home-userBib-booksList"} containerStyle={{margin: 0, padding: 1}}>
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
            </Card>
        </ListItem>
    );

    return (
        <View>
            <Divider color="#2b2e32" style={{width: "95%", alignSelf: "center"}} width={1.2}/>
            <Card containerStyle={{padding: 0, paddingTop: 8, margin:0, marginBottom:0, borderWidth:0, backgroundColor: "transparent"}}>
                <TouchableOpacity onPress={()=> {
                    handleBibPress(props.b)
                }}>
                    <View style={{flexDirection: "row",width:"100%", justifyContent: "space-between"}}>
                        <Text style={{paddingLeft:15,alignSelf:"center", fontWeight: "bold", color:"#2b2e32", fontSize: 15}}>{props.b.name}</Text>
                        <Entypo style={{paddingRight:5}} name="chevron-right" size={35} color="#2b2e32"/>
                    </View>
                    <VirtualizedList
                        style={{alignSelf: "flex-start"}}
                        horizontal={true}
                        data={bibBooksList}
                        initialNumToRender={3}
                        renderItem={({item, index}) => <BibBook book={item} index={index} />}
                        keyExtractor={(item, index)=> 'key'+index+item.id}
                        getItemCount={getItemCount}
                        getItem={getItem}
                    />
                </TouchableOpacity>
            </Card>
        </View>
    )
};


const mapStateToProps = state => {
    return {
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
})

export default connect(mapStateToProps, mapDispatchToProps)(ListBib)