import { Fab } from '@mui/material'
import { Box } from '@mui/system'
import AddIcon from '@mui/icons-material/Add';
import React, { Fragment, useEffect, useState } from 'react'
import BankTable from './BankTable';
import BankDialog from './BankDialog';
import axios from 'axios';
import { smd_url } from '../../variable/BaseUrl';
import DeleteDialog from '../../components/DeleteDialog';

function Bank() {
    const [openDialog, setOpenDialog] = useState(false)
    const [opendDialogDelete, setOpenDialogDelete] = useState(false)
    const [bankID, setBankID] = useState('')
    const [bank, setBank] = useState([])
    const [bankDetail, setBankDetail] = useState('')
    const [type, setType] = useState('add')
    const token = localStorage.getItem('token')

    const getBank = async () => {
        await axios.get(smd_url + "banks", {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((res) => {
            setBank(res.data)
        })
    }

    useEffect(() => {
        getBank()
    }, [])

    const handleDialog = (data) => {
        setOpenDialog(data)
    }

    const handleSubmit = async (data) => {
        let formData = new FormData()
        formData.append('bank_code', data.bank_code)
        formData.append('bank_name', data.bank_name)

        await axios.post(smd_url + 'banks/create', formData, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(() => {
            getBank()
            handleDialog(false)
        })
    }

    const handleDialogDelete = (data) => {
        setOpenDialogDelete(data)
    }
    
    const showDialogDelete = (ID) => {
        setBankID(ID)
        handleDialogDelete(true)
    }

    const handleDelete = async (ID) => {
        await axios.delete(`${smd_url}banks/delete/${ID}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(() => {
            getBank()
            handleDialogDelete()
        })
    }

    const showDialogUpdate = async (ID) => {
        setType('edit')
        await axios.get(`${smd_url}banks/get/${ID}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((res) => {
            setBankDetail(res.data)
        })
        handleDialog(true)
    }

    const handleUpdate = async (data) => {
        await axios.put(`${smd_url}banks/update/${data.id}`, {
            bank_code: data.bank_code,
            bank_name: data.bank_name
        }, 
        {
            headers: {
                Authorization: 'Bearer ' + token
            },
        }).then(() => {
            getBank()
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
                    }}>
                    <AddIcon />
                </Fab>
            </Box>
            
            <Box mt={3} >
                <BankTable 
                    data = {bank}
                    showDialogDelete = {showDialogDelete}
                    showDialogUpdate = {showDialogUpdate}
                />
            </Box>

            <BankDialog 
                open = {openDialog}
                handleDialog = {handleDialog}
                handleSubmit = {handleSubmit}
                handleUpdate = {handleUpdate}
                data = {bankDetail}
                type = {type}
            />
            
            <DeleteDialog 
                open = {opendDialogDelete}
                handleDialog = {handleDialogDelete}
                handleDelete = {handleDelete}
                id = {bankID}
            />
        </Fragment >
    )
}

export default Bank
