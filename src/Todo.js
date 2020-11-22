import React, { useState } from 'react';
import { Button, Input, InputLabel, FormControl, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, Dialog, DialogContent, DialogActions, TextField } from '@material-ui/core'
import { AddCircleOutlineRounded, DeleteOutlineRounded, Edit } from '@material-ui/icons';
import db from './firebase'
import './Todo.css'

function Todo(props) {

    const [open, setOpen] = useState(false);
    const [update, setUpdate] = useState('');
    const [toUpdateId, setToUpdateId] = useState('')

    const openUpdateDialog = (todo) => {
        setOpen(true);
        setToUpdateId(todo.id);
        setUpdate(todo.name);
    }

    const editTodo = () => {
        db.collection('todos').doc(toUpdateId).update({
            todo: update
        });
        setOpen(false);
    }

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <List className="todo__list">
                <ListItem>
                    <ListItemText primary={props.todo.todo} secondary={props.todo.timestamp} />
                    <ListItemSecondaryAction>
                        <IconButton edge="end" color="secondary" aria-label="Edit" onClick={() => openUpdateDialog(props.todo)}>
                            <Edit />
                        </IconButton>
                        <IconButton edge="end" color="inherit" aria-label="delete" onClick={event => db.collection('todos').doc(props.todo.id).delete()}>
                            <DeleteOutlineRounded />
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
                {/* <Button onClick={event => db.collection('todos').doc(props.todo.id).delete()}>Delete Me</Button> */}
            </List>

            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="normal"
                        label="Update Todo"
                        type="text"
                        fullWidth
                        name="updateTodo"
                        value={update}
                        onChange={event => setUpdate(event.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
    </Button>
                    <Button onClick={editTodo} color="primary">
                        Save
    </Button>
                </DialogActions>
            </Dialog>


        </div>
    )
}

export default Todo;
