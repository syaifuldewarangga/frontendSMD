import { Fab } from '@mui/material'
import { Box } from '@mui/system'
import AddIcon from '@mui/icons-material/Add';
import React, { Fragment, useEffect, useState } from 'react'
import DepartementTable from './DepartementTable';
import DepartementDialog from './DepartementDialog';
import axios from 'axios';
import { smd_url } from '../../variable/BaseUrl';
import DeleteDialog from '../../components/DeleteDialog';

function Departement() {
    const [openDialog, setOpenDialog] = useState(false)
    const [opendDialogDelete, setOpenDialogDelete] = useState(false)
    const [department, setDepartment] = useState([])
    const [departmentID, setDepartmentID] = useState('')
    const [departmentDetail, setDepartmentDetail] = useState('')
    const [type, setType] = useState('add')
    const [errorData, setErrorData] = useState({
        department_name: ''
    })
    const token = localStorage.getItem('token')

    const getDepertment = async () => {
        await axios.get(smd_url + 'departments', {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((res) => {
            setDepartment(res.data)
        })
    }

    useEffect(() => {
        getDepertment()
    }, [])

    const handleDialog = (data) => {
        setOpenDialog(data)
        if(data === false) {
            setErrorData({
                department_name: ''
            })
        }
    }

    const handleSubmit = async (data) => {
        let formData = new FormData()
        formData.append('department_name', data.department_name)

        await axios.post(smd_url + 'departments/create', formData, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(() => {
            handleDialog(false)
            getDepertment()
        }).catch((err) => {
            if(err.response.data.errors.reason) {
                setErrorData({
                    department_name: err.response.data.errors.reason
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
        setDepartmentID(ID)
        handleDialogDelete(true)
    }

    const handleDelete = async (ID) => {
        await axios.delete(`${smd_url}departments/delete/${ID}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(() => {
            getDepertment()
            handleDialogDelete(false)
        })
    }

    const showDialogUpdate = async (ID) => {
        setType('edit')
        await axios.get(`${smd_url}departments/get/${ID}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then((res) => {
            setDepartmentDetail(res.data)
            handleDialog(true)
        })
    }

    const handleUpdate = async (data) => {
        await axios.put(`${smd_url}departments/update/${data.id}`, {
            department_name: data.department_name
        }, 
        {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(() => {
            handleDialog(false)
            getDepertment()
        }).catch((err) => {
            if(err.response.data.errors.reason) {
                setErrorData({
                    department_name: err.response.data.errors.reason
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
                <DepartementTable 
                    data = {department}
                    showDialogDelete = {showDialogDelete}
                    showDialogUpdate = {showDialogUpdate}
                />
            </Box>

            <DepartementDialog 
                data = {departmentDetail}
                open = {openDialog}
                handleDialog = {handleDialog}
                handleSubmit = {handleSubmit}
                handleUpdate = {handleUpdate}
                type = {type}
                errorData = {errorData}
            />

            <DeleteDialog 
                open = {opendDialogDelete}
                handleDialog = {handleDialogDelete}
                handleDelete = {handleDelete}
                id = {departmentID}
            />
        </Fragment >
    )
}

export default Departement
