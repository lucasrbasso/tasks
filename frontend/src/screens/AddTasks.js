import React, { Component } from 'react';
import {
    Text,
    View,
    Modal,
    StyleSheet,
    TouchableWithoutFeedback,
    TextInput,
    TouchableOpacity,
    Platform,
} from 'react-native';

import commonStyles from '../commonStyles';
import DateTimePicker from '@react-native-community/datetimepicker';
import Icon from 'react-native-vector-icons/FontAwesome';

import moment from 'moment';

const initialState = { desc: '', date: new Date(), showDatePicker: false };

export default class AddText extends Component {
    state = {
        ...initialState,
    };

    save = () => {
        const newTask = {
            desc: this.state.desc,
            date: this.state.date,
        };

        if (this.props.onSave) {
            this.props.onSave(newTask);
            this.setState({ ...initialState , date: new Date() });
        }
    };

    getDatePicker = () => {
        let datePicker = (
            <DateTimePicker
                value={this.state.date}
                onChange={(_, date) => {
                    date = date ? date : new Date();
                    this.setState({ date, showDatePicker: false });
                }}
                mode="date"
            />
        );

        const dateString = moment(this.state.date).format(
            'ddd, D [de] MMMM [de] YYYY',
        );

        if (Platform.OS === 'android') {
            datePicker = (
                <View>
                    <TouchableOpacity
                        onPress={() => this.setState({ showDatePicker: true })}
                        style={styles.androidDate}>
                        <Icon name="calendar" size={20} color={commonStyles.colors.today} />
                        <Text style={styles.date}>{dateString}</Text>
                    </TouchableOpacity>
                    {this.state.showDatePicker && datePicker}
                </View>
            );
        }

        return datePicker;
    };

    render() {
        return (
            <Modal
                transparent={true}
                visible={this.props.isVisible}
                onRequestClose={this.props.onCancel}
                animationType="slide">
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.background} />
                </TouchableWithoutFeedback>
                <View style={styles.container}>
                    <Text style={styles.header}> Nova Tarefa</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Informe a Descrição"
                        onChangeText={(desc) => this.setState({ desc })}
                        value={this.state.desc}
                    />

                    {this.getDatePicker()}

                    <View style={styles.buttons}>
                        <TouchableOpacity onPress={this.props.onCancel}>
                            <Text style={styles.button}>Cancelar</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={this.save}>
                            <Text style={styles.button}>Salvar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableWithoutFeedback onPress={this.props.onCancel}>
                    <View style={styles.background} />
                </TouchableWithoutFeedback>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.7)',
    },

    container: {
        backgroundColor: '#FFF',
    },

    header: {
        fontFamily: commonStyles.fontFamily,
        backgroundColor: commonStyles.colors.today,
        color: commonStyles.colors.secondary,
        textAlign: 'center',
        padding: 15,
        fontSize: 18,
    },
    input: {
        fontFamily: commonStyles.fontFamily,
        height: 40,
        margin: 15,
        backgroundColor: '#FFF',
        borderWidth: 1,
        borderColor: '#E3E3E3',
        borderRadius: 6,
    },

    buttons: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },

    button: {
        margin: 20,
        marginRight: 30,
        color: commonStyles.colors.today,
    },

    date: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 15,
        marginLeft: 15,
        color: commonStyles.colors.primary,
    },

    androidDate: {
        flexDirection: 'row',
        marginLeft: 15,
        alignItems: 'center',
    },
});
