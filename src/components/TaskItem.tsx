import React, { useState, useRef, useEffect } from 'react'
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity,
    Image,
    TextInput
 } from 'react-native'
 import Icon from 'react-native-vector-icons/Feather';

 import { Task } from './TasksList'
 import trashIcon from '../assets/icons/trash/trash.png'
 import editIcon from '../assets/icons/edit/edit.png'

 interface TasksListProps {
    index: number;
    item: Task;
    toggleTaskDone: (id: number) => void;
    removeTask: (id: number) => void;
    editTask: (taskId: number, title: string) => void
}

export const TaskItem = ({ index, item, editTask, toggleTaskDone, removeTask }: TasksListProps) => {
    const [isEditing, setEditing] = useState(false)
    const [newValue, setNewValue] = useState(item.title)
    const textInputRef = useRef<TextInput>(null)

    function handleStartEditing() {
        setEditing(true)
    }

    function handleCancelEditing() {
        setEditing(false)
        setNewValue(item.title)
    }

    function handleSubmitEditing() {
        editTask(item.id, newValue)
        setEditing(false)
    }

    useEffect(() => {
        if(textInputRef.current) {
            if (isEditing) {
                textInputRef.current.focus()
            } else {
                textInputRef.current.blur()
            }
        }
    }, [isEditing])

    return (
        <>
        <View>
            <TouchableOpacity
                testID={`button-${index}`}
                activeOpacity={0.7}
                style={styles.taskButton}
                onPress={() => toggleTaskDone(item.id)}
            >
            <View 
                testID={`marker-${index}`}
                style={item.done ? styles.taskMarkerDone : styles.taskMarker}
            >
                { item.done && (
                    <Icon 
                        name="check"
                        size={12}
                        color="#FFF"
                    />
                )}
            </View>

                <TextInput 
                    value={newValue}
                    onChangeText={setNewValue}
                    editable={isEditing}
                    onSubmitEditing={handleSubmitEditing}
                    style={item.done ? styles.taskTextDone : styles.taskText}
                    ref={textInputRef}
                />
            </TouchableOpacity>
        </View>

        <View style={ styles.iconsContainer } >
            { isEditing ? (
                <TouchableOpacity
                onPress={handleCancelEditing}
                >
                <Icon name="x" size={24} color="#b2b2b2" />
                </TouchableOpacity>
            ) : (
                <TouchableOpacity
                    onPress={handleStartEditing}
                >
                 <Image source={editIcon} />
                </TouchableOpacity>
            ) }

            <View 
                style={ styles.iconsDivider }
            />

            <TouchableOpacity
                disabled={isEditing}
                onPress={() => removeTask(item.id)}
            >
                <Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
            </TouchableOpacity>
        </View>
        </>
    )
}

const styles = StyleSheet.create({
    taskButton: {
      flex: 1,
      paddingHorizontal: 24,
      paddingVertical: 15,
      marginBottom: 4,
      borderRadius: 4,
      flexDirection: 'row',
      alignItems: 'center'
    },
    taskMarker: {
      height: 16,
      width: 16,
      borderRadius: 4,
      borderWidth: 1,
      borderColor: '#B2B2B2',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskText: {
      color: '#666',
      fontFamily: 'Inter-Medium'
    },
    taskMarkerDone: {
      height: 16,
      width: 16,
      borderRadius: 4,
      backgroundColor: '#1DB863',
      marginRight: 15,
      alignItems: 'center',
      justifyContent: 'center'
    },
    taskTextDone: {
      color: '#1DB863',
      textDecorationLine: 'line-through',
      fontFamily: 'Inter-Medium'
    },
    iconsContainer: {
        flexDirection: 'row',  
        paddingHorizontal: 24,
        paddingVertical: 15,
    },
    iconsDivider: {
        width: 1,
        height: 24,
        backgroundColor: '#C4C4C4',
        marginHorizontal: 12
    }
  })