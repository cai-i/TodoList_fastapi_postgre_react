import react, {useEffect, useContext, useState} from "react"
import { Table, Form, FormControl, Button, Stack, Container } from 'react-bootstrap'
import {TodoContext} from "../ToDoContext"
import { UpdateContext } from "../UpdateTodoContext"
import TodoRow from './TodosRow'
import { useHistory , Link } from "react-router-dom"



const TodosTable= () => {
    const [allTodos, setAllTodos] = useContext(TodoContext)
    const [updateTodoInfo, setUpdateTodoInfo] = useContext(UpdateContext)

    let uniqueUnits = [...new Set(allTodos.map((todo) => todo.unit))];
    
    const [searchByTitle, setSearchByTitle] = useState("")
    const [searchByUnit, setSearchByUnit] = useState("")

    let history = useHistory()

    const handleDelete = (id) => {
        fetch("http://localhost:5000/todos/" + id, {
            method: "DELETE",
            headers: {
                accept: 'application/json'
            }
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            const filteredTodos = allTodos.filter((todo) => todo.id !== id);
            setAllTodos(filteredTodos)
        })
    }

    const handleUpdate = (id) => {
        const todo = allTodos.filter(todo => todo.id === id)[0]
        setUpdateTodoInfo({
            TodoTitle: todo.title,
            TodoUnit: todo.unit,
            TodoId: id
        })
        history.push("/updateTodo")
    }

    const fetchTodos = async () => {
        const response = await fetch("http://localhost:5000")
        const todos = await response.json()
        setAllTodos(todos)
    }
    useEffect(() => {
        fetchTodos()
    }, [])

    const updateSearchByTitle = (e) => {
        setSearchByTitle(e.target.value)
    }

    const updateSearchByUnit = (e) => {
        setSearchByUnit(e.target.value)
    }

    const filterTodoByTitle = (e) => {
        e.preventDefault()
        const todo = allTodos.filter(todo => todo.title.toLowerCase().includes(searchByTitle.toLowerCase()) )
        setAllTodos(todo)
    }

    const filterTodoByUnit = (e) => {
        e.preventDefault()
        const todo = allTodos.filter(todo => todo.unit.toLowerCase() === searchByUnit.toLowerCase())
        setAllTodos(todo)
    }

    const refreshPage = () => {
        window.location.reload(false)
    }

    return (
        <Container>
            <Stack gap={3}>
                <Link to="/addtodo" size="lg" className="btn btn-primary btn-sm mr-4"> Add ToDo</Link>
                <Form onSubmit={filterTodoByTitle} inline>
                    <Stack direction="horizontal" gap={3}>
                        <FormControl 
                            value={searchByTitle} 
                            onChange={updateSearchByTitle} 
                            type="text" 
                            placeholder="Search by Title" 
                            className="me-auto" 
                        />
                        <Button type="submit" variant="secondary">Search</Button>
                    </Stack>
                </Form>
                <Form onSubmit={filterTodoByUnit} inline>
                    <Stack direction="horizontal" gap={3}>
                        <Form.Select 
                            value={searchByUnit} 
                            onChange={updateSearchByUnit} 
                            type="text" 
                            placeholder="Search by Unit" 
                            className="mr-sm-2" 
                        >
                            <option> Search by Unit </option>
                            {uniqueUnits.map(unit => (
                                <option value={unit}> {unit} </option>
                            ))}
                        </Form.Select>
                        <Button type="submit" variant="secondary">Search</Button>
                    </Stack>
                </Form>
                <Button onClick={refreshPage} variant="outline-danger">Reset</Button>
                <div>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Unit</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allTodos.map(todo => (
                                <TodoRow
                                    id = {todo.id}
                                    title = {todo.title}
                                    unit = {todo.unit}
                                    key = {todo.id}
                                    handleDelete = {handleDelete}
                                    handleUpdate = {handleUpdate}
                                />
                            ))}
                        </tbody>
                    </Table>
                </div>
            </Stack>
        </Container>
    );
}

export default TodosTable;