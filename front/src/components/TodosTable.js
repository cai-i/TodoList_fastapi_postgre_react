import {useEffect, useContext, useState} from "react"
import { Form, FormControl, Stack, Container } from 'react-bootstrap'
import { useHistory , Link } from "react-router-dom"

import Button from '@mui/material/Button';

// create table
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

// row
import TodoRow from './TodosRow'

// Todos
import { TodoContext } from "../ToDoContext"
import { UpdateContext } from "../UpdateTodoContext"


const TodosTable= () => {
    // Todos
    const [allTodos, setAllTodos] = useContext(TodoContext)
    const [updateTodoInfo, setUpdateTodoInfo] = useContext(UpdateContext)

    // search in the todo list accroding to somme criterias
    const [searchByTitle, setSearchByTitle] = useState("")
    const [searchByCategory, setSearchByCategory] = useState("")

    // display once all categories added
    let uniqueCategories = [...new Set(allTodos.map((todo) => todo.category))];

    // push to another url
    let history = useHistory()

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

    // recherche todo par category
    const updateSearchByCategory = (e) => {
        setSearchByCategory(e.target.value)
    }

    // recupère tous les todo de la recherche par titre
    const filterTodoByTitle = (e) => {
        e.preventDefault()
        const todo = allTodos.filter(todo => todo.title.toLowerCase().includes(searchByTitle.toLowerCase()) )
        setAllTodos(todo)
    }

    // recupère tous les todo de la recherche par category
    const filterTodoByCategory = (e) => {
        e.preventDefault()
        const todo = allTodos.filter(todo => todo.category.toLowerCase() === searchByCategory.toLowerCase())
        setAllTodos(todo)
    }

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
            TodoCategory: todo.category,
            TodoProgress : todo.progress,
            TodoDone : todo.done,
            TodoNext : todo.next_todo,
            TodoPriority : todo.priority,
            TodoDeadline : todo.deadline,
            TodoId: id
        })
        history.push("/updateTodo")
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
                <Form onSubmit={filterTodoByCategory} inline>
                    <Stack direction="horizontal" gap={3}>
                        <Form.Select 
                            value={searchByCategory} 
                            onChange={updateSearchByCategory} 
                            type="text" 
                            placeholder="Search by Category" 
                            className="mr-sm-2" 
                        >
                            <option> Search by Category </option>
                            {uniqueCategories.map(category => (
                                <option value={category}> {category} </option>
                            ))}
                        </Form.Select>
                        <Button type="submit" variant="contained" color="secondary">Search</Button>
                    </Stack>
                </Form>
                <Button onClick={refreshPage} variant="outlined" color="error">Reset the selection</Button>
                <div>
                    <TableContainer component={Paper}>
                        <Table aria-label="collapsible table"> 
                            <TableHead > 
                                <TableRow sx={{
                                    "& th": {
                                        color: "white",
                                        backgroundColor: "black"
                                    }
                                }}>
                                    <TableCell>Title</TableCell>
                                    <TableCell align="left">Category</TableCell>
                                    <TableCell align="left">Priority</TableCell>
                                    <TableCell align="left">Progress</TableCell>
                                    <TableCell align="left">Done</TableCell>
                                    <TableCell align="left">Next To Do</TableCell>
                                    <TableCell align="left">Deadline</TableCell>
                                    <TableCell align="left">Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {allTodos.map(todo => (
                                    <TodoRow
                                        id = {todo.id}
                                        title = {todo.title}
                                        category = {todo.category}
                                        progress = {todo.progress}
                                        done = {todo.done}
                                        next_todo = {todo.next_todo}
                                        deadline = {todo.deadline}
                                        priority = {todo.priority}
                                        key = {todo.id}
                                        handleDelete = {handleDelete}
                                        handleUpdate = {handleUpdate}
                                        subtodos= {todo.subtodos}
                                    />
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Stack>
        </Container>
    );
}

export default TodosTable;