import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { Button,  Text, View, FlatList, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import GoalItem from './GoalItem';
import GoalInput from './GoalInput';

function GoalApp() {
  const [goals, setGoals] = useState([]);
  const [isModalVisible, setIsModelVisible] = useState(false);

  // Fetch stored goals when the app starts
  useEffect(() => {
    const fetchGoals = async () => {
      try {
        const storedGoals = await AsyncStorage.getItem('goals');
        if (storedGoals) {
          setGoals(JSON.parse(storedGoals)); // Set the goals state with data from AsyncStorage
        }
      } catch (error) {
        console.error('Failed to load goals from storage', error);
      }
    };

    fetchGoals(); // Call the function to load goals when the component is mounted
  }, []);

  // Save goals to AsyncStorage
  const saveGoals = async (newGoals) => {
    try {
      await AsyncStorage.setItem('goals', JSON.stringify(newGoals)); // Save the goals to storage
    } catch (error) {
      console.error('Failed to save goals to storage', error);
    }
  };

  // Add a new goal and update the state and AsyncStorage
  const addGoalHandler = (goalText) => {
    const newGoals = [...goals, goalText];
    setGoals(newGoals); // Update the goals in the state
    saveGoals(newGoals); // Save the updated goals to AsyncStorage
  };

  // Delete a goal and update the state and AsyncStorage
  const deleteGoalHandler = (index) => {
    const newGoals = goals.filter((goal, i) => i !== index);
    setGoals(newGoals); // Update the goals in the state
    saveGoals(newGoals); // Save the updated goals to AsyncStorage
  };

  // Show the modal to add a new goal
  const startAddGoalHandler = () => {
    setIsModelVisible(true);
  };

  // Close the modal
  const closeGoalHandler = () => {
    setIsModelVisible(false);
  };

  return (
    <>
      <StatusBar style="light" />
      <View style={styles.appContainer}>
        <Button title="Add New Goal" color="#A070D6" onPress={startAddGoalHandler} />
        <GoalInput
          onClose={closeGoalHandler}
          visible={isModalVisible}
          onAddGoal={addGoalHandler}
        />
        
        <FlatList
          data={goals}
          renderItem={({ item, index }) => (
            <GoalItem text={item} onDelete={() => deleteGoalHandler(index)} />
          )}
        />
      </View>
    </>
  );
}


const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 50,
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: '#1A0037',
  },
});
module.exports = GoalApp;