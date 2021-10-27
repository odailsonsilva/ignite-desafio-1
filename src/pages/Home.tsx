import React, { useState } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const taskExist = tasks.some(task => task.title === newTaskTitle)

    if(taskExist) {
      return Alert.alert(
        'Task já cadastrada',
        'Você não pode cadastrar uma task com o mesmo nome'
      )
    } 

    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks(oldState => [...oldState, data])
  }

  function handleToggleTaskDone(id: number) {
    const tasksAux = [...tasks]
    const taskIndex = tasks.findIndex(task => task.id === id)

    if(taskIndex !== undefined) {
      tasksAux[taskIndex] = {
        ...tasksAux[taskIndex],
        done: !tasksAux[taskIndex].done
      }
    }

    setTasks(tasksAux)
  }

  function handleRemoveTask(id: number) {
    Alert.alert(
      'Remover item',
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: 'Não',
          style: 'cancel'
        },
        {
          text: 'Sim',
          onPress: () => setTasks(oldState => oldState.filter(task => task.id !== id))
        }
      ]
    )
  }

  function handleEditTask (taskId: number, title: string) {
    const tasksAux = [...tasks]
    const taskIndex = tasks.findIndex(task => task.id === taskId)

    if(taskIndex !== undefined) {
      tasksAux[taskIndex] = {
        ...tasksAux[taskIndex],
        title: title
      }
    }

    setTasks(tasksAux)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})