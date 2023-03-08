import React, { useState } from 'react';
import { Paper, Box, Fab } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import CheckIcon from '@mui/icons-material/Check'
import DeleteIcon from '@mui/icons-material/Delete'
const TodoItem = (props) => {
    const [editvalues, setEditValues] = useState("false")
    const [line, setLine] = useState(false)

    const onLine = () => {
        setLine(true)
    }
    const onEdit = () => {
        setEditValues("true")
    }
    return (

        <>
            <Paper elevation={5} style={{ padding: '20px',display:'flex' }}>
                <Box style={{ display: 'flex' }}>
                    <span contentEditable={editvalues} style={{ textDecoration: line ? "line-through" : "none", fontSize: "20px", padding: '5px' }}>
                        {props.addedItem}
                    </span>

                </Box>

                <Box p={1}>
                    <Fab color="success" aria-label="complete" onClick={onLine} style={{ backgroundColor: 'lightblue', color: 'white' }}>
                        <CheckIcon />
                    </Fab>
                </Box>

                <Box p={1}>
                    <Fab color="primary" aria-label="complete" onClick={onEdit} style={{ backgroundColor: 'green', color: 'white' }}>
                        <EditIcon />
                    </Fab>
                </Box>

                <Box p={1}>
                    <Fab color="secondary" aria-label="delete" onClick={() => {
                        props.onDelete(props.id);
                    }} style={{ marginLeft: '5px' }}>
                        <DeleteIcon />
                    </Fab>

                </Box>
            </Paper>

        </>
    )
}
export default TodoItem