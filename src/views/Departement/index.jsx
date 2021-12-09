import { Fab } from '@mui/material'
import { Box } from '@mui/system'
import AddIcon from '@mui/icons-material/Add';
import React, { Fragment, useState } from 'react'
import DepartementTable from './DepartementTable';
import DepartementDialog from './DepartementDialog';
import axios from 'axios';
import { smd_url } from '../../variable/BaseUrl';

function Departement() {
    const [openDialog, setOpenDialog] = useState(false)
    const token = localStorage.getItem('token')

    const handleDialog = (data) => {
        setOpenDialog(data)
    }

    const handleSubmit = async (data) => {
        console.log(data)
        let formData = new FormData()
        formData.append('departement_name', data.departement_name)

        await axios.post(smd_url + 'departments/create', formData, {
            headers: {
                Authorization: 'Bearer ' + token
            }
        }).then(() => {
            handleDialog(false)
            console.log('berhasil')
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
                <Fab size="medium" color="primary" aria-label="add" onClick={() => handleDialog(true)}>
                    <AddIcon />
                </Fab>
            </Box>
            
            <Box mt={3} >
                <DepartementTable />
            </Box>

            <DepartementDialog 
                open = {openDialog}
                handleDialog = {handleDialog}
                handleSubmit = {handleSubmit}
            />
        </Fragment >
    )
}

export default Departement
