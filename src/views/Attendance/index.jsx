import { Fab } from '@mui/material'
import { Box } from '@mui/system'
import React, { Fragment, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AttendanceTable from './AttendanceTable';
import axios from 'axios';
import { smd_url } from '../../variable/BaseUrl';

function Attendance() {
    const [attendance, setAttendance] = useState([])

    const currentDate = () => {
        let toDate = new Date().toLocaleDateString()
        let today = new Date()
        today.setDate(today.getDate() - 10)
        let fromDate = today.toLocaleDateString()
        return {
            from: fromDate,
            to: toDate
        }
    }

    const [date, setDate] = useState(currentDate())
    const [page, setPage] = React.useState(1);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    const token = localStorage.getItem('token')


    const getAttendance = async () => {
        await axios.get(smd_url + 'attendances', {
            headers: {
                Authorization: 'Bearer ' + token
            },
            params: {
                page: page,
                itemPerPage: rowsPerPage,
                from: date.from,
                to: date.to
            }
        }).then((res) => {
            setAttendance(res.data)
        })
    }

    useEffect(() => {
        getAttendance()
    }, [page, rowsPerPage])

    return (
        <Fragment>
            <Box 
                sx={{ 
                    '& > :not(style)': { m: 1 } ,
                    display: 'flex',
                    justifyContent: 'flex-end'
                }}
            >
                
                <Fab size="medium" color="primary" aria-label="download">
                    <CloudDownloadIcon />
                </Fab>
                <Fab size="medium" color="primary" aria-label="filter">
                    <FilterAltIcon />
                </Fab>
            </Box>  
            
            <Box mt={3} >
                <AttendanceTable
                    data = {attendance}
                    setPage = {(page) => setPage(page)}
                    setRowsPerPage={(itemPerPage) => setRowsPerPage(itemPerPage)}
                />
            </Box>
        </Fragment>
    )
}

export default Attendance
