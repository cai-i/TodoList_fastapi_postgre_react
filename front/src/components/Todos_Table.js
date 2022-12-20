import {useEffect, useContext, useState} from "react"
import { Table, Form, FormControl, Stack, Container } from 'react-bootstrap'
import { useHistory , Link } from "react-router-dom"

import { TodoContext } from "../ToDoContext"
import { UpdateContext } from "../UpdateTodoContext"

import TodoRow from './TodosRow'

import Button from '@mui/material/Button';


const Todos_Table= () => {
    const [allTodos, setAllTodos] = useContext(TodoContext)
    const [updateTodoInfo, setUpdateTodoInfo] = useContext(UpdateContext)

    // display once all unit added
    let uniqueUnits = [...new Set(allTodos.map((todo) => todo.unit))];
    
    // search in the todo list accroding to somme criterias
    const [searchByTitle, setSearchByTitle] = useState("")
    const [searchByUnit, setSearchByUnit] = useState("")

    // push to another url
    let history = useHistory()

    // delete todo given id
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

    // uptdate todo given id
    const handleUpdate = (id) => {
        const todo = allTodos.filter(todo => todo.id === id)[0]
        setUpdateTodoInfo({
            TodoTitle: todo.title,
            TodoUnit: todo.unit,
            TodoProgress : todo.progress,
            TodoContent : todo.content,
            TodoDeadline : todo.deadline,
            TodoId: id
        })
        history.push("/updateTodo")
    }

    // récupère toutes les todos depuis l'api
    const fetchTodos = async () => {
        const response = await fetch("http://localhost:5000")
        const todos = await response.json()
        setAllTodos(todos)
    }
    useEffect(() => {
        fetchTodos()
    }, [])

    // recherche todo par titre
    const updateSearchByTitle = (e) => {
        setSearchByTitle(e.target.value)
    }

    // recherche todo par unité
    const updateSearchByUnit = (e) => {
        setSearchByUnit(e.target.value)
    }

    // recupère tous les todo de la recherche par titre
    const filterTodoByTitle = (e) => {
        e.preventDefault()
        const todo = allTodos.filter(todo => todo.title.toLowerCase().includes(searchByTitle.toLowerCase()) )
        setAllTodos(todo)
    }

    // recupère tous les todo de la recherche par unité
    const filterTodoByUnit = (e) => {
        e.preventDefault()
        const todo = allTodos.filter(todo => todo.unit.toLowerCase() === searchByUnit.toLowerCase())
        setAllTodos(todo)
    }

    // refresh la page
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
                        <Button type="submit" variant="contained" color="secondary">Search</Button>
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
                        <Button type="submit" variant="contained" color="secondary">Search</Button>
                    </Stack>
                </Form>
                <Button onClick={refreshPage} variant="outlined" color="error">Reset the selection</Button>
                <div>
                    <Table responsive>
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Unit</th>
                                <th>Progress</th>
                                <th>Content</th>
                                <th>Deadline</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allTodos.map(todo => (
                                <TodoRow
                                    id = {todo.id}
                                    title = {todo.title}
                                    unit = {todo.unit}
                                    progress = {todo.progress}
                                    content = {todo.content}
                                    deadline = {todo.deadline}
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

export default Todos_Table;