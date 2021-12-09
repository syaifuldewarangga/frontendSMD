import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React, { useState } from 'react'

function DepartementDialog(props) {
    const [data, setData] = useState('')

    const onChange = (e) => {
        setData({
            [e.target.name] : e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        props.handleSubmit(data)
    }
    return (
        <div>
            <Dialog 
                open={props.open} 
                onClose={() => props.handleDialog(false)}
                fullWidth="true"
                maxWidth="sm"
            >
                <DialogTitle>Add Department</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="department_name"
                            label="Department"
                            type="text"
                            fullWidth
                            variant="standard"
                            name="department_name"
                            required
                            onChange={onChange}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => props.handleDialog(false)}>Cancel</Button>
                        <Button onClick={handleSubmit} type="submit">Save</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}

export default DepartementDialog
