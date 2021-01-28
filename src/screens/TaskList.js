import React, { Component } from 'react'
import { View, Text, ImageBackground, StyleSheet } from 'react-native'

import todayImage from '../../assets/imgs/today.jpg'
import commonStyles from '../commonStyles'

import moment from 'moment'
import 'moment/locale/pt-br'

export default class TaskList extends Component {
    render(){

        const today = moment().locale('pt-br').format('ddd, D [de] MMMM')

        return (
            <View style = {styles.container}>
                <ImageBackground 
                    source={todayImage}
                    style = {styles.background}
                >
                    <View style = {styles.titleBar}>
                        <Text style = {styles.title}> Hoje </Text>
                        <Text style = {styles.subtitle}> {today} </Text>
                    </View>
                </ImageBackground>

                <View 
                    style = {styles.tasklist}
                >
                    <Text>TaskList</Text>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },

    background: {
        flex: 3
    },

    tasklist: {
        flex: 7
    },

    titleBar: {
        flex: 1,
        justifyContent: 'flex-end'
    },

    title: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 50,
        color: commonStyles.colors.secondary,
        marginLeft: 10,
        marginBottom: 20,
    },
    
    subtitle: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        color: commonStyles.colors.secondary,
        marginLeft: 20,
        marginBottom: 20,
    }
})