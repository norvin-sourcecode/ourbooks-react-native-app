import React, {useLayoutEffect, useState} from "react";
import {useEffect} from "react";
import {Text, TouchableOpacity, View, VirtualizedList} from "react-native";
import { connect } from "react-redux";
import {Button, Badge, ListItem, Tab, TabView, Card, Divider, Header} from 'react-native-elements';
import {getNewlyAdded, getSaved, setShownBook} from "../../../reducers/appSlice";
import Animated from "react-native-reanimated";
import BookCover from "../../../components/BookCover";

const SavedScreen = (props) => {

    const [newlyAdded, setNewlyAdded] = useState([])
    const [savedList, setSavedList] = useState([])

    const AnimatedVirtualiedList = Animated.createAnimatedComponent(VirtualizedList)
    const scrollY = new Animated.Value(0)

    useLayoutEffect(()=>{
        props.navigation.setOptions({
            headerShadowVisible:false
        })
    },[props.navigation])

    useEffect(() => {
        if (!props.saved.loaded) {
            props.getNewlyAddedDispatch()
            props.getSavedDispatch()
        }
    }, [props.saved])

    useEffect(() => {
        setNewlyAdded(props.saved.newlyAddedBooksList)
        setSavedList(props.saved.booksList)
    }, [props.book, props.userBib, props.saved])

    function getItem (data, index) {
        return data[index]
    }

    function getItemCount (data) {
        return data.length
    }

    let translateY = scrollY.interpolate({
        inputRange: [0, 120],
        outputRange: [0, -120],
        extrapolate: 'clamp',
    });

    let scale = scrollY.interpolate({
        inputRange: [0, 120],
        outputRange: [1, 0.5],
        extrapolate: 'clamp',
    });

    let textTranslateY = scrollY.interpolate({
        inputRange: [0, 120],
        outputRange: [0, 20],
        extrapolate: 'clamp',
    });

    const SavedBook = ({ book, index}) => (
        <View key={index+"list-item-saved-book"}>
            <Card containerStyle={{padding: 0, paddingTop: 0, margin:8, marginBottom:0, borderWidth:0, backgroundColor: "white", borderRadius:10, height:110}}>
                <TouchableOpacity onPress={()=> {
                    handleBookPress(book)
                }}>
                    <View style={{flexDirection: "row", height:110}}>
                        <View style={{ left:0}}>
                            {book.pictureUrl.length === 0 &&
                            <View style={{justifyContent: "center",width: 75, height: 110}}>
                                <Text style={{alignSelf: "center"}}>Titel:</Text>
                                <Text> </Text>
                                <Text style={{alignSelf: "center"}}>{book.titel}</Text>
                            </View>
                            }
                            {book.pictureUrl.length !== 0 &&
                                <BookCover url={book.pictureUrl} ratio={book.ratio} />
                            }
                        </View>
                        <View style={{flexDirection: "column",justifyContent: "center", width:"70%"}}>
                            <Text style={{fontWeight: "bold", paddingLeft:"5%"}}>{book.titel}</Text>
                            <View style={{paddingLeft:"5%", alignItems: "left", paddingTop: "4%"}}>
                                <Text>ISBN: {book.isbn}</Text>
                                <Text>Author*in: {book.authorName}</Text>
                                <Text>Erscheinungsdatum: {book.erscheinungsDatum}</Text>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            </Card>
        </View>
    );

    function handleBookPress(book) {
        props.setShownBookDispatch(book)
        props.navigation.navigate("book")
    }

    const NewlyAddedBook = ({ book, index}) => (
        <ListItem key={index+"list-item-saved-newlyadded-booksList"} containerStyle={{backgroundColor: "transparent"}}>
            <Card key={index+"list-item-card-saved-newlyadded-booksList"} containerStyle={{margin: 0, padding: 1}}>
                <TouchableOpacity key={index+"touch-flaeche-home-userBib-booksList"} onPress={() => {
                    handleBookPress(book)
                }}>
                    <View>
                        {book.pictureUrl.length === 0 &&
                        <View style={{justifyContent: "center",width: 48, height:75}}>
                            <Text style={{alignSelf: "center"}}>Titel:</Text>
                            <Text style={{alignSelf: "center"}}>{book.titel}</Text>
                        </View>
                        }
                        {book.pictureUrl.length !== 0 &&
                        <Card.Image style={{width: 48, height:75}} resizeMode="contain" source={{url:book.pictureUrl}}>
                        </Card.Image>
                        }
                    </View>
                </TouchableOpacity>
            </Card>
        </ListItem>
    );

    return (
        <View style={{backgroundColor: "#2b2e32"}}>
            <Header
                centerComponent={{ text: 'Leseliste', style: { color: 'white', fontWeight: "bold", fontSize:20} }}
                containerStyle={{    backgroundColor:"#2b2e32",    justifyContent: 'center', borderBottomWidth:0, zIndex:8000}}
                
            />
            <View style={{backgroundColor: "#2b2e32", height:"100%"}}>
                <View>
                    { savedList.length === 0 &&
                    <Text style={{paddingTop: 300 ,textAlign: 'center', color: "grey"}}>deine Leseliste ist noch leer...</Text>
                    }
                </View>
                <AnimatedVirtualiedList
                    scrollEventThrottle={16}
                    onScroll={Animated.event([
                        { nativeEvent: { contentOffset: { y: scrollY } } },
                    ])}
                    contentContainerStyle={{paddingTop:120}}
                    data={savedList}
                    initialNumToRender={5}
                    renderItem={({item, index}) => <SavedBook book={item} index={index} />}
                    keyExtractor={(item, index)=> 'key'+index+item.id}
                    getItemCount={getItemCount}
                    getItem={getItem}
                />
                <Animated.View
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 120,
                        backgroundColor: '#2b2e32',
                        alignItems: 'flex-start',
                        justifyContent: 'flex-start',
                        paddingBottom: 10,
                        transform: [{ translateY }],
                    }}>
                    <Text style={{color: "white", fontWeight: "bold", right: -5, top: 5}}>neu verfügbar:</Text>
                    {newlyAdded.length === 0 &&
                        <Text style={{color: "white", alignSelf: "center", padding: 35}}>zurzeit keine neuen Bücher verfügbar</Text>
                    }
                    <VirtualizedList
                        style={{alignSelf: "flex-start"}}
                        horizontal={true}
                        data={newlyAdded}
                        initialNumToRender={5}
                        renderItem={({item, index}) => <NewlyAddedBook book={item} index={index} />}
                        keyExtractor={(item, index)=> 'key'+index+item.id}
                        getItemCount={getItemCount}
                        getItem={getItem}
                    />
                </Animated.View>
            </View>
        </View>
    )
}

const mapStateToProps = state => {
    return {
        saved: state.appReducer.saved,
        userBib: state.appReducer.userBib
    }
}

const mapDispatchToProps = dispatch => ({
    setShownBookDispatch(book) {
        dispatch(setShownBook(book))
    },
    getSavedDispatch() {
        dispatch(getSaved())
    },
    getNewlyAddedDispatch() {
        dispatch(getNewlyAdded())
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(SavedScreen)