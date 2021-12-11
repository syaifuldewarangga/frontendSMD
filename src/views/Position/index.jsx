import { Fab } from '@mui/material'
import { Box } from '@mui/system'
import AddIcon from '@mui/icons-material/Add';
import React, { Fragment, useEffect, useState } from 'react'
import PositonTable from './PositionTable';
import PositonDialog from './PositionDialog';
import axios from 'axios';
import { smd_url } from '../../variable/BaseUrl';
import DeleteDialog from '../../components/DeleteDialog';

function Positon() {
    const [openDialog, setOpenDialog] = useState(false)
    const [opendDialogDelete, setOpenDialogDelete] = useState(false)
    const [position, setPosition] = useState([])
    const [positionDetail, setPositionDetail] = useState('')
    const [type, setType] = useState('add')
    const [positionID, setPositionID] = useState('')
    const [errorData, setErrorData] = useState({
        position_name: ''
    })
    const token = localStorage.getItem('token')

    const getPosition = async () => {
        await axios.get(smd_url + 'positions', {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => {
            setPosition(res.data)
        })
    }

    useEffect(() => {
        getPosition()
    }, [])

    const handleDialog = (data) => {
        setOpenDialog(data)
        if(data === false) {
            setErrorData({
                position_name: ''
            })
        }
    }

    const handleSubmit = async (data) => {
        let formData = new FormData()
        formData.append('position_name', data.position_name)
        await axios.post(smd_url + 'positions/create', formData, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(() => {
            getPosition()
            setOpenDialog(false)
        }).catch((err) => {
            if(err.response.data.errors.reason){
                setErrorData({
                    position_name: err.response.data.errors.reason
                })
            } else {
                console.log(err.response)
            }
        })
    }

    const handleDialogDelete = (data) => {
        setOpenDialogDelete(data)
    }
    
    const showDialogDelete = (ID) => {
        setPositionID(ID)
        handleDialogDelete(true)
    }

    const handleDelete = async (ID) => {
        await axios.delete(`${smd_url}positions/delete/${ID}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(() => {
            getPosition()
            handleDialogDelete(false)
        })
    }

    const showDialogUpdate = async (ID) => {
        setType('edit')
        await axios.get(`${smd_url}positions/get/${ID}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((res) => {
            setPositionDetail(res.data)
            handleDialog(true)
        })
    }

    const handleUpdate = async (data) => {
        await axios.put(`${smd_url}positions/update/${data.id}`, {
            position_name: data.position_name
        }, 
        {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(() => {
            handleDialog(false)
            getPosition()
        }).catch((err) => {
            if(err.response.data.errors.reason){
                setErrorData({
                    position_name: err.response.data.errors.reason
                })
            } else {
                console.log(err.response)
            }
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
                <PositonTable 
                    data = {position}
                    handleUpdate = {handleUpdate}
                    showDialogDelete = {showDialogDelete}
                    showDialogUpdate = {showDialogUpdate}
                />
            </Box>

            <PositonDialog
                data = {positionDetail}
                open = {openDialog}
                handleDialog = {handleDialog}
                handleSubmit = {handleSubmit}
                handleUpdate= {handleUpdate}
                type={type}
                errorData = {errorData}
            />

            <DeleteDialog 
                open = {opendDialogDelete}
                handleDialog = {handleDialogDelete}
                handleDelete = {handleDelete}
                id = {positionID}
            />
        </Fragment >
    )
}

export default Positon
