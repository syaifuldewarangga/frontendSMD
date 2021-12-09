import { Fab } from '@mui/material'
import { Box } from '@mui/system'
import AddIcon from '@mui/icons-material/Add';
import React, { Fragment, useEffect, useState } from 'react'
import ShiftTable from './ShiftTable';
import ShiftDialog from './ShiftDialog';
import axios from 'axios';
import { smd_url } from '../../variable/BaseUrl';
import DeleteDialog from '../../components/DeleteDialog';

function Shift() {
    const [openDialog, setOpenDialog] = useState(false)
    const [opendDialogDelete, setOpenDialogDelete] = useState(false)
    const [shiftID, setShiftID] = useState('')
    const [shift, setShift] = useState([])
    const [shiftDetail, setShiftDetail] = useState('')
    const [type, setType] = useState('add')
    const token = localStorage.getItem('token')

    const getShift = async () => {
        await axios.get(smd_url + 'shifts', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((res) => {
            setShift(res.data)
        })
    }
    
    useEffect(() => {
        getShift()
    }, [])

    const handleDialog = (data) => {
        setOpenDialog(data)
    }

    const insertShift = async (data) => {
        let formData = new FormData()
        formData.append('shift_name', data.shift_name)
        formData.append('in', data.in)
        formData.append('out', data.out)
        formData.append('shift_hours', data.shift_hours)

        await axios.post(smd_url + 'shifts/create', formData, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(() => {
            getShift()
            handleDialog(false)
        }).catch((err) => {
            console.log(err.response)
        })
    }

    const handleDialogDelete = (data) => {
        setOpenDialogDelete(data)
    }

    const showDialogDelete = (ID) => {
        setShiftID(ID)
        handleDialogDelete(true)
    }

    const handleDelete = async (ID) => {
        await axios.delete(`${smd_url}shifts/delete/${ID}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(() => {
            getShift()
            handleDialogDelete(false)
        })
    }

    const showDialogUpdate = async (ID) => {
        setType('edit')
        await axios.get(`${smd_url}shifts/get/${ID}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((res) => {
            setShiftDetail(res.data)
            handleDialog(true)
        })
        console.log(ID)
    }

    const handleUpdate = async (data) => {
        console.log(data)
        await axios.put(`${smd_url}shifts/update/${data.id}`, {
            shift_name: data.shift_name,
            in: data.in,
            out: data.out,
            shift_hours: data.shift_hours
        }, 
        {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(() => {
            getShift()
            handleDialog(false)
            console.log('erhasil')
        }).catch((err) => {
            console.log(err.response)
        })
    }
    return (
        <Fragment>
            <Box 
                sx={{ 
                    '& > :not(style)': { m: 1 } ,
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}
            >
                <Fab 
                    size="medium" 
                    color="primary" 
                    aria-label="add" 
                    onClick={() => {
                        handleDialog(true)
                        setType('add')
                    }}
                >
                    <AddIcon />
                </Fab>
            </Box>
            
            <Box mt={3} >
                <ShiftTable 
                    data = {shift}
                    showDialogDelete = {showDialogDelete}
                    showDialogUpdate = {showDialogUpdate}
                />
            </Box>

            <ShiftDialog 
                data = {shiftDetail}
                open = {openDialog}
                handleDialog = {handleDialog}
                handleSubmit = {insertShift}
                handleUpdate = {handleUpdate}
                type = {type}
            />

            <DeleteDialog 
                open = {opendDialogDelete}
                handleDialog = {handleDialogDelete}
                handleDelete = {handleDelete}
                id = {shiftID}
            />
        </Fragment >
    )
}

export default Shift
