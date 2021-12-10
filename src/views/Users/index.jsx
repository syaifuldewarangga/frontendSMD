import React, { Fragment, useEffect, useState } from 'react'
import { Fab } from '@mui/material'

import PersonAddIcon from '@mui/icons-material/PersonAdd';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FilterAltIcon from '@mui/icons-material/FilterAlt';

import { Box } from '@mui/system';
import UsersTable from './UsersTable';
import { smd_url } from '../../variable/BaseUrl';
import axios from 'axios';
import DeleteDialog from '../../components/DeleteDialog';
import { NavLink } from 'react-router-dom';


function Users() {
    const [user, setUser] = useState([])
    const [opendDialogDelete, setOpenDialogDelete] = useState(false)
    const [userID, setUserID] = useState()
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [searchUser, setSearchUser] = useState('')
    const token = localStorage.getItem('token')
    
    const getUser = async () => {
        await axios.get(smd_url + 'users', {
            headers: {
                Authorization: 'Bearer ' + token
            }, 
            params : {
                page: page,
                itemPerPage: rowsPerPage
            }
        }).then((res) => {
            setUser(res.data)
        })
    }

    const handleSearchUser = async () => {
        await axios.get(smd_url + 'users/search', {
            headers: {
                Authorization: 'Bearer ' + token
            }, 
            params : {
                param: searchUser,
                page: page,
                itemPerPage: rowsPerPage
            }
        }).then((res) => {
            setUser(res.data)
        })
    }
    
    useEffect(() => {
        if(searchUser !== '') {
            const fieldSearchUser = setTimeout(() => {
                handleSearchUser()
            }, 500)
            return () => clearTimeout(fieldSearchUser)
        } else {
            getUser()
        }
    }, [searchUser])

    useEffect(() => {
        getUser()
    }, [page, rowsPerPage])

    const handleDialogDelete = (data) => {
        setOpenDialogDelete(data)
    }

    const showDialogDelete = (ID) => {
        setUserID(ID)
        handleDialogDelete(true)
    }

    const handleDelete = async (ID) => {
        await axios.delete(`${smd_url}users/delete/${ID}`, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(() => {
            getUser()
            handleDialogDelete(false)
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
                <NavLink to="/master-data/users/add">
                    <Fab 
                        size="medium" 
                        color="primary" 
                        aria-label="add" 
                    >
                        <PersonAddIcon />
                    </Fab>
                </NavLink>
                <Fab size="medium" color="primary" aria-label="download">
                    <CloudDownloadIcon />
                </Fab>
                <Fab size="medium" color="primary" aria-label="filter">
                    <FilterAltIcon />
                </Fab>
                <Fab size="medium" color="primary" aria-label="upload">
                    <CloudUploadIcon />
                </Fab>
            </Box>
            
            <Box mt={3} >
                <UsersTable 
                    data = {user}
                    showDialogDelete = {showDialogDelete}
                    setPage = {(page) => setPage(page)}
                    setRowsPerPage={(itemPerPage) => setRowsPerPage(itemPerPage)}
                    handleUserSearch = {(value) => {
                        setSearchUser(value)
                    }}
                />
            </Box>

            <DeleteDialog 
                open = {opendDialogDelete}
                handleDialog = {handleDialogDelete}
                handleDelete = {handleDelete}
                setPage = {(page) => setPage(page)}
                setRowsPerPage={(itemPerPage) => setRowsPerPage(itemPerPage)}
                id = {userID}
            />
        </Fragment>
    )
}

export default Users
