import React from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import commonStyles from '../commonStyles'

import moment from 'moment'
import 'moment/locale/pt-br'

export default props => {

    const  doneOrNot = props.doneAt != null ?
        {textDecorationLine: 'line-through'} : {}

    return(
        <View style={styles.container}>
            <TouchableWithoutFeedback 
                onPress={() => props.toggleTask(props.id)}>
                <View style={styles.checkContainer}>
                    {getCheckView(props.doneAt)}
                </View>
            </TouchableWithoutFeedback>
            <View>
                <Text style={[styles.desc, doneOrNot]}>
                    {props.desc}
                </Text>
                <Text style={styles.date}> 
                    {date(props.doneAt, props.estimateAt)}
                </Text>
            </View>
        </View>
    )
}

const date = (doneAt, estimateAt) => {
    if(doneAt != null){
        return (
            moment(doneAt).locale('pt-br')
                .format('[Concluído em] ddd, D [de] MMMM.')
        )
    }
    else{
        return (
            moment(estimateAt).locale('pt-br')
                .format('ddd, D [de] MMMM.')
        ) 
    }
}

function getCheckView(doneAt) {

    if(doneAt != null){
        return(
            <View style={styles.done}>
                <Icon 
                    name="check" 
                    size={15}
                    color={'#FFF'}
                />
            </View>
            )
    }
    else{
        return(
            <View style={styles.pending}></View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderColor: '#AAA',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 10,
    },

    checkContainer: {
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center'
    },

    pending: {
        height: 25,
        width: 25,
        borderRadius: 13,
        borderWidth: 1,
        borderColor: '#555',
    },

    done: {
        height: 25,
        width: 25,
        borderRadius: 13,
        backgroundColor: '#4D7031',
        alignItems: 'center',
        justifyContent: 'center',
    },
    
    desc: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.mainText,
        fontSize: 15,
    },

    date: {
        fontFamily: commonStyles.fontFamily,
        color: commonStyles.colors.subText,
        fontSize: 12,
    }

})