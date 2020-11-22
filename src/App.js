import React, { Component, useState, useEffect } from 'react';
import { Button, Input, InputLabel, FormControl, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Dialog, DialogContent, DialogActions, TextField } from '@material-ui/core';
import { AddCircleOutlineRounded, DeleteOutlineRounded, Edit } from '@material-ui/icons';
import Todo from './Todo'
import db from './firebase';
import firebase from 'firebase'
import './App.css';

function App() {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');


  // we need to fetch the todos from db
  useEffect(() => {
    console.log('useEffect Hook!!!');

    db.collection('todos').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      console.log('Firebase Snap!');
      setTodos(snapshot.docs.map(doc => {
        return {
          id: doc.id,
          todo: doc.data().todo,

        }
      }))
    })

  }, []);

  const addTodo = (e) => {
    e.preventDefault();
    // when add todo btn is clicked
    // console.log("addding")

    db.collection('todos').add({
      todo: input,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
    // setTodos([...todos, input]);
    setInput('')
  }



  return (
    <div className="App">
      <h1>My Todo App</h1>
      <form>

        <FormControl>
          <InputLabel>Enter a todo...</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)} />

        </FormControl>


        <Button disabled={!input} type="submit" onClick={addTodo} variant="contained" color="primary" startIcon={<AddCircleOutlineRounded />}>
          Add Todo
</Button>

      </form>

      <List dense={true}>
        <ul>
          {
            todos.map(todo => (
              <Todo todo={todo} />
            ))
          }

        </ul>
      </List>






    </div>
  );

}

export default App;
