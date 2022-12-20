import {Stack} from "react-bootstrap"

// customiser les bouttons
import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';
import { yellow, red, lightBlue } from '@mui/material/colors';

// add task to Todo

import React, {useEffect, useContext, useState} from "react"

import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import {SubtodoContext} from "../SubtodoContext"

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

const TodoRow= ({id, title, unit, progress, content, deadline, handleDelete, handleUpdate}) => {

    // open/close task
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

    // Add task to Todo

    // // pr les subtodos
    // const [allSubtodos, setAllSubtodos] = useContext(SubtodoContext)
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
                <TableCell align="right">{unit}</TableCell>
                <TableCell align="right">{progress}</TableCell>
                <TableCell align="right">{content}</TableCell>
                <TableCell align="right">{deadline}</TableCell>
                <TableCell align="right">
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
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={openAddTask} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1 }}>
                            <Typography variant="h6" gutterBottom component="div">
                                Tasks
                            </Typography>
                            <Table size="small" aria-label="purchases">
                                <TableHead>
                                    <TableRow>
                                        <TableCell>title</TableCell>
                                        <TableCell>progress</TableCell>
                                    </TableRow>
                                </TableHead>
                                {/* <TableBody>
                                    {row.history.map((historyRow) => (
                                        <TableRow key={historyRow.date}>
                                            <TableCell component="th" scope="row">
                                                {historyRow.date}
                                            </TableCell>
                                            <TableCell>{historyRow.customerId}</TableCell>
                                            <TableCell align="right">{historyRow.amount}</TableCell>
                                            <TableCell align="right">
                                                {Math.round(historyRow.amount * row.price * 100) / 100}
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody> */}
                            </Table>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    ); 
}

export default TodoRow;