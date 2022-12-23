// row of subtodo
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

// customiser les bouttons
import { styled } from '@mui/material/styles';
import MuiButton from '@mui/material/Button';
import { yellow, red, lightBlue } from '@mui/material/colors';

// update row
import {useState, useContext} from "react"
import {UpdateSubtodoContext} from "../UpdateSubtodoContext"
import { Form, Stack} from 'react-bootstrap'
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

const SubtodoRow= ({subtodos, id, title, progress, todo_id}) => {

    //***********************************************************************
    // delete row :
    // **********************************************************************

    const DeleteButton = styled(MuiButton)(({ theme }) => ({
        color: theme.palette.getContrastText(red[500]),
        backgroundColor: red[500],
        '&:hover': {
            backgroundColor: red[800],
        },
    }));

    // delete subtodo given id
    const handleSubtodoDelete = (subtodo_id) => {
        fetch("http://localhost:5000/todos/" + todo_id + "/subtodos/" + subtodo_id, {
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

    //***********************************************************************
    // update row :
    // **********************************************************************

    const [updateSubtodoInfo, setUpdateSubtodoInfo] = useContext(UpdateSubtodoContext)

    const UpdateButton = styled(MuiButton)(({ theme }) => ({
        color: theme.palette.getContrastText(yellow[600]),
        backgroundColor: yellow[600],
        '&:hover': {
            backgroundColor: yellow[800],
        },
    }));

    const updateForm = (e) => {
        setUpdateSubtodoInfo({...updateSubtodoInfo, [e.target.name]: e.target.value})
    }

    // ouvrir la fenêtre pour ajouter task
    const [openTask, setOpenTask] = useState(false)

    // ouvrir la fenêtre
    const handleClickOpen = () => {
        setOpenTask(true);
        setUpdateSubtodoInfo({
            SubtodoTitle: title,
            SubtodoProgress : progress,
            SubtodoId: id
        })
    };

    // ferme la fenêtre
    const handleClose = () => {
        setOpenTask(false);
    };

    const putData = async (e) => {

        e.preventDefault();
    
        const url = "http://localhost:5000/todos/" + todo_id + "/subtodos/" + id

        const response = await fetch(
            url, {
                method: 'PUT',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin', 
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    title: updateSubtodoInfo['SubtodoTitle'],
                    progress : updateSubtodoInfo['SubtodoProgress'],
                }) 
            });
        setUpdateSubtodoInfo({
            SubtodoTitle: "",
            SubtodoProgress: "",
            SubtodoId: ""
        });
        window.location.reload(false)
    }


    //***********************************************************************
    // return :
    // **********************************************************************
    return (
        <TableRow  key={id}>
            <TableCell component="th" scope="row">
                {title}
            </TableCell>
            <TableCell align="left">{progress}</TableCell>
            <TableCell align="left">
                <Stack direction="horizontal" gap={3}>
                    <div>
                        <UpdateButton onClick={() => handleClickOpen()}>
                            Update
                        </UpdateButton>
                        <Dialog open={openTask} onClose={handleClose} fullWidth>
                            <DialogTitle>Update Task</DialogTitle>
                            <DialogContent>
                                <Form onSubmit = {putData}>
                                    <Stack gap={3}>
                                        <Form.Group controlId="SubtodoTitle">
                                            <Form.Label>Task Title</Form.Label>
                                            <Form.Control 
                                                type="text" 
                                                name="SubtodoTitle" 
                                                defaultValue={updateSubtodoInfo.SubtodoTitle}
                                                value={updateSubtodoInfo.SubtodoTitle} 
                                                onChange = {updateForm} 
                                                placeholder="Subtodo Title" />
                                        </Form.Group>
                                        <Form.Group controlId="SubtodoProgress">
                                            <Form.Label>Task Progress</Form.Label>
                                            <Form.Control 
                                                type="text" name="SubtodoProgress"
                                                defaultValue={updateSubtodoInfo.SubtodoProgress}
                                                value={updateSubtodoInfo.SubtodoProgress} 
                                                onChange = {updateForm} 
                                                placeholder="Subtodo Progress" />
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
                    <DeleteButton onClick={() => handleSubtodoDelete(id)}> Delete </DeleteButton>
                </Stack>
            </TableCell>
        </TableRow>
    );

}

export default SubtodoRow;