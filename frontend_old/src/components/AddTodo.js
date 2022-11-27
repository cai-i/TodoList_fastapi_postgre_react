import react, {useState} from "react";
import {Form, Button, Card, Container, Stack} from "react-bootstrap"

import { useHistory } from "react-router-dom"

const AddTodo = () => {

    const [todoInfo, setTodoInfo] = useState(
        {
            TodoTitle: "",
            TodoUnit: ""
        }
    )

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
                }) 
            });
        setTodoInfo({
            TodoTitle: "",
            TodoUnit: ""
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