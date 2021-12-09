import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'

function DepartementDialog(props) {
    const [data, setData] = useState('')

    const onChange = (e) => {
        setData({
            ...data,
            [e.target.name] : e.target.value
        })
    }
    
    useEffect(() => {
        if(props.type === 'edit') {
            setData(props.data)
        } else if(props.type === 'add') {
            setData('')
        }
    }, [props.type, props.data])

    const handleSubmit = (e) => {
        e.preventDefault()
        if(props.type === 'edit') {
            props.handleUpdate(data)
        } else if(props.type === 'add') {
            props.handleSubmit(data)
        }
        setData('')
    }

    return (
        <div>
            <Dialog 
                open={props.open} 
                onClose={() => props.handleDialog(false)}
                fullWidth="true"
                maxWidth="sm"
            >
                <DialogTitle>
                    {props.type === 'add' ? 'Add' : 'Edit'} Department
                </DialogTitle>
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
                            value={data.department_name}
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
