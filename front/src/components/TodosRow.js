// customiser les bouttons
import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';
import { yellow, red, lightBlue } from '@mui/material/colors';

// add task to Todo

import React, {useEffect, useContext, useState} from "react"

import { Form, Stack} from 'react-bootstrap'
 
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

// Create row
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import {ExpandMoreSharp} from '@mui/icons-material';
import {ExpandLessSharp} from '@mui/icons-material';

// subtodo rows
import SubtodoRow from './SubtodosRow';

const TodoRow= ({id, title, category, progress, done, next_todo, priority, deadline, handleDelete, handleUpdate, subtodos}) => {

    // open/close task in table
    const [openTask, setOpenTask] = useState(false);

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

    // ouvrir la fenêtre pour ajouter task
    const [openAddTask, setOpenAddTask] = useState(false)

    // ouvrir la fenêtre
    const handleClickOpen = () => {
        setOpenAddTask(true);
    };

    // ferme la fenêtre
    const handleClose = () => {
        setOpenAddTask(false);
    };

    // Add task to Todo

    const [subtodoInfo, setSubtodoInfo] = useState(
        {
            SubtodoTitle: "",      
            SubtodoProgress: "",
            SubtodoDone: "",
            SubtodoNext: ""
        }
    )

    const handleSubtodoChange = (e) => {
        setSubtodoInfo(
            {...subtodoInfo, [e.target.name] : e.target.value}
        )
      };

    const postData = async (e) => {
        e.preventDefault();
        console.log(subtodoInfo)
    
        const url = "http://localhost:5000/todos/" + id + "/subtodos" 

        const response = await fetch(
            url, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin', 
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer', 
                body: JSON.stringify({
                    "title": subtodoInfo['SubtodoTitle'],
                    "progress" : subtodoInfo['SubtodoProgress'],
                    "done" : subtodoInfo['SubtodoDone'],
                    "next_todo" : subtodoInfo['SubtodoNext']
                }) 
            });
        setSubtodoInfo({
            SubtodoTitle: "",      
            SubtodoProgress: "",
            SubtodoDone: "",
            SubtodoNext: ""
        });
        window.location.reload(false)
        setOpenAddTask(true)
    }

    // delete subtodo given id
    const handleSubtodoDelete = (subtodo_id) => {
        fetch("http://localhost:5000/todos/" + id + "/subtodos/" + subtodo_id, {
            method: "DELETE",
            headers: {
                accept: 'application/json'
            }
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            const filteredSubtodos = subtodos.filter((subtodo) => subtodo.todo_id === id).filter((subtodo) => subtodo.id !== subtodo_id);
            return filteredSubtodos
        })
        window.location.reload(false)
    }

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>
                    <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpenTask(!openTask)}
                    >
                        {openTask ? <ExpandLessSharp /> : <ExpandMoreSharp />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    {title}
                </TableCell>
                <TableCell align="left">{category}</TableCell> 
                <TableCell align="left">{progress}</TableCell>
                <TableCell align="left">{category}</TableCell>
                <TableCell align="left">{next_todo}</TableCell>
                <TableCell align="left">{deadline}</TableCell>
                <TableCell align="left">{priority}</TableCell>
                <TableCell align="left">
                    <Stack direction="horizontal" gap={3}>
                        <UpdateButton onClick={() => handleUpdate(id)}>Update</UpdateButton>
                        <DeleteButton onClick={() => handleDelete(id)}>Delete</DeleteButton>
                        <div>
                            <AddTaskButton onClick={() => handleClickOpen()}>
                                Add Task
                            </AddTaskButton>
                            <Dialog open={openAddTask} onClose={handleClose} fullWidth>
                                <DialogTitle>Add Task</DialogTitle>
                                <DialogContent>
                                    <Form onSubmit = {postData}>
                                        <Stack gap={3}>
                                            <Form.Group controlId="SubtodoTitle">
                                                <Form.Label>Task Title</Form.Label>
                                                <Form.Control type="text" name="SubtodoTitle" 
                                                    value={subtodoInfo.SubtodoTitle} onChange = {handleSubtodoChange} placeholder="Subtodo Title" />
                                            </Form.Group>
                                            <Form.Group controlId="SubtodoProgress">
                                                <Form.Label>Task Progress</Form.Label>
                                                <Form.Control type="text" name="SubtodoProgress"
                                                value={subtodoInfo.SubtodoProgress} onChange = {handleSubtodoChange} placeholder="Subtodo Progress" />
                                            </Form.Group>
                                            <Form.Group controlId="SubtodoDone">
                                                <Form.Label>Task Done</Form.Label>
                                                <Form.Control type="text" name="SubtodoDone"
                                                value={subtodoInfo.SubtodoDone} onChange = {handleSubtodoChange} placeholder="Subtodo Done" />
                                            </Form.Group>
                                            <Form.Group controlId="SubtodoNext">
                                                <Form.Label>Task Next To Do</Form.Label>
                                                <Form.Control type="text" name="SubtodoNext"
                                                value={subtodoInfo.SubtodoNext} onChange = {handleSubtodoChange} placeholder="Subtodo Next" />
                                            </Form.Group>
                                            <Button variant="contained" type="submit">
                                                Submit
                                            </Button>
                                        </Stack>
                                    </Form>
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                </DialogActions>
                            </Dialog>
                        </div>
                    </Stack>
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={openTask} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Tasks
                            </Typography>
                            <Table size="small" aria-label="tasks">
                                <TableHead style={{backgroundColor:'lightgrey'}}>
                                    <TableRow>
                                        <TableCell />
                                        <TableCell>Title</TableCell>
                                        <TableCell>Progress</TableCell>
                                        <TableCell>Done</TableCell>
                                        <TableCell>Next To Do</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {subtodos.map((subtodo) => (
                                        <SubtodoRow 
                                            subtodos = {subtodos}
                                            id = {subtodo.id}
                                            title = {subtodo.title}
                                            progress = {subtodo.progress}
                                            done={subtodo.done}
                                            next_todo={subtodo.next_todo}
                                            todo_id = {id}
                                        />
                                    ))}
                                </TableBody>
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    ); 
}

export default TodoRow;