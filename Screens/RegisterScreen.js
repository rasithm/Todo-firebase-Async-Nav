import { useState } from 'react';
import { Button, Text, TextInput, View, StyleSheet, TouchableOpacity } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import auth from '../Services/firebaseAthu';

export default function RegisterScreen({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleRegister = () => {
        setError('');
        console.log(email, password);
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                navigation.navigate('Dashboard');
            })
            .catch((err) => {
                setError(err.message);
            });
    };

    const goToLogin = () => {
        navigation.navigate('Login');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.headerText}>Create an Account</Text>

            <TextInput
                placeholder="Email"
                style={styles.textInput}
                onChangeText={setEmail}
                keyboardType="email-address"
            />

            <TextInput
                placeholder="Password"
                secureTextEntry
                style={styles.textInput}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>

            {error && <Text style={styles.errorText}>{error}</Text>}

            <TouchableOpacity onPress={goToLogin}>
                <Text style={styles.loginText}>
                    Already have an account? Login here
                </Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    headerText: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#6200EE',
        marginBottom: 30,
    },
    textInput: {
        width: '80%',
        padding: 12,
        borderWidth: 1,
        borderColor: '#6200EE',
        borderRadius: 8,
        marginVertical: 10,
        fontSize: 16,
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#6200EE',
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 8,
        marginVertical: 20,
        width: '80%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        marginTop: 10,
        fontSize: 14,
    },
    loginText: {
        color: '#6200EE',
        fontSize: 16,
        marginTop: 10,
    },
});

