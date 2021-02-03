import React, { Component } from 'react';
import {
    View,
    Text,
    ImageBackground,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    Platform,
    Alert,
} from 'react-native';

import backgroundImage from '../../assets/imgs/login.jpg';
import commonStyles from '../commonStyles';

export default class Auth extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        stageNew: false,
    };

    signinOrSignup = () => {
        if (this.state.stageNew) {
            Alert.alert('Sucesso!', 'Criar conta');
        } else {
            Aler.alert('Sucesso!', 'Logar');
        }
    };

    render() {
        return (
            <ImageBackground source={backgroundImage} style={styles.background}>
                <Text style={styles.title}>Tasks</Text>
                <View style={styles.formContainer}>
                    <Text style={styles.subtitle}>
                        {this.state.stageNew ? 'Crie sua conta' : 'Informe seus dados'}
                    </Text>

                    {this.state.stageNew && (
                        <TextInput
                            placeholder="Nome"
                            value={this.state.name}
                            onChangeText={(name) => this.setState({ name })}
                            style={styles.input}
                        />
                    )}
                    <TextInput
                        placeholder="E-mail"
                        value={this.state.email}
                        onChangeText={(email) => this.setState({ email })}
                        style={styles.input}
                    />
                    <TextInput
                        placeholder="Senha"
                        secureTextEntry={true}
                        value={this.state.password}
                        onChangeText={(password) => this.setState({ password })}
                        style={styles.input}
                    />

                    {this.state.stageNew && (
                        <TextInput
                            placeholder="Confirmação de senha"
                            secureTextEntry={true}
                            value={this.state.confirmPassword}
                            onChangeText={(confirmPassword) =>
                                this.setState({ confirmPassword })
                            }
                            style={styles.input}
                        />
                    )}

                    <TouchableOpacity onPress={this.signinOrSignup}>
                        <View style={styles.button}>
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
        borderRadius: 10,
        padding: Platform.OS == 'ios' ? 15 : 10,
    },

    button: {
        backgroundColor: '#080',
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 40,
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
