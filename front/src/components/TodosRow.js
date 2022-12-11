import react from 'react'
import {Stack} from "react-bootstrap"

const TodoRow= ({id, title, unit, progress, content, deadline, handleDelete, handleUpdate}) => {
    return (
        <tr>
			<td> {title} </td>
			<td> {unit} </td>
            <td> {progress} </td>
            <td> {content} </td>
            <td> {deadline} </td>
            <td>
                <Stack direction="horizontal" gap={3}>
                    <button onClick={() => handleUpdate(id)} className='btn btn-outline-warning btn-sm ml-1 mr-2'>Update</button>
                    <button onClick={() => handleDelete(id)} className='btn btn-outline-danger btn-sm mr-2'>Delete</button>
                </Stack>
            </td>
        </tr>
    ); 
}

export default TodoRow;