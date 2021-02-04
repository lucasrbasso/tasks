import React, { Component } from 'react';
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from 'react-native';

import axios from 'axios';

import backgroundImage from '../../assets/imgs/login.jpg';
import commonStyles from '../commonStyles';
import AuthInput from '../components/AuthInput';

import { server, showError, showSuccess} from '../common';

const initialState = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    stageNew: false
}

export default class Auth extends Component {

    state = {
        ...initialState
    }

    signinOrSignup = () => {
        if (this.state.stageNew) {
           this.signup()
        } else {
            this.signin()
        }
    };

    signup = async () => {
        try {
            await axios.post(`${server}/signup`, {
                name: this.state.name,
                email: this.state.email,
                password: this.state.password,
                confirmPassword: this.state.confirmPassword
            })

            showSuccess('Usuário cadastro!')
            this.setState({ ...initialState })
        } catch(e) {
            showError(e)
        }
    }

    signin = async () => {
        try {
            const res = await axios.post(`${server}/signin`, {
                email: this.state.email,
                password: this.state.password
            })

            axios.defaults.headers.common['Authorization'] = `bearer ${res.data.token}`
            this.props.navigation.navigate('Home')
        } catch(e) {
            showError(e)
        }
    }


    render() {

        const validations = []

        validations.push(this.state.email && this.state.email.includes('@'))
        validations.push(this.state.password && this.state.password.length >= 6)

        if(this.state.stageNew) {
            validations.push(this.state.name && this.state.name.trim().length >= 3)
            validations.push(this.state.confirmPassword === this.state.password)
        }

        const validForm = validations.reduce((t,a) => t && a)

        return (
            <ImageBackground source={backgroundImage} style={styles.background}>
                <Text style={styles.title}>Tasks</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.subtitle}>
                        {this.state.stageNew ? 'Crie sua conta' : 'Informe seus dados'}
                    </Text>

                    {this.state.stageNew && (
                        <AuthInput
                            icon="user"
                            placeholder="Nome"
                            value={this.state.name}
                            onChangeText={(name) => this.setState({ name })}
                            style={styles.input}
                        />
                    )}
                    <AuthInput
                        icon="at"
                        placeholder="E-mail"
                        value={this.state.email}
                        onChangeText={(email) => this.setState({ email })}
                        style={styles.input}
                    />
                    <AuthInput
                        icon="lock"
                        placeholder="Senha"
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={(password) => this.setState({ password })}
                        style={styles.input}
                    />

                    {this.state.stageNew && (
                        <AuthInput
                            icon="lock"
                            placeholder="Confirmação de senha"
                            secureTextEntry={true}
                            value={this.state.confirmPassword}
                            onChangeText={(confirmPassword) =>
                                this.setState({ confirmPassword })
                            }
                            style={styles.input}
                        />
                    )}

                    <TouchableOpacity onPress={this.signinOrSignup}
                        disabled={!validForm}>
                        <View style={[styles.button, validForm ? {} : { backgroundColor: '#AAA'}]}>
                            <Text style={styles.buttonText}>
                                {this.state.stageNew ? 'Registrar' : 'Entrar'}
                            </Text>
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{ padding: 10 }}
                        onPress={() => this.setState({ stageNew: !this.state.stageNew })}>
                        <Text style={styles.buttonSignInOrSignUp}>
                            {this.state.stageNew ? 'Já possuí conta?' : 'Ainda não possui conta?'}
                        </Text>   
                    </TouchableOpacity>
                </View>
            </ImageBackground>
        );
    }
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },

    title: {
        fontFamily: commonStyles.fontRegular,
        color: commonStyles.colors.secondary,
        fontSize: 70,
        marginBottom: 10,
    },

    subtitle: {
        fontFamily: commonStyles.fontFamily,
        fontSize: 20,
        color: '#FFF',
        textAlign: 'center',
        marginBottom: 10,
    },

    formContainer: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        padding: 20,
        width: '90%',
        borderRadius: 15,
    },

    input: {
        marginTop: 10,
        backgroundColor: '#FFF',    
    },

    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 30,
    },

    buttonText: {
        fontFamily: commonStyles.fontBold,
        color: '#FFF',
        fontSize: 20,
    },

    buttonSignInOrSignUp: {
        fontFamily: commonStyles.fontFamily,
        color: '#FFF',
        fontSize: 15,
    },
});
