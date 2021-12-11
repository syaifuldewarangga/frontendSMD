import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { useEffect, useState } from 'react'

function ShiftDialog(props) {
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
        } else {
            setData('')
        }
    }, [props.type, props.data])

    const onSubmit = (e) => {
        e.preventDefault()
        if(props.type === 'edit')  {
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
                <DialogTitle>Add Shift</DialogTitle>
                <form onSubmit={onSubmit}>
                    <DialogContent>
                        <Box component="form" >
                            <TextField
                                autoFocus
                                margin="dense"
                                id="shift_name"
                                label="Shift"
                                type="text"
                                fullWidth
                                variant="standard"
                                sx={{ mb: 2 }}
                                name="shift_name"
                                onChange={onChange}
                                value={data.shift_name}
                            />
                            <Grid container spacing={2} >
                                <Grid item lg={4}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="in"
                                        label="Schedule In"
                                        type="time"
                                        variant="standard"
                                        fullWidth
                                        name="in"
                                        onChange={onChange}
                                        value={data.in}
                                    />
                                </Grid>
                                <Grid item lg={4}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="out"
                                        label="Schedule Out"
                                        type="time"
                                        variant="standard"
                                        fullWidth
                                        name="out"
                                        onChange={onChange}
                                        value={data.out}
                                    />
                                </Grid>
                                <Grid item lg={4}>
                                    <TextField
                                        autoFocus
                                        margin="dense"
                                        id="shift_hours"
                                        label="Shift Hours"
                                        type="time"
                                        variant="standard"
                                        fullWidth
                                        name="shift_hours"
                                        onChange={onChange}
                                        value={data.shift_hours}
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => props.handleDialog(false)}>Cancel</Button>
                        <Button 
                            type="submit"
                        >
                            Save
                        </Button>
                    </DialogActions>
                </form>

            </Dialog>
        </div>
    )
}

export default ShiftDialog
