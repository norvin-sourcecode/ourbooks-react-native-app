import {Image, Text, TouchableOpacity, View} from "react-native";
import {ListItem} from "react-native-elements";
import React from "react";
import {
    getAusleihenRequests,
    getFriendRequests, getLendingProcesses,
    respondAusleihenRequest,
    respondFriendRequest,
    setShownProcess
} from "../reducers/appSlice";
import {connect} from "react-redux";

const ListProcess = (props) => {

    function handleProcessPress(process) {
        props.setShownProcessDispatch(process)
        props.navigation.navigate("processScreenTest")
    }

    return (
        <View>
            <TouchableOpacity onPress={() => {
                handleProcessPress(props.p)
                console.log("give date: " + props.p.giveDate)
                console.log("return date: " + props.p.returnDate)
                //{props.p.bookReceiver}
                //{props.p.status}
            }}>
                <ListItem key={props.index + "list-item-process"} bottomDivider>
                    <ListItem.Content>
                        <Text style={{alignSelf: "center"}}>noch 15d</Text>
                        <View style={{flexDirection: "row"}}>
                            <Image style={{alignSelf: "center",width: 64, height:100}} resizeMode="cover" source={{url:props.p.book.pictureUrl}}/>
                            <View style={{width: "100%"}}>
                                <Text style={{alignSelf: "right", borderLeftWidth: "20", color: 'grey'}}>username</Text>
                                <Text/>
                                <Text style={{fontWeight: "bold", alignSelf: "right", borderLeftWidth: "20"}}>{props.p.book.titel}</Text>
                                <Text style={{alignSelf: "center"}}>{props.p.returnDate}</Text>
                                <Text style={{alignSelf: "right", borderLeftWidth: "20", color: 'grey'}}>Hi, ich hätte diesen Donnerstag Zeit</Text>
                            </View>
                        </View>
                    </ListItem.Content>
                    <ListItem.Chevron style={{color:"black"}} />
                </ListItem>
            </TouchableOpacity>

        </View>
    )}

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => ({
    setShownProcessDispatch(process) {
        dispatch(setShownProcess(process))
    },
})

export default connect(mapStateToProps, mapDispatchToProps)(ListProcess)