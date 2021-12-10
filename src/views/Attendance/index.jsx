import { Fab, TextField } from '@mui/material'
import { Box } from '@mui/system'
import React, { Fragment, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'

import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import AttendanceTable from './AttendanceTable';
import axios from 'axios';
import { smd_url } from '../../variable/BaseUrl';

import LocalizationProvider from '@mui/lab/LocalizationProvider';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { DateRangePicker } from '@mui/lab';


function Attendance() {
    const [attendance, setAttendance] = useState([])

    const currentDate = () => {
        let toDate = new Date().toLocaleDateString()
        let today = new Date()
        today.setDate(today.getDate() - 10)
        let fromDate = today.toLocaleDateString()
        return [fromDate, toDate]
    }

    const [dateRange, setDateRange] = useState(currentDate())
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
                from: dateRange[0],
                to: dateRange[1]
            }
        }).then((res) => {
            setAttendance(res.data)
        })
    }

    useEffect(() => {
        getAttendance()
    }, [page, rowsPerPage, dateRange])

    const handleDateRange = (value) => {
        let from = value[0] !== null ? value[0].toLocaleDateString() : null
        let to = value[1] !== null ? value[1].toLocaleDateString() : null
        setDateRange([from, to])
    }

    return (
        <Fragment>
            <Box 
                sx={{ 
                    '& > :not(style)': { m: 1 } ,
                    display: 'flex',
                    justifyContent: 'flex-end',
                    alignItems: 'center'
                }}
            >
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DateRangePicker
                        startText="From"
                        endText="To"
                        value={dateRange}
                        onChange={(newValue) => handleDateRange(newValue)}
                        renderInput={(startProps, endProps) => (
                        <React.Fragment>
                            <TextField size="small" {...startProps} />
                            <Box sx={{ mx: 2 }}> to </Box>
                            <TextField size="small" {...endProps} />
                        </React.Fragment>
                        )}
                    />
                </LocalizationProvider>

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
