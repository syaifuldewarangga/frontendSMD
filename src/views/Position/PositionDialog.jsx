import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'

function PositionDialog(props) {
    const [data, setData] = useState('')
    
    const onChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
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
        e.preventDefault ()
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
                <form onSubmit={handleSubmit}>
                    <DialogTitle>{props.type === 'add' ? 'Add' : 'Edit' } Position</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="position"
                            label="Position"
                            type="text"
                            fullWidth
                            variant="standard"
                            name="position_name"
                            onChange={onChange}
                            value={data.position_name}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => props.handleDialog(false)}>Cancel</Button>
                        <Button type="submit">Save</Button>
                    </DialogActions>
                </form>
            </Dialog>
        </div>
    )
}

export default PositionDialog
