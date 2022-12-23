import {useState, useContext} from "react"
import {Form, Button, Card, Container, Stack} from "react-bootstrap"
import { UpdateContext } from "../UpdateTodoContext"
import { useHistory } from "react-router-dom"
import DatePicker from 'react-datepicker'
import moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css'

const UpdateTodo = () => {
    const [updateTodoInfo, setUpdateTodoInfo] = useContext(UpdateContext)
    const [date, setDate] = useState(new Date());

    let history = useHistory()

    const updateForm = (e) => {
        setUpdateTodoInfo({...updateTodoInfo, [e.target.name]: e.target.value})
    }

    const postData = async (e) => {
        e.preventDefault();
    
        const url = "http://localhost:5000/todos/" + updateTodoInfo["TodoId"]

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
                    title: updateTodoInfo['TodoTitle'],
                    unit: updateTodoInfo['TodoUnit'],
                    progress : updateTodoInfo['TodoProgress'],
                    content : updateTodoInfo['TodoContent'],
                    deadline : moment(date).format("yyyy-MM-DD")
                }) 
            });
        setUpdateTodoInfo({
            TodoTitle: "",
            TodoUnit: "",
            TodoProgress: "",
            TodoContent: "",
            TodoDeadline: "",
            TodoId: ""
        });
        history.push("/")
    }

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Form  onSubmit={postData} >
                        <Stack gap={3}>
                            <Form.Group controlId='TodoTitle'>
                                <Form.Label>Todo Title</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='TodoTitle'
                                    value={updateTodoInfo.TodoTitle}
                                    onChange={updateForm}
                                    placeholder='Todo Title'
                                />
                            </Form.Group>
                            <Form.Group controlId='TodoUnit'>
                                <Form.Label>Todo Unit</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='TodoUnit'
                                    value={updateTodoInfo.TodoUnit}
                                    onChange={updateForm}
                                    placeholder='Todo Unit'
                                />
                            </Form.Group> 
                            <Form.Group controlId='TodoUnit'>
                                <Form.Label>Todo Progress</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='TodoProgress'
                                    value={updateTodoInfo.TodoProgress}
                                    onChange={updateForm}
                                    placeholder='Todo Progress'
                                />
                            </Form.Group> 
                            <Form.Group controlId='TodoContent'>
                                <Form.Label>Todo Content</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='TodoContent'
                                    value={updateTodoInfo.TodoContent}
                                    onChange={updateForm}
                                    placeholder='Todo Content'
                                />
                            </Form.Group> 
                            <Form.Group controlId='TodoDeadline'>
                                <Form.Label>Todo Deadline</Form.Label>
                                <DatePicker 
                                    dateFormat="yyyy-MM-dd"
                                    selected={date} 
                                    onChange={date => setDate(date)} 
                                />
                                {/* <Form.Control
                                    type='text'
                                    name='TodoDeadline'
                                    value={updateTodoInfo.TodoDeadline}
                                    onChange={updateForm}
                                    placeholder='Todo Deadline'
                                /> */}
                            </Form.Group> 
                            <Button variant='primary' type='submit'>
                                Submit
                            </Button>
                        </Stack>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default UpdateTodo;