import { signOut } from "firebase/auth";
import { View, Text, Button, StyleSheet, TouchableOpacity } from "react-native";
import auth from "../Services/firebaseAthu";

export default function DashboardScreen({ navigation }) {
    
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                navigation.navigate('Login');
            })
            .catch(error => {
                console.error("Sign out error:", error);
            });
    };
    
    const goToTodoApp = () => {
        navigation.navigate('GoalApp');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.welcomeText}>Welcome to Dashboard</Text>
            <TouchableOpacity style={styles.button} onPress={handleLogout}>
                <Text style={styles.buttonText}>Logout</Text>
            </TouchableOpacity>
            
            <Text style={styles.todoText}>Go to TODO APP</Text>
            
            <TouchableOpacity style={styles.button} onPress={goToTodoApp}>
                <Text style={styles.buttonText}>TODO APP</Text>
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
    welcomeText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#6200EE',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 8,
        marginBottom: 15,
        width: '60%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    todoText: {
        fontSize: 16,
        color: '#444444',
        marginBottom: 10,
    },
});