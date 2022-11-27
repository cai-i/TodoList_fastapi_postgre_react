import react, {useContext, useState} from "react"
import {Navbar, Nav, Button, Badge, Container, Stack } from "react-bootstrap"
import { useHistory } from "react-router-dom"
import { TodoContext } from "../ToDoContext"

const NavBar = () => {
    const [allTodos, setAllTodos] = useContext(TodoContext)

    let history = useHistory()

    const sendHome = () => {
        history.push("/")
        window.location.reload(false)
    }

    return(
        <Navbar bg="dark" expand="lg" variant="dark">
            <Container>
                <Navbar.Brand href="#home">My ToDo List</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mr-auto">            
                        <Badge className="mt-2" variant="primary"> Number of Todo : {allTodos.length}</Badge>
                    </Nav>
                    <Navbar.Collapse className="justify-content-end">
                        <Stack direction="horizontal" gap={3}>
                            <Button onClick={sendHome} type="submit" variant="success" size="lg">Home</Button>
                        </Stack>
                    </Navbar.Collapse>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar;