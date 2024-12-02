import { View, TextInput, Button, StyleSheet, Modal, Image } from "react-native";
import { useState } from "react";

function GoalInput(props) {
  const [goalText, setGoalText] = useState('');

  function goalInputHandler(text) {
    setGoalText(text);
  }

  function addGoalHandler() {
    props.onAddGoal(goalText);
    props.onClose();
  }

  return (
    <Modal visible={props.visible} animationType="slide">
      <View style={styles.inputContainer}>
        <Image source={require('./assets/img/goal.png')} style={styles.goalImg} />
        <TextInput onChangeText={goalInputHandler} placeholder="Type your goal" style={styles.input} />
        <View style={styles.buttonContainer}>
          <View style={styles.button}>
            <Button title="Cancel" onPress={props.onClose} color={'#f31282'} />
          </View>
          <View style={styles.button}>
            <Button onPress={addGoalHandler} title="Add Goal" />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  input: {
    borderColor: 'black',
    borderWidth: 1,
    width: '100%',
    padding: 8,
    borderRadius: 6,
    backgroundColor: 'white',
  },
  inputContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#cccccc',
    flex: 1,
    padding: 16,
    backgroundColor: '#8cbed6',
  },
  buttonContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
  button: {
    marginHorizontal: 8,
    width: 100,
  },
  goalImg: {
    width: 100,
    height: 100,
  },
});

module.exports = GoalInput;