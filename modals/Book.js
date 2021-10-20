import React, {useRef, useState} from "react";
import {useEffect} from "react";
import {Text, TouchableOpacity, View, Image, ActivityIndicator, Easing, Alert, ScrollView} from "react-native";
import { connect } from "react-redux";
import {AntDesign, FontAwesome, Ionicons} from "@expo/vector-icons";
import {Divider, CheckBox, Button, Overlay, ButtonGroup, Card} from "react-native-elements";

import {Picker} from "@react-native-picker/picker";
import DropDownPicker from 'react-native-dropdown-picker';
import {AnimatedCircularProgress} from "react-native-circular-progress";
import Animated, {cancelAnimation, useSharedValue} from "react-native-reanimated";
import {Circle} from "react-native-svg";

const Book = (props) => {



    const [saved, setSaved] = useState(false)
    const [inUserBib, setInUserBib] = useState(false)
    const [available, setAvailable] = useState(false)

    const [visible, setVisible] = useState(false);
    const [targetBook, setTargetBook] = useState({})

    const [loading, setLoading] = useState(false);

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);
    const [items, setItems] = useState([
        {label: 'ilker', value: 'ilker'},
        {label: 'yannick', value: 'yannick'},
        {label: 'gianluca', value: 'gianluca'}
    ]);

    let circularProgress = useRef(null);
    let fill = useRef(0).current;
    const [active, setActive] =useState(false)

    useEffect(() => {
        setTargetBook(props.book)
        console.log(props.book.id)
        console.log(props.userBib.booksList)
        if (!props.book.loading) {
            if(props.userBib.booksList.some(book => book.id === props.book.id)){
                console.log("test")
                setInUserBib(true)
            } else{
                setInUserBib(false)
            }
            if(props.saved.booksList.some(book => book.isbn === props.book.isbn)) {
                setSaved(true)
            } else {
                setSaved(false)
            }
            if (props.book.availableAt.length !== 0) {
                setAvailable(true)
            } else {
                setAvailable(false)
            }
            setTargetBook(props.book)
            setLoading(false)
        }
    }, [props.saved.booksList, props.book, props.book.loading, props.userBib.booksList, props.book.availableAt])

    const toggleOverlay = () => {
        setVisible(!visible);
    };

    function savedCheckedBoxPressed() {
        if (!saved) {
            console.log("in Leseliste gespeichert")
            //props.addBookToWishlistDispatchAusloeser(props.Communication.urlBase, props.Communication.conf, targetBook)
        }
        if (saved) {
            console.log("aus Leseliste entfernt")
            //props.deleteBookFromWishlistByIdFromServer(props.Communication.urlBase, props.Communication.conf, targetBook.id)
        }
        setSaved(!saved)
    }

    function checkBoxUserBibOnPress() {
        // if (!inUserBib) {
        //     props.addBookToUserBibDispatchAusloeser(props.Communication.urlBase, props.Communication.conf, {
        //         auflage: targetBook.auflage,
        //         authorName: targetBook.authorName,
        //         erscheinungsDatum: targetBook.erscheinungsDatum,
        //         id: 0,
        //         isbn: targetBook.isbn,
        //         sprache: targetBook.sprache,
        //         status: 0,
        //         timeCreated: "0",
        //         titel: targetBook.titel,
        //         pictureUrl: targetBook.pictureUrl,
        //     })
        // }
        // if (inUserBib) {
        //     console.log(targetBook.id)
        //     props.deleteBookByIdFromServerDispatchAusloeser(props.Communication.urlBase,props.Communication.conf, targetBook.id)
        // }
        setInUserBib(!inUserBib)
    }

    function handelAnfageSchickenButtonOnPress() {
        console.log("anfrage schicken an "+value)
        // props.sendGetBookRequestDispatchAusloeser(props.Communication.urlBase, props.Communication.conf, valueBookId, valueUsername)
    }

    function checkBoxAvaliablOnPress() {
        setAvailable(!available)
    }

    const pressIn = () => {
        console.log(circularProgress.current)
        setActive(true)
        if (active === true) {
            circularProgress.current.animate(100, 1200, Easing.quad)
        }
    }

    const pressOut = () => {
        circularProgress.current.animate(0, 1200, Easing.quad)
    }

    const handleCircleComplete = () => {
        alert("test")
    }

    return (
        <View style={{flex: 1, alignItems: "center", width: "100%"}}>
            <View style={{paddingLeft: 10,paddingTop: 10,paddingRight: 10,width:"100%" ,flexDirection: "row", justifyContent: "space-between"}}>
                <View>
                    <Text onPress={() => props.navigation.navigate('main')} style={{color: "#565a63", fontSize:15,left: 6,top:4, textDecorationLine: 'underline', fontWeight: "bold"}}>schließen</Text>
                </View>
                <View style={{flexDirection: "row"}}>
                    <Ionicons style={{top: 2,right: 9}} name="share-outline" size={36} color="black" />
                    <CheckBox
                        containerStyle={{top: 5,padding: 0, margin: 0}}
                        center
                        checkedIcon={<FontAwesome name="bookmark" size={35} color="black" />}
                        uncheckedIcon={<FontAwesome name="bookmark-o" size={35} color="black" />}
                        onPress={savedCheckedBoxPressed}
                        checked={saved}
                    />
                </View>
            </View>
            <View>
                <Card containerStyle={{alignSelf: "center", padding:2,width: 128, height: 205}}>
                    <Card.Image style={{alignSelf: "center",width: 128, height: 200}}  resizeMode="contain" source={{url:props.book.pictureUrl}}/>
                </Card>
                <Text style={{position: "absolute",top: 85,left: 163, fontWeight: "bold", color: "#2b2e32", fontSize: 12}}>Verfügbarkeit:</Text>
                { inUserBib &&
                <Ionicons style={{position: "absolute", bottom: 60, right: -75}} name="library" size={50} color="black" />
                }
                { !inUserBib &&
                <CheckBox
                    containerStyle={{bottom: 45,left: 9,position: "absolute", width: "100%", backgroundColor: "transparent" , borderColor: "transparent"}}
                    size={50}
                    disabled={true}
                    center
                    checkedIcon={<AntDesign name="checkcircle" size={50} color="darkgreen" />}
                    uncheckedIcon={<AntDesign name="closecircle" size={50} color="darkred" />}
                    onPress={checkBoxAvaliablOnPress}
                    checked={available}
                />
                }
            </View>
            <View style={{paddingTop: 15}}>
                <Text numberOfLines={1} adjustsFontSizeToFit={true}  style={{ flexWrap: "nowrap",alignSelf: "center",fontWeight: "bold", fontSize: 20}}>{props.book.titel}</Text>
                <Text style={{paddingTop: 5, alignSelf: "center", color: "grey"}}>ISBN: {props.book.isbn}</Text>
            </View>
            <Divider style={{paddingTop: 15, width: "95%"}}/>
            <View style={{padding: 15, width: "100%"}}>
                <View style={{flexDirection: "row", justifyContent: "space-between"}}>
                    <View style={{flexDirection: "column",alignItems: "center"}}>
                        <Text style={{textDecorationLine: 'underline'}}>Author*in:</Text>
                        <Text style={{ fontWeight: "bold"}}>{props.book.authorName}</Text>
                    </View>
                    <View style={{flexDirection: "column",alignItems: "center"}}>
                        <Text style={{textDecorationLine: 'underline'}}>Sprache:</Text>
                        <Text style={{ fontWeight: "bold"}}>{props.book.sprache}</Text>
                    </View>
                    <View style={{flexDirection: "column", alignItems: "center"}}>
                        <Text style={{textDecorationLine: 'underline'}}>Erscheinungsdatum:</Text>
                        <Text style={{ fontWeight: "bold"}}>{props.book.erscheinungsDatum}</Text>
                    </View>
                </View>
            </View>
            <Divider style={{ width: "95%"}}/>
            <View style={{padding:10}}>
                <View style={{borderColor: "lightgray", borderWidth: 0.75, borderRadius: 5,padding: 5, width: "100%", height: 120}}>
                    <Text style={{paddingBottom: 10, textDecorationLine: 'underline'}}>Inhalt:</Text>
                    <ScrollView>
                        <Text>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.</Text>
                    </ScrollView>
                </View>
            </View>
            <View style={{width: "100%", padding: 10}}>
                <Button
                    disabled={!available}
                    onPress={()=>{console.log("ausleihen")}}
                    titleStyle={{color: "#fdd560", fontWeight: "bold"}}
                    disabledStyle={{backgroundColor:"#c0c0c0"}}
                    disabledTitleStyle={{color:"white"}}
                    buttonStyle={{height: 50,width: "100%", alignSelf: "center", backgroundColor: "#2b2e32"}}
                    title="Ausleihen" />
            </View>
        </View>
        // <View style={{flex: 1, alignItems: "center", width: "100%"}}>
        //     <View style={{paddingLeft: 10,paddingTop: 10,paddingRight: 3,width:"100%" ,flexDirection: "row", justifyContent: "space-between"}}>
        //         <Text onPress={() => props.navigation.navigate('main')} style={{textDecorationLine: 'underline', fontWeight: "bold"}}>schließen</Text>
        //         <View>
        //             <CheckBox
        //                 containerStyle={{padding: 0, margin: 0}}
        //                 center
        //                 checkedIcon={<FontAwesome name="bookmark" size={50} color="black" />}
        //                 uncheckedIcon={<FontAwesome name="bookmark-o" size={50} color="black" />}
        //                 onPress={savedCheckedBoxPressed}
        //                 checked={savedChecked}
        //             />
        //         </View>
        //     </View>
        //     <View style={{flexDirection: "row", width: "100%", justifyContent: "space-between"}}>
        //         <View style={{ width: "50%"}}>
        //             <Card containerStyle={{alignSelf: "center", padding:2,width: 128, height: 200}}>
        //                 <Card.Image style={{alignSelf: "center",width: 128, height: 200}}  resizeMode="contain" source={{url:props.book.pictureUrl}}/>
        //             </Card>
        //         </View>
        //         <View style={{ width: "50%", paddingTop: 20}}>
        //             <View style={{flexDirection: "column", width: "100%"}}>
        //                 <View style={{borderRadius: 50, width: 100, height: 100, backgroundColor: "white", justifyContent: "center", alignSelf: "center"}}>
        //                     <TouchableOpacity
        //                         style={{alignSelf: "center"}}
        //                         onPressIn={pressIn}
        //                         onPressOut={pressOut}
        //                     >
        //                         <CheckBox
        //                             size={40}
        //                             center
        //                             checkedIcon={<Ionicons name="library" size={60} color="black" />}
        //                             uncheckedIcon={<Ionicons name="library-outline" size={60} color="black" />}
        //                             onPress={checkBoxUserBibOnPress}
        //                             checked={inUserBibChecked}
        //                         />
        //                         <AnimatedCircularProgress
        //                             style={{position: "absolute", alignSelf: "center", top: -17.5}}
        //                             ref={circularProgress}
        //                             size={120}
        //                             width={15}
        //                             fill={fill}
        //                             tintColor="black"
        //                             backgroundColor="grey"
        //                             padding={10}
        //                             lineCap="butt"
        //                             //renderCap={({ center }) => <Circle cx={center.x} cy={center.y} r="10" fill="blue" />}
        //                         >
        //                             {
        //                                 (fill) => {
        //                                     if (fill === 100) {
        //                                         return (
        //                                             Alert.alert(
        //                                                 "Buch hinzugefügt"
        //                                             )
        //                                         )
        //                                     }
        //                                 }
        //                             }
        //                         </AnimatedCircularProgress>
        //                     </TouchableOpacity>
        //                 </View>
        //                 <View style={{paddingTop: 15}}>
        //                     <View style={{width: "100%", alignItems: "center"}}>
        //                         <CheckBox
        //                             containerStyle={{width: "100%", backgroundColor: "transparent" , borderColor: "transparent"}}
        //                             size={50}
        //                             disabled={true}
        //                             center
        //                             checkedIcon={<AntDesign name="checkcircle" size={50} color="darkgreen" />}
        //                             checkedTitle={"verfügbar zum Ausleihen"}
        //                             title={"leider noch\nnicht verfügbar\nzum Ausleihen"}
        //                             uncheckedIcon={<AntDesign name="closecircle" size={50} color="darkred" />}
        //                             onPress={checkBoxAvaliablOnPress}
        //                             checked={available}
        //                         />
        //                     </View>
        //                 </View>
        //             </View>
        //         </View>
        //     </View>
        //     <View>
        //     </View>
        // </View>
        //------------------------------------------------------
        // <View style={{flex: 1, alignItems: "center", width: "100%"}}>
        //     <View style={{padding: 10,width:"100%" ,flexDirection: "row", justifyContent: "flex-end"}}>
        //         <AntDesign style={{alignSelf: "center"}} name="closecircleo" size={30} color="black" onPress={() => props.navigation.navigate('OURBOOK')}/>
        //     </View>
        //     { loading &&
        //     <View style={{ flex: 1, alignItems: 'center', justifyContent: "center" }}>
        //         <ActivityIndicator />
        //     </View>
        //     }
        //     { !loading &&
        //     <View style={{flex: 1, width: "100%"}}>
        //         <View style={{flexDirection: "row",width: "100%", height: "45%",flexWrap: "no-wrap", justifyContent: "space-evenly"}}>
        //             <View style={{width: "45%"}}>
        //                 <Image style={{alignSelf: "center",height: "100%", width: 128}}  resizeMode="contain" source={{url:props.book.pictureUrl}}/>
        //             </View>
        //             <View style={{width: "55%",flexDirection: "column", justifyContent: 'center'}}>
        //                 <View style={{paddingBottom: 15,flexDirection: "row"}}>
        //                     <View style={{flexDirection: "column"}}>
        //                         <CheckBox
        //                             wrapperStyle={{paddingTop: 4}}
        //                             center
        //                             size={60}
        //                             checkedIcon={<FontAwesome name="bookmark" size={61} color="black" />}
        //                             uncheckedIcon={<FontAwesome name="bookmark-o" size={61} color="black" />}
        //                             onPress={checkBoxLeselisteOnPress}
        //                             checked={savedChecked}
        //                         />
        //                         <Text style={{alignSelf: "center"}}>{!savedChecked && "zur Leseliste\nhinzufügen"}{savedChecked && "aus Leseliste\nentfernen"}</Text>
        //                     </View>
        //                     <View style={{flexDirection: "column"}}>
        //                         <CheckBox
        //                             size={40}
        //                             center
        //                             checkedIcon={<Ionicons name="library" size={60} color="black" />}
        //                             uncheckedIcon={<Ionicons name="library-outline" size={60} color="black" />}
        //                             onPress={checkBoxUserBibOnPress}
        //                             checked={inUserBibChecked}
        //                         />
        //                         <Text style={{alignSelf: "center"}}>{!inUserBibChecked && "zur Nutzer-\nBibliothek\nhinzufügen"}{inUserBibChecked && "aus Nutzer-\nBibliothek\nentfernen"}</Text>
        //                     </View>
        //                 </View>
        //                 <Divider style={{width: "90%", paddingTop: 5}}/>
        //                 <View style={{paddingTop: 5,width: "90%", alignItems: "center"}}>
        //                     <View style={{width: "100%", alignItems: "center"}}>
        //                         <CheckBox
        //                             containerStyle={{width: "100%", backgroundColor: "transparent" , borderColor: "transparent"}}
        //                             size={50}
        //                             disabled={true}
        //                             center
        //                             checkedIcon={<AntDesign name="checkcircle" size={50} color="darkgreen" />}
        //                             checkedTitle={"verfügbar zum Ausleihen"}
        //                             title={"leider noch\nnicht verfügbar\nzum Ausleihen"}
        //                             uncheckedIcon={<AntDesign name="closecircle" size={50} color="darkred" />}
        //                             onPress={checkBoxAvaliablOnPress}
        //                             checked={available}
        //                         />
        //                     </View>
        //                 </View>
        //             </View>
        //         </View>
        //         <View style={{paddingBottom: 15, paddingRight: 15, paddingLeft: 15}}>
        //             <Text numberOfLines={1} adjustsFontSizeToFit={true}  style={{padding: 5, borderWidth: 2, borderColor: "black", borderRadius: 5, flexWrap: "nowrap",alignSelf: "center",fontWeight: "bold", fontSize: 20}}>{props.book.titel}</Text>
        //             <View style={{paddingTop: 15}}>
        //                 <View style={{flexDirection: "row", flexWrap: "nowrap", justifyContent: "space-between"}}>
        //                     <Text>Author*in:</Text>
        //                     <Text>{props.book.authorName}</Text>
        //                 </View>
        //                 <Divider/>
        //                 <View style={{flexDirection: "row", flexWrap: "nowrap", justifyContent: "space-between"}}>
        //                     <Text>ISBN:</Text>
        //                     <Text>{props.book.isbn}</Text>
        //                 </View>
        //                 <Divider/>
        //                 <View style={{flexDirection: "row", flexWrap: "nowrap", justifyContent: "space-between"}}>
        //                     <Text>Sprache:</Text>
        //                     <Text>{props.book.sprache}</Text>
        //                 </View>
        //                 <Divider/>
        //                 <View style={{flexDirection: "row", flexWrap: "nowrap", justifyContent: "space-between"}}>
        //                     <Text>Erscheinungsdatum:</Text>
        //                     <Text>{props.book.erscheinungsDatum}</Text>
        //                 </View>
        //                 <Divider/>
        //             </View>
        //         </View>
        //         <View style={{ width: "100%",flexDirection: "row", justifyContent: "center"}}>
        //             <View style={{height: 150,width: '90%', backgroundColor: "black", borderRadius: 10}}>
        //                 <View style={{flexDirection: "column", justifyContent: "space-evenly", padding: 10}}>
        //                     <Text style={{paddingBottom:10, color: "white", alignSelf: "center", fontWeight: "bold", fontSize: 20}}>Ausleihen</Text>
        //                     <DropDownPicker
        //                         disabled={!available}
        //                         placeholder="von..."
        //                         style={{alignSelf: "center", width: "100%"}}
        //                         open={open}
        //                         value={value}
        //                         items={items}
        //                         setOpen={setOpen}
        //                         setValue={setValue}
        //                         setItems={setItems}
        //                     />
        //                     <Button disabled={!available} onPress={handelAnfageSchickenButtonOnPress} containerStyle={{paddingTop:10,}} titleStyle={{color: "black"}} buttonStyle={{width: "100%", alignSelf: "center", backgroundColor: "white"}} title="Anfrage schicken" />
        //                 </View>
        //             </View>
        //         </View>
        //     </View>
        //     }
        // </View>
    )
}

const mapStateToProps = state => {
    return {
        userBib: state.appReducer.userBib,
        book: state.appReducer.book,
        saved: state.appReducer.saved,
        auseihen: state.appReducer.auseihen,
    }
}

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(Book)