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
                    category: updateTodoInfo['TodoCategory'],
                    progress : updateTodoInfo['TodoProgress'],
                    done : updateTodoInfo['TodoDone'],
                    next_todo : updateTodoInfo['TodoNext'],
                    priority : updateTodoInfo['TodoPriority'],
                    deadline : moment(date).format("yyyy-MM-DD")
                }) 
            });
        setUpdateTodoInfo({
            TodoTitle: "",
            TodoCategory: "",
            TodoProgress: "",
            TodoDone: "",
            TodoNext:"",
            TodoPriority:"",
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
                            <Form.Group controlId='TodoCategory'>
                                <Form.Label>Todo Category</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='TodoCategory'
                                    value={updateTodoInfo.TodoCategory}
                                    onChange={updateForm}
                                    placeholder='Todo Category'
                                />
                            </Form.Group> 
                            <Form.Group controlId='TodoProgress'>
                                <Form.Label>Todo Progress</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='TodoProgress'
                                    value={updateTodoInfo.TodoProgress}
                                    onChange={updateForm}
                                    placeholder='Todo Progress'
                                />
                            </Form.Group> 
                            <Form.Group controlId='TodoDone'>
                                <Form.Label>Todo Done</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='TodoDone'
                                    value={updateTodoInfo.TodoDone}
                                    onChange={updateForm}
                                    placeholder='Todo Done'
                                />
                            </Form.Group> 
                            <Form.Group controlId='TodoNext'>
                                <Form.Label>Todo Next To Do</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='TodoNext'
                                    value={updateTodoInfo.TodoNext}
                                    onChange={updateForm}
                                    placeholder='Todo Next'
                                />
                            </Form.Group> 
                            <Form.Group controlId='TodoPriority'>
                                <Form.Label>Todo Priority</Form.Label>
                                <Form.Control
                                    type='text'
                                    name='TodoPriority'
                                    value={updateTodoInfo.TodoPriority}
                                    onChange={updateForm}
                                    placeholder='Todo Priority'
                                />
                            </Form.Group> 
                            <Form.Group controlId='TodoDeadline'>
                                <Form.Label>Todo Deadline</Form.Label>
                                <DatePicker 
                                    dateFormat="yyyy-MM-dd"
                                    selected={date} 
                                    onChange={date => setDate(date)} 
                                />
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