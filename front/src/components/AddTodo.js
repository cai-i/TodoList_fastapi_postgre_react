import react, {useState} from "react";
import {Form, FormControl, Button, Card, Container, Stack} from "react-bootstrap"

import { useHistory } from "react-router-dom"

import DatePicker from 'react-datepicker'
import moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css'

const AddTodo = () => {

    const [todoInfo, setTodoInfo] = useState(
        {
            TodoTitle: "",
            TodoCategory: "",            
            TodoProgress: "",
            TodoDeadline:"",
            TodoDone: "",
            TodoNext:"",
            TodoPriority:""
        }
    )
    const [date, setDate] = useState(new Date());

    let history = useHistory()

    const updateForm = (e) => {
        setTodoInfo(
            {...todoInfo, [e.target.name] : e.target.value}
        )
    }

    const postData = async (e) => {
        e.preventDefault();
        console.log(todoInfo)
    
        const url = "http://localhost:5000/todos/" 

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
                    "title": todoInfo['TodoTitle'],
                    "category": todoInfo['TodoCategory'],
                    "progress" : todoInfo['TodoProgress'],
                    "deadline" : moment(date).format("yyyy-MM-DD"),
                    "dodo" : todoInfo['TodoDone'],
                    "next_todo" : todoInfo['TodoNext'],
                    "priority" : todoInfo['TodoPriority'],
                }) 
            });
        setTodoInfo({
            TodoTitle: "",
            TodoCategory: "",            
            TodoProgress: "",
            TodoDeadline:"",
            TodoDone: "",
            TodoNext:"",
            TodoPriority:""
        });
        history.push("/")
    }

    return (
        <Container>
            <Card>
                <Card.Body>
                    <Form onSubmit = {postData}>
                        <Stack gap={3}>
                            <Form.Group controlId="TodoTitle">
                                <Form.Label>Todo Title</Form.Label>
                                <Form.Control type="text" name="TodoTitle" 
                                    value={todoInfo.TodoTitle} onChange = {updateForm} placeholder="Todo Title" />
                            </Form.Group>
                            <Form.Group controlId="TodoCategory">
                                <Form.Label>Todo Category</Form.Label>
                                <Form.Control type="text" name="TodoCategory"
                                value={todoInfo.TodoCategory} onChange = {updateForm} placeholder="Todo Category" />
                            </Form.Group>
                            <Form.Group controlId="TodoDone">
                                <Form.Label>Todo Done</Form.Label>
                                <Form.Control type="text" name="TodoDone" 
                                    value={todoInfo.TodoDone} onChange = {updateForm} placeholder="Todo Done" />
                            </Form.Group>
                            <Form.Group controlId="TodoNext">
                                <Form.Label>Todo Next</Form.Label>
                                <Form.Control type="text" name="TodoNext" 
                                    value={todoInfo.TodoNext} onChange = {updateForm} placeholder="Todo Next" />
                            </Form.Group>
                            <Form.Group controlId="TodoProgress">
                                <Form.Label>Todo Progress</Form.Label>
                                <Form.Control type="text" name="TodoProgress" 
                                    value={todoInfo.TodoProgress} onChange = {updateForm} placeholder="Todo Progress" />
                            </Form.Group>
                            <Form.Group controlId="TodoPriority">
                                <Form.Label>Todo Priority</Form.Label>
                                <Form.Control type="text" name="TodoPriority" 
                                    value={todoInfo.TodoPriority} onChange = {updateForm} placeholder="Todo Priority" />
                            </Form.Group>
                            <Form.Group controlId="TodoDeadline">
                                <Form.Label>Todo Deadline</Form.Label>
                                <DatePicker 
                                    dateFormat="yyyy-MM-dd"
                                    selected={date} 
                                    onChange={date => setDate(date)} 
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Stack>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
}

export default AddTodo;