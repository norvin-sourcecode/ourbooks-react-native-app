import * as React from "react";
import {Image, FlatList, Dimensions, View} from "react-native";
import BookCover from "./BookCover";
import BookTile from "./BookTile";

const picsumImages = new Array(30).fill("http://placeimg.com/640/360/any");

const numColumns = 4;

const BibGrid = (props) => {

    function renderItem({ item }) {
        return (
            //<BookTile/>
            <Image
                source={{ uri: item }}
                style={{ aspectRatio: 1, flex: 1 / numColumns }}
            />
        );
    }

    return (
        <View>
            {renderItem(props.book)}
        </View>
    )
};



export default function BookTiles() {
    const [images, setImages] = React.useState(picsumImages);
    return (
        <FlatList data={images} renderItem={renderItem} numColumns={numColumns} />
    );
}
