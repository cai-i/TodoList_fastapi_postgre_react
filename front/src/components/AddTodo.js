import react, {useState} from "react";
import {Form, Button, Card, Container, Stack} from "react-bootstrap"

import { useHistory } from "react-router-dom"

import DatePicker from 'react-datepicker'
import moment from 'moment'

import 'react-datepicker/dist/react-datepicker.css'

const AddTodo = () => {

    const [todoInfo, setTodoInfo] = useState(
        {
            TodoTitle: "",
            TodoUnit: "",            
            TodoProgress: "",
            TodoContent: ""
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
                    "unit": todoInfo['TodoUnit'],
                    "progress" : todoInfo['TodoProgress'],
                    "content" : todoInfo['TodoContent'],
                    "deadline" : moment(date).format("yyyy-MM-DD")
                }) 
            });
        setTodoInfo({
            TodoTitle: "",
            TodoUnit: "",
            TodoContent: "",
            TodoProgress: "",
            TodoDeadline: ""
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
                            <Form.Group controlId="TodoUnit">
                                <Form.Label>Todo Unit</Form.Label>
                                <Form.Control type="text" name="TodoUnit"
                                value={todoInfo.TodoUnit} onChange = {updateForm} placeholder="Todo Unit" />
                            </Form.Group>
                            <Form.Group controlId="TodoProgress">
                                <Form.Label>Todo Progress</Form.Label>
                                <Form.Control type="text" name="TodoProgress" 
                                    value={todoInfo.TodoProgress} onChange = {updateForm} placeholder="Todo Progress" />
                            </Form.Group>
                            <Form.Group controlId="TodoContent">
                                <Form.Label>Todo Content</Form.Label>
                                <Form.Control type="text" name="TodoContent" 
                                    value={todoInfo.TodoContent} onChange = {updateForm} placeholder="Todo Content" />
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