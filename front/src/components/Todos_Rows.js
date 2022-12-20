import {Stack} from "react-bootstrap"

// customiser les bouttons
import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';
import { yellow, red, lightBlue } from '@mui/material/colors';

// add task to Todo

import {useEffect, useContext, useState} from "react"

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import {SubtodoContext} from "../SubtodoContext"

const Todo_Row= ({id, title, unit, progress, content, deadline, handleDelete, handleUpdate}) => {

    // customized button :

    const UpdateButton = styled(MuiButton)(({ theme }) => ({
        color: theme.palette.getContrastText(yellow[600]),
        backgroundColor: yellow[600],
        '&:hover': {
            backgroundColor: yellow[800],
        },
    }));
    
    const DeleteButton = styled(MuiButton)(({ theme }) => ({
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
        '&:hover': {
            backgroundColor: red[800],
        },
    }));

    const AddTaskButton = styled(MuiButton)(({ theme }) => ({
        color: theme.palette.getContrastText(lightBlue[300]),
        backgroundColor: lightBlue[300],
        '&:hover': {
            backgroundColor: lightBlue[700],
        },
    }));

    // Add task to Todo

    // // pr les subtodos
    // const [allSubtodos, setAllSubtodos] = useContext(SubtodoContext)
    // ouvrir la fenêtre pour ajouter task
    const [open, setOpen] = useState(false)

    // ouvrir la fenêtre
    const handleClickOpen = () => {
        setOpen(true);
    };

    // ferme la fenêtre
    const handleClose = () => {
        setOpen(false);
    };

    
    return (
        <tr>
			<td> {title} </td>
			<td> {unit} </td>
            <td> {progress} </td>
            <td> {content} </td>
            <td> {deadline} </td>
            <td>
                <Stack direction="horizontal" gap={3}>
                    <UpdateButton onClick={() => handleUpdate(id)}>Update</UpdateButton>
                    <DeleteButton onClick={() => handleDelete(id)}>Delete</DeleteButton>
                    <div>
                        <AddTaskButton onClick={() => handleClickOpen()}>
                            Add Task
                        </AddTaskButton>
                        <Dialog open={open} onClose={handleClose} fullWidth>
                            <DialogTitle>Add Task</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                                                                                         
                                </DialogContentText>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label="Title"
                                    fullWidth
                                    variant="standard"
                                />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    label="Progress"
                                    fullWidth
                                    variant="standard"
                                />
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Cancel</Button>
                                <Button onClick={handleClose}>Submit</Button>
                            </DialogActions>
                        </Dialog>
                    </div>
                </Stack>
            </td>
        </tr>
    ); 
}

export default Todo_Row;