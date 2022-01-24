import React, {useEffect, useState} from 'react';
import {Image, View} from 'react-native';
import {connect} from "react-redux";

const BookCover = (props) => {

    function helper() {
        if (props.ratio !== undefined && props.ratio !== null && props.ratio !== 0) {
            const num =  110/props.ratio
            num.toFixed(2)
            num.valueOf()
            return num.valueOf()
        } else {
            return 75
        }
    }

    return (
        <View>
            <Image style={{width: helper(), height:110}} resizeMode="contain" source={{url:props.url}} />
        </View>
    )
};

const mapStateToProps = state => {
    return {
    }
}

const mapDispatchToProps = dispatch => ({
})

export default connect(mapStateToProps, mapDispatchToProps)(BookCover)