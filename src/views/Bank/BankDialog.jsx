import { DataArray } from '@mui/icons-material'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'

function BankDialog(props) {
    const [data, setData] = useState('')
    
    useEffect(() => {
        if(props.type === 'edit') {
            setData(props.data)
        } else if(props.type === 'add') {
            setData('')
        }
    }, [props.type, props.data])

    const onChange = (e) => {
        setData({
            ...data,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if(props.type === 'edit') {
            props.handleUpdate(data)
        } else if(props.type === 'add') {
            props.handleSubmit(data)
        }
    }

    return (
        <div>
            <Dialog 
                open={props.open} 
                onClose={() => props.handleDialog(false)}
                fullWidth="true"
                maxWidth="sm"
            >
                <DialogTitle>{props.type === 'add' ? 'Add' : 'Edit' } Bank</DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="bankCode"
                            label="Bank Code"
                            type="number"
                            min="0"
                            fullWidth
                            variant="standard"
                            sx={{ mb: 2 }}
                            name="bank_code"
                            onChange={onChange}
                            value={data.bank_code}
                        />
                        <TextField
                            autoFocus
                            required
                            margin="dense"
                            id="bankName"
                            label="Bank Name"
                            type="text"
                            fullWidth
                            variant="standard"
                            name="bank_name"
                            onChange={onChange}
                            value={data.bank_name}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => props.handleDialog(false)}>Cancel</Button>
                        <Button 
                            onClick={handleSubmit}
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

export default BankDialog
