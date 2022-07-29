import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import GoalItem from "./components/GoalItem";
import GoalInput from "./components/GoalInput";

import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  FlatList,
} from "react-native";

export default function App() {
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  function startAddGoalHandler(){
    setModalIsVisible(true)
  }

  function endAddGoalHandler(){
    setModalIsVisible(false)
  }
  function deleteGoalHandler(id){
    setCourseGoals((currentCourseGoals)=>{
      return currentCourseGoals.filter((goal)=> goal.id != id);
    });
  }
  function addGoalHandler(enteredGoalText) {
    setCourseGoals((currentCourseGoals) => [
      ...currentCourseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);

    endAddGoalHandler();
  }

  return (
    
    <View style={styles.appContainer}>
          <Button title="Add new goal" color="red" onPress={startAddGoalHandler}/>
       
            <GoalInput visible={modalIsVisible} onAddGoal={addGoalHandler} onCancel={endAddGoalHandler} />
            <View style={styles.goalsContainer}>
              <Text>Your Goals</Text>
              <FlatList
                data={courseGoals}
                renderItem={(dataItem) => {
                  return <GoalItem onDeleteItem={deleteGoalHandler} text={dataItem.item.text} id={dataItem.item.id}/>;
                }}
                keyExtractor={(item, index) => {
                  return item.id;
                }}
              />
            </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    borderTopWidth: 2,
    borderColor: "#cccccc",
  },
});
