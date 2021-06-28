import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  Image,
  TextInput,
  Button,
  ColorPropType,
  TouchableOpacity,
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import shortid from 'shortid';

const App = () => {
  const [allTask, setTask] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [visibleInput, setVisibleInput] = useState(false);
  // const [store, setStore] = useState([]);
  const [completedTask, setCompleteTask] = useState([]);
  const [inCompletedTask, setIncompleteTask] = useState([]);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);

  const addTask = () => {
    let task = {
      task: newTask,
      isComplete: false,
      id: shortid.generate(),
    };

    setTask([JSON.parse(JSON.stringify(task)), ...allTask]);
    setNewTask('');
    setVisibleInput(false);
  };

  // const handleCheck = (e, item) => {
  //   // let temp = {...item}
  //   item.isComplete = item.isComplete ? false : true;
  //   setTask(allTask);
  //   console.log(allTask);
  // };

  const handleCompleteTask = () => {
    let filter = allTask.filter(t => t.isComplete === true);
    setCompleteTask(filter);
    setIncompleteTask([]);
  };

  const handleIncompleteTask = () => {
    let filter = allTask.filter(t => t.isComplete === false);
    setIncompleteTask(filter);
    setCompleteTask([]);
  };

  let store = [];
  if (completedTask.length) store = completedTask;
  else if (inCompletedTask.length) store = inCompletedTask;
  else store = allTask;

  const renderItem = item => (
    <View key={item?.id} style={{...styles.task, ...styles.boxWithShadow}}>
      <CheckBox
        disabled={false}
        value={item?.isComplete}
        onValueChange={() => {
          let filter = allTask.find(t => t.id === item.id);
          filter.isComplete = filter.isComplete ? false : true;
          setToggleCheckBox(!toggleCheckBox);
        }}
      />

      <Text style={{width: '70%', fontSize: 20}}>{item?.task}</Text>
    </View>
  );

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{backgroundColor: 'wheat', height: 800}}>
          <Text style={styles.headerTitle}>Todo App</Text>

          <TouchableOpacity
            onPress={() => setVisibleInput(visibleInput => !visibleInput)}>
            <View style={styles.addButtonContainer}>
              <Text style={styles.addButton}>+ Add New Task</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.container}>
            {visibleInput ? (
              <View style={{...styles.inputField, ...styles.boxWithShadow}}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={setNewTask}
                  value={newTask}
                />
                <TouchableWithoutFeedback onPress={addTask}>
                  <Text style={styles.btnSign}>+</Text>
                </TouchableWithoutFeedback>
              </View>
            ) : null}

            <View style={styles.btnRow}>
              <TouchableOpacity onPress={handleIncompleteTask}>
                <Text style={styles.btnIncomplete}>Incomplete</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleCompleteTask}>
                <Text style={styles.btnComplete}>Completed</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.taskContainer}>
              {/* <FlatList
                data={allTask}
                renderItem={renderItem}
                keyExtractor={item => item.id}
              /> */}
              {store.flatMap(item => renderItem(item))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  taskContainer: {
    width: '83%',
  },
  task: {
    backgroundColor: 'white',
    height: 70,
    marginTop: 10,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    borderRadius: 5,
  },
  btnRow: {
    marginTop: 15,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '83%',
  },
  btnComplete: {
    fontWeight: '700',
    fontSize: 18,
    backgroundColor: '#1F2937',
    width: 150,
    color: 'white',
    textAlign: 'center',
    padding: 5,
    borderRadius: 3,
  },
  btnIncomplete: {
    fontWeight: '700',
    fontSize: 18,
    backgroundColor: '#FBBF24',
    width: 150,
    textAlign: 'center',
    padding: 5,
    borderRadius: 3,
  },
  textInput: {
    padding: 5,
    width: '80%',
  },
  inputField: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    // borderWidth: 1,
    // borderColor: 'gray',
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  btnSign: {
    fontSize: 30,
    fontWeight: '700',
  },
  headerTitle: {
    height: 70,
    backgroundColor: '#FBBF24',
    color: 'black',
    fontSize: 50,
    fontWeight: '700',
    textAlign: 'center',
  },

  addButton: {
    padding: 20,
    marginTop: 10,
    width: 200,
    textAlign: 'center',
    backgroundColor: '#FBBF24',
    fontWeight: '700',
    fontSize: 20,
    borderRadius: 5,
  },
  addButtonContainer: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  boxWithShadow: {
    shadowColor: 'gray',
    shadowOffset: {width: 10, height: 5},
    shadowOpacity: 1,
    shadowRadius: 1,
  },
});

export default App;
